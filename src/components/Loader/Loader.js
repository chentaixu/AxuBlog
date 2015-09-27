import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import LoaderStyle from './styles/Loader.css';


let name = 'Loader';
let styles = {LoaderStyle};

@withStyles(name,styles)
class Loader extends Component {

  static propTypes = {
    uiType: PropTypes.string.isRequired,
    uiInitialStates: PropTypes.instanceOf(Map),
    getUiClassName: PropTypes.func.isRequired
  };

  state = {
    uiStates: this.props.uiInitialStates?this.props.uiInitialStates:new Map()
  };

  render(){

    return (
      <img className={this.props.getUiClassName(this.props.uiType,this.state.uiStates)} src={require('./svgs/'+this.props.uiType+'.svg')}/>
    );
  }
}

export default Loader;
