import Link from "next/link";
import Styles from "./Category.module.css";

export default function Category({ category }) {
  return (
    <Link href={`/collection/${category.slug}`}>
      <a className={Styles.category}>{category.name}</a>
    </Link>
  );
}
