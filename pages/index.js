import Head from "next/head";
import MainLayout from "@layouts/main";

export default function Home() {
  return (
    <>
      <Head>
        <title>Swagful</title>
        <meta name="description" content="Our fun Swag Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <h1>
          Let's do featured products here and have a flag on the products in Contentful - or maybe
          the flag is 'show on home page' or something
        </h1>
      </MainLayout>
    </>
  );
}
