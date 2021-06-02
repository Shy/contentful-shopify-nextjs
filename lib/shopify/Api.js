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

  static async createCheckout() {
    const queryUrl = JSON.stringify({
      query: `mutation createCheckoutMutation($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            createdAt
            webUrl
          }
        }
      }
      `,
      variables: {
        input: {
          email: "testemail@gmail.com",
          lineItems: {
            quantity: 1,
            variantId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjU2ODk5MTYyOTQ4MA==",
          },
        },
      },
    });
    const fetchUrl = `https://${process.env.SHOPIFY_STORE_NAME}/api/2021-07/graphql.json`;
    const fetchOptions = {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": `${process.env.SHOPIFY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: queryUrl,
    };
    const response = await fetch(fetchUrl, fetchOptions);
    const results = await response.json();
    console.log("results", results.data.checkoutCreate);
  }

  static async query(query, api_key) {
    const fetchUrl = `https://${process.env.SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2021-04/graphql.json`;
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
