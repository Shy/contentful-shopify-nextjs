import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import Styles from "./Description.module.css";

export function getRichTextRenderOptions(links) {
  const assetBlockMap = new Map(links?.assets?.block?.map((asset) => [asset.sys.id, asset]));

  const entryMap = new Map();

  if (links.entries.block) {
    for (const entry of links.entries.block) {
      entryMap.set(entry.sys.id, entry);
    }
  }

  if (links.entries.inline) {
    for (const entry of links.entries.inline) {
      entryMap.set(entry.sys.id, entry);
    }
  }

  return {
    renderMark: {
      [MARKS.BOLD]: (text) => <b className={Styles.test}>{text}</b>,
      [MARKS.ITALIC]: (text) => <em className={Styles.test}>{text}</em>,
    },

    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => (
        <a className={Styles.test} href={node.data.uri} target="_blank" rel="nofollow noreferrer">
          {children}
        </a>
      ),
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        const entry = entryMap.get(node.data.target.sys.id);
        const { __typename } = entry;

        switch (__typename) {
          default:
            return null;
        }
      },
      [BLOCKS.HR]: (text) => <hr className={Styles.test} />,
      [BLOCKS.HEADING_1]: (node, children) => <h1 className={Styles.test}>{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => {
        return <h2 className={Styles.description__heading2}>{children}</h2>;
      },
      [BLOCKS.HEADING_3]: (node, children) => <h3 className={Styles.test}>{children}</h3>,
      [BLOCKS.HEADING_4]: (node, children) => <h4 className={Styles.test}>{children}</h4>,
      [BLOCKS.HEADING_5]: (node, children) => <h5 className={Styles.test}>{children}</h5>,
      [BLOCKS.HEADING_6]: (node, children) => <h6 className={Styles.test}>{children}</h6>,
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={Styles.description__paragraph}>{children}</p>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className={Styles.test}>{children}</blockquote>
      ),
      [BLOCKS.UL_LIST]: (node, children) => <ul className={Styles.test}>{children}</ul>,
      [BLOCKS.OL_LIST]: (node, children) => <ol className={Styles.test}>{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li className={Styles.test}>{children}</li>,
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        const entry = entryMap.get(node.data.target.sys.id);
        const { __typename } = entry;

        switch (__typename) {
          default:
            return null;
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        const { title, url, height, width, description } = assetBlockMap.get(
          node.data.target.sys.id,
        );

        return (
          <div>
            <Image src={url} alt={description} height={height} width={width} layout="responsive" />
          </div>
        );
      },
    },
  };
}

export default function Description({ description }) {
  return (
    <div className={Styles.description__container}>
      {" "}
      {documentToReactComponents(description.json, getRichTextRenderOptions(description.links))}
    </div>
  );
}
