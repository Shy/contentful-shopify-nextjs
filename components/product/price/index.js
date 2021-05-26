import Styles from "./Price.module.css";

export default function Price({ price }) {
  return <h2 class={Styles.price}>{price}</h2>;
}
