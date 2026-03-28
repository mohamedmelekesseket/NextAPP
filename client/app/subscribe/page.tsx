import SubscribeForm from "@/components/SubscribeForm";

export default function SubscribePage() {
  return (
    <main className="main-page">
      <h1 className="page-heading">Inscription</h1>
      <p className="page-text">Inscrivez-vous à la newsletter.</p>
      <div className="spacer-top-lg">
        <SubscribeForm />
      </div>
    </main>
  );
}
