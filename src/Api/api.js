import axios from "axios";
import { MD5 } from "crypto-js";

const KEYAPIPRIVATE = import.meta.env.VITE_KEYAPIPRIVATE;
const KEYAPIPUBLIC = import.meta.env.VITE_KEYAPIPUBLIC;
const BASE_URL = "https://gateway.marvel.com/v1/public/";
// Encyptado
function CryptoMD5(privatekey, publicKey) {
  const ts = Date.now().toString();
  const hash = MD5(ts + privatekey + publicKey).toString();
  return { ts, hash };
}
// Petitions
// api.js
export async function ApiCharacters({
  page = 1,
  limit = 20,
  namePrefix = "",
} = {}) {
  try {
    const { hash, ts } = CryptoMD5(KEYAPIPRIVATE, KEYAPIPUBLIC);
    const params = {
      ts,
      apikey: KEYAPIPUBLIC,
      hash,
      limit,
      offset: (page - 1) * limit,
    };
    if (namePrefix?.trim()) {
      params.nameStartsWith = namePrefix.trim();
    }
    const { data } = await axios.get(`${BASE_URL}characters`, { params });
    const payload = data?.data ?? {};
    return {
      results: payload.results ?? [],
      total: payload.total ?? 0,
      count: payload.count ?? 0,
      offset: payload.offset ?? 0,
      limit: payload.limit ?? limit,
      page,
    };
  } catch (e) {
    console.error(e);
    return { results: [], total: 0, count: 0, offset: 0, limit, page };
  }
}
export async function ApiEvents({
  page = 1,
  limit = 20,
  namePrefix = "",
} = {}) {
  const safeLimit = Math.max(1, Number(limit) || 20);
  const safePage = Math.max(1, Number(page) || 1);

  const { hash, ts } = CryptoMD5(KEYAPIPRIVATE, KEYAPIPUBLIC);

  // Construye params base
  const baseParams = {
    ts,
    apikey: KEYAPIPUBLIC,
    hash,
    limit: safeLimit,
    offset: (safePage - 1) * safeLimit,
    orderBy: "modified",
  };

  const q = (namePrefix ?? "").trim();
  const params = q ? { ...baseParams, titleStartsWith: q } : baseParams;

  const url = `${BASE_URL}events`;
  const request = async (p) => {
    return axios.get(url, {
      params: p,
      timeout: 15000,
      headers: { Accept: "application/json" },
    });
  };

  try {
    const { data } = await request(params);
    const payload = data?.data ?? {};
    const results = Array.isArray(payload.results) ? payload.results : [];
    const normalized = results.map((e) => ({
      ...e,
      thumbnail: e?.thumbnail
        ? {
            ...e.thumbnail,
            path: String(e.thumbnail.path || "").replace(/^http:/, "https:"),
          }
        : e?.thumbnail,
    }));

    const total = Number(payload.total ?? 0);
    const count = Number(payload.count ?? normalized.length);
    const offset = Number(payload.offset ?? 0);

    return {
      results: normalized,
      total,
      count,
      offset,
      limit: Number(payload.limit ?? safeLimit),
      page: safePage,
      hasMore: offset + count < total,
    };
  } catch (err) {
    const status = err?.response?.status;
    const errData = err?.response?.data;
    console.error("ApiEvents error:", status, errData || err?.message || err);

    if (status === 500) {
      try {
        const retryParams = { ...baseParams, limit: Math.min(12, safeLimit) };
        const { data } = await request(retryParams);
        const payload = data?.data ?? {};
        const results = Array.isArray(payload.results) ? payload.results : [];

        const normalized = results.map((e) => ({
          ...e,
          thumbnail: e?.thumbnail
            ? {
                ...e.thumbnail,
                path: String(e.thumbnail.path || "").replace(
                  /^http:/,
                  "https:"
                ),
              }
            : e?.thumbnail,
        }));

        const total = Number(payload.total ?? 0);
        const count = Number(payload.count ?? normalized.length);
        const offset = Number(payload.offset ?? 0);

        return {
          results: normalized,
          total,
          count,
          offset,
          limit: Number(payload.limit ?? Math.min(12, safeLimit)),
          page: safePage,
          hasMore: offset + count < total,
        };
      } catch (fallbackErr) {
        console.error(
          "ApiEvents fallback error:",
          fallbackErr?.response?.status,
          fallbackErr?.response?.data || fallbackErr?.message
        );
      }
    }

    return {
      results: [],
      total: 0,
      count: 0,
      offset: 0,
      limit: safeLimit,
      page: safePage,
      hasMore: false,
    };
  }
}

export async function ApiComics({
  page = 1,
  limit = 20,
  namePrefix = "",
} = {}) {
  try {
    const { hash, ts } = CryptoMD5(KEYAPIPRIVATE, KEYAPIPUBLIC);
    const params = {
      ts,
      apikey: KEYAPIPUBLIC,
      hash,
      limit,
      offset: (page - 1) * limit,
    };
    if (namePrefix?.trim()) {
      params.titleStartsWith = namePrefix.trim();
    }
    const { data } = await axios.get(`${BASE_URL}comics`, { params });
    const payload = data?.data ?? {};
    return {
      results: payload.results ?? [],
      total: payload.total ?? 0,
      count: payload.count ?? 0,
      offset: payload.offset ?? 0,
      limit: payload.limit ?? limit,
      page,
    };
  } catch (e) {
    console.error(e);
    return { results: [], total: 0, count: 0, offset: 0, limit, page };
  }
}
