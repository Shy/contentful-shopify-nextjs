import Link from "next/link";
import Styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={Styles.header}>
      <Link href="/">
        <a className={Styles.header__title}>SWAGful</a>
      </Link>
    </header>
  );
}
