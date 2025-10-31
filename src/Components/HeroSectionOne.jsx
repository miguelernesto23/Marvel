import React from "react";
import img from "../assets/marvel.jpg";
import { NavLink } from "react-router";

export const HeroSectionOne = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={img}
          alt="Marvel Heroes"
          className="w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 lg:px-8 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Welcome to the <span className="text-red-600">Marvel</span> Universe
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore the epic stories of Earth's mightiest heroes. From the
            Avengers to the X-Men, discover the characters and adventures that
            define the Marvel Universe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NavLink
              to={"/characters"}
              className="border-2 border-red-600 hover:text-white bg-red-600 font-semibold lg:text-lg px-8 py-3 rounded-lg transition duration-300"
            >
             Explore Comics
            </NavLink>
            <NavLink
              to={"/characters"}
              className="border-2 border-red-600 text-red-600 lg:hover:bg-red-600 hover:text-white font-semibold lg:text-lg px-8 py-3 rounded-lg transition duration-300"
            >
              Explore Characters
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};
