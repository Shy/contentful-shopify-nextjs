import ContentfulApi from "@ctfl/Api";
import ShopifyApi from "@shopify/Api";

export default class ContentfulProducts extends ContentfulApi {
  static async getAllSlugsHelper(productCollection) {
    const constructSingleSlugs = () => {
      const itemsToProcess = productCollection.items.filter((item) => item.shopify.length === 1);

      const returnSlugs = itemsToProcess.map((item) => {
        return [item.slug];
      });

      return returnSlugs;
    };

    const constructVariantSlugs = async (_) => {
      const itemsToProcess = productCollection.items.filter((item) => item.shopify.length > 1);

      const promises = itemsToProcess.map(async (item) => {
        const returnSlugs = item.shopify.map(async (variantId) => {
          const variantName = await ShopifyApi.getVariantNameById(variantId);
          return [item.slug, variantName];
        });

        return await Promise.all(returnSlugs).then((values) => values);
      });

      return await Promise.all(promises);
    };

    const singleSlugs = constructSingleSlugs();
    const variantSlugs = await constructVariantSlugs();

    const returnSlugs = [];

    variantSlugs.forEach((group) => {
      group.forEach((subGroup) => {
        returnSlugs.push(subGroup);
      });
    });

    return returnSlugs.concat(singleSlugs);
  }

  static async getAllSlugs() {
    const query = `{ 
      productCollection {
        items {
          slug
          shopify
        }
      }
    }`;

    const response = await ContentfulApi.query(query);
    const slugs = await ContentfulProducts.getAllSlugsHelper(response.data.productCollection);

    return slugs;
  }

  static async getVariantIdBySlugAndVariantName(slug, variantName) {
    const baseProduct = await ContentfulProducts.getBySlug(slug);
    const getProduct = (name) =>
      Object.entries(baseProduct.variantData).find((entry) => entry[1].title === name);

    const variantToReturn = getProduct(variantName);
    return (variantToReturn[0] += "==");
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
          category {
            name
            slug
          }
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
