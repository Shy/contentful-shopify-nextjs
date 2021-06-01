import Image from "next/image";
import Styles from "./Images.module.css";
import { useState } from "react";

export default function Images({ images }) {
  const [selectedImageKey, setSelectedImageKey] = useState(0);

  function previous() {
    const prevKey = selectedImageKey === 0 ? images.length - 1 : selectedImageKey - 1;
    setSelectedImageKey(prevKey);
  }

  function next() {
    const nextKey = selectedImageKey === images.length - 1 ? 0 : selectedImageKey + 1;
    setSelectedImageKey(nextKey);
  }

  return (
    <div className={Styles.images}>
      <button className={`${Styles.images__nav} ${Styles.images__nav__prev}`} onClick={previous}>
        LEFT
      </button>
      <div className={Styles.images__imageContainer}>
        <Image
          src={images[selectedImageKey].url}
          height={images[selectedImageKey].height}
          width={images[selectedImageKey].width}
          alt={images[selectedImageKey].description}
          layout="responsive"
          className={Styles.images__visibleImage}
        />
      </div>
      <button className={`${Styles.images__nav} ${Styles.images__nav__next}`} onClick={next}>
        RIGHT
      </button>
    </div>
  );
}
