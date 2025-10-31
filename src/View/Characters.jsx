/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { ApiCharacters } from "../Api/api";
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
  const fallback = "/placechorde.jpg";
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

/* ---------- Modal / ModelCard ---------- */
function ModelCard({ ch, onClose }) {
  if (!ch) return null;

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

  const maybeJoin = (arr) =>
    Array.isArray(arr) && arr.length ? arr.join(", ") : "—";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur z-50 flex items-center justify-center p-4 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalles de ${ch.name}`}
      >
        <motion.div
          className=" relative lg:inline z-50 bg-card text-card-foreground rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto border border-border no-scrollbar"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-full">
              <PosterImage
                src={ch.thumbnail}
                alt={ch.name}
                className="w-full max-h-[90vh] object-cover"
              />
              <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                {ch.category || "Character"}
              </span>
            </div>

            <div className="p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-2xl font-bold leading-tight">{ch.name}</h3>
                <button
                  onClick={onClose}
                  className="lg:inline-flex absolute top-2 items-center justify-center rounded-full w-9 h-9 border border-border hover:bg-accent hover:text-accent-foreground transition"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {ch.description || "Sin descripción."}
              </p>

              <div className="space-y-1">
                <InfoRow
                  label="Comics"
                  value={
                    typeof ch.comics === "number"
                      ? ch.comics.toLocaleString()
                      : "—"
                  }
                />
                <InfoRow
                  label="Series"
                  value={
                    typeof ch.series === "number"
                      ? ch.series.toLocaleString()
                      : "—"
                  }
                />
                <InfoRow
                  label="Historias"
                  value={
                    typeof ch.stories === "number"
                      ? ch.stories.toLocaleString()
                      : "—"
                  }
                />
                <InfoRow
                  label="Eventos"
                  value={
                    typeof ch.events === "number"
                      ? ch.events.toLocaleString()
                      : "—"
                  }
                />
              </div>

              {(ch.topComics?.length || ch.topSeries?.length) && (
                <div className="mt-4 grid gap-3 grid-cols-2">
                  {ch.topComics?.length ? (
                    <div>
                      <h4 className="text-sm font-semibold mb-1">
                        Comics destacados
                      </h4>
                      <ul className="text-sm list-disc list-inside text-muted-foreground space-y-1">
                        {ch.topComics.slice(0, 6).map((n, i) => (
                          <li key={i}>{n}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {ch.topSeries?.length ? (
                    <div>
                      <h4 className="text-sm font-semibold mb-1">
                        Series destacadas
                      </h4>
                      <ul className="text-sm list-disc list-inside text-muted-foreground space-y-1">
                        {ch.topSeries.slice(0, 6).map((n, i) => (
                          <li key={i}>{n}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-3">
                {ch.urls?.detail && (
                  <a
                    href={ch.urls.detail}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition text-sm font-medium"
                  >
                    Ver detalle
                  </a>
                )}
                {ch.urls?.wiki && (
                  <a
                    href={ch.urls.wiki}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl border border-border hover:bg-accent hover:text-accent-foreground transition text-sm"
                  >
                    Wiki
                  </a>
                )}
                {ch.urls?.comiclink && (
                  <a
                    href={ch.urls.comiclink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl border border-border hover:bg-accent hover:text-accent-foreground transition text-sm"
                  >
                    Comiclink
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

/* ---------- Cards ---------- */
const CharacterCard = memo(function CharacterCard({ ch, onOpen }) {
  return (
    <motion.div
      variants={ITEM}
      layout
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="overflow-hidden border-2 rounded-xl hover:border-primary transition-all duration-300 group bg-card/50 backdrop-blur"
    >
      <div className="aspect-square overflow-hidden bg-secondary relative">
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.35 }}
        >
          <PosterImage
            src={ch.thumbnail}
            alt={ch.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute top-3 right-3">
          <span className="text-xs font-bold px-2 py-1 rounded bg-primary text-primary-foreground">
            {ch.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
          {ch.name}
        </h3>
        <div className="text-sm flex items-center gap-3 mt-2 text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="font-semibold text-foreground">{ch.comics}</span>{" "}
            comics
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="font-semibold text-foreground">{ch.series}</span>{" "}
            series
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mt-2">
          {ch.description}
        </p>

        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition text-sm font-medium"
            onClick={() => onOpen(ch)}
            aria-label={`Abrir detalles de ${ch.name}`}
          >
            Ver más
          </button>
        </div>
      </div>
    </motion.div>
  );
});

/* ---------- Main ---------- */
export default function Characters() {
  /* Estados */
  const [rawCharacters, setRawCharacters] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  // búsqueda + debounce
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // paginación
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  /* Fetch */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);

      const currentPage = debouncedQuery ? 1 : page;
      try {
        const resp = await ApiCharacters({
          page: currentPage,
          limit: pageSize,
          namePrefix: debouncedQuery,
        });

        const results = Array.isArray(resp) ? resp : resp?.results ?? [];
        const totalCount = Array.isArray(resp)
          ? results.length
          : resp?.total ?? results.length;

        if (!cancelled) {
          setRawCharacters(results);
          setTotal(totalCount);
          setPage(currentPage);
        }
      } catch (err) {
        console.error("Error cargando personajes:", err);
        if (!cancelled) {
          setRawCharacters([]);
          setTotal(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page, pageSize, debouncedQuery]);

  /* Map API → UI */
  const mappedCharacters = useMemo(() => {
    return rawCharacters.map((c) => {
      // Normalize urls array from Marvel API-like shape: [{type, url}, ...]
      const urls = Array.isArray(c.urls)
        ? c.urls.reduce((acc, u) => {
            if (u.type && u.url) acc[u.type] = u.url;
            return acc;
          }, {})
        : {};

      // Extract top items (names) from comics/series lists if present
      const topComics = c.comics?.items
        ? c.comics.items
            .slice(0, 8)
            .map((it) => it.name)
            .filter(Boolean)
        : [];
      const topSeries = c.series?.items
        ? c.series.items
            .slice(0, 8)
            .map((it) => it.name)
            .filter(Boolean)
        : [];

      return {
        id: c.id,
        name: c.name,
        description: c.description || "Sin descripción.",
        thumbnail: c.thumbnail
          ? `${c.thumbnail.path}.${c.thumbnail.extension}`.replace(
              /^http:/,
              "https:"
            )
          : "/placechorde.jpg",
        comics: c.comics?.available ?? 0,
        series: c.series?.available ?? 0,
        stories: c.stories?.available ?? 0,
        events: c.events?.available ?? 0,
        category: "Hero",
        urls,
        topComics,
        topSeries,
      };
    });
  }, [rawCharacters]);

  const { start, end, totalPages } = useMemo(() => {
    const s = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const e = Math.min(page * pageSize, total);
    const t = Math.max(1, Math.ceil(total / pageSize));
    return { start: s, end: e, totalPages: t };
  }, [total, page, pageSize]);

  /* Handlers */
  const goPrev = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const goNext = useCallback(
    () => setPage((p) => Math.min(totalPages, p + 1)),
    [totalPages]
  );
  const onChangePageSize = useCallback((e) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent">
              Marvel Characters
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Explore the vast universe of legendary heroes and epic villains.
            </p>

            {/* Search + page size */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <input
                type="text"
                placeholder="Search by name…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-4 h-12 text-lg border-2 rounded-md w-full md:w-96 focus:outline-none focus:border-primary transition-all duration-200"
              />
              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground">
                  Per page
                </label>
                <select
                  value={pageSize}
                  onChange={onChangePageSize}
                  className="h-10 border-2 rounded-md px-3 bg-black focus:border-2 focus:border-primary "
                >
                  <option value={12}>12</option>
                  <option value={20}>20</option>
                  <option value={40}>40</option>
                </select>
              </div>
            </div>

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
                  characters
                </span>
              </div>
            )}
          </div>

          {/* Loader skeletons */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: Math.min(pageSize, 12) }).map((_, i) => (
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
          ) : mappedCharacters.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-muted-foreground mb-4">
                No characters found
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
                  {mappedCharacters.map((ch) => (
                    <CharacterCard key={ch.id} ch={ch} onOpen={setSelected} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Pagination controls */}
              <div className="flex items-center justify-center gap-3 mt-10">
                <button
                  onClick={goPrev}
                  disabled={page <= 1}
                  className="h-10 px-4 border rounded-md disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-sm text-muted-foreground">
                  Page <span className="font-semibold">{page}</span> of{" "}
                  <span className="font-semibold">{totalPages}</span>
                </span>
                <button
                  onClick={goNext}
                  disabled={page >= totalPages}
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
          <ModelCard ch={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
