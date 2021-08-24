/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

import React from 'react';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import * as styles from './Gallery.module.css';

const Gallery = ({ allEntries, category }) => {
  function navigateToCategory() {
    navigate(`/${category}`);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      navigate(`/${category}`);
    }
  }

  return (
    <div
      className={styles.gallery}
      role="button"
      tabIndex={0}
      onClick={navigateToCategory}
      onKeyDown={(e) => handleKeyPress(e)}
    >
      <img
        src={allEntries[0].file}
        className={styles.mainPic}
        alt="Food"
      />
      <img
        src={allEntries[0].file}
        className={styles.item}
        alt="Food"
      />
      <img
        src={allEntries[1].file}
        className={styles.item}
        alt="Food"
      />
      <img
        src={allEntries[2].file}
        className={styles.item}
        alt="Food"
      />

      <div className={styles.textRow}>
        <h2 className={styles.title}>
          {' '}
          {category}
        </h2>
        <h3 className={styles.count}>
          {' '}
          {allEntries.length}
          {' '}
          photos
        </h3>
      </div>
    </div>
  );
};

Gallery.propTypes = {
  allEntries: PropTypes.instanceOf(Object).isRequired,
  category: PropTypes.string.isRequired,
};
export default Gallery;
