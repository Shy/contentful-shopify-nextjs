import Styles from "./Title.module.css";

export default function Title({ title }) {
  return <h1 className={Styles.title}>{title}</h1>;
}
