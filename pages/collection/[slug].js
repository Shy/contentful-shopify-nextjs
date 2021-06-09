import PageMeta from "@components/page_meta";
import ContentfulProducts from "@ctfl/Products";
import ContentfulCategories from "@ctfl/Categories";
import MainLayout from "@layouts/main";
import CollectionList from "@components/category/collectionlist";
import Info from "@components/category/info";
import Styles from "@components/category/Category.module.css";

export default function Collection({ products, category }) {
  return (
    <>
      <PageMeta
        title={category.name}
        description={category.seoDescription}
        url={`/collection/${category.slug}`}
      />

      <MainLayout>
        <div className={Styles.category}>
          <Info category={category} />
          <CollectionList products={products} />
        </div>
      </MainLayout>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = await ContentfulCategories.getAllSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));

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
