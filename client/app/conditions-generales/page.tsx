import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales | Tamaguit",
  description: "Conditions générales d'utilisation — Tamaguit.",
};

export default function ConditionsGeneralesPage() {
  return (
    <main className="main-page">
      <h1 className="page-heading">Conditions générales</h1>
      <p className="page-text">
        Cette page sera complétée prochainement. Pour toute question, contactez-nous
        à{" "}
        <a href="mailto:info@tamaguit.org">info@tamaguit.org</a>.
      </p>
    </main>
  );
}
