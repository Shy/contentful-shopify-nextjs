import Head from 'next/head';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import React from 'react';
import styles from '../../styles/Home.module.css';

export default function Product({ product }) {
  console.log(product);
  return (

    <div className={styles.container}>
      <Head>
        <title>Swagful</title>
        <meta name="description" content="Our fun Swag Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>{product.title}</h1>
        {product.info.hasVariants && (
        <ul>
          {
          Object.keys(product.variantInfo).map((oneKey, i) => (
            <li key={i}>
              {product.variantInfo[oneKey].title}
              : $
              {product.variantInfo[oneKey].price}
            </li>
          ))
        }
        </ul>
        )}
        {!product.info.hasVariants && (
        <ul>
          {
          Object.keys(product.variantInfo).map((oneKey, i) => (
            <li key={i}>
              $
              {product.variantInfo[oneKey].price}
            </li>
          ))
        }
        </ul>
        )}

        {documentToReactComponents(product.description.json)}
      </main>

      <footer className={styles.footer}>
        Made on stream by
        <a
          href="https://whitep4nth3r.com/"
        >
          whitep4nth3r
        </a>
        and
        <a
          href="https://twitter.com/ShyRuparel"
        >
          ShyRuparel
        </a>
      </footer>
    </div>
  );
}

export async function getVariantPricing(arrayVariantID) {
  let shopifyQuery = '{';
  arrayVariantID.forEach((variantID) => {
    const fixedVariantID = variantID.replace('==', '');
    shopifyQuery += `${fixedVariantID}: productVariant(id: "${fixedVariantID}") {
      title 
      price 
      availableForSale 
      inventoryQuantity 
      product { 
        id 
      }
    }`;
  });
  shopifyQuery += '}';

  const fetchOptionsShopify = {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': `${process.env.SHOPIFY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: shopifyQuery }),
  };
  const fetchURLShopify = `https://${process.env.SHOPIFY_STORE_NAME}.myshopify.com/admin/api/graphql.json`;

  const dataShopify = await fetch(fetchURLShopify, fetchOptionsShopify)
    .then((response) => response.json());
  return (dataShopify.data);
}

async function getAllSlugs() {
  const query = `{ productCollection {
            items {
                slug
            }
        }
    }`;

  const fetchOptionsCTFL = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CTFL_CDA}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  };
  const fetchURLCTFL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CTFL_SPACE_ID}`;

  const dataCTFL = await fetch(fetchURLCTFL, fetchOptionsCTFL)
    .then((response) => response.json());
  return dataCTFL.data.productCollection.items.map(((item) => item.slug));
}

export async function getStaticPaths() {
  const slugs = await getAllSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const query = `{
  productCollection(where:{slug:"${params.slug}"}) {
    items {
      title
      slug
      description{
        json
      }
      shopify
      imagesCollection {
        items {
          url
        }
      }
    }
  }
}
`;

  const fetchOptionsCTFL = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CTFL_CDA}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  };
  const fetchURLCTFL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CTFL_SPACE_ID}`;

  const dataCTFL = await fetch(fetchURLCTFL, fetchOptionsCTFL)
    .then((response) => response.json());

  // eslint-disable-next-line prefer-const
  const products = dataCTFL.data.productCollection.items;

  products.forEach(async (product, index) => {
    products[index].variantInfo = await getVariantPricing(product.shopify);
  });

  const mergeShopifyWithContentfulData = async () => {
    const promises = products.map(async (product) => {
      const variantPricing = await getVariantPricing(product.shopify);
      const hasVariants = product.shopify.length > 1;
      return {
        ...product,
        variantInfo: variantPricing,
        info: { hasVariants },
      };
    });

    return Promise.all(promises);
  };

  const fullData = await mergeShopifyWithContentfulData();
  const product = fullData[0];
  return { props: { product } };
}
