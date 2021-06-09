import Link from "next/link";
import Image from "next/image";
import Styles from "./ProductGrid.module.css";

export default function ProductGrid({ products }) {
  return (
    <section className={Styles.productGrid}>
      {products.map((product) => (
        <Link key={product.sys.id} href={`/product/${product.slug}/${product.defaultVariantName}`}>
          <a>
            <span className={Styles.productGrid__product}>
              <Image
                alt={product.title}
                src={product.imagesCollection.items[0].url}
                // height={product.imagesCollection.items[0].height}
                // width={product.imagesCollection.items[0].width}
                layout="fill"
              />
              <h2 className={Styles.productGrid__productTitle}>
                {product.title} ${product.defaultPrice}
              </h2>
            </span>
          </a>
        </Link>
      ))}
    </section>
  );
}
