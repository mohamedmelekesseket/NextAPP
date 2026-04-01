"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Globe, Map, Phone, ArrowUp } from "lucide-react";
import { ApiError, postContact } from "@/services/api";
import { useToast, ToastPortal } from "@/app/inscrire/Usetoast";

/* ------------------------------------------------------------------ */
/*  Static contact data                                                 */
/* ------------------------------------------------------------------ */
const contactInfo = {
  address: "99 Av. Habib Bourguiba, Tunis, Tunisie",
  phones: ["875 7556 464 765 8", "765 648 567 98"],
  emails: ["info@tamaguit.com"],
  websites: ["tamaguit.org"],
  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.1!2d10.1815!3d36.8190!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef543%3A0xd671924705634432!2sAve%20Habib%20Bourguiba%2C%20Tunis!5e0!3m2!1sen!2stn!4v1700000000000",
};

/* ------------------------------------------------------------------ */
/*  Intersection-observer hook for scroll-reveal                       */
/* ------------------------------------------------------------------ */
function useScrollReveal(options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ================================================================ */
/*  Page Component                                                    */
/* ================================================================ */
export default function ContactPage() {
  const cardsRef = useScrollReveal();
  const formRef  = useScrollReveal();
  const mapRef   = useScrollReveal();
  const { toasts, show, dismiss } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [error, setError] = useState<string | null>(null);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const onChangeField =
    (field: "name" | "email" | "subject" | "message") =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((previous) => ({ ...previous, [field]: event.target.value }));
    };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      await postContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || undefined,
        message: formData.message.trim(),
      });
      setStatus("ok");
      setFormData({ name: "", email: "", subject: "", message: "" });
      show("success", "Message envoye avec succes.");
    } catch (submissionError) {
      setStatus("err");
      const message =
        submissionError instanceof ApiError
          ? submissionError.message
          : "Une erreur est survenue.";
      setError(message);
      show("error", message);
    }
  };

  return (
    <div>
      <ToastPortal toasts={toasts} dismiss={dismiss} />

      {/* ---- Hero ---- */}
      <div className="events-hero">
        <div className="events-hero-triangle" />
        <h1 className="events-hero-title">Contact</h1>
        <p className="events-hero-breadcrumb">TAMAGUIT &nbsp;›&nbsp; Contact</p>
      </div>

      {/* ---- Info Cards ---- */}
      <div className="contact-cards-section" ref={cardsRef}>
        <div className="contact-cards-grid">

          {/* Address */}
          <div className="contact-card">
            <div className="contact-card-icon-wrap">
              <Map size={56} color="#4caf50" strokeWidth={1.5} />
              <div className="contact-card-check">
                <Check size={12} color="white" strokeWidth={2.4} />
              </div>
            </div>
            <h3 className="contact-card-title">Adresse de l'association</h3>
            <p className="contact-card-text">{contactInfo.address}</p>
          </div>

          {/* Phone */}
          <div className="contact-card">
            <div className="contact-card-icon-wrap">
              <Phone size={56} color="#e05070" strokeWidth={1.5} />
              <div className="contact-card-check">
                <Check size={12} color="white" strokeWidth={2.4} />
              </div>
            </div>
            <h3 className="contact-card-title">Numéro de téléphone</h3>
            <p className="contact-card-text">
              {contactInfo.phones.map((p, i) => (
                <span key={i}>{p}<br /></span>
              ))}
            </p>
          </div>

          {/* Online */}
          <div className="contact-card">
            <div className="contact-card-icon-wrap">
              <Globe size={56} color="#e8a020" strokeWidth={1.5} />
              <div className="contact-card-check">
                <Check size={12} color="white" strokeWidth={2.4} />
              </div>
            </div>
            <h3 className="contact-card-title">Notre Contact en ligne</h3>
            <p className="contact-card-text">
              {contactInfo.emails.map((e, i) => (
                <span key={i}>{e}<br /></span>
              ))}
              {contactInfo.websites.map((w, i) => (
                <span key={i}>{w}<br /></span>
              ))}
            </p>
          </div>

        </div>

        {/* Label */}
        <div className="contact-write-label-wrap" style={{ marginTop: "52px" }}>
          <span className="contact-write-label">Écrivez un message</span>
        </div>
      </div>

      {/* ---- Contact Form ---- */}
      <div className="contact-form-section" ref={formRef}>
        <form className="contact-form-wrap" onSubmit={onSubmit}>

          <div className="contact-form-title-wrap">
            <h2 className="contact-form-title">Vous avez des questions&nbsp;?</h2>
            <span className="contact-form-title-line" />
          </div>

          <div className="contact-form-row">
            <div className="contact-form-field">
              <input
                type="text"
                placeholder="Nom Et Prénom"
                value={formData.name}
                onChange={onChangeField("name")}
                required
              />
            </div>
            <div className="contact-form-field">
              <input
                type="email"
                placeholder="Email Addresse"
                value={formData.email}
                onChange={onChangeField("email")}
                required
              />
            </div>
          </div>

          <div className="contact-form-row">
            <div className="contact-form-field">
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={onChangeField("subject")}
              />
            </div>
          </div>

          <div className="contact-form-row">
            <div className="contact-form-field">
              <textarea
                placeholder="Votre Message"
                value={formData.message}
                onChange={onChangeField("message")}
                required
              />
            </div>
          </div>

          <div className="contact-form-submit">
            <button className="contact-submit-btn" type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Envoi..." : "Envoyer"}
            </button>
          </div>
          {status === "err" && error ? (
            <p className="footer-newsletter__msg footer-newsletter__msg--err" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      </div>

      {/* ---- Google Map ---- */}
      <div className="contact-map-wrap" ref={mapRef}>
        <iframe
          src={contactInfo.mapSrc}
          title="Localisation Tamaguit"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* ---- Scroll to top ---- */}
      <button
        className="scroll-top-btn"
        onClick={scrollToTop}
        aria-label="Retour en haut"
      >
        <ArrowUp size={18} strokeWidth={2.5} />
      </button>

    </div>
  );
}