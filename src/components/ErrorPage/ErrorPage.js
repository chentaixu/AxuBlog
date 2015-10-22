/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component, PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import ErrorPageStyle from './styles/ErrorPage.css';

@withStyles('ErrorPage', {ErrorPageStyle})
class ErrorPage extends Component {

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
