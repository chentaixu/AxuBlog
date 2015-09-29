import React, { PropTypes, Component } from 'react';
import { Map, List } from 'immutable';
import withStyles from '../../decorators/withStyles';
import ButtonStyle from './styles/Button.css';
import Loader from '../Loader';

let name = 'Button';
let styles = {ButtonStyle};

@withStyles(name,styles)
class Button extends Component {

  handleMouseOver = (event) => {
    if(this.state.uiStates.get('attention')!=='fixed') {
      this.setState(({uiStates}) => ({uiStates: uiStates.set('attention', 'focus')}));
    }
  };

  handleMouseOut = (event) => {
    if(this.state.uiStates.get('attention')!=='fixed') {
      this.setState(({uiStates}) => ({uiStates: uiStates.delete('attention')}));
    }
  };

  handleMouseDown = (event) => {
    let originalAttention = this.state.uiStates.get('attention');
    if(originalAttention!=='fixed') {
      this.setState(({uiStates}) => ({uiStates: uiStates.set('attention','interact')}));
      this.setState(({lastAttention}) => ({lastAttention:originalAttention}));
    }
  };

  handleMouseUp = (event) => {
    if(this.state.uiStates.get('attention')!=='fixed') {
      this.state.lastAttention?this.setState(({uiStates}) => ({uiStates: uiStates.set('attention',this.state.lastAttention)})):this.setState(({uiStates}) => ({uiStates: uiStates.delete('attention')}));
    }
  };

  static propTypes = {
    uiInitialStates: PropTypes.object.isRequired,
    getUiClassName: PropTypes.func.isRequired
  };

  state = {
    uiStates: Map(this.props.uiInitialStates),
    lastAttention: ''
  };

  render(){
    return (
      <button className={this.props.getUiClassName(this.state.uiStates)}  onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
