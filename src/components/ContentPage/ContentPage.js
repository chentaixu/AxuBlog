/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ContentPageStyle from './styles/ContentPage.css';
import withStyles from '../../decorators/withStyles';
import Container from '../Container';
import Segment from '../Segment';
import Button from '../Button';
import Loader from '../Loader';

let name = 'ContentPage';
let styles = {ContentPageStyle};

@withStyles(name,styles)
class ContentPage extends Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    this.context.onSetTitle(this.props.title);
    return (
      <div>
          <Container uiType={'text'} uiInitialStates={{alignment:'toRight'}}>
            <Segment uiType={'stacked'} uiInitialStates={{color:'red'}}>
          {
            this.props.path === '/' ? null : <h1>{this.props.title}</h1>
          }
          <div dangerouslySetInnerHTML={{__html: this.props.content || ''}} />
              <Button/> <Button uiInitialStates={{attention:'fixed'}}/>
              </Segment>
          </Container>
      </div>
    );
  }

}

export default ContentPage;
