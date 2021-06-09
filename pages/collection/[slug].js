import PageMeta from "@components/page_meta";
import ContentfulProducts from "@ctfl/Products";
import ContentfulCategories from "@ctfl/Categories";
import MainLayout from "@layouts/main";

export default function Collection({ products, category }) {
  return (
    <>
      <PageMeta
        title={category.name}
        description={category.seoDescription}
        url={`/collection/${category.slug}`}
      />

      <MainLayout>
        <h1>{category.name}</h1>
        {products.map((product) => (
          <h2>{product.title}</h2>
        ))}
      </MainLayout>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = await ContentfulCategories.getAllSlugs();
  console.log(slugs);
  const paths = slugs.map((slug) => ({ params: { slug } }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const category = await ContentfulCategories.getBySlug(params.slug);
  const products = await ContentfulProducts.getByCategory(params.slug);

  return { props: { products, category } };
}
