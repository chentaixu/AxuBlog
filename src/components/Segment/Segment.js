import React, { PropTypes, Component } from 'react';
import SegmentStyle from './styles/Segment.css';
import withStyles from '../../decorators/withStyles';

let name = 'Segment';
let styles = {SegmentStyle};

@withStyles(name,styles)
class Segment extends Component {

  static propTypes = {
    uiType: PropTypes.string,
    uiInitialStates: PropTypes.instanceOf(Map),
    getUiClassName: PropTypes.func.isRequired
  };

  state = {
    uiStates: this.props.uiInitialStates?this.props.uiInitialStates:new Map()
  };

  render(){
    return (
      <div className={this.props.getUiClassName(this.props.uiType,this.state.uiStates)}>
        {this.props.children}
      </div>
    );
  }

}

export default Segment;
