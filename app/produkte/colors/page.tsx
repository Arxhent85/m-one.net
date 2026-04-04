
import React from "react";
import CategoryPageWrapper from "../../../components/CategoryPageWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "M ONE | Colors - Lacksprays & Farben",
  description: "Entdecken Sie unsere Felgensilber, Haftgrund und Hochtemperatur-Lacke. Brillanz bis tief in die Fuge.",
};

export default function ColorsPage() {
  return <CategoryPageWrapper categoryId="colors" />;
}
