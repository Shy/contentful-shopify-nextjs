import PageMeta from "@components/page_meta";
import MainLayout from "@layouts/main";
import ContentfulProducts from "@ctfl/Products";
import ContentfulCategories from "@ctfl/Categories";
import ProductGrid from "@components/productgrid";
import CategoryGrid from "@components/categorygrid";

export default function Home({ products, categories }) {
  return (
    <>
      <PageMeta title="Home" description="Cool swag and accessories from swagful." url="/" />
      <MainLayout categories={categories}>
        <ProductGrid products={products} />
        {/* <CategoryGrid categories={categories} /> */}
      </MainLayout>
    </>
  );
}

export async function getStaticProps() {
  const products = await ContentfulProducts.getHomePageProducts();
  const categories = await ContentfulCategories.getAll();

  return {
    props: {
      products,
      categories,
    },
  };
}
