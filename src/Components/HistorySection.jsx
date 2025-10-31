import React, { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
export function HistorySection() {
  const historyMilestones = [
    {
      year: "1939",
      title: "The Birth of Marvel",
      description:
        "Martin Goodman founds Timely Comics, which would later become Marvel Comics. The first appearance of the original Human Torch marks the beginning of an era.",
      image: "/HistoryMarvel/historia1.png",
      imageQuery:
        "vintage 1939 Marvel Timely Comics golden age comic book cover",
      container: "container-one",
    },
    {
      year: "1961",
      title: "The Modern Era Begins",
      description:
        "Stan Lee and Jack Kirby create the Fantastic Four, launching the modern era of Marvel. Soon after came Spider-Man, Hulk, Thor, Iron Man, and the X-Men.",
      image: "/HistoryMarvel/historia2.png",
      imageQuery:
        "1961 Fantastic Four comic book cover Stan Lee Jack Kirby silver age",
    },
    {
      year: "1963",
      title: "The Avengers Are Born",
      description:
        "Earth’s mightiest heroes unite for the first time. Iron Man, Thor, Hulk, Ant-Man, and the Wasp form the most iconic superhero team in history.",
      image: "/HistoryMarvel/historia3.png",
      imageQuery: "1963 Avengers #1 comic book cover original team",
    },
    {
      year: "2008",
      title: "The MCU Takes Off",
      description:
        "Iron Man hits theaters and changes the superhero movie landscape forever. Robert Downey Jr. becomes Tony Stark, and the Marvel Cinematic Universe is born.",
      image: "/HistoryMarvel/historia4.png",
      imageQuery: "2008 Iron Man movie poster Robert Downey Jr MCU beginning",
    },
    {
      year: "2019",
      title: "Avengers: Endgame",
      description:
        "The culmination of 11 years and 22 films. Endgame becomes the highest-grossing movie of all time, earning nearly $3 billion worldwide.",
      image: "/HistoryMarvel/historia5.png",
      imageQuery: "Avengers Endgame 2019 movie poster all heroes assembled",
    },
    {
      year: "2024+",
      title: "The Future of the Multiverse",
      description:
        "Marvel expands its universe with new sagas, characters, and dimensions. The Multiverse Saga promises to be even more epic than everything that came before.",
      image: "/HistoryMarvel/historia6.png",
      imageQuery: "Marvel multiverse saga future movies cosmic epic",
    },
  ];

  // Variants para textos: solo opacidad
  const textVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Variants para imágenes: desplazamiento en eje X + opacidad
  const imageVariants = (direction = "left") => ({
    hidden: { opacity: 0, x: direction === "left" ? -10 : 10 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  });

  return (
    <section className="py-24 px-6 bg-linear-to-b from-black via-neutral-950 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <InViewMotion variants={textVariants}>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 text-center">
            The History of <span className="text-marvel-red">Marvel</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto text-center mb-10">
            From its humble beginnings in 1939 to becoming the greatest cultural
            phenomenon in entertainment.
          </p>
        </InViewMotion>

        {/* Items */}
        <div className="space-y-24">
          {historyMilestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            const dir = isEven ? "left" : "right";

            return (
              <div
                key={milestone.year}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 items-center`}
              >
                <InViewMotion variants={imageVariants(dir)}>
                  <div className="flex-1 relative group">
                    <div className="absolute inset-0 bg-marvel-red/20 blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                    <div className="relative overflow-hidden rounded-lg border border-neutral-800 group-hover:border-marvel-red/50 transition-all duration-300">
                      <img
                        src={milestone.image || "/placeholder.svg"}
                        alt={milestone.title}
                        className="h-[400px] w-[800px] lg:h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-marvel-red text-white px-4 py-2 rounded-md font-bold text-2xl">
                        {milestone.year}
                      </div>
                    </div>
                  </div>
                </InViewMotion>

                <InViewMotion variants={textVariants}>
                  <div className="flex-1 space-y-4">
                    <div className="inline-block px-4 py-1 bg-marvel-red/10 border border-marvel-red/30 rounded-full">
                      <span className="text-marvel-red font-semibold">
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-white">
                      {milestone.title}
                    </h3>
                    <p className="text-lg text-neutral-300 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </InViewMotion>
              </div>
            );
          })}
        </div>
        {/* CTA final */}
        <InViewMotion variants={textVariants}>
          <div className="mt-24 text-center">
            <div className="inline-block p-8 bg-linear-to-br from-marvel-red/10 to-transparent border border-marvel-red/30 rounded-lg">
              <p className="text-2xl font-bold text-white mb-2">
                85+ Años de Historia
              </p>
              <p className="text-neutral-400">
                Y la historia continúa escribiéndose cada día
              </p>
            </div>
          </div>
        </InViewMotion>
      </div>
    </section>
  );
}

// Componente auxiliar que usa useInView para repetir la animación
function InViewMotion({ children, variants }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.35 });

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
