"use client";

import { useState } from "react";
import { postSubscribe, ApiError } from "@/services/api";
import type { SubscribePayload } from "@/types/subscribe";

export default function SubscribeForm() {
  const [form, setForm] = useState<SubscribePayload>({
    email: "",
    firstName: "",
    acceptsNewsletter: true,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      await postSubscribe({
        email: form.email.trim(),
        firstName: form.firstName?.trim() || undefined,
        acceptsNewsletter: form.acceptsNewsletter,
      });
      setStatus("ok");
      setForm({ email: "", firstName: "", acceptsNewsletter: true });
    } catch (err) {
      setStatus("err");
      setError(
        err instanceof ApiError ? err.message : "Une erreur est survenue."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-stack form-stack-narrow">
      <label className="form-label">
        Prénom (optionnel)
        <input
          name="firstName"
          value={form.firstName ?? ""}
          onChange={(e) =>
            setForm((f) => ({ ...f, firstName: e.target.value }))
          }
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
      <label className="form-check">
        <input
          type="checkbox"
          checked={!!form.acceptsNewsletter}
          onChange={(e) =>
            setForm((f) => ({ ...f, acceptsNewsletter: e.target.checked }))
          }
        />
        J&apos;accepte de recevoir des informations.
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-join btn-join-fit"
      >
        {status === "loading" ? "Inscription…" : "S'inscrire"}
      </button>
      {status === "ok" ? (
        <p className="alert-success" role="status">
          Inscription enregistrée. Merci !
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
