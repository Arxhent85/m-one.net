"use client";

import React from "react";
import Hero from "../components/Hero";
import SketchGrid from "../components/SketchGrid";
import About from "../components/About";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SketchGrid />
      <About />
    </>
  );
}
