import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import { LinkArrow } from "@/components/Icons";
import TransitionEffect from "@/components/TransitionEffect";
import PeekingAstronaut from "@/components/Astronaut";
import ProfilePhotoHover from "@/components/ProfilePhotoHover";
import photoLight from "../../public/images/profile/foto akbar kameja hitam.PNG";
import photoDark from "../../public/images/profile/Foto akbar kameja putih.PNG";
import astroPhoto from "../../public/images/profile/Foto Astronout.PNG";
import lightBulb from "../../public/images/svgs/miscellaneous_icons_1.svg";

export default function Home() {
  return (
    <>
      <Head>
        <title>Akbar Supia Dirja | Portfolio</title>
        <meta
          name="description"
          content="Portfolio website Akbar Supia Dirja - Mahasiswa Bisnis Digital, Web Developer & Digital Marketing Enthusiast"
        />
      </Head>
      <TransitionEffect />
      <main className="relative flex items-center text-dark w-full min-h-screen dark:text-light">
        <Layout className="pt-0 md:pt-16 sm:pt-8">
          <div className="flex items-center justify-between w-full lg:flex-col">
            <div className="w-1/2 lg:w-full flex items-center justify-center">
              <div className="relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light sm:p-4">
                <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />
                <ProfilePhotoHover
                  photoLight={photoLight}
                  photoDark={photoDark}
                  astro={astroPhoto}
                  alt="Akbar Supia Dirja"
                  className="mx-auto w-full h-auto max-h-[70vh] max-w-[460px]"
                  sizes="(max-width: 1024px) 50vw, 100vw"
                />
                <PeekingAstronaut
                  className="bottom-full right-10 w-24 mb-[-2px] sm:right-4 sm:w-16"
                  duration={9}
                  delay={0.2}
                />
              </div>
            </div>
            <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center">
              <AnimatedText
                text="Menyederhanakan Data Kompleks, Membangun Aplikasi Web Modern."
                className="!text-5xl !text-left xl:!text-4xl lg:!text-center lg:!text-5xl md:!text-4xl sm:!text-3xl"
              />
              <p className="my-4 text-base font-medium md:text-sm sm:text-xs">
                Sebagai mahasiswa Bisnis Digital di Universitas Ibn Khaldun (UIKA) Bogor yang berfokus pada Analisis Data (Business Intelligence) dan Pengembangan Web, saya berdedikasi untuk membantu bisnis tumbuh lewat visualisasi data interaktif Looker Studio serta aplikasi web yang tangguh.
              </p>
              <div className="flex items-center self-start mt-2 lg:self-center">
                <a
                  href="/Akbar-Supia-Dirja-CV.pdf"
                  target={"_blank"}
                  rel="noreferrer"
                  className="flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base"
                  download
                >
                  Resume <LinkArrow className={"w-6 ml-1"} />
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=akbarsupiad20@gmail.com"
                  target={"_blank"}
                  rel="noreferrer"
                  className="ml-4 text-lg font-medium capitalize text-dark underline dark:text-light md:text-base"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </Layout>

        <div className="absolute right-8 bottom-24 inline-block w-24 md:hidden">
          <Image src={lightBulb} alt="Akbar" className="w-full h-auto" />
        </div>
      </main>
    </>
  );
}
