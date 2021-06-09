import Styles from "./AddToCartButton.module.css";
import ShopifyApi from "@shopify/Api";

export default function AddToCartButton({ selectedVariantId }) {
  async function addToCart() {
    const uRL = await ShopifyApi.getCheckOutURL(selectedVariantId);
  }

  return (
    <button className={Styles.addToCart} onClick={addToCart}>
      Add to cart
    </button>
  );
}
