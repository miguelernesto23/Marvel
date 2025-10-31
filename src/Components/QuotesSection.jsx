// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function QuotesSection() {
  const quotes = [
    {
      text: "Con un gran poder viene una gran responsabilidad",
      character: "Tío Ben",
      image: "/FavoriteQuotes/tioben.png",
    },
    {
      text: "Yo soy Iron Man",
      character: "Tony Stark",
      image: "/FavoriteQuotes/ironman.png",
    },
    {
      text: "Avengers, assemble!",
      character: "Steve Rogers",
      image: "/FavoriteQuotes/capitan.png",
    },
  ];

  // Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <InViewMotion variants={fadeUp} amount={0.35}>
          <div className="text-center mb-12">
            <div className="w-12 h-12 mx-auto mb-4 text-primary"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Frases Icónicas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Las palabras que definieron a nuestros héroes
            </p>
          </div>
        </InViewMotion>
        <GridInView variants={gridVariants} amount={0.3}>
          <div className="grid md:grid-cols-3 gap-6">
            {quotes.map((quote, index) => (
              <motion.article
                key={index}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/30 backdrop-blur hover:border-primary/50 transition-all duration-300 min-h-[400px]"
              >
                <div className="absolute inset-0">
                  <img
                    src={quote.image || "/placeholder.svg"}
                    alt={quote.character}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500"
                  />

                </div>

                <div className="relative h-full flex flex-col justify-end p-8">
                  <div className="w-10 h-10 text-primary mb-4 opacity-50"></div>
                  <p className="text-2xl font-bold mb-4 text-balance leading-relaxed">
                    "{quote.text}"
                  </p>
                  <p className="text-primary font-semibold">
                    — {quote.character}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </GridInView>
      </div>
    </section>
  );
}

// Componente auxiliar: usa useInView para repetir animaciones
function InViewMotion({ children, variants, amount = 0.3 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

// Componente para grupos con staggerChildren
function GridInView({ children, variants, amount = 0.3 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
