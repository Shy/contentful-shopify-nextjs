import Link from "next/link";
import Styles from "./Header.module.css";
import Logo from "@svg/logo";
import Bag from "@svg/bag";

export default function Header() {
  return (
    <header className={Styles.header}>
      <Link href="/">
        <a className={Styles.header__logo}>
          <Logo />
        </a>
      </Link>
      <Link href="/">
        <a className={Styles.header__bag} aria-label="Go to shopping bag">
          <Bag />
        </a>
      </Link>
    </header>
  );
}
