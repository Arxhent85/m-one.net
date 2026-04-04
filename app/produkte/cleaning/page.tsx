
import React from "react";
import CategoryPageWrapper from "../../../components/CategoryPageWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "M ONE | Cleaning - Reinigungsmittel",
  description: "Hochwirksame Industrie- und Spezialreiniger für Profis. Die Basis für meisterhafte Arbeit.",
};

export default function CleaningPage() {
  return <CategoryPageWrapper categoryId="cleaning" />;
}
