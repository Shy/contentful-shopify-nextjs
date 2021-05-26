import Image from "next/image";
import Styles from "./Images.module.css";
import Title from "@components/product/title";
import Price from "@components/product/price";

/**
 * TODO: pass in price dynamically from selected variant
 */

export default function Images({ images, title }) {
  return (
    <div className={Styles.images}>
      <Title title={title} />
      <Price price="$100.00" />
      {images.map((image) => (
        <div key={image.sys.id}>
          <Image src={image.url} height={image.height} width={image.width} layout="responsive" />
        </div>
      ))}
    </div>
  );
}
