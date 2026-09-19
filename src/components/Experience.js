import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcon";

const Details = ({ position, company, companyLink, time, address, work }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}&nbsp;
          {companyLink && companyLink !== "#" ? (
            <a
              href={companyLink}
              target="_blank"
              rel="noreferrer"
              className="text-primary capitalize hover:underline dark:text-primaryDark"
            >
              @{company}
            </a>
          ) : (
            <span className="text-primary capitalize dark:text-primaryDark">
              @{company}
            </span>
          )}
        </h3>
        <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {address}
        </span>
        <p className="font-medium w-full md:text-sm">{work}</p>
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        Experience
      </h2>
      <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light md:w-[2px] md:left-[30px] xs:left-[20px]"
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          <Details
            position="Corporate Trainer Looker Studio"
            company="Perusahaan Retail Nasional"
            companyLink="#"
            time="2026"
            address="On-site"
            work="Merancang dan membawakan workshop Looker Studio berbasis studi kasus HR, mulai dari penyusunan materi dan dataset simulasi hingga pendampingan peserta dalam membangun dashboard reporting, KPI, visualisasi data, dan filter interaktif."
          />
          <Details
            position="Freelance Data Visualization Consultant / Looker Studio Trainer"
            company="Self Employed"
            companyLink="#"
            time="2026"
            address="Remote / Hybrid"
            work="Merancang dashboard 'Collection Insights & Debt Management' di Looker Studio berbasis 500+ baris data simulasi, sekaligus memberikan pelatihan privat (hands-on) agar klien mampu mengelola dashboard laporan penagihan secara mandiri."
          />
          <Details
            position="Full-Stack Web Developer"
            company="A'seala Caffe"
            companyLink="https://asealacoffee.vercel.app/"
            time="2026"
            address="Freelance / Remote"
            work="Membangun ekosistem web e-commerce serverless menggunakan React.js dengan integrasi Midtrans Payment Gateway via Firebase Cloud Functions untuk pembayaran digital real-time (QRIS, E-Wallet, VA). Merancang sistem manajemen data terpusat menggunakan Firebase Firestore untuk sinkronisasi inventaris, pesanan, dan laporan penjualan."
          />
          <Details
            position="Business Intelligence Intern"
            company="Distrinesia"
            companyLink="#"
            time="2024"
            address="Internship"
            work="Membantu Founder merancang dashboard analisis interaktif menggunakan Looker Studio untuk mendukung pengambilan keputusan bisnis berdasarkan data historis perusahaan."
          />
          <Details
            position="Divisi People Organization Development"
            company="Bisnis Digital UIKA"
            companyLink="#"
            time="2024"
            address="Bogor"
            work="Berkontribusi dalam kegiatan pengembangan organisasi, pelatihan, dan program internal mahasiswa Bisnis Digital UIKA."
          />
          <Details
            position="Koordinator Divisi PDDL & Acara"
            company="Field Trip Cyber University & BUBARAN DIGSITY"
            companyLink="#"
            time="2024"
            address="Bogor"
            work="Mengelola koordinasi peserta, logistik, kegiatan lapangan, publikasi, dokumentasi, dekorasi, perlengkapan (PDDL), dan pelaksanaan acara secara menyeluruh."
          />
        </ul>
      </div>
    </div>
  );
};

export default Experience;
