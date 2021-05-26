import Styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={Styles.header}>
      <p className={Styles.header__title}>SWAGful</p>
    </header>
  );
}
