export default class ContentfulApi {
  static async query(query) {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CTFL_SPACE_ID}`;
    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CTFL_CDA}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };

    try {
      const data = await fetch(fetchUrl, fetchOptions).then((response) => response.json());
      return data;
    } catch (error) {
      throw new Error("Could not fetch data from Contentful!");
    }
  }
}
