"use client";

import { ChevronDown, Mail } from "lucide-react";
import { useState } from "react";
import type { ContactEntry } from "@/src/config/site";

export function ContactCard({ id, title, description, email }: ContactEntry) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<"idle" | "pending" | "copied" | "error">("idle");
  const panelId = `${id}-panel`;

  async function copyEmail() {
    if (status === "pending") return;
    setStatus("pending");
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="contact-card" data-expanded={expanded}>
      <button
        className="link-card contact-toggle"
        id={id}
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded(!expanded)}
      >
        <span className="link-icon"><Mail size={20} strokeWidth={1.75} aria-hidden="true" /></span>
        <span className="link-copy">
          <span className="link-title">{title}</span>
          {description && <span className="link-description">{description}</span>}
        </span>
        <ChevronDown className="link-arrow contact-chevron" size={17} aria-hidden="true" />
      </button>
      <div className="contact-panel" id={panelId} inert={!expanded}>
        <div className="contact-panel-clip">
          <div className="contact-content">
            <p className="contact-email">{email}</p>
            <button className="action contact-copy" type="button" onClick={copyEmail} aria-disabled={status === "pending"}>
              {status === "copied" ? "Copied!" : "Copy email address"}
            </button>
            <p role="status" className={status === "error" ? "copy-feedback" : "sr-only"}>
              {status === "error" && "Select and copy the email address."}
              {status === "copied" && "Email address copied to the clipboard."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactShortcut({ contactId }: { contactId: string }) {
  function showContact() {
    const toggle = document.getElementById(contactId);
    if (toggle?.getAttribute("aria-expanded") === "false") toggle.click();
    toggle?.focus();
  }

  return (
    <button type="button" onClick={showContact} aria-label="Show business email">
      <Mail size={18} strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
