/* eslint-disable react-hooks/rules-of-hooks */

/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState, useCallback, memo } from "react";
import { ApiComics } from "../Api/api";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- Animations ---------- */
const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const ITEM = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

/* ---------- Helpers ---------- */
function PosterImage({ src, alt, className }) {
  const fallback = "/placechorde.jpg"; // in public/
  return (
    <img
      src={src || fallback}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = fallback;
      }}
    />
  );
}

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between gap-4 py-2 border-b border-border/50">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-medium text-foreground text-right">
      {value ?? "—"}
    </span>
  </div>
);

/* ---------- Modal ---------- */
function ModelCard({ comic, onClose }) {
  if (!comic) return null;

  const escHandler = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [escHandler]);

  const priceList = (comic.prices || [])
    .filter((p) => p?.price)
    .map((p) => `${p.type?.replace(/_/g, " ")}: $${Number(p.price).toFixed(2)}`)
    .join(" · ");

  // creators: array like {role, name}
  const creatorList = (comic.creators?.items || [])
    .slice(0, 8)
    .map((c) => `${c.name} (${c.role})`)
    .join(", ");

  const characterList = (comic.characters?.items || [])
    .slice(0, 8)
    .map((c) => c.name)
    .join(", ");
  const seriesName = comic.series?.name ?? null;

  const onsaleDate = (comic.dates || []).find(
    (d) => d.type === "onsaleDate"
  )?.date;
  const modified = (comic.dates || []).find((d) => d.type === "modified")?.date;

  const urls = Array.isArray(comic.urls)
    ? comic.urls.reduce((acc, u) => {
        if (u.type && u.url) acc[u.type] = u.url;
        return acc;
      }, {})
    : {};

  const imgSrc = comic?.thumbnail
    ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`.replace(
        /^http:/,
        "https:"
      )
    : "/placechorde.jpg";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalles de ${comic.title}`}
      >
        <motion.div
          className=" relative  bg-card text-card-foreground rounded-2xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto no-scrollbar border border-border"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-full">
              <PosterImage
                src={imgSrc}
                alt={comic.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                {comic.format || "Comic"}
              </span>
            </div>

            <div className="p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-2xl font-bold leading-tight">
                  {comic.title}
                </h3>
                <button
                  onClick={onClose}
                  className="absolute top-2 z-50 lg:inline-flex items-center justify-center rounded-full w-9 h-9 border border-border hover:bg-accent hover:text-accent-foreground transition"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{seriesName}</p>
              {comic.description ? (
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {comic.description}
                </p>
              ) : null}

              <div className="space-y-1">
                <InfoRow
                  label="Número"
                  value={
                    comic.issueNumber != null ? `#${comic.issueNumber}` : "—"
                  }
                />
                <InfoRow
                  label="Páginas"
                  value={comic.pageCount != null ? comic.pageCount : "—"}
                />
                <InfoRow label="Precios" value={priceList || "—"} />
                <InfoRow
                  label="On sale"
                  value={
                    onsaleDate ? new Date(onsaleDate).toLocaleDateString() : "—"
                  }
                />
                <InfoRow
                  label="Actualizado"
                  value={
                    modified ? new Date(modified).toLocaleDateString() : "—"
                  }
                />
                <InfoRow label="Creadores" value={creatorList || "—"} />
                <InfoRow label="Personajes" value={characterList || "—"} />
              </div>

              <div className="mt-4 flex gap-3 flex-wrap">
                {urls.detail && (
                  <a
                    href={urls.detail}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition text-sm font-medium"
                  >
                    Ver detalle
                  </a>
                )}
                {urls.purchase && (
                  <a
                    href={urls.purchase}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl border border-border hover:bg-accent hover:text-accent-foreground transition text-sm"
                  >
                    Comprar
                  </a>
                )}
                {urls.reader && (
                  <a
                    href={urls.reader}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl border border-border hover:bg-accent hover:text-accent-foreground transition text-sm"
                  >
                    Leer
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------- Card ---------- */
const ComicCard = memo(function ComicCard({ comic, onOpen }) {
  const thumb = comic?.thumbnail;
  const imgSrc = thumb
    ? `${thumb.path}.${thumb.extension}`.replace(/^http:/, "https:")
    : "/placechorde.jpg";
  const prices = (comic?.prices || []).filter((p) => p?.price);

  return (
    <motion.div
      variants={ITEM}
      layout
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="overflow-hidden border-2 rounded-xl hover:border-primary transition-all duration-300 group bg-card/50 backdrop-blur"
    >
      <div className="aspect-square overflow-hidden bg-secondary relative">
        <motion.img
          src={imgSrc}
          alt={comic.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.35 }}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placechorde.jpg";
          }}
        />
        <div className="absolute top-3 right-3">
          <span className="text-xs font-bold px-2 py-1 rounded bg-primary text-primary-foreground">
            {comic.format || "Comic"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2">
          {comic.title}
        </h3>
        <div className="text-sm flex flex-wrap items-center gap-3 mt-2 text-muted-foreground">
          {comic?.issueNumber ? (
            <span className="flex items-center gap-1">
              <span className="font-semibold text-foreground">
                #{comic.issueNumber}
              </span>{" "}
              issue
            </span>
          ) : null}
          {comic?.pageCount ? (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="font-semibold text-foreground">
                  {comic.pageCount}
                </span>{" "}
                pages
              </span>
            </>
          ) : null}
          {prices?.length ? (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                {prices
                  .map(
                    (p) =>
                      `${p.type.replace(/_/g, " ")}: $${Number(p.price).toFixed(
                        2
                      )}`
                  )
                  .join(" · ")}
              </span>
            </>
          ) : null}
        </div>
        {comic?.description ? (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mt-2">
            {comic.description}
          </p>
        ) : null}

        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition text-sm font-medium"
            onClick={() => onOpen(comic)}
            aria-label={`Abrir detalles de ${comic.title}`}
          >
            Ver más
          </button>
        </div>
      </div>
    </motion.div>
  );
});

/* ---------- Main ---------- */
export const ComicsView = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [namePrefix, setNamePrefix] = useState("");
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const totalPages = useMemo(() => {
    if (!limit) return 1;
    return Math.max(1, Math.ceil(total / limit));
  }, [total, limit]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await ApiComics({ page, limit, namePrefix });
        if (!isMounted) return;
        setResults(data.results || []);
        setTotal(data.total || 0);
        setCount(data.count || 0);
        setOffset(data.offset || 0);
      } catch (e) {
        if (!isMounted) return;
        setError("No se pudieron cargar los cómics.", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [page, limit, namePrefix]);

  const onChangePage = (nextPage) => {
    setPage((prev) => {
      const p = typeof nextPage === "number" ? nextPage : prev + nextPage;
      return Math.min(Math.max(1, p), totalPages);
    });
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const onChangePageSize = useCallback((e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  }, []);

  const start = useMemo(
    () => (total === 0 ? 0 : (page - 1) * limit + 1),
    [total, page, limit]
  );
  const end = useMemo(
    () => Math.min(page * limit, total),
    [page, limit, total]
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent">
              Marvel Comics
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover iconic issues, story arcs, and editions from the Marvel
              universe.
            </p>

            {/* Search + page size */}
            <form
              onSubmit={onSubmitSearch}
              className="flex flex-col md:flex-row gap-4 items-center justify-center"
            >
              <input
                type="text"
                placeholder="Search by title…"
                value={namePrefix}
                onChange={(e) => setNamePrefix(e.target.value)}
                className="pl-4 pr-4 h-12 text-lg border-2 rounded-md w-full md:w-96 focus:outline-none focus:border-primary transition-all duration-200"
              />
              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground">
                  Per page
                </label>
                <select
                  value={limit}
                  onChange={onChangePageSize}
                  className="h-10 border-2 rounded-md px-3 bg-black focus:border-2 focus:border-primary"
                >
                  <option value={12}>12</option>
                  <option value={20}>20</option>
                  <option value={40}>40</option>
                  <option value={60}>60</option>
                  <option value={100}>100</option>
                </select>
                <button
                  type="submit"
                  className="h-10 px-4 rounded-md bg-primary text-primary-foreground font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                  disabled={loading}
                >
                  Search
                </button>
              </div>
            </form>

            {/* Counter */}
            {!loading && (
              <div className="mt-6 text-muted-foreground">
                <span>
                  Showing{" "}
                  <span className="text-foreground font-semibold">
                    {start}-{end}
                  </span>{" "}
                  of{" "}
                  <span className="text-foreground font-semibold">{total}</span>{" "}
                  comics
                </span>
              </div>
            )}
          </div>

          {/* Loader skeletons */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: Math.min(limit, 12) }).map((_, i) => (
                <motion.div
                  key={i}
                  className="overflow-hidden border-2 rounded-xl bg-card/50 backdrop-blur animate-pulse"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <div className="aspect-square bg-muted" />
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="mt-4 h-10 bg-muted rounded" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-muted-foreground mb-4">
                No comics found
              </p>
              <p className="text-muted-foreground">Try another search</p>
            </div>
          ) : (
            <>
              {/* Grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl-grid-cols-4 gap-6"
                initial="hidden"
                animate="show"
                variants={STAGGER}
              >
                <AnimatePresence>
                  {results.map((comic) => (
                    <ComicCard
                      key={comic.id}
                      comic={comic}
                      onOpen={setSelected}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Pagination controls */}
              <div className="flex items-center justify-center gap-3 mt-10">
                <button
                  onClick={() => onChangePage(-1)}
                  disabled={page <= 1 || loading}
                  className="h-10 px-4 border rounded-md disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-sm text-muted-foreground">
                  Page <span className="font-semibold">{page}</span> of{" "}
                  <span className="font-semibold">{totalPages}</span>
                </span>
                <button
                  onClick={() => onChangePage(1)}
                  disabled={page >= totalPages || loading}
                  className="h-10 px-4 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ModelCard comic={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </main>
  );
};
