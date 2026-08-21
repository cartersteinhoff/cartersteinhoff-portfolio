"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { ArrowUpRightGlyph } from "@/components/arrow-up-right-glyph";
import { site } from "@/data/site";

type ContactField = "name" | "email" | "projectType" | "message";

type ContactResponse = {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
};

type FormStatus = {
  tone: "idle" | "sending" | "success" | "error";
  message: string;
};

const initialStatus: FormStatus = {
  tone: "idle",
  message: "Your message will be sent directly to Carter. No account required.",
};

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<ContactField, string>>>({});

  function clearFieldError(field: ContactField) {
    if (!fieldErrors[field]) {
      return;
    }

    setFieldErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setFieldErrors({});
    setStatus({ tone: "sending", message: "Sending your message…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          projectType: formData.get("projectType"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });
      const result = (await response.json().catch(() => null)) as ContactResponse | null;

      if (!response.ok || !result?.ok) {
        const nextFieldErrors = result?.fieldErrors ?? {};
        const firstInvalidField = Object.keys(nextFieldErrors)[0] as ContactField | undefined;
        const field = firstInvalidField ? form.elements.namedItem(firstInvalidField) : null;

        setFieldErrors(nextFieldErrors);

        if (field instanceof HTMLElement) {
          field.focus();
        }

        throw new Error(result?.message ?? "Your message could not be sent. Please try again.");
      }

      form.reset();
      setFieldErrors({});
      setStatus({
        tone: "success",
        message: result.message ?? "Message sent. Thanks. Carter will reply directly.",
      });
    } catch (error) {
      setStatus({
        tone: "error",
        message:
          error instanceof Error
            ? error.message
            : "Your message could not be sent. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
      <div className="form-field">
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          minLength={2}
          maxLength={80}
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
          onChange={() => clearFieldError("name")}
          required
        />
        {fieldErrors.name ? (
          <p className="field-error" id="name-error">
            {fieldErrors.name}
          </p>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
          onChange={() => clearFieldError("email")}
          required
        />
        {fieldErrors.email ? (
          <p className="field-error" id="email-error">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="projectType">What service do you need?</label>
        <select
          id="projectType"
          name="projectType"
          defaultValue="Website & product design"
          aria-invalid={fieldErrors.projectType ? true : undefined}
          aria-describedby={fieldErrors.projectType ? "project-type-error" : undefined}
          onChange={() => clearFieldError("projectType")}
        >
          <option>Website &amp; product design</option>
          <option>Full-stack web development</option>
          <option>WordPress &amp; CMS development</option>
          <option>Technical SEO &amp; performance</option>
          <option>AI automation &amp; integrations</option>
          <option>Cloud architecture &amp; delivery</option>
          <option>Not sure yet</option>
        </select>
        {fieldErrors.projectType ? (
          <p className="field-error" id="project-type-error">
            {fieldErrors.projectType}
          </p>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="message">A little context</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          minLength={10}
          maxLength={5000}
          placeholder="What are you hoping to make, and where are you in the process?"
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          onChange={() => clearFieldError("message")}
          required
        />
        {fieldErrors.message ? (
          <p className="field-error" id="message-error">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="form-submit" type="submit" disabled={isSubmitting}>
        <span>{isSubmitting ? "Sending…" : "Start the conversation"}</span>
        <span aria-hidden="true" className="cta-icon">
          <ArrowUpRightGlyph />
        </span>
      </button>
      <p className="form-note" aria-live="polite" data-status={status.tone}>
        {status.message}
        {/* A failure here can be nothing to do with what was typed — the
         * route returns 503 when bot verification is unreachable, and 429
         * when throttled. Neither is actionable, so the error state hands
         * over a route that does not depend on this endpoint at all. */}
        {status.tone === "error" ? (
          <>
            {" "}
            You can also email{" "}
            <a className="form-note-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </>
        ) : null}
      </p>
      <p className="contact-privacy-note">
        See how submitted information is handled in the <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </form>
  );
}
