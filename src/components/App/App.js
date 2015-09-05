/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import lightish from './styles/lightish.css';
import darkish from './styles/darkish.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';

let name = 'App';
let styles = {lightish,darkish};

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
