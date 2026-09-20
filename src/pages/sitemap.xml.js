const PAGES = ["", "/about", "/projects", "/articles"];

const Sitemap = () => null;

export async function getServerSideProps({ req, res }) {
  const host = req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || "http";
  const base = `${proto}://${host}`;

  const urls = PAGES.map(
    (path) =>
      `<url><loc>${base}${path}</loc><changefreq>monthly</changefreq></url>`
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();

  return { props: {} };
}

export default Sitemap;
