import Head from "next/head";

import React from "react";
import ContentfulProducts from "@ctfl/Products";

import MainLayout from "@layouts/main";

import Description from "@components/product/description";
import Images from "@components/product/images";
import Variants from "@components/product/variants";
import Title from "@components/product/title";
import Price from "@components/product/price";
import AddToCartButton from "@components/product/addtocartbutton";
import Styles from "@components/product/Product.module.css";

export default function Product({ product }) {
  return (
    <>
      <Head>
        <title>{product.title} | Swagful</title>
        <meta name="description" content="Our fun Swag Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <section className={Styles.product}>
          <div className={Styles.product__gallery}>
            <Images images={product.imagesCollection.items} />
          </div>
          <div className={Styles.product__details}>
            <Title title={product.title} />
            <p>
              To do - dynamic price based on selected variant - I really think it would be easier to
              statically generate all variant slugs - this way, each variant button could just be a
              link to a page rather than having to manage some kind of 'selected' state
            </p>
            <p>eg /product/contentful-front-logo-t-shirt/sm</p>
            <Price price="$100.00" />
            <Variants variantData={product.variantData} hasVariants={product.hasVariants} />
            <AddToCartButton />
            <Description description={product.description} />
          </div>
        </section>
      </MainLayout>
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
