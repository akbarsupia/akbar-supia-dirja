import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const ProfilePhotoHover = ({ photoLight, photoDark, astro, alt = "", className = "", sizes }) => {
  const reduced = useReducedMotion() || false;
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const r = useMotionValue(140);
  const sx = useSpring(mx, { stiffness: 320, damping: 30, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 320, damping: 30, mass: 0.5 });

  const clipPath = useMotionTemplate`circle(${r}px at ${sx}px ${sy}px)`;
  const glowX = useMotionTemplate`calc(${sx}px - ${r}px / 2)`;
  const glowY = useMotionTemplate`calc(${sy}px - ${r}px / 2)`;
  const glowSize = useMotionTemplate`${r}px`;

  const handleEnter = (e) => {
    if (reduced) return;
    setActive(true);
    const rect = ref.current.getBoundingClientRect();
    r.set(Math.min(rect.width, rect.height) * 0.34);
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const handleMove = (e) => {
    if (reduced) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const handleLeave = () => setActive(false);

  return (
    <div
      ref={ref}
      className={`group relative z-10 inline-block cursor-none rounded-2xl ${className}`}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <Image
        src={photoLight}
        alt={alt}
        className="block w-auto h-auto max-h-[70vh] max-w-[460px] rounded-2xl object-contain dark:hidden"
        priority
        sizes={sizes}
      />
      <Image
        src={photoDark}
        alt={alt}
        className="hidden dark:block w-auto h-auto max-h-[70vh] max-w-[460px] rounded-2xl object-contain"
        priority
        sizes={sizes}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        style={{ clipPath }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <div className="absolute inset-0 rounded-2xl bg-dark dark:bg-light" />
        <Image
          src={astro}
          alt=""
          fill
          sizes={sizes}
          className="rounded-2xl object-contain -translate-y-[5%]"
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full border border-primary/60 dark:border-primaryDark/60"
        style={{
          left: glowX,
          top: glowY,
          width: glowSize,
          height: glowSize,
          boxShadow: "0 0 30px rgba(88, 230, 217, 0.25)",
        }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.1 }}
        transition={{ duration: 0.35, ease: EASE }}
      />
    </div>
  );
};

export default ProfilePhotoHover;
