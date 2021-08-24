/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

import React from 'react';
import { Link } from 'gatsby';

export default function error() {
  return (
    <div className="errorMessage">
      return
      {' '}
      <h1 className="error">Sorry, the page you are requesting has not been found.</h1>
      ;
      <Link to="/">Click here to go to the main page</Link>
    </div>
  );
}
