/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Gallery from '../components/Gallery';
import * as styles from './indexTemplate.module.css';

const Home = ({ pageContext: { categoriesArray } }) => (
  <>
    <h1 className={styles.heading}>Image Gallery</h1>
    <div className={styles.galleryContainer}>
      {categoriesArray.map((item) => (
        <Gallery key={item.name} allEntries={item.value} category={item.name} />
      ))}
    </div>
  </>
);

Home.propTypes = {
  pageContext: PropTypes.instanceOf(Object).isRequired,
};
export default Home;
