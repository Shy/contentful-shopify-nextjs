import Link from "next/link";
import Styles from "./Header.module.css";
import Logo from "@svg/logo";
import Bag from "@svg/bag";

export default function Header({ categories }) {
  return (
    <header className={Styles.header}>
      <Link href="/">
        <a className={Styles.header__logo}>
          <Logo />
        </a>
      </Link>
      <div className={Styles.header__links}>
        <Link href="/">
          <a className={Styles.header__link}>Home</a>
        </Link>
        {categories.map((category) => (
          <Link href={`/collection/${category.slug}`}>
            <a className={Styles.header__link}>{category.name}</a>
          </Link>
        ))}
      </div>
      <Link href="/">
        <a className={Styles.header__bag} aria-label="Go to shopping bag">
          <Bag />
        </a>
      </Link>
    </header>
  );
}
