import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

const COMMANDS = [
  { group: "Halaman", label: "Home", href: "/" },
  { group: "Halaman", label: "About", href: "/about" },
  { group: "Halaman", label: "Projects", href: "/projects" },
  { group: "Halaman", label: "Publications", href: "/articles" },
  { group: "Kontak", label: "LinkedIn", href: "https://www.linkedin.com/in/akbar-supia-dirja-7071192ba", ext: true },
  { group: "Kontak", label: "GitHub", href: "https://github.com/akbarsupia", ext: true },
  { group: "Kontak", label: "Instagram", href: "https://www.instagram.com/akbarsdrjaa_", ext: true },
  { group: "Kontak", label: "TikTok", href: "https://www.tiktok.com/@akbarr_sdrja", ext: true },
  { group: "Kontak", label: "WhatsApp", href: "https://wa.me/6281386176205", ext: true },
  { group: "Kontak", label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=akbarsupiad20@gmail.com", ext: true },
  { group: "Kontak", label: "Resume (PDF)", href: "/Akbar-Supia-Dirja-CV.pdf", file: true },
];

const CommandPalette = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current && inputRef.current.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const query = q.trim().toLowerCase();
  const items = COMMANDS.filter((c) => !query || c.label.toLowerCase().includes(query));

  const clampIdx = Math.min(idx, Math.max(0, items.length - 1));

  const run = (c) => {
    setOpen(false);
    if (c.ext || c.file) window.open(c.href, "_blank", "noopener");
    else router.push(c.href);
  };

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && items[clampIdx]) {
      run(items[clampIdx]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] bg-dark/60 backdrop-blur-sm flex items-start justify-center pt-[18vh] px-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.96, y: -8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg rounded-2xl border border-dark bg-light shadow-2xl dark:border-light dark:bg-dark"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setIdx(0);
              }}
              onKeyDown={onInputKey}
              placeholder="Cari halaman, proyek, kontak..."
              className="w-full bg-transparent px-5 py-4 text-lg outline-none border-b border-dark/20 dark:border-light/20 placeholder:text-dark/40 dark:placeholder:text-light/40"
            />
            <div className="max-h-80 overflow-y-auto py-2">
              {items.length === 0 && (
                <p className="px-5 py-4 text-sm text-dark/50 dark:text-light/50">
                  Tidak ada hasil.
                </p>
              )}
              {items.map((c, i) => (
                <React.Fragment key={c.label}>
                  {(i === 0 || items[i - 1].group !== c.group) && (
                    <p className="px-5 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-dark/40 dark:text-light/40">
                      {c.group}
                    </p>
                  )}
                  <button
                    onClick={() => run(c)}
                    onMouseEnter={() => setIdx(i)}
                    className={`w-full flex items-center justify-between px-5 py-2.5 text-left text-sm ${
                      i === clampIdx
                        ? "bg-primary text-light dark:bg-primaryDark dark:text-dark"
                        : "text-dark dark:text-light"
                    }`}
                  >
                    <span>{c.label}</span>
                    {c.ext && <span className="text-xs opacity-60">&#8599;</span>}
                  </button>
                </React.Fragment>
              ))}
            </div>
            <p className="px-5 py-2 text-[11px] text-dark/40 dark:text-light/40 border-t border-dark/20 dark:border-light/20">
              &#8593;&#8595; navigasi &#183; Enter buka &#183; Esc tutup
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
