/* eslint-disable */

const builder = require("xmlbuilder");

function SitemapBuilder(routes, base, prettify=true) {

  const hostname = base;
  const Routes = routes;

  const sitemap = () => {
    let paths = Routes;
    let xml = builder.create("urlset", {encoding: "utf-8"}).att("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
    paths.forEach(function (path) {
      const slugs = path.slugs || [{}];
      slugs.forEach(slug => {
        let uri = path.path;
        Object.keys(slug).forEach(key => {
          const value = slug[key];
          let midStringRegex = new RegExp(`/:${key}/`, "g");
          let endStringRegex = new RegExp(`/:${key}$`);
          if (uri.match(midStringRegex))
            uri = uri.replace(midStringRegex, `/${value}/`);
          else
            uri = uri.replace(endStringRegex, `/${value}`);
        });
        // if (path.sitemapIndex) {
        var item = xml.ele("url");
        item.ele("loc", hostname + uri);
        item.ele("priority", path.priority || 0);
        item.ele("changefreq", path.changefreq || "never");

        if (path.lastmod) {
          item.ele("lastmod", path.lastmod);
        }

        // }
      });
    });

    // console.log(xml.end({ pretty: prettify }));
    return xml.end({ pretty: prettify });
  };
  return sitemap();
}

// SitemapBuilder.propTypes = {
//   prettify: PropTypes.bool,
//   routes: PropTypes.oneOfType([
//     PropTypes.object,
//     PropTypes.func
//   ])
// };

module.exports = { SitemapBuilder }
