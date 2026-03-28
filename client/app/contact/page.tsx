import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="main-page">
      <h1 className="page-heading">Contact</h1>
      <p className="page-text">Écrivez-nous via le formulaire ci-dessous.</p>
      <div className="spacer-top-lg">
        <ContactForm />
      </div>
    </main>
  );
}
