/* eslint-disable */

const { fetchBackend } = require('./FetchConfig');
const SitemapBuilder = require('./components/Sitemap/sitemap').SitemapBuilder;

let routes = [
  {
    path: '/',
    changefreq: "weekly",
    priority: 1
  },
  {
    path: '/about',
    changefreq: "weekly",
    priority: 0.5
  },
  {
    path: '/routeMap',
    changefreq: "weekly",
    priority: 0.5
  },
  {
    path: '/fundraiser',
    changefreq: "weekly",
    priority: 0.5
  },
  {
    path: '/contact',
    changefreq: "weekly",
    priority: 0.5
  },
  {
    path: '/resume',
    changefreq: "weekly",
    priority: 0.5
  },
  {
    path: '/press',
    changefreq: "weekly",
    priority: 0.5
  }
]

function Sitemap(base) {
  fetchBackend(`/strava?get_all=True`)
    .then(
      response => response.json()
    )
    .then(jsonOutput => {
      routes = [...routes, ...jsonOutput.map(activity => (
        {
          path: `/blog/${activity.id}`,
          publicationDate: activity.start_date,
          changefreq: 'weekly',
          priority: 0.5
        }
      ))]
      activity = jsonOutput[jsonOutput.length - 1];
      routes = [...routes,
        {
          path: `/blog`,
          publicationDate: activity.start_date,
          changefreq: 'daily',
          priority: 0.75
        }]

      // console.log(routes);

      var fs = require('fs');
      fs.writeFile(
        "public/sitemap.xml",
        SitemapBuilder(routes, base),
        function(error) {
          if (error) {
            console.log(error);
          } else {
            console.log("The file was saved!");
          }
        }
      );
    });
}

Sitemap('http://www.ianrandman.com');
