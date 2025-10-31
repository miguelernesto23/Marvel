import React from "react";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center">
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center justify-center rounded-2xl border-2 border-dashed border-muted bg-card/50 backdrop-blur px-6 py-3 text-sm text-muted-foreground"
          >
            <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-destructive animate-pulse" />
            Error 404 — Página no encontrada
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight bg-linear-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent"
          >
            ¿Te perdiste en el multiverso?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-4 text-lg md:text-xl text-muted-foreground"
          >
            La página que buscas no existe o fue movida. Vuelve al inicio o
            prueba otra ruta.
          </motion.p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="h-11 inline-flex items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm hover:shadow-md transition"
            >
              Ir al inicio
            </Link>
            <button
              onClick={() => window.history.back()}
              className="h-11 inline-flex items-center justify-center rounded-xl border-2 border-border bg-card/50 px-5 text-sm font-semibold text-foreground hover:bg-card transition"
            >
              Volver atrás
            </button>
          </div>

          {/* Decorative card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="sm:col-span-2 overflow-hidden rounded-2xl border-2 bg-card/50 backdrop-blur">
              <div className="aspect-video w-full bg-secondary/60 flex items-center justify-center">
                <div className="text-8xl font-extrabold tracking-widest text-muted-foreground select-none">
                  404
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border-2 bg-card/50 p-5 flex items-center justify-center">
              <div className="text-left">
                <h3 className="text-xl font-semibold">Sugerencias</h3>
                <ul className="mt-3 list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Comprueba la URL</li>
                  <li>Vuelve a la página anterior</li>
                  <li>Usa la barra de búsqueda</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
