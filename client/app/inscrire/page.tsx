"use client";

import { useState } from "react";
import { User, Mail, Phone, Users, ArrowUp, Play } from "lucide-react";
import { ApiError, postVolunteer } from "@/services/api";
import { useToast, ToastPortal } from "./Usetoast";

const fields = [
  { id: "name",  placeholder: "Entrez votre nom",   icon: User,  type: "text"  },
  { id: "email", placeholder: "Entrez votre email",  icon: Mail,  type: "email" },
  { id: "phone", placeholder: "Entrez votre phone",  icon: Phone, type: "tel"   },
];

export default function SubscribePage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const { toasts, show, dismiss } = useToast();

  const onChangeField =
    (field: "name" | "email" | "phone") =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postVolunteer({
        name:  formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
      });
      setFormData({ name: "", email: "", phone: "" });
      show("success", "Merci ! Votre demande a été envoyée. Nous vous contacterons bientôt.");
    } catch (err) {
      show(
        "error",
        err instanceof ApiError ? err.message : "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Toast portal ── */}
      <ToastPortal toasts={toasts} dismiss={dismiss} />

      {/* ── Hero ── */}
      <div className="events-hero">
        <div className="events-hero-triangle" />
        <h1 className="events-hero-title">Our Team</h1>
        <p className="events-hero-breadcrumb">TAMAGUIT &gt; Our Team</p>
      </div>

      {/* ── Form section ── */}
      <section className="vol-section">
        <div className="vol-inner">

          {/* Left */}
          <div className="vol-left">
            <div className="vol-badge">Rejoignez-nous</div>
            <h1 className="vol-title">
              Devenez un fier<br />
              <span>bénévole</span>
            </h1>

            <form className="vol-fields" onSubmit={onSubmit}>
              {fields.map(({ id, placeholder, icon: Icon, type }) => (
                <div className="field-wrap" key={id}>
                  <input
                    className="field-input"
                    type={type}
                    placeholder={placeholder}
                    value={formData[id as keyof typeof formData]}
                    onChange={onChangeField(id as "name" | "email" | "phone")}
                    required={id !== "phone"}
                  />
                  <Icon className="field-icon" size={18} strokeWidth={1.8} />
                </div>
              ))}

              <button className="vol-btn" type="submit" disabled={loading}>
                <Users size={18} strokeWidth={2} />
                {loading ? "Envoi…" : "Postuler ici"}
              </button>
            </form>
          </div>

          {/* Right / Video */}
          <div className="vol-right">
            <div className="video-card">
              <div className="video-placeholder" />
              <div className="video-play">
                <Play size={26} fill="white" strokeWidth={0} />
              </div>
              <div className="video-caption">
                <div className="caption-name">Mohsen Esseket</div>
                <div className="caption-role">President of Tamaguit</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Scroll-to-top FAB */}
      <button
        className="fab-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Retour en haut"
      >
        <ArrowUp size={20} strokeWidth={2.5} />
      </button>
    </>
  );
}