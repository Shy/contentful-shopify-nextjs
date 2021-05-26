export default class ShopifyApi {
  static async getVariantPricing(variantIdArray) {
    let query = "{";
    variantIdArray.forEach((variantID) => {
      const fixedVariantID = variantID.replace("==", "");

      query += `${fixedVariantID}: productVariant(id: "${fixedVariantID}") {
        title 
        price 
        availableForSale 
        inventoryQuantity 
        product { 
          id 
        }
      }`;
    });

    query += "}";

    const data = await ShopifyApi.query(query);
    return data;
  }

  static async query(query) {
    const fetchUrl = `https://${process.env.SHOPIFY_STORE_NAME}.myshopify.com/admin/api/graphql.json`;
    const fetchOptions = {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": `${process.env.SHOPIFY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };

    try {
      const response = await fetch(fetchUrl, fetchOptions).then((response) => response.json());
      return response.data;
    } catch (error) {
      throw new Error("Could not fetch data from Shopify!");
    }
  }
}
