"use client";

import { useState } from "react";
import { postContact, ApiError } from "@/services/api";
import type { ContactPayload } from "@/types/contact";

const initial: ContactPayload = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      await postContact({
        ...form,
        subject: form.subject?.trim() || undefined,
      });
      setStatus("ok");
      setForm(initial);
    } catch (err) {
      setStatus("err");
      setError(
        err instanceof ApiError ? err.message : "Une erreur est survenue."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-stack form-stack-wide">
      <label className="form-label">
        Nom
        <input
          required
          name="name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="form-input"
        />
      </label>
      <label className="form-label">
        E-mail
        <input
          required
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="form-input"
        />
      </label>
      <label className="form-label">
        Sujet (optionnel)
        <input
          name="subject"
          value={form.subject ?? ""}
          onChange={(e) =>
            setForm((f) => ({ ...f, subject: e.target.value }))
          }
          className="form-input"
        />
      </label>
      <label className="form-label">
        Message
        <textarea
          required
          name="message"
          rows={5}
          value={form.message}
          onChange={(e) =>
            setForm((f) => ({ ...f, message: e.target.value }))
          }
          className="form-input"
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-join btn-join-fit"
      >
        {status === "loading" ? "Envoi…" : "Envoyer"}
      </button>
      {status === "ok" ? (
        <p className="alert-success" role="status">
          Message envoyé. Merci !
        </p>
      ) : null}
      {status === "err" && error ? (
        <p className="alert-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
