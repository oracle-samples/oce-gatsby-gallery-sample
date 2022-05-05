/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */

import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Gallery from '../components/Gallery';
import * as styles from './indexTemplate.module.css';

const Home = ({ pageContext: { categoriesArray, buildTag } }) => {
  const BUILD_TAG = buildTag || 'none';
  const sdkPackage = require('/node_modules/@oracle/gatsby-source-oce/package.json');
  const SDK_VERSION = sdkPackage.version;

  return (
    <>
      <Helmet>
        <meta name="description" content="Sample Gallery app created in Gatsby that uses Oracle Content Management" />
        <meta name="BUILD_TAG" content={`${BUILD_TAG}`} />
        <meta name="@oracle/gatsby-source-oce" content={`${SDK_VERSION}`} />
      </Helmet>
      <h1 className={styles.heading}>Image Gallery</h1>
      <div className={styles.galleryContainer}>
        {categoriesArray.map((item) => (
          <Gallery key={item.name} allEntries={item.value} category={item.name} />
        ))}
      </div>
    </>
  );
};

Home.propTypes = {
  pageContext: PropTypes.instanceOf(Object).isRequired,
};
export default Home;
