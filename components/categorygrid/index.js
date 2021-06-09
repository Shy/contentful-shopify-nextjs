import Link from "next/link";

export default function CategoryGrid({ categories }) {
  return (
    <section>
      {categories.map((cat) => (
        <Link href={`/collection/${cat.slug}`}>
          <a>{cat.name}</a>
        </Link>
      ))}
    </section>
  );
}
