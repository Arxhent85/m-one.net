
import React from "react";
import SketchGrid from "../../components/SketchGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "M ONE | Produktübersicht - Unsere Produktlinien",
  description: "Erfahren Sie mehr über unsere Produktlinien: BAU, SERVICE, COLORS und CLEANING. Qualität Made in Germany.",
};

export default function ProduktePage() {
  return (
    <div className="pt-20">
      <SketchGrid />
    </div>
  );
}
