import React from 'react';
import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: "Kontakt | M ONE",
  description: "Treten Sie mit uns in Kontakt. Haben Sie Fragen zu unseren Produkten oder wünschen ein Angebot?",
};

export default function KontaktPage() {
  return (
    <div className="pt-24 md:pt-32">
      <ContactForm />
    </div>
  );
}
