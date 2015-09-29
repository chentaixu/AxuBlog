import React, { PropTypes, Component } from 'react';
import { Map, List } from 'immutable';
import withStyles from '../../decorators/withStyles';
import LoaderStyle from './styles/Loader.css';


let name = 'Loader';
let styles = {LoaderStyle};

@withStyles(name,styles)
class Loader extends Component {

  static propTypes = {
    uiType: PropTypes.string.isRequired,
    uiInitialStates: PropTypes.object.isRequired,
    getUiClassName: PropTypes.func.isRequired
  };

  state = {
    uiStates: Map(this.props.uiInitialStates)
  };

  render(){
    return (
      <img className={this.props.getUiClassName(this.state.uiStates)} src={require('./svgs/'+this.props.uiType+'.svg')}/>
    );
  }
}

export default Loader;
