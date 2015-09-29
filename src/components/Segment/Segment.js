import React, { PropTypes, Component } from 'react';
import { Map, List } from 'immutable';
import SegmentStyle from './styles/Segment.css';
import withStyles from '../../decorators/withStyles';

let name = 'Segment';
let styles = {SegmentStyle};

@withStyles(name,styles)
class Segment extends Component {

  static propTypes = {
    uiInitialStates: PropTypes.object.isRequired,
    getUiClassName: PropTypes.func.isRequired
  };

  state = {
    uiStates: Map(this.props.uiInitialStates)
  };

  render(){
    return (
      <div className={this.props.getUiClassName(this.state.uiStates)}>
        {this.props.children}
      </div>
    );
  }

}

export default Segment;
