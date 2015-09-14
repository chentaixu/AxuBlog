import React, { PropTypes, Component } from 'react';
import SegmentStyle from './styles/Segment.css';
import withStyles from '../../decorators/withStyles';

let name = 'Segment';
let styles = {SegmentStyle};

@withStyles(name,styles)
class Segment extends Component {

  static propTypes = {
    uiString: PropTypes.string.isRequired
  };


  render(){
    return (
      <div className={this.props.uiString}>
        {this.props.children}
      </div>
    );
  }

}

export default Segment;
