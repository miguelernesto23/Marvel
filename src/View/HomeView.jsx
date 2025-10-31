import React from "react";
import { HeroSectionOne } from "../Components/HeroSectionOne";
import HeroSectionThree from "../Components/HeroSectionThree";
import QuotesSection from "../Components/QuotesSection";
import { HistorySection } from "../Components/HistorySection";
import IconicHeroeSection from "../Components/IconicHeroeSection";
import MarvelSection from "../Components/MarvelSection";
export const HomeView = () => {
  return (
    <>
      <HeroSectionOne></HeroSectionOne>
      <MarvelSection></MarvelSection>
      <HeroSectionThree></HeroSectionThree>
      <HistorySection></HistorySection>
      <IconicHeroeSection></IconicHeroeSection>
      <QuotesSection></QuotesSection>
    </>
  );
};
