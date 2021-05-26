/**
 * TODO: get currency info/symbol from Shopify rather than hard-coding $
 */

export default function Variants({ variantData, hasVariants }) {
  return (
    <div>
      {hasVariants && (
        <ul>
          {Object.keys(variantData).map((key, index) => (
            <li key={`${key}-${index}`}>
              {variantData[key].title}: ${variantData[key].price}
            </li>
          ))}
        </ul>
      )}
      {!hasVariants && (
        <ul>
          {Object.keys(variantData).map((key, index) => (
            <li key={`${key}-${index}`}>${variantData[key].price}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
