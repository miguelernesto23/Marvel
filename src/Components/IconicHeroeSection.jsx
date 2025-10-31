// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function IconicHeroeSection() {
  const characters = [
    { name: "Iron Man", image: "/FavoriteHero/ironman.png" },
    { name: "Captain America", image: "/FavoriteHero/capitanamerica.png"  },
    { name: "Thor", image: "/FavoriteHero/thor.png"  },
    { name: "Black Widow", image: "/FavoriteHero/blackwidow.png"  },
    { name: "Hulk", image: "/FavoriteHero/hulk.png"  },
    { name: "Spider-Man", image: "/FavoriteHero/spiderman.png"  },
  ];

  // Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 px-4 lg:px-8 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto">
        {/* Encabezado con fade */}
        <InViewMotion variants={fadeUp}>
          <div className="space-y-4 mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
              Iconic Heroes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Meet the legendary characters that have captured hearts worldwide
            </p>
          </div>
        </InViewMotion>

        {/* Grid de personajes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {characters.map((character, index) => (
            <InViewMotion key={index} variants={cardVariants}>
              <div className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer">
                <img
                  src={character.image || "/placeholder.svg"}
                  alt={character.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-foreground text-center">
                    {character.name}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </InViewMotion>
          ))}
        </div>
      </div>
    </section>
  );
}
function InViewMotion({ children, variants }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 }); // se repite al hacer scroll

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
