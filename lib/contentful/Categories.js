import ContentfulApi from "@ctfl/Api";

export default class ContentfulCategories extends ContentfulApi {
  static async getAll() {
    const query = `{
      categoryCollection {
        items {
          slug
          name
        }
      }
    }`;

    const response = await ContentfulCategories.query(query);
    return response.data.categoryCollection.items;
  }

  static async getAllSlugs() {
    const query = `{
      categoryCollection {
        items {
          slug
        }
      }
    }`;

    const response = await ContentfulCategories.query(query);
    const slugs = response.data.categoryCollection.items.map((item) => item.slug);
    return slugs;
  }

  static async getBySlug(slug) {
    const query = `
    query {
      categoryCollection(limit: 1, where: { slug: "${slug}" }) {
        items {
          name
          slug
          seoDescription
          description {
            json
          }
        }
      }
    }
    `;

    const response = await ContentfulCategories.query(query);
    return response.data.categoryCollection.items[0];
  }
}
