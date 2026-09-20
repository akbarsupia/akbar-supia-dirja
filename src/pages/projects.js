import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import { GithubIcon } from "@/components/Icons";
import TransitionEffect from "@/components/TransitionEffect";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";

import project1 from "../../public/images/projects/crypto-screener-cover-image.jpg";
import project2 from "../../public/images/projects/portfolio-cover-image.jpg";
import project3 from "../../public/images/projects/fashion-studio-website.jpg";
import project4 from "../../public/images/projects/agency-website-cover-image.jpg";
import project5 from "../../public/images/projects/nft-collection-website-cover-image.jpg";
import project6 from "../../public/images/projects/devdreaming.jpg";

const FramerImage = motion(Image);

const ImageCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg bg-dark/10 group">
      <img
        src={images[currentIndex]}
        alt={`${title} - Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
      />
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-dark/50 text-light p-2 rounded-full hover:bg-dark/80 transition-colors z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-dark/50 text-light p-2 rounded-full hover:bg-dark/80 transition-colors z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        &#10095;
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10 bg-dark/30 px-3 py-1 rounded-full backdrop-blur-sm">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? "bg-light scale-125" : "bg-light/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectMedia = ({ img, video, carouselImages, title, link }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.muted = true;
      videoEl.volume = 0;

      const handleVolumeChange = () => {
        if (videoEl && !videoEl.muted) {
          videoEl.muted = true;
          videoEl.volume = 0;
        }
      };

      videoEl.addEventListener("volumechange", handleVolumeChange);
      return () => {
        videoEl.removeEventListener("volumechange", handleVolumeChange);
      };
    }
  }, [video]);

  if (carouselImages && carouselImages.length > 0) {
    return <ImageCarousel images={carouselImages} title={title} />;
  }

  if (video) {
    return (
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg bg-dark/5">
        <video
          ref={videoRef}
          src={video}
          className="w-full h-full object-cover rounded-lg"
          autoPlay
          loop
          muted
          playsInline
          controls
          controlsList="novolume"
        />
      </div>
    );
  }

  if (link) {
    return (
      <Link
        href={link}
        target="_blank"
        className="w-full cursor-pointer overflow-hidden rounded-lg block"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </Link>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-lg block">
      <FramerImage
        src={img}
        alt={title}
        className="w-full h-auto"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
      />
    </div>
  );
};

const TiltCard = ({ className = "", children }) => {
  const reduced = useReducedMotion() || false;
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 140, damping: 18, mass: 0.4 });

  if (reduced) return <div className={className}>{children}</div>;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      className={className}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
};

const FeaturedProject = ({ type, title, summary, img, link, github, video, carouselImages }) => {
  return (
    <TiltCard className="col-span-12">
      <article className="w-full flex items-center justify-between rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 relative rounded-br-2xl dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4">
        <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]" />

        <div className="w-1/2 lg:w-full">
          <ProjectMedia img={img} video={video} carouselImages={carouselImages} title={title} link={link} />
        </div>

        <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
          <span className="text-primary font-medium text-xl dark:text-primaryDark xs:text-base">
            {type}
          </span>
          {link ? (
            <Link
              href={link}
              target="_blank"
              className="hover:underline underline-offset-2"
            >
              <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light sm:text-2xl xs:text-xl">
                {title}
              </h2>
            </Link>
          ) : (
            <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light sm:text-2xl xs:text-xl">
              {title}
            </h2>
          )}
          <p className="my-2 font-medium text-dark dark:text-light sm:text-sm">
            {summary}
          </p>
          <div className="mt-2 flex items-center">
            {github && (
              <Link href={github} target="_blank" className="w-10">
                <GithubIcon />
              </Link>
            )}
            {link && (
              <Link
                href={link}
                target="_blank"
                className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base"
              >
                Visit Project
              </Link>
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  );
};

const Project = ({ title, type, img, link, github, video, carouselImages }) => {
  return (
    <TiltCard className="col-span-6 sm:col-span-12">
      <article className="w-full flex flex-col items-center justify-center rounded-2xl border border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light xs:p-4">
        <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]" />

        <div className="w-full">
          <ProjectMedia img={img} video={video} carouselImages={carouselImages} title={title} link={link} />
        </div>

        <div className="w-full flex flex-col items-start justify-between mt-4">
          <span className="text-primary font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base">
            {type}
          </span>
          {link ? (
            <Link
              href={link}
              target="_blank"
              className="hover:underline underline-offset-2"
            >
              <h2 className="my-2 w-full text-left text-2xl font-bold lg:text-xl">
                {title}
              </h2>
            </Link>
          ) : (
            <h2 className="my-2 w-full text-left text-2xl font-bold lg:text-xl dark:text-light">
              {title}
            </h2>
          )}
          <div className="w-full mt-2 flex items-center justify-between">
            {link ? (
              <Link
                href={link}
                target="_blank"
                className="text-lg font-semibold underline md:text-base"
              >
                Visit
              </Link>
            ) : (
              <span className="text-lg font-semibold text-dark/40 dark:text-light/40 md:text-base">
                Private Project
              </span>
            )}
            {github && (
              <Link href={github} target="_blank" className="w-8 md:w-6">
                <GithubIcon />
              </Link>
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  );
};

const FILTERS = ["Semua", "Web", "Data", "Training", "BI"];

const FEATURED_PROJECTS = [
  {
    key: "aseala",
    category: "Web",
    type: "Featured Project - Web Development (2026)",
    title: "Full-Stack Web Development: A'seala Caffe E-Commerce",
    img: project3,
    video: "/images/projects/Aseala Coffe.mp4",
    summary:
      "Pembangunan ekosistem web e-commerce serverless menggunakan React.js dengan integrasi Midtrans Payment Gateway via Firebase Cloud Functions untuk pembayaran digital real-time (QRIS, E-Wallet, VA). Menekan biaya operasional server/hosting hingga Rp 0 dengan arsitektur serverless, serta merancang sistem manajemen data menggunakan Firebase Firestore untuk sinkronisasi otomatis inventaris, pesanan, dan laporan penjualan secara instan.",
    link: "https://asealacoffee.vercel.app/",
    github: "https://github.com/akbarsupia",
  },
  {
    key: "training",
    category: "Training",
    type: "Featured Project - Training & HR Analytics (2026)",
    title:
      "Corporate Looker Studio Training & HR Dashboard @ Perusahaan Ritel Elektronik Nasional",
    img: project6,
    carouselImages: [
      "/images/profile/trainer1.jpg",
      "/images/profile/trainer2.jpg",
      "/images/profile/trainer3.jpg",
      "/images/profile/trainer4.jpg",
    ],
    summary:
      "Merancang dan membawakan workshop Looker Studio berbasis studi kasus HR untuk 15 staf HR Department Perusahaan Ritel Elektronik Nasional di Jakarta. Menyusun kurikulum pelatihan dari konektivitas data dasar hingga visualisasi reporting KPI interaktif. Melatih tim HR mengotomatisasi pembuatan laporan kinerja, turnover rate, absensi, dan rekrutmen karyawan secara mandiri, menghemat puluhan jam kerja administrasi manual mingguan.",
    link: "https://www.instagram.com/p/Da5h_-nTw9G/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    github: "https://github.com/akbarsupia",
  },
];

const PROJECTS = [
  {
    key: "pkbm",
    category: "Web",
    title: "PKBM Jaya Giri - Web Portal & Sistem Informasi Yayasan",
    img: project1,
    video: "/images/projects/project1.mp4",
    summary:
      "Pengembangan website profil resmi untuk Yayasan Pendidikan Non-Formal PKBM Jaya Giri. Berfungsi sebagai pusat informasi pendaftaran peserta didik baru, galeri kegiatan pembelajaran, serta publikasi program pendidikan guna meningkatkan aksesibilitas pendidikan masyarakat.",
    link: "https://pkbm-jaya-giri.web.app/",
    github: "https://github.com/akbarsupia",
    type: "Web Development - Education (2026)",
  },
  {
    key: "fleet",
    category: "Data",
    title: "Dashboard Manajemen Armada & Operasional",
    img: project4,
    video: "/images/projects/Enterprise  Professional Fleet Logistics Operations Dashboard.mp4",
    summary:
      "Dashboard visualisasi data logistik dan pemeliharaan armada transportasi terpadu. Menemukan inefisiensi biaya operasional bengkel hingga 15% melalui analisis pemakaian bahan bakar secara komparatif serta tracking inventaris sparepart.",
    link: "https://datastudio.google.com/reporting/ded7fc76-af1b-4edf-80f9-a462bfebec83",
    github: "https://github.com/akbarsupia",
    type: "Data Analytics - Logistics (2026)",
  },
  {
    key: "retail",
    category: "Data",
    title: "Retail Transaction Performance Dashboard",
    img: project5,
    video: "/images/projects/projectretail.mp4",
    summary:
      "Dashboard analisis performa transaksi ritel komprehensif berbasis Looker Studio. Menyajikan visualisasi pertumbuhan pendapatan, tren penjualan harian/bulanan, efektivitas promosi, serta segmentasi metode pembayaran untuk membantu pengambilan keputusan bisnis retail secara real-time.",
    link: "https://datastudio.google.com/reporting/a87fed1d-7a28-4ba0-96ab-61a6e62b3b95",
    github: "https://github.com/akbarsupia",
    type: "Data Analytics - Finance (2026)",
  },
  {
    key: "distrinesia",
    category: "BI",
    title: "Distrinesia Business Intelligence Dashboard",
    img: project2,
    video: "/images/projects/project3.mp4",
    summary:
      "Membantu UMKM Distrinesia dalam merumuskan keputusan pemasaran strategis berbasis data penjualan historis. Dashboard interaktif ini memvisualisasikan profit margin, tren penjualan musiman, dan segmentasi pasar untuk meningkatkan laba bersih perusahaan.",
    link: "",
    github: "",
    type: "Business Intelligence (2024)",
  },
  {
    key: "rs",
    category: "Web",
    title: "RS Parfume - E-Commerce Web Application",
    img: project1,
    video: "/images/projects/project2.mp4",
    summary:
      "Aplikasi web e-commerce premium untuk brand RS Parfume yang dilengkapi dengan katalog produk interaktif, sistem manajemen keranjang belanja, pemesanan langsung, serta integrasi sistem pembayaran digital yang aman dan seamless.",
    link: "https://website-rs-parfume.web.app/",
    github: "https://github.com/akbarsupia",
    type: "Web Development - E-Commerce (2026)",
  },
  {
    key: "sekolah",
    category: "Data",
    title: "Dashboard Administrasi & Tata Kelola Sekolah",
    img: project4,
    video: "/images/projects/Tata Usaha Dashboard.mp4",
    summary:
      "Sistem dashboard tata kelola terintegrasi untuk Instansi Pemerintah mencakup modul Kepegawaian, Persuratan, Inventaris, Monitoring Kegiatan, dan kepatuhan Reformasi Birokrasi (LHKPN), meningkatkan transparansi administrasi sekolah hingga 40%.",
    link: "https://datastudio.google.com/reporting/bb7ebb6a-ad91-4fdd-b6f9-dde4ddbf9d29",
    github: "https://github.com/akbarsupia",
    type: "Data Analytics - Governance (2026)",
  },
];

const Projects = () => {
  const [active, setActive] = useState("Semua");
  const matches = (c) => active === "Semua" || c === active;
  const featured = FEATURED_PROJECTS.filter((p) => matches(p.category));
  const cards = PROJECTS.filter((p) => matches(p.category));

  return (
    <>
      <Head>
        <title>Akbar Supia Dirja | Projects</title>
        <meta
          name="description"
          content="Proyek-proyek Akbar Supia Dirja - Web Development & Digital Marketing"
        />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Imagination Trumps Knowledge!"
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />

          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  active === f
                    ? "bg-dark text-light dark:bg-light dark:text-dark"
                    : "border border-dark text-dark hover:bg-dark hover:text-light dark:border-light dark:text-light dark:hover:bg-light dark:hover:text-dark"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            {featured.map((p) => (
              <FeaturedProject key={p.key} {...p} />
            ))}
            {cards.map((p) => (
              <Project key={p.key} {...p} />
            ))}
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Projects;
