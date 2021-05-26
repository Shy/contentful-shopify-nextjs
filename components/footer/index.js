import Styles from "./Footer.module.css";

export default function Footer() {
  const date = new Date();

  return (
    <footer className={Styles.footer}>
      <p className={Styles.footer__copyright}>
        &copy; SWAGful {date.getFullYear()} | Made on stream by{" "}
        <a href="https://whitep4nth3r.com/" target="_blank" rel="nofollow noopener">
          whitep4nth3r
        </a>{" "}
        and{" "}
        <a href="https://twitter.com/ShyRuparel" target="_blank" rel="nofollow noopener">
          ShyRuparel
        </a>
      </p>
    </footer>
  );
}
