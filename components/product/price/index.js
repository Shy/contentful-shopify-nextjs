import Styles from "./Price.module.css";

export default function Price({ price }) {
  return <h2 className={Styles.price}>{price}</h2>;
}
