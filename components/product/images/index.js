import Image from "next/image";
import Styles from "./Images.module.css";

export default function Images({ images }) {
  return (
    <div className={Styles.images}>
      {images.map((image) => (
        <div key={image.sys.id}>
          <Image src={image.url} height={image.height} width={image.width} layout="responsive" />
        </div>
      ))}
    </div>
  );
}
