
import React from "react";
import CategoryPageWrapper from "../../../components/CategoryPageWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "M ONE | Bau - Silikone & Dichtstoffe",
  description: "Entdecken Sie hochwertige Silikone, Acryle und Montagekleber für Profis. Premium-Qualität für langlebige Ergebnisse.",
};

export default function BauPage() {
  return <CategoryPageWrapper categoryId="bau" />;
}
