import React from "react";
import Image from "next/image";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";

export const AstronautArt = ({ className = "" }) => (
  <Image
    src="/images/astronaut.png"
    alt=""
    width={480}
    height={481}
    className={`w-full h-auto dark:invert ${className}`}
  />
);

export const PeekingAstronaut = ({
  className = "",
  duration = 9,
  distance = 10,
  tilt = 6,
  delay = 0,
}) => {
  const reduced = useReducedMotion() || false;
  const controls = useAnimationControls();

  const handleClick = () => {
    if (reduced) return;
    controls.set({ rotate: 0 });
    controls.start({
      rotate: 360,
      transition: { duration: 1.1, ease: "easeInOut" },
    });
  };

  return (
    <motion.div
      aria-hidden="true"
      className={`absolute z-20 ${className}`}
      animate={
        reduced ? undefined : { y: [0, -distance, 0], rotate: [-tilt, tilt, -tilt] }
      }
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        animate={controls}
        onClick={handleClick}
        className="pointer-events-auto cursor-pointer w-full"
      >
        <AstronautArt className="pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

export default PeekingAstronaut;
