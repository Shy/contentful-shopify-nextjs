import ContentfulApi from "@ctfl/Api";
import ShopifyApi from "@shopify/Api";

export default class ContentfulProducts extends ContentfulApi {
  static async getAllSlugs() {
    const query = `{ 
      productCollection {
        items {
          slug
        }
      }
    }`;

    const response = await ContentfulApi.query(query);
    return response.data.productCollection.items.map((item) => item.slug);
  }

  /**
   * Get product by slug
   * @param {string} slug
   */
  static async getBySlug(slug) {
    const query = `{
      productCollection(limit: 1, where:{slug:"${slug}"}) {
        items {
          title
          slug
          seoDescription
          description{
            json
            links {
              entries {
                inline {
                  sys {
                    id
                  }
                }
                block {
                  sys {
                    id
                  }
                }
              }
            }
          }
          shopify
          imagesCollection {
            items {
              sys {
                id
              }
              url
              description
              height
              width
            }
          }
        }
      }
    }
    `;

    const response = await ContentfulApi.query(query);

    const product = response.data.productCollection.items.pop();

    const variantData = await ShopifyApi.getVariantPricing(product.shopify);

    const hasVariants = product.shopify.length > 1;

    return {
      ...product,
      hasVariants,
      variantData,
    };
  }
}
