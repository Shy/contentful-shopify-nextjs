import Styles from "./Variants.module.css";
import Link from "next/link";

/**
 * TODO: get currency info/symbol from Shopify rather than hard-coding $
 * TODO: variants will be links eventually to change param in URL
 * TODO: selected state for variant
 *
 * NICE TO HAVE: separate pricing component that updates dynamically based on
 * selected variant
 *
 * I think price should be separate to these variants
 * because it doesn't make sense to be next to the 'sizes' etc
 */

export default function Variants({ productSlug, selectedVariantIdKey, variantData, hasVariants }) {
  return (
    <div className={Styles.variants}>
      <ul className={Styles.variants__list}>
        {Object.keys(variantData).map((key, index) => {
          const isSelected = selectedVariantIdKey === key;

          return (
            <li key={`${key}-${index}`}>
              <Link href={`/product/${productSlug}/${variantData[key].title.toLowerCase()}`}>
                <a
                  className={`${Styles.variants__listItem} ${
                    isSelected ? Styles.variants__listItem__selected : ""
                  }`}>
                  {variantData[key].title}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
