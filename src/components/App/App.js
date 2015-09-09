/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import AppStyle from './styles/App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';

let name = 'App';
let styles = {AppStyle};

@withContext
@withStyles(name,styles)
class App {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  };

  render() {
    return !this.props.error ? (
      <div>
        <h1>I am dumb</h1>
        {this.props.children}
      </div>
    ) : this.props.children;
  }

}

export default App;
