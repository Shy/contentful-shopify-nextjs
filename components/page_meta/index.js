import Head from "next/head";

const Config = {
  site: {
    domain: "https://...",
  },
  twitter: {
    user: "contentful",
  },
};

export default function PageMeta(props) {
  const { title, description, url, canonical } = props;
  const siteTitle = `${title} | swagful`;

  return (
    <Head>
      <title>{siteTitle}</title>

      {canonical && <link rel="canonical" href={canonical} />}

      <meta name="title" content={siteTitle} />
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="twitter:description" content={description} />

      <meta property="og:url" content={url} />
      <meta property="twitter:url" content={url} />

      {/* <meta property="og:image" content={OpenGraph.generateImageUrl(title)} />
      <meta
        property="og:image:alt"
        content={`...`}
      ></meta>
      <meta property="twitter:image" content={OpenGraph.generateImageUrl(title)} /> */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${Config.twitter.user}`} />
      <meta name="twitter:creator" content={`@${Config.twitter.user}`} />

      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      <meta name="msapplication-TileColor" content="#603cba" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
}
