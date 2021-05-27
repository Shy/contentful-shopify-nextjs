import Head from "next/head";
import MainLayout from "@layouts/main";
import Link from "next/link";

import ContentfulProducts from "@ctfl/Products";

export default function Home({ productSlugs }) {
  return (
    <>
      <Head>
        <title>Swagful</title>
        <meta name="description" content="Our fun Swag Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <h1 style={{ marginBottom: "2rem" }}>
          Let's do featured products here and have a flag on the products in Contentful - or maybe
          the flag is 'show on home page' or something
        </h1>
        <p style={{ marginBottom: "2rem" }}>current products available for easy links</p>
        {productSlugs.map((slug) => (
          <Link href={`/product/${slug}`}>
            <a style={{ display: "block", marginBottom: "2rem" }}>{slug}</a>
          </Link>
        ))}
      </MainLayout>
    </>
  );
}

export async function getStaticProps() {
  const productSlugs = await ContentfulProducts.getAllSlugs();

  return {
    props: {
      productSlugs,
    },
  };
}
