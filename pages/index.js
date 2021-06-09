import PageMeta from "@components/page_meta";
import MainLayout from "@layouts/main";
import ContentfulProducts from "@ctfl/Products";
import ProductGrid from "@components/productgrid";

export default function Home({ products }) {
  return (
    <>
      <PageMeta title="Home" description="Only the best swag from swagful." url="/" />
      <MainLayout>
        <ProductGrid products={products} />
      </MainLayout>
    </>
  );
}

export async function getStaticProps() {
  const products = await ContentfulProducts.getHomePageProducts();
  return {
    props: {
      products,
    },
  };
}
