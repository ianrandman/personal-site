/* eslint-disable */

const SitemapBuilder = require('./components/Sitemap/sitemap').SitemapBuilder;
const fetch = require('node-fetch');
const fs = require('fs');
const rides = require('./rides').rides;

process.env.REACT_APP_BACKEND_API_BASE_URL = 'https://ianrandman.pythonanywhere.com';
// process.env.REACT_APP_BACKEND_API_BASE_URL = 'http://localhost:5000';

const fetchBackend = (url, options) => {
  const finalUrl = process.env.REACT_APP_BACKEND_API_BASE_URL + url;
  return fetch(finalUrl, options);
};

let routes = [
  {
    path: '/',
    changefreq: "weekly",
    priority: 1
  },
  {
    path: '/about',
    changefreq: "weekly",
    priority: 0.3
  },
  {
    path: '/rides',
    changefreq: "weekly",
    priority: 0.3,
  },
  {
    path: '/fundraiser',
    changefreq: "weekly",
    priority: 0.3
  },
  {
    path: '/contact',
    changefreq: "weekly",
    priority: 0.3
  },
  {
    path: '/resume',
    changefreq: "weekly",
    priority: 0.3
  },
  {
    path: '/press',
    changefreq: "weekly",
    priority: 0.3
  }
]

async function Sitemap(base) {
  await Promise.all(
    rides.map(async (ride) => {
      const response = await fetchBackend(`/strava?get_all=True&ride_codename=${ride.codename}`);
      const jsonOutput = await response.json();

      routes = routes.concat(jsonOutput.map(activity => ({
          path: `/rides/${ride.codename}/blog/${activity.id}`,
          lastmod: new Date(activity.start_date * 1000).toISOString(),
          changefreq: 'weekly',
          priority: 0.45
        }
      )));

      // last activity for blog and route-map modifies date
      const activity = jsonOutput[jsonOutput.length - 1];

      routes = routes.concat({
        path: `/rides/${ride.codename}`,
        lastmod: activity ? new Date(activity.start_date * 1000).toISOString(): new Date(`${ride.startDate}-01`).toISOString(),
        changefreq: 'daily',
        priority: 0.75
      })

      routes = routes.concat({
        path: `/rides/${ride.codename}/blog`,
        lastmod: activity ? new Date(activity.start_date * 1000).toISOString(): new Date(`${ride.startDate}-01`).toISOString(),
        changefreq: 'daily',
        priority: 0.55
      })

      routes = routes.concat({
        path: `/rides/${ride.codename}/route-map`,
        lastmod: activity ? new Date(activity.start_date * 1000).toISOString(): new Date(`${ride.startDate}-01`).toISOString(),
        changefreq: 'weekly',
        priority: 0.5
      })

      // routes = [...routes, ...jsonOutput.map(activity => (
      //   {
      //     path: `/rides/${ride.codename}/blog/${activity.id}`,
      //     lastmod: new Date(activity.start_date * 1000).toISOString(),
      //     changefreq: 'weekly',
      //     priority: 0.5
      //   }
      // ))]
      // activity = jsonOutput[jsonOutput.length - 1];
      // routes = [...routes,
      //   {
      //     path: `/blog`,
      //     lastmod: new Date(activity.start_date * 1000).toISOString(),
      //     changefreq: 'daily',
      //     priority: 0.75
      //   }]

      // console.log(routes);
    })
  )

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

  // rides.map(ride => {
  //   response = fetchBackend(`/strava?get_all=True&ride_codename=${ride.codename}`)
  //     .then(
  //       response => response.json()
  //     )
  //     .then(jsonOutput => {
  //
  //
  //       var fs = require('fs');
  //       fs.writeFile(
  //         "public/sitemap.xml",
  //         SitemapBuilder(routes, base),
  //         function(error) {
  //           if (error) {
  //             console.log(error);
  //           } else {
  //             console.log("The file was saved!");
  //           }
  //         }
  //       );
  //     });
  // });

  // fetchBackend(`/strava?get_all=True`)
  //   .then(
  //     response => response.json()
  //   )
  //   .then(jsonOutput => {
  //     routes = [...routes, ...jsonOutput.map(activity => (
  //       {
  //         path: `/blog/${activity.id}`,
  //         lastmod: new Date(activity.start_date * 1000).toISOString(),
  //         changefreq: 'weekly',
  //         priority: 0.5
  //       }
  //     ))]
  //     activity = jsonOutput[jsonOutput.length - 1];
  //     routes = [...routes,
  //       {
  //         path: `/blog`,
  //         lastmod: new Date(activity.start_date * 1000).toISOString(),
  //         changefreq: 'daily',
  //         priority: 0.75
  //       }]
  //
  //     // console.log(routes);
  //
  //     var fs = require('fs');
  //     fs.writeFile(
  //       "public/sitemap.xml",
  //       SitemapBuilder(routes, base),
  //       function(error) {
  //         if (error) {
  //           console.log(error);
  //         } else {
  //           console.log("The file was saved!");
  //         }
  //       }
  //     );
  //   });
}

Sitemap('https://www.ianrandman.com');
