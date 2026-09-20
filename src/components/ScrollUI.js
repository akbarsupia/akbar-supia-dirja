import React, { useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

const ScrollUI = () => {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion() || false;
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => setShow(v > 0.08));

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-gradient-to-r from-primary to-primaryDark"
        style={{ scaleX: scrollYProgress }}
      />
      <AnimatePresence>
        {show && (
          <motion.button
            key="backtotop"
            onClick={scrollTop}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
            aria-label="Kembali ke atas"
            className="fixed bottom-6 right-6 md:bottom-32 md:right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-dark text-light shadow-lg dark:bg-light dark:text-dark hover:bg-primary hover:text-light dark:hover:bg-primaryDark dark:hover:text-dark"
          >
            &#8593;
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollUI;
