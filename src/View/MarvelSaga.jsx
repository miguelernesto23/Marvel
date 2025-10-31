import React, { useEffect, useState, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

function ModelCard({ movie, onClose }) {
  if (!movie) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const escHandler = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [escHandler]);

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between gap-4 py-2 border-b border-border/50">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">
        {value ?? "—"}
      </span>
    </div>
  );

  const currency = (n) =>
    typeof n === "number"
      ? n.toLocaleString(undefined, { style: "currency", currency: "USD" })
      : "—";

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
        aria-label={`Detalles de ${movie.title}`}
      >
        <motion.div
          className="bg-card  border-red-600 text-card-foreground rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border "
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-full">
              <img
                src={movie.poster || "/placechorde.jpg"}
                alt={movie.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                {movie.year}
              </span>
            </div>

            <div className="p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-2xl font-bold leading-tight">
                  {movie.title}
                </h3>
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-full w-9 h-9 border border-border hover:bg-accent hover:text-accent-foreground transition"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                {movie.phase}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {movie.description}
              </p>

              <div className="space-y-1">
                <InfoRow label="Clasificación" value={movie.rating} />
                <InfoRow
                  label="Duración"
                  value={
                    movie.runtime_minutes ? `${movie.runtime_minutes} min` : "—"
                  }
                />
                <InfoRow label="Director" value={movie.director} />
                <InfoRow
                  label="Géneros"
                  value={
                    movie.genres && movie.genres.length
                      ? movie.genres.join(", ")
                      : "—"
                  }
                />
                <InfoRow
                  label="Actores"
                  value={
                    movie.cast && movie.cast.length
                      ? movie.cast.join(", ")
                      : "—"
                  }
                />
                <InfoRow
                  label="Recaudación"
                  value={currency(movie.box_office_usd)}
                />
                <InfoRow
                  label="Vistas"
                  value={
                    typeof movie.views === "number"
                      ? movie.views.toLocaleString()
                      : "—"
                  }
                />
              </div>

              <div className="mt-4 flex gap-3">
                {movie.trailer && (
                  <a
                    href={movie.trailer}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition text-sm font-medium"
                  >
                    Ver tráiler
                  </a>
                )}
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    movie.title + " Marvel"
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl border border-border hover:bg-accent hover:text-accent-foreground transition text-sm"
                >
                  Buscar más
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function MarvelSaga() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [grid, setGrid] = useState("grid-cols-1 sm:grid-cols-2 lg:grid-cols-3");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/Data/saga.json");
        if (!response.ok) throw new Error("Failed to load data");
        const data = await response.json();
        setMovies(data.marvel_saga || []);
      } catch (err) {
        console.error(err);
        setError("Could not load Marvel movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const toggleGrid = (type) => {
    if (type === "grid") setGrid("grid-cols-1 sm:grid-cols-2 lg:grid-cols-3");
    else setGrid("grid-cols-4"); // list-like
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-xl text-muted-foreground animate-pulse">
          Loading Marvel Saga...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-xl text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent">
          Marvel Cinematic Universe
        </h2>
        <p className="text-lg text-muted-foreground mb-10">
          Explore all movies from the Infinity and Multiverse Saga.
        </p>

        {/* Grid toggle buttons */}
        <div className="flex justify-end gap-3 mb-6">
          <button
            onClick={() => toggleGrid("grid")}
            className={`p-2 rounded-md border-2 ${
              grid.includes("lg:grid-cols-3")
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            } hover:border-primary hover:text-primary transition-all`}
            title="Grid view"
          >
            <i className="bi bi-grid-3x3"></i>
          </button>

          <button
            onClick={() => toggleGrid("list")}
            className={`p-2 rounded-md border-2 ${
              grid === "grid-cols-1"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            } hover:border-primary hover:text-primary transition-all`}
            title="List view"
          >
            <i className="bi bi-grid-fill "></i>
          </button>
        </div>

        <motion.ul
          className={`grid gap-6 text-left ${grid}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {movies.map((movie) => (
            <motion.li
              key={movie.id}
              whileHover={{ scale: 1.03, y: -4 }}
              className="overflow-hidden border-2 rounded-2xl bg-card/50 backdrop-blur hover:border-primary transition-all"
            >
              <div className="aspect-2/3 overflow-hidden relative">
                {movie.poster ? (
                  <motion.img
                    src={movie.poster || "/placechorde.jpg"}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-primary/30 via-red-500/20 to-primary/30 flex items-center justify-center">
                    <span className="text-4xl font-bold text-foreground/70">
                      {(movie.title ?? "??").slice(0, 2)}
                    </span>
                  </div>
                )}
                <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                  {movie.year}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold mb-1">{movie.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {movie.phase}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {movie.description}
                </p>

                {/* Open Modal Button */}
                <div className="mt-4 flex justify-end">
                  <button
                    className="px-4 py-2 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition text-sm font-medium"
                    onClick={() => setSelected(movie)}
                    aria-label={`Abrir detalles de ${movie.title}`}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ModelCard movie={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
