import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import TransitionEffect from "@/components/TransitionEffect";
import { motion } from "framer-motion";

const Publication = ({ title, authors, journal, date, doi, keywords, summary, link }) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className="relative w-full p-8 my-4 rounded-2xl flex flex-col items-start justify-between bg-light text-dark border border-solid border-dark border-r-4 border-b-4 dark:border-light dark:bg-dark dark:text-light sm:p-6"
    >
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl dark:bg-light" />

      <Link href={link} target="_blank">
        <h2 className="text-2xl font-bold hover:underline underline-offset-2 md:text-xl">
          {title}
        </h2>
      </Link>

      <p className="my-2 text-sm font-medium text-dark/75 dark:text-light/75">
        {authors}
      </p>
      <p className="text-sm font-semibold text-primary dark:text-primaryDark">
        {journal} | {date}
      </p>

      <p className="my-4 font-medium md:text-sm">{summary}</p>

      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="rounded-full bg-dark/10 px-3 py-1 text-xs font-medium dark:bg-light/10"
          >
            {keyword}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center">
        <Link
          href={link}
          target="_blank"
          className="rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:text-base"
        >
          Read Article
        </Link>
        <Link
          href={doi}
          target="_blank"
          className="ml-4 text-lg font-medium text-dark underline dark:text-light md:text-base"
        >
          DOI
        </Link>
      </div>
    </motion.li>
  );
};

const articles = () => {
  return (
    <>
      <Head>
        <title>Akbar Supia Dirja | Publications</title>
        <meta
          name="description"
          content="Publikasi ilmiah Akbar Supia Dirja - Analisis Sentimen MBG di Media Sosial X"
        />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Research & Publications!"
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <ul className="w-full flex flex-col items-center">
            <Publication
              title="Analisis Sentimen MBG Di Media Sosial X Menggunakan Support Vector Machine Dan Naive Bayes"
              authors="Akbar Supia Dirja, Lana Aulia Salsabila, M. Akhdan Putra Hermawan, Cika Jelita, Hanif Zaidan Sinaga"
              journal="Indonesian Journal of Multidisciplinary on Social and Technology, Vol. 4 No. 3 (2026), 1044–1055"
              date="17 Juli 2026"
              doi="https://doi.org/10.69693/ijmst.v4i3.11800"
              link="https://journal.ilmudata.co.id/index.php/ijmst/article/view/11800"
              keywords={[
                "Makan Bergizi Gratis",
                "Analisis Sentimen",
                "Media Sosial X",
                "Support Vector Machine",
                "Naïve Bayes",
              ]}
              summary="Penelitian ini menganalisis sentimen masyarakat terhadap Program Makan Bergizi Gratis di media sosial X serta membandingkan kinerja algoritma Support Vector Machine dan Naive Bayes. Menggunakan 1.335 data hasil pembersihan, Support Vector Machine dengan kernel linear memperoleh akurasi 77,9% (Macro F1-Score 0,78), lebih unggul dibanding Multinomial Naive Bayes dengan akurasi 75,7% (Macro F1-Score 0,75)."
            />
          </ul>
        </Layout>
      </main>
    </>
  );
};

export default articles;
