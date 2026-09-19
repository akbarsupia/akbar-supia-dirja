import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import AnimatedNumbers from "@/components/AnimatedNumbers";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import TransitionEffect from "@/components/TransitionEffect";
import profilePic from "../../public/images/profile/Foto Akbar.jpeg";

const about = () => {
  return (
    <>
      <Head>
        <title>Akbar Supia Dirja | About</title>
        <meta
          name="description"
          content="Tentang Akbar Supia Dirja - Mahasiswa Bisnis Digital, Web Developer & Digital Marketing"
        />
      </Head>
      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Passion Fuels Purpose!"
            className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />
          <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
            <div className="col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
                Biography
              </h2>
              <p className="font-medium">
                Hai, saya Akbar Supia Dirja, seorang Mahasiswa Bisnis Digital di Universitas Ibn Khaldun (UIKA) Bogor yang berfokus sebagai Analis Data & Pengembang Web. Dengan pengalaman merancang dashboard interaktif Looker Studio untuk berbagai sektor (pemerintahan, pendidikan, transportasi, dan UMKM), saya terbiasa menyederhanakan data kompleks menjadi visual yang mudah dipahami demi mendukung pengambilan keputusan strategis.
              </p>
              <p className="my-4 font-medium">
                Saya telah menangani lebih dari 5 proyek klien nyata dan terbiasa berkomunikasi dengan berbagai stakeholder. Selain itu, saya juga memiliki keahlian di bidang pengembangan web full-stack, seperti membangun ekosistem e-commerce serverless terintegrasi payment gateway.
              </p>
              <p className="font-medium">
                Saya selalu terbuka untuk kolaborasi, pelatihan internal, dan pengembangan kapasitas tim di bidang Business Intelligence dan pengembangan web. Saya berkomitmen untuk memberikan hasil kerja terbaik yang berorientasi pada kebutuhan pengguna dan efisiensi operasional.
              </p>
            </div>

            <div className="col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light xl:col-span-4 md:order-1 md:col-span-8">
              <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />
              <Image
                src={profilePic}
                alt="Akbar Supia Dirja"
                className="w-full h-auto rounded-2xl"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3">
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumbers value={5} />+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  satisfied clients
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumbers value={8} />+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  projects completed
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumbers value={2} />+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  years of experience
                </h2>
              </div>
            </div>
          </div>
          <Skills />
          <Experience />
          <Education />
        </Layout>
      </main>
    </>
  );
};

export default about;
