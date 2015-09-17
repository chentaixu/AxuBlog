import React, { PropTypes, Component } from 'react';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import AppStyle from './styles/App.css';

let name = 'App';
let styles = {AppStyle};

@withContext
@withStyles(name,styles)
class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  };

  render() {
    return !this.props.error ? (
      <div>
        {this.props.children}
      </div>
    ) : this.props.children;
  }

}

export default App;
