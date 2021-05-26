import Head from "next/head";
import React from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Swagful</title>
        <meta name="description" content="Our fun Swag Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>SWAGFUL</h1>
      </main>

      <footer>
        Made on stream by
        <a href="https://whitep4nth3r.com/">whitep4nth3r</a>
        and
        <a href="https://twitter.com/ShyRuparel">ShyRuparel</a>
      </footer>
    </>
  );
}
