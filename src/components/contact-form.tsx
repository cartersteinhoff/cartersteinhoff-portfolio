"use client";

import { type FormEvent, useState } from "react";
import { site } from "@/data/site";

export function ContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const projectType = String(formData.get("projectType") ?? "Not specified");
    const message = String(formData.get("message") ?? "").trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${email}`, `Project type: ${projectType}`, "", message].join("\n"),
    );

    setStatus("Your email app should open with the message ready to send.");
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="form-field">
        <label htmlFor="projectType">What are we making?</label>
        <select id="projectType" name="projectType" defaultValue="A new website">
          <option>A new website</option>
          <option>A product experience</option>
          <option>A visual refresh</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="message">A little context</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="What are you hoping to make, and where are you in the process?"
          required
        />
      </div>
      <button className="form-submit" type="submit">
        <span>Start the conversation</span>
        <span aria-hidden="true">↗</span>
      </button>
      <p className="form-note" aria-live="polite">
        {status || "Submitting opens your email app—nothing is stored on this website."}
      </p>
    </form>
  );
}
