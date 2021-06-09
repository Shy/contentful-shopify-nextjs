import PageMeta from "@components/page_meta";
import ContentfulProducts from "@ctfl/Products";
import MainLayout from "@layouts/main";
import Description from "@components/product/description";
import Images from "@components/product/images";
import Variants from "@components/product/variants";
import Title from "@components/product/title";
import Category from "@components/product/category";
import Price from "@components/product/price";
import AddToCartButton from "@components/product/addtocartbutton";
import Styles from "@components/product/Product.module.css";

export default function Product({
  product,
  selectedVariantId,
  selectedVariantIdKey,
  selectedVariantPrice,
}) {
  return (
    <>
      <PageMeta
        title={product.title}
        description={product.seoDescription}
        url={`/product/${product.slug}`}
      />

      <MainLayout>
        <section className={Styles.product}>
          <div className={Styles.product__gallery}>
            <Images images={product.imagesCollection.items} />
          </div>
          <div className={Styles.product__details}>
            <Title title={product.title} />

            <Category category={product.category} />

            <Price price={selectedVariantPrice} />

            <Variants
              productSlug={product.slug}
              variantData={product.variantData}
              hasVariants={product.hasVariants}
              selectedVariantIdKey={selectedVariantIdKey}
            />
            <AddToCartButton selectedVariantId={selectedVariantId} />
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
  const product = await ContentfulProducts.getBySlug(params.slug[0]);

  const isVariant = params.slug.length > 1;

  const selectedVariantId = isVariant
    ? await ContentfulProducts.getVariantIdBySlugAndVariantName(params.slug[0], params.slug[1])
    : product.shopify[0];

  const selectedVariantIdKey = selectedVariantId.replace("==", "");

  const selectedVariantPrice = product.variantData[selectedVariantIdKey].price;

  return { props: { product, selectedVariantId, selectedVariantIdKey, selectedVariantPrice } };
}
