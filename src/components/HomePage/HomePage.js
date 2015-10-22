import React, { PropTypes, Component } from 'react';
import { Map, List } from 'immutable';
import HomePageStyle from './styles/HomePage.css';
import withStyles from '../../decorators/withStyles';
import Section from '../Section';

@withStyles('HomePage', {HomePageStyle})
class HomePage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  static propTypes = {
      uiInitialStates: PropTypes.object.isRequired,
      getUiClassName: PropTypes.func.isRequired
  };

  state = {
      uiStates: Map(this.props.uiInitialStates)
  };

  render() {
    this.context.onSetTitle('AXU.IO > Home');
    let uiClassName=this.props.getUiClassName(this.state.uiStates);
    return (
      <div data-layout='column'>
        <div data-layout='row' data-viewport-hide={'mobile tablet'}>
            <Section uiType={'pillar'}/>
            <Section uiType={'pillar'}/>
            <Section/>
            <Section uiType={'pillar'}/>

        </div>
        <div data-layout='row' data-viewport-hide={'mobile tablet'}>
          <Section uiType={'pillar'}/>
          <Section uiType={'pillar'}/>
          <Section/>
          <Section uiType={'pillar'}/>
        </div>
      </div>
    );
  }

}

export default HomePage;
