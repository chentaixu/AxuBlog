/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ContentPageStyle from './styles/ContentPage.css';
import withStyles from '../../decorators/withStyles';
import Container from '../Container';
import Segment from '../Segment';

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
        <Container uiList={['container','text']}>
          <Segment uiList={['segment','red']}>
          {
            this.props.path === '/' ? null : <h1>{this.props.title}</h1>
          }
          <div dangerouslySetInnerHTML={{__html: this.props.content || ''}} />
          </Segment>
        </Container>
      </div>
    );
  }

}

export default ContentPage;
