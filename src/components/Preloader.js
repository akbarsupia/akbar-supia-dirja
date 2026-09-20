import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

const Preloader = () => {
  const reduced = useReducedMotion() || false;
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduced ? 500 : 1400);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-light dark:bg-dark"
        >
          <div className="relative w-32 h-32 flex items-center justify-center">
            <span className="text-5xl font-bold text-dark dark:text-light">ASD</span>
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary dark:border-primaryDark animate-spin" />
          </div>

          <Image
            src="/images/astronaut.png"
            alt=""
            width={96}
            height={96}
            className="h-16 w-16 dark:invert"
          />

          <div className="w-48 h-1 overflow-hidden rounded-full bg-dark/15 dark:bg-light/15">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primaryDark"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: reduced ? 0.4 : 1.2, ease: "easeInOut" }}
            />
          </div>

          <div className="animate-rocket absolute top-[28%] left-0 w-16 opacity-80">
            <Image
              src="/images/rocket.png"
              alt=""
              width={128}
              height={128}
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
