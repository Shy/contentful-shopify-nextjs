import Styles from "./AddToCartButton.module.css";
import ShopifyApi from "@shopify/Api";

export default function AddToCartButton({ selectedVariantId }) {
  async function addToCart() {
    console.log(selectedVariantId);
    const uRL = await ShopifyApi.getCheckOutURL(selectedVariantId);
    console.log(uRL);
  }

  return (
    <button className={Styles.addToCart} onClick={addToCart}>
      Add to cart
    </button>
  );
}
