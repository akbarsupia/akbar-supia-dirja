import { Montserrat } from "next/font/google";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import HireMe from "@/components/HireMe";
import ScrollUI from "@/components/ScrollUI";
import CommandPalette from "@/components/CommandPalette";
import AstronautBackground from "@/components/AstronautBackground";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Akbar Supia Dirja" />
        <meta property="og:title" content="Akbar Supia Dirja | Portfolio" />
        <meta
          property="og:description"
          content="Portfolio Akbar Supia Dirja - Analis Data (Business Intelligence), Looker Studio & Web Developer."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Akbar Supia Dirja | Portfolio" />
        <meta
          name="twitter:description"
          content="Portfolio Akbar Supia Dirja - Analis Data (Business Intelligence), Looker Studio & Web Developer."
        />
        <meta name="twitter:image" content="/og-image.png" />
      </Head>
      <main
        className={`${montserrat.variable} font-mont relative w-full min-h-screen`}
      >
        <AstronautBackground />
        <ScrollUI />
        <CommandPalette />
        <div className="relative z-10">
          <NavBar />
          <AnimatePresence mode="wait">
            <Component key={router.asPath} {...pageProps} />
          </AnimatePresence>
          <Footer />
          <HireMe />
        </div>
      </main>
    </>
  );
}
