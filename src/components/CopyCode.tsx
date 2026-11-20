"use client";

import { useEffect, useRef, useState } from "react";

export function CopyCode({ code, brand }: { code: string; brand: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const reset = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(reset.current), []);

  async function copy() {
    clearTimeout(reset.current);
    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
      reset.current = setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
    }
  }

  const label = status === "copied" ? "Copied!" : "Copy Code";

  return (
    <>
      <button className="action copy-button" type="button" onClick={copy} aria-label={`${label} for ${brand}`}>
        {label}
      </button>
      <span role="status" className={status === "error" ? "copy-feedback" : "sr-only"}>
        {status === "copied" && `Copied the code for ${brand}.`}
        {status === "error" && "Couldn’t copy automatically. Select the code above to copy it manually."}
      </span>
    </>
  );
}
