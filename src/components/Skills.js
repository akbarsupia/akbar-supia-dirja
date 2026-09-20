import React from "react";
import { motion } from "framer-motion";

const SKILLS = [
  { name: "Looker Studio", x: "0vw", y: "-12vw" },
  { name: "Analisis Data", x: "-22vw", y: "-2vw" },
  { name: "Visualisasi Data", x: "22vw", y: "-2vw" },
  { name: "React.js", x: "-15vw", y: "12vw" },
  { name: "Node.js", x: "15vw", y: "12vw" },
  { name: "Firebase", x: "0vw", y: "20vw" },
  { name: "Firestore", x: "-18vw", y: "-12vw" },
  { name: "Cloud Functions", x: "18vw", y: "-12vw" },
  { name: "Canva", x: "-30vw", y: "6vw" },
  { name: "Microsoft Office", x: "30vw", y: "6vw" },
  { name: "Komunikasi & Presentasi", x: "-25vw", y: "-18vw" },
  { name: "Koordinasi Proyek", x: "25vw", y: "-18vw" },
];

const Skill = ({ name, x, y }) => {
  return (
    <motion.div
      className="flex items-center justify-center rounded-full font-semibold bg-dark text-light py-3 px-6 shadow-dark cursor-pointer absolute dark:text-dark dark:bg-light lg:py-2 lg:px-4"
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y, transition: { duration: 1.5 } }}
      viewport={{ once: true }}
    >
      {name}
    </motion.div>
  );
};

const Skills = () => {
  return (
    <>
      <h2 className="font-bold text-8xl mt-64 w-full text-center md:text-6xl md:mt-32">
        Skills
      </h2>

      {/* Circular layout (tablet & up) */}
      <div className="w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark lg:h-[80vh] lg:bg-circularLightLg lg:dark:bg-circularDarkLg md:hidden">
        <motion.div
          className="flex items-center justify-center rounded-full font-semibold bg-dark text-light p-8 shadow-dark cursor-pointer dark:text-dark dark:bg-light lg:p-6"
          whileHover={{ scale: 1.05 }}
        >
          Web
        </motion.div>
        {SKILLS.map((skill) => (
          <Skill key={skill.name} {...skill} />
        ))}
      </div>

      {/* Simple list layout (mobile) */}
      <div className="hidden md:flex w-full flex-wrap items-center justify-center gap-3 mt-12 px-2">
        {SKILLS.map((skill) => (
          <motion.span
            key={skill.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-full bg-dark text-light px-4 py-2 text-sm font-semibold dark:bg-light dark:text-dark"
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </>
  );
};

export default Skills;
