import { useEffect, useRef } from "react";

export default function useFocusTrap(active) {
  const ref = useRef();

  useEffect(() => {
    if (!active || !ref.current) return;

    const focusable = ref.current.querySelectorAll(
      "button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();

    const handleKey = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [active]);

  return ref;
}
