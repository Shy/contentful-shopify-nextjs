import PageMeta from "@components/page_meta";
import ContentfulProducts from "@ctfl/Products";
import MainLayout from "@layouts/main";
import Description from "@components/product/description";
import Images from "@components/product/images";
import Variants from "@components/product/variants";
import Title from "@components/product/title";
import Price from "@components/product/price";
import AddToCartButton from "@components/product/addtocartbutton";
import Styles from "@components/product/Product.module.css";

export default function Product({ product, selectedVariantId }) {
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
            <p>{product.category.name}</p>
            {/* <p>
              To do - dynamic price based on selected variant - I really think it would be easier to
              statically generate all variant slugs - this way, each variant button could just be a
              link to a page rather than having to manage some kind of 'selected' state
            </p>
            <p>eg /product/contentful-front-logo-t-shirt/sm</p> */}
            <Price price="$100.00" />
            <Variants
              productSlug={product.slug}
              variantData={product.variantData}
              hasVariants={product.hasVariants}
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

  return { props: { product, selectedVariantId } };
}
