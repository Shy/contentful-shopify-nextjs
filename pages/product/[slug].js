import Head from "next/head";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import React from "react";
import ContentfulProducts from "@ctfl/Products";

export default function Product({ product }) {
  return (
    <>
      <Head>
        <title>Swagful</title>
        <meta name="description" content="Our fun Swag Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{product.title}</h1>
        {product.info.hasVariants && (
          <ul>
            {Object.keys(product.variantInfo).map((oneKey, i) => (
              <li key={i}>
                {product.variantInfo[oneKey].title}: ${product.variantInfo[oneKey].price}
              </li>
            ))}
          </ul>
        )}
        {!product.info.hasVariants && (
          <ul>
            {Object.keys(product.variantInfo).map((oneKey, i) => (
              <li key={i}>${product.variantInfo[oneKey].price}</li>
            ))}
          </ul>
        )}

        {documentToReactComponents(product.description.json)}
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
