import { useEffect, useRef } from "react";
import SidebarContent from "./SidebarContent";
import useFocusTrap from "../Hooks/focusTrap";
const MobileSidebar = ({ isOpen, onClose }) => {
  // FocusTrap: Confines keyboard navigation to sidebar links when menu is open
  const sidebarRef = useFocusTrap(isOpen);

  // Close sidebar when Escape key is pressed (standard menu behavior)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  return (
    // first the window sidebar didn't work , then pointer-events-none was the solution. this bug introduced me a browser concept called Hit Testing!
    <div
      className={
        "fixed inset-0 z-20 " +
        (isOpen ? "pointer-events-auto" : "pointer-events-none")
      }
    >
      {/* Backdrop: Click outside sidebar to close (common mobile UX pattern) */}
      <div
        onClick={onClose}
        className={
          " bg-black w-full h-screen transition-opacity duration-300 " +
          (isOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none")
        }
      ></div>
      {/* SideBar with focus trap and dialog semantics for accessibility */}
      <aside
        ref={sidebarRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={
          "absolute left-0 top-0 flex w-60 shrink-0 z-50 h-full transition-transform duration-300 ease-in-out " +
          (isOpen ? "translate-x-0" : "-translate-x-full")
        }
        onClick={(e) => e.stopPropagation()}
      >
        <SidebarContent onNavigate={onClose} />
        {/* Close button: Pressing Escape also closes menu for keyboard users */}
        <button
          className="absolute top-4 right-4 text-black hover:bg-black/70 p-1 cursor-pointer rounded-full z-30"
          onClick={onClose}
          aria-label="Close menu"
        >
          X
        </button>
      </aside>
    </div>
  );
};
export default MobileSidebar;
