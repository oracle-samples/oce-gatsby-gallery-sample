/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import * as styles from './categoryPageTemplate.module.css';
import backImage from '../images/back.png';

const CategoryPageTemplate = ({ pageContext: { category, entries, buildTag } }) => {
  const [imageIndex, setImageIndex] = useState(-1);

  function handleGridKeyPress(e, index) {
    if (e.key === 'Enter') {
      setImageIndex(index);
    }
  }

  function openLargeView(index) {
    setImageIndex(index);
  }

  function closeLargeView(e) {
    if ((e.type === 'keydown') && (e.key === 'Tab')) {
      return;
    }

    setImageIndex(-1);
  }

  function previousImage(e) {
    if ((e.type === 'keydown') && (e.key === 'Tab')) {
      return;
    }

    if (imageIndex >= 0) {
      setImageIndex(imageIndex - 1);
    } else {
      setImageIndex(0);
    }
  }
  function nextImage(e) {
    if ((e.type === 'keydown') && (e.key === 'Tab')) {
      return;
    }

    if (imageIndex === entries.length - 1) {
      setImageIndex(0);
    } else {
      setImageIndex(imageIndex + 1);
    }
  }

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
      <Link to="/"><img className={styles.homeButton} src={backImage} alt="back" /></Link>
      <h1 className={styles.heading}>{category}</h1>
      <h4 className={styles.subHeading}>
        {entries.length}
        {' '}
        photos
      </h4>

      <div className={styles.grid}>
        {entries.map((entry, index) => (
          <div key={entry.id}>
            <img
              src={entry.file}
              alt="Food Pic"
              className={styles.gridItem}
              onClick={() => openLargeView(index)}
              onKeyDown={(e) => handleGridKeyPress(e, index)}
              role="link"
              aria-label="photo"
              tabIndex={0}
            />
          </div>
        ))}
      </div>
      <ReactModal
        className={styles.largeDialogStyle}
        isOpen={imageIndex >= 0}
        onRequestClose={closeLargeView}
        ariaHideApp={false}
      >
        <div
          className={styles.closeButton}
          role="button"
          tabIndex={0}
          onClick={(e) => closeLargeView(e)}
          onKeyDown={(e) => closeLargeView(e)}
        >
          X
        </div>
        <div className={styles.bigView}>
          <div
            className={imageIndex === 0 ? `${styles.navButton} ${styles.hidden}` : styles.navButton}
            role="button"
            tabIndex={0}
            onClick={(e) => previousImage(e)}
            onKeyDown={(e) => previousImage(e)}
          >
            &#10094;
          </div>
          <img
            src={entries[imageIndex === -1 ? 0 : imageIndex].file}
            className={styles.largeImageStyle}
            alt="Large Food Pic"
          />

          <div
            className={imageIndex === entries.length - 1 ? `${styles.navButton} ${styles.hidden}` : styles.navButton}
            role="button"
            tabIndex={0}
            onClick={(e) => nextImage(e)}
            onKeyDown={(e) => nextImage(e)}
          >
            &#10095;
          </div>

        </div>
        <div className={styles.modalText}>
          {imageIndex + 1}
          /
          {entries.length}
        </div>

      </ReactModal>
    </>
  );
};

CategoryPageTemplate.propTypes = {
  pageContext: PropTypes.instanceOf(Object).isRequired,
};
export default CategoryPageTemplate;
