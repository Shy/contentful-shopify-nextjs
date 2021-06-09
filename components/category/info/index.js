import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getRichTextRenderOptions } from "@tools/RichTextRenderOptions";
import Styles from "./Info.module.css";

export default function Info({ category }) {
  return (
    <div className={Styles.info}>
      <h1 className={Styles.info__title}>{category.name}</h1>
      <div className={Styles.info__description}>
        {documentToReactComponents(
          category.description.json,
          getRichTextRenderOptions(category.description.links),
        )}
      </div>
    </div>
  );
}
