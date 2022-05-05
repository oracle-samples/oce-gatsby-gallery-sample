/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require('dotenv').config();

module.exports = {
  pathPrefix: process.env.PATH_PREFIX,
  // Add support for loading some images from local filesystem
  plugins: [
    {
      resolve: '@oracle/gatsby-source-oce',
      options: {
        name: 'oce',
        contentServer: process.env.SERVER_URL,
        channelToken: process.env.CHANNEL_TOKEN,
        proxyUrl: process.env.PROXY_URL,
        items: {
          limit: 100,
          query: '',
        },
        renditions: 'none',
        staticAssetDownload: true,
        // This determines the base directory in the path for the assets.
        //  Used when staticAssetDownload is true
        staticAssetRootDir: 'contentServer',
        staticUrlPrefix: process.env.PATH_PREFIX,
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
  ],
};
