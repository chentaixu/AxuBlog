/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, { PropTypes, Component } from 'react';
import { Map, List } from 'immutable';
import ContentPageStyle from './styles/ContentPage.css';
import withStyles from '../../decorators/withStyles';
import Segment from '../Segment';
import Button from '../Button';
import Loader from '../Loader';

@withStyles('ContentPage',{ContentPageStyle})
class ContentPage extends Component {


  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string,
    uiInitialStates: PropTypes.object.isRequired,
    getUiClassName: PropTypes.func.isRequired
  };


  state = {
    uiStates: Map(this.props.uiInitialStates)
  };


  render() {
    this.context.onSetTitle(this.props.title);
    return (
          <div>
            Unit
          </div>
    );
  }

}

export default ContentPage;
