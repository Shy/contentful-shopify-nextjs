import Head from "next/head";

import React from "react";
import ContentfulProducts from "@ctfl/Products";

import Title from "@components/product/title";
import Description from "@components/product/description";
import Images from "@components/product/images";
import Variants from "@components/product/variants";

export default function Product({ product }) {
  return (
    <>
      <Head>
        <title>{product.title} | Swagful</title>
        <meta name="description" content="Our fun Swag Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title title={product.title} />
        <Variants variantData={product.variantData} hasVariants={product.hasVariants} />
        <Images images={product.imagesCollection.items} />
        <Description description={product.description} />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = await ContentfulProducts.getAllSlugs();

  const paths = slugs.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await ContentfulProducts.getBySlug(params.slug);
  return { props: { product } };
}
