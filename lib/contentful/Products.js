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
      Object.entries(baseProduct.variantData).find(
        (entry) => entry[1].title.toLowerCase() === name,
      );

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

  static async getByCategory(slug) {
    const query = `{
      categoryCollection(limit: 1, where: { slug: "${slug}" }) {
        items {
          linkedFrom {
            productCollection {
              items {
                sys {
                  id
                }
                title
                shopify
                slug
                imagesCollection(limit: 1) {
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
        }
      }
    }
    `;

    const response = await ContentfulProducts.query(query);

    const mergeProductsWithVariantNames = async (_) => {
      const promises =
        response.data.categoryCollection.items[0].linkedFrom.productCollection.items.map(
          async (product) => {
            const variantPricing = await ShopifyApi.getVariantPricing(product.shopify);
            const defaultVariantName =
              product.shopify.length > 1
                ? await ShopifyApi.getVariantNameById(product.shopify[0])
                : "";

            return {
              ...product,
              defaultPrice: variantPricing[product.shopify[0].replace("==", "")].price,
              defaultVariantName,
            };
          },
        );

      return await Promise.all(promises);
    };

    const products = await mergeProductsWithVariantNames();
    return products;
  }

  static async getHomePageProducts() {
    const query = `{
      productCollection( where: { showOnHomePage: true }) {
        items {
          sys {
            id
          }
          title
          slug
          showOnHomePage
          category {
            name
          }
          shopify
          imagesCollection(limit: 1) {
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

    const mergeProductsWithVariantNames = async (_) => {
      const promises = response.data.productCollection.items.map(async (product) => {
        const variantPricing = await ShopifyApi.getVariantPricing(product.shopify);
        const defaultVariantName =
          product.shopify.length > 1 ? await ShopifyApi.getVariantNameById(product.shopify[0]) : "";

        return {
          ...product,
          defaultPrice: variantPricing[product.shopify[0].replace("==", "")].price,
          defaultVariantName,
        };
      });

      return await Promise.all(promises);
    };

    const products = await mergeProductsWithVariantNames();

    return products;
  }
}
