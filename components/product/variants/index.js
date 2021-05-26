import Styles from "./Variants.module.css";

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

export default function Variants({ variantData, hasVariants }) {
  return (
    <div className={Styles.variants}>
      <ul className={Styles.variants__list}>
        {Object.keys(variantData).map((key, index) => {
          const variantDisplay = hasVariants
            ? `${variantData[key].title}: ${variantData[key].price}`
            : `$${variantData[key].price}`;
          return (
            <li className={Styles.variants__listItem} key={`${key}-${index}`}>
              {variantDisplay}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
