import PageMeta from "@components/page_meta";
import MainLayout from "@layouts/main";
import Link from "next/link";
import ContentfulProducts from "@ctfl/Products";
import ShopifyApi from "@shopify/Api";

export default function Home({ productSlugs }) {
  return (
    <>
      <PageMeta title="Home" description="Only the best swag from swagful." url="/" />
      <MainLayout>
        <h1>
          Let's do featured products here and have a flag on the products in Contentful - or maybe
          the flag is 'show on home page' or something
        </h1>
        <p>current products available for easy links</p>
        {productSlugs.map((slug) => {
          const returnThings = [];

          if (slug.length === 1) {
            returnThings.push(
              <Link href={`/product/${slug[0]}`} key={slug[0]}>
                <a style={{ display: "block", marginBottom: "2rem" }}>{slug[0]}</a>
              </Link>,
            );
          } else {
            returnThings.push(
              <Link href={`/product/${slug[0]}/${slug[1]}`} key={`${slug[0]}-${slug[1]}`}>
                <a style={{ display: "block", marginBottom: "2rem" }}>
                  {slug[0]}/{slug[1]}
                </a>
              </Link>,
            );
          }

          return returnThings;
        })}
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
