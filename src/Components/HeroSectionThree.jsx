import React from "react";
import { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useInView, motion } from "framer-motion";
function HeroSectionThree() {
  const refDiv = useRef(null);
  const refP = useRef(null);
  const isInView = useInView(refDiv, { one: false });
  const isInViewP = useInView(refP, { one: false });
  return (
    <section className="py-24 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center" ref={refDiv}>
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
              The Marvel Comics <span className="text-red-700">Legacy</span>
            </h2>
            <motion.p
              className="text-md text-muted-foreground text-pretty leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Marvel Comics is a New York City–based comic book publisher, a
              property of the Walt Disney Company since December 31, 2009, and a
              subsidiary of Disney Publishing Worldwide since March 2023. Marvel
              was founded in 1939 by Martin Goodman as Timely Comics, and by
              1951 had generally become known as Atlas Comics.
            </motion.p>
            <motion.p
              className="text-md text-muted-foreground text-pretty leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              The Marvel era began in August 1961 with the launch of The
              Fantastic Four and other superhero titles created by Stan Lee,
              Jack Kirby, Steve Ditko, and numerous others. The Marvel brand,
              which had been used over the years and decades, was solidified as
              the company's primary brand.
            </motion.p>
          </div>
          <div className="space-y-6">
            {features.map((value, index) => (
              <motion.div
                className=" lg:hover:border-red-800 border border-red-800  lg:hover:border transition duration-300 rounded-2xl bg-white/5 shadow-md backdrop-blur-none  "
                key={index}
                ref={refP}
              >
                <div className="p-6 flex gap-4">
                  <div className="shrink-0">
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-center"
                      initial={{ opacity: 0 }}
                      animate={isInViewP ? { opacity: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <i className={`text-xl text-red-700 ${value.icon}`} />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{value.title}</h3>
                    <motion.p
                      className="text-muted-foreground text-pretty leading-relaxed text-md"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      {value.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
const features = [
  {
    icon: "bi bi-stars",
    title: "Legendary Comics",
    description:
      "Since 1939, Marvel Comics has created iconic characters like Spider-Man, Iron Man, and the X-Men that have become cultural phenomena.",
  },
  {
    icon: 'bi bi-globe',
    title: "Global Phenomenon",
    description:
      "The MCU has grossed over $30 billion worldwide, making it the highest-grossing film franchise in history.",
  },
  {
    icon: 'bi bi-lightning-charge-fill',
    title: "Infinite Stories",
    description:
      "From comics to movies, TV shows to video games, Marvel continues to expand its universe with new heroes and adventures.",
  },
];

export default HeroSectionThree;
