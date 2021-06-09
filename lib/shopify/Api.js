export default class ShopifyApi {
  static async getCheckOutURL(variantId) {
    const queryUrl = JSON.stringify({
      query: `mutation createCheckoutMutation() {
      checkoutCreate(input: {
          lineItems: {
            quantity: 1,
            variantId: ${variantId},
          }) {
        checkout {
          id
          createdAt
          webUrl
        }
      }
    }
    `,
    });
    const fetchUrl = `https://${process.env.SHOPIFY_STORE_NAME}.myshopify.com/api/2021-07/graphql.json`;
    const fetchOptions = {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": `${process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: queryUrl,
    };
    const response = await fetch(fetchUrl, fetchOptions);
    console.log(response);
    const results = await response.json();
    console.log(queryUrl);
    console.log("results", results.data);
    return results.data;
  }

  static async getVariantNameById(variantId) {
    const query = `{
      productVariant(id: "${variantId}") {
        title 
      }
    }`;

    const data = await ShopifyApi.query(query);
    return data.productVariant.title.toLowerCase();
  }

  static async getVariantPricing(variantIdArray) {
    let query = "{";
    variantIdArray.forEach((variantID) => {
      query += `${variantID.replace("==", "")}: productVariant(id: "${variantID}") {
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

  static async createCheckout(selectedVariantId) {
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
            variantId: selectedVariantId,
          },
        },
      },
    });
    const fetchUrl = `https://${process.env.SHOPIFY_STORE_NAME}.myshopify.com/api/2021-07/graphql.json`;
    const fetchOptions = {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": `${process.env.SHOPIFY_STOREFRONT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: queryUrl,
    };
    const response = await fetch(fetchUrl, fetchOptions);
    const results = await response.json();
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
