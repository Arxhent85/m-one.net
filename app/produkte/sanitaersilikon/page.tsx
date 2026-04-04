
import React from "react";
import ProductPageWrapper from "../../../components/ProductPageWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "M ONE | Sanitär Silikon Premium - Höchste Schimmelresistenz",
  description: "Das M ONE Sanitär Silikon Premium setzt neue Maßstäbe für Fugen in Bad und Küche. Antibakteriell, UV-beständig und extrem langlebig.",
};

export default function SanitaerSilikonPage() {
  // We'll pass the product name or ID to the wrapper
  return <ProductPageWrapper productName="Premium Silicon" categoryId="bau" />;
}
