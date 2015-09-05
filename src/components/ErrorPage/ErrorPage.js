/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import lightish from './styles/lightish.css';
import darkish from './styles/darkish.css';

let name = 'ErrorPage';
let styles = {lightish,darkish};

@withStyles(name, styles)
class ErrorPage {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired
  };

  render() {
    let title = 'Error';
    this.context.onSetTitle(title);
    return (
      <div>
        <h1>{title}</h1>
        <p>Sorry, an critical error occurred on this page.</p>
      </div>
    );
  }

}

export default ErrorPage;
