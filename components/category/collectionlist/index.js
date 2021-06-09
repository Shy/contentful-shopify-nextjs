import Image from "next/image";
import Link from "next/link";
import Styles from "./CollectionList.module.css";

export default function CollectionList({ products }) {
  return (
    <div className={Styles.collectionList}>
      {products.map((product) => (
        <Link key={product.sys.id} href={`/product/${product.slug}/${product.defaultVariantName}`}>
          <a className={Styles.collectionList__product}>
            <div className={Styles.collectionList__product__imgContainer}>
              <Image
                layout="responsive"
                alt={product.imagesCollection.items[0].description}
                src={product.imagesCollection.items[0].url}
                height={product.imagesCollection.items[0].height}
                width={product.imagesCollection.items[0].width}
              />
            </div>
            <div className={Styles.collectionList__product__details}>
              <h3 className={Styles.collectionList__product__title}>{product.title}</h3>
              <p className={Styles.collectionList__product__price}>
                <span className={Styles.collectionList__product__price__from}>from</span> $
                {product.defaultPrice}
              </p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
