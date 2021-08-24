/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

const path = require('path');
const services = require('./src/utils/services');

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
  {
    allItems: allOceAsset(filter: {taxonomies: {items: {elemMatch: {categories: {items: {elemMatch: {name: {ne: ""}}}}}}}}) {
      nodes {
        name
        staticURL
        taxonomies {
          items {
            categories {
              items {
                name
              }
            }
            name
          }
        }
      }
    }
  }`);

  const allImageAssets = result.data.allItems.nodes;
  console.log(`All Image ${allImageAssets.length}`);
  const simpleEntries = services.getSimplifiedEntries(allImageAssets);
  console.log(`Simple ${simpleEntries.length}`);
  const categoriesMap = services.getUniqueCategoryMap(simpleEntries);

  // Create the main page
  const categoriesArray = [...categoriesMap].map(([name, value]) => ({ name, value }));

  createPage({
    path: '/',
    component: path.resolve('src/templates/indexTemplate.jsx'),
    context: {
      categoriesArray,
    },
  });

  // For each category, we need to create its main page view. Pass the set of items to the
  // component as well as a category to match and display.

  categoriesMap.forEach((value, key) => {
    const category = key;
    const entries = value;
    createPage({
      path: `/${category}`,
      component: path.resolve('src/templates/categoryPageTemplate.jsx'),
      context: {
        category,
        entries,
      },
    });
  });
};
