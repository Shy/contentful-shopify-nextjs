import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getRichTextRenderOptions } from "@tools/RichTextRenderOptions";
import Styles from "./Description.module.css";

export default function Description({ description }) {
  return (
    <div className={Styles.description__container}>
      {documentToReactComponents(description.json, getRichTextRenderOptions(description.links))}
    </div>
  );
}
