import Head from 'next/head';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import React from 'react';
import styles from '../styles/Home.module.css';

export default function Home({ products, prices }) {
  const product = products[0];
  return (
    <div className={styles.container}>
      <Head>
        <title>Swagful</title>
        <meta name="description" content="Our fun Swag Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>{product.title}</h1>
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

export async function getVariantPricing(arrayVarientID) {
  let shopifyQuery = '{';
  for (const varientID in arrayVarientID) {
    shopifyQuery += `${arrayVarientID[varientID].replace('==', '')}: productVariant(id: "${arrayVarientID[varientID].replace('==', '')}") {title price}
  `;
  }
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

export async function getStaticProps() {
  const query = `{
  productCollection {
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
  let products = dataCTFL.data.productCollection.items;

  products.forEach(async (product, index) => {
    products[index].variantInfo = await getVariantPricing(product.shopify);
  });

  const mergeShopifyWithContentfulData = async (_) => {
    const promises = products.map(async (product) => product.variantInfo = await getVariantPricing(product.shopify));
    return await Promise.all(promises);
  };

  const fullData = await mergeShopifyWithContentfulData();
  console.log(products);

  return { props: { products } };
}
