import Styles from "./Footer.module.css";
import Link from "next/link";
import Logo from "@svg/logo";

export default function Footer({ categories }) {
  const date = new Date();

  return (
    <footer className={Styles.footer}>
      <div className={Styles.footer__links}>
        <Link href="/">
          <a className={Styles.footer__links__logo}>
            <Logo />
          </a>
        </Link>
        <ul className={Styles.footer__linkList}>
          {categories.map((category) => (
            <li key={category.slug} className={Styles.footer__linkListItem}>
              <Link href={`/collection/${category.slug}`}>
                <a className={Styles.footer__linkListItemLink}>{category.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <ul className={Styles.footer__linkList}>
          <li className={Styles.footer__linkListItem}>
            <Link href="/">
              <a className={Styles.footer__linkListItemLink}>Misc</a>
            </Link>
          </li>
          <li className={Styles.footer__linkListItem}>
            <Link href="/">
              <a className={Styles.footer__linkListItemLink}>Footer</a>
            </Link>
          </li>
          <li className={Styles.footer__linkListItem}>
            <Link href="/">
              <a className={Styles.footer__linkListItemLink}>Links</a>
            </Link>
          </li>
        </ul>
      </div>
      <p className={Styles.footer__copyright}>&copy; swagful {date.getFullYear()}</p>
    </footer>
  );
}
