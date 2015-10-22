import React, { PropTypes, Component } from 'react';
import { Map, List } from 'immutable';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';
import AppStyle from './styles/App.css';
import NavigationBar from '../NavigationBar';

@withViewport
@withContext
@withStyles('App',{AppStyle})
class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  };

  static contextTypes = {
    viewport: PropTypes.object.isRequired
  };


  render() {
    return !this.props.error ? (
      <div data-layout='app'>
        <NavigationBar/>
        {this.props.children}
      </div>
    ) : this.props.children;
  };

}

export default App;
