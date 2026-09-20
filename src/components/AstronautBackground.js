import React, { useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const CloudSVG = ({ className = "" }) => (
  <svg
    viewBox="0 0 120 60"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-full h-auto ${className}`}
  >
    <path d="M28 47a11 11 0 0 1 0-22 14 14 0 0 1 27-4 10 10 0 0 1 10 26Z" />
  </svg>
);

const SunSVG = ({ className = "" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="#F5B301"
    strokeWidth="2.5"
    strokeLinecap="round"
    className={`w-full h-auto ${className}`}
  >
    <circle cx="32" cy="32" r="13" fill="#F5B301" fillOpacity="0.25" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <line
        key={deg}
        x1="32"
        y1="14"
        x2="32"
        y2="6"
        transform={`rotate(${deg} 32 32)`}
      />
    ))}
  </svg>
);

const MoonSVG = ({ className = "" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="#E6E6E6"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-full h-auto ${className}`}
  >
    <circle cx="32" cy="32" r="20" fill="#E6E6E6" fillOpacity="0.12" />
    <circle cx="25" cy="26" r="4.5" />
    <circle cx="38" cy="39" r="5.5" />
    <circle cx="35" cy="21" r="2.5" />
    <circle cx="22" cy="38" r="2" />
  </svg>
);

const RocketSVG = ({ className = "" }) => (
  <svg viewBox="0 0 64 44" fill="none" className={`w-full h-auto ${className}`}>
    <path d="M12 22 L1 12 L5 22 L1 32 Z" fill="#F59E0B" />
    <path
      d="M16 13 L9 4 L24 11 Z"
      fill="#C026A3"
      stroke="#1b1b1b"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M16 31 L9 40 L24 33 Z"
      fill="#C026A3"
      stroke="#1b1b1b"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M12 22 Q12 11 26 11 L40 11 Q58 11 58 22 Q58 33 40 33 L26 33 Q12 33 12 22 Z"
      fill="#F5F5F5"
      stroke="#1b1b1b"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M58 22 Q58 11 42 11 L47 22 L42 33 Q58 33 58 22 Z" fill="#C026A3" />
    <rect x="24" y="16" width="4" height="12" fill="#C026A3" />
    <circle cx="37" cy="22" r="6" fill="#14B8A6" stroke="#1b1b1b" strokeWidth="2" />
  </svg>
);

const FloatingItem = ({
  sx,
  sy,
  depth,
  reduced,
  className = "",
  duration = 9,
  distance = 14,
  tilt = 5,
  delay = 0,
  children,
}) => {
  const x = useTransform(sx, (v) => (reduced ? 0 : v * depth));
  const y = useTransform(sy, (v) => (reduced ? 0 : v * depth));

  return (
    <motion.div style={{ x, y }} className={`absolute ${className}`}>
      <motion.div
        animate={
          reduced
            ? undefined
            : { y: [0, -distance, 0], rotate: [-tilt, tilt, -tilt] }
        }
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const STARS = [
  { top: "18%", left: "10%", size: 4, delay: 0, depth: 12 },
  { top: "30%", left: "80%", size: 3, delay: 1.2, depth: 18 },
  { top: "70%", left: "20%", size: 3, delay: 0.6, depth: 10 },
  { top: "82%", left: "62%", size: 5, delay: 1.8, depth: 22 },
  { top: "12%", left: "45%", size: 3, delay: 2.4, depth: 14 },
  { top: "52%", left: "93%", size: 4, delay: 0.9, depth: 16 },
  { top: "64%", left: "7%", size: 3, delay: 3, depth: 12 },
  { top: "88%", left: "86%", size: 3, delay: 1.5, depth: 18 },
];

const AstronautBackground = () => {
  const reduced = useReducedMotion() || false;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 40, damping: 20, mass: 0.6 });

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: coarse)");

    if (reduced || pointerQuery.matches) return;

    const handleMove = (event) => {
      mx.set(event.clientX / window.innerWidth - 0.5);
      my.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [mx, my, reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Orbit arc (dark mode) */}
      <FloatingItem
        sx={sx}
        sy={sy}
        depth={10}
        reduced={reduced}
        className="hidden dark:block -top-24 -right-24 w-[520px] text-primaryDark opacity-[0.12]"
        duration={16}
        distance={10}
        tilt={2}
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-auto">
          <ellipse
            cx="100"
            cy="100"
            rx="92"
            ry="60"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 12"
            transform="rotate(-18 100 100)"
          />
        </svg>
      </FloatingItem>

      {/* Stars (dark mode) */}
      {STARS.map((star, index) => (
        <FloatingItem
          key={index}
          sx={sx}
          sy={sy}
          depth={star.depth}
          reduced={reduced}
          className="hidden dark:block"
          duration={5 + star.delay}
          distance={4}
          tilt={0}
          delay={star.delay}
        >
          <motion.span
            className="block rounded-full bg-primaryDark"
            style={{ width: star.size, height: star.size }}
            animate={reduced ? undefined : { opacity: [0.2, 0.7, 0.2] }}
            transition={{
              duration: 4 + star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </FloatingItem>
      ))}

      {/* Sun (light mode) / Moon (dark mode) */}
      <div className="absolute top-[9%] left-[6%] w-24 opacity-70 sm:w-16">
        <SunSVG className="dark:hidden" />
        <MoonSVG className="hidden dark:block" />
      </div>

      {/* Rocket with astronaut flying across the screen */}
      {/* Rocket with astronaut: flies left -> right */}
      <div className="animate-rocket absolute top-[16%] left-0 w-44 sm:w-28">
        <div className="-scale-x-100">
          <Image
            src="/images/rocket.png"
            alt=""
            width={128}
            height={128}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Rocket: flies right -> left */}
      <div className="animate-rocket-reverse absolute bottom-[14%] left-0 w-32 sm:w-20">
        <div className="-scale-x-100">
          <RocketSVG />
        </div>
      </div>

      {/* Clouds (light mode) */}
      <FloatingItem
        sx={sx}
        sy={sy}
        depth={22}
        reduced={reduced}
        className="dark:hidden top-[40%] -left-20 w-[420px] text-slate-300 opacity-70"
        duration={14}
        distance={10}
        tilt={2}
      >
        <CloudSVG />
      </FloatingItem>
      <FloatingItem
        sx={sx}
        sy={sy}
        depth={30}
        reduced={reduced}
        className="dark:hidden -bottom-12 -right-10 w-[340px] text-slate-300 opacity-60"
        duration={16}
        distance={12}
        tilt={2}
        delay={1}
      >
        <CloudSVG />
      </FloatingItem>
      <FloatingItem
        sx={sx}
        sy={sy}
        depth={16}
        reduced={reduced}
        className="dark:hidden sm:hidden top-[8%] right-[20%] w-[190px] text-slate-300 opacity-50"
        duration={12}
        distance={8}
        tilt={3}
        delay={0.6}
      >
        <CloudSVG />
      </FloatingItem>
    </div>
  );
};

export default AstronautBackground;


