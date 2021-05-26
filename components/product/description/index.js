import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function Description({ description }) {
  return <div>{documentToReactComponents(description.json)}</div>;
}
