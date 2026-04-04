
import React from "react";
import CategoryPageWrapper from "../../../components/CategoryPageWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "M ONE | Service & KFZ - Wartungssprays",
  description: "Hochleistung für Maschinen und Motoren. Von Bremsenreiniger bis Fettspray – Zuverlässigkeit und Schutz für Ihre Technik.",
};

export default function ServicePage() {
  return <CategoryPageWrapper categoryId="service" />;
}
