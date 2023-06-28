import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const host = process.env.HOST;

  return (
    <main>
      <Head>
        <title>Lay Vote</title>
        <link rel="icon" href={`${host}/logo.ico`} />
      </Head>
      <Component {...pageProps} />
    </main>
  );
}
