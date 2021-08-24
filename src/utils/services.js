/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

function getTaxonomyObjects(rawTaxonomies) {
  if (rawTaxonomies.items === undefined || rawTaxonomies.items.length === 0) {
    return [{ categories: [] }];
  }
  const taxonomies = rawTaxonomies.items.map((tax) => {
    const taxonomyEntry = { name: tax.name, categories: [] };
    if (tax.categories.items !== undefined && tax.categories.items.length !== 0) {
      taxonomyEntry.categories = tax.categories.items.map((cat) => cat.name);
    }
    return taxonomyEntry;
  });

  return taxonomies;
}

// Simplify the data returned by GraphQL
function collapseImageData(entry) {
  const simplifiedEntry = {
    name: entry.name,
    file: entry.staticURL,
    taxonomies: getTaxonomyObjects(entry.taxonomies),
  };
  return simplifiedEntry;
}

exports.getSimplifiedEntries = (allImageAssets) => {
  // Simplify the assets by removing extraneous data and cleaning up
  // taxonomy/category entries which are null

  const simpleEntries = allImageAssets.map(collapseImageData);

  return simpleEntries;
};

exports.getUniqueCategoryMap = (simpleEntries) => {
  // Will be a map of category names to a list of entries that share that category.
  // Note that items may have no categories at all, so the code checks for that first

  const categoriesMap = new Map();
  simpleEntries.forEach((entry) => {
    entry.taxonomies.forEach((tax) => {
      tax.categories.forEach((cat) => {
        if (categoriesMap.has(cat)) {
          categoriesMap.get(cat).push(entry);
        } else {
          categoriesMap.set(cat, [entry]);
        }
      });
    });
  });
  // Add in a catch-all category with all entries
  categoriesMap.set('Food', simpleEntries);

  return categoriesMap;
};
