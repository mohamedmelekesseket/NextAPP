"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { postSubscribe, ApiError } from "@/services/api";
import { useToast, ToastPortal } from "@/app/inscrire/Usetoast";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const { toasts, show, dismiss } = useToast();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await postSubscribe({
        email: email.trim(),
        acceptsNewsletter: true,
      });
      setStatus("ok");
      setEmail("");
      show("success", "Merci ! Votre inscription a bien ete enregistree.");
    } catch (err) {
      setStatus("err");
      show(
        "error",
        err instanceof ApiError ? err.message : "Une erreur est survenue."
      );
    }
  }

  return (
    <>
      <ToastPortal toasts={toasts} dismiss={dismiss} />
      <form className="footer-newsletter" onSubmit={handleSubmit}>
        <div className="footer-newsletter__field">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            autoComplete="email"
            className="footer-newsletter__input"
            aria-label="Adresse e-mail"
          />
          <Mail className="footer-newsletter__input-icon" aria-hidden size={18} />
        </div>
        <button
          type="submit"
          className="footer-newsletter__btn"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Envoi…" : "S'ABONNER MAINTENANT"}
        </button>
      </form>
    </>
  );
}
