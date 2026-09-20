const Robots = () => null;

export async function getServerSideProps({ req, res }) {
  const host = req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || "http";
  const base = `${proto}://${host}`;

  const body = `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`;

  res.setHeader("Content-Type", "text/plain");
  res.write(body);
  res.end();

  return { props: {} };
}

export default Robots;
