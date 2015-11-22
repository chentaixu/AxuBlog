/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react'; // eslint-disable-line no-unused-vars
import invariant from 'fbjs/lib/invariant';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

let count = 0;

const getUiClassNameMapping = (style, uiName, uiType) => (uiStates) => {
  let localUiName = style.locals[uiName]?style.locals[uiName]:'';
  let localUiType = style.locals[uiName+'--'+uiType]?style.locals[uiName+'--'+uiType]:'';
  let localUiStates = '';
  for (let [stateType,stateVal] of uiStates) {
    if(style.locals[stateType+'-is-'+stateVal]) {
      localUiStates = localUiStates + style.locals[stateType + '-is-' + stateVal] + ' ';
    }
  }
  return (localUiName+' '+localUiType+' '+localUiStates).trim();
};

function withStyles(name, styles) {
  return (ComposedComponent) => class WithStyles extends Component {

    static contextTypes = {
      onInsertCss: PropTypes.func.isRequired,
      cssTheme: PropTypes.object.isRequired
    };

    state = {
      themeStyle: ''
    };

    constructor() {
      super();
      this.refCount = 0;
      ComposedComponent.prototype.renderCss = function (css) {
        let style;
        if (canUseDOM) {
          if (this.styleId && (style = document.getElementById(this.styleId))) {
            if ('textContent' in style) {
              style.textContent = css;
            } else {
              style.styleSheet.cssText = css;
            }
          } else {
            this.styleId = `dynamic-css-${count++}`;
            style = document.createElement('style');
            style.setAttribute('id', this.styleId);
            style.setAttribute('type', 'text/css');

            if ('textContent' in style) {
              style.textContent = css;
            } else {
              style.styleSheet.cssText = css;
            }

            document.getElementsByTagName('head')[0].appendChild(style);
            this.refCount++;
          }
        } else {
          this.context.onInsertCss(css);
        }
      }.bind(this);
    }

    componentWillMount() {
      let themeStyle = this.context.cssTheme[name];
      this.setState({themeStyle});
      if (canUseDOM) {
        invariant(styles[themeStyle].use, `The style-loader must be configured with reference-counted API.`);
        styles[themeStyle].use();
      } else {
        this.context.onInsertCss(styles[themeStyle].toString());
      }
    }

    componentWillUnmount() {
      styles[this.state.themeStyle].unuse();
      if (this.styleId) {
        this.refCount--;
        if (this.refCount < 1) {
          let style = document.getElementById(this.styleId);
          if (style) {
            style.parentNode.removeChild(style);
          }
        }
      }
    }

    render() {
      let uiStyle = styles[this.state.themeStyle];
      let { uiInitialStates, ...other} = this.props;
      let getUiClassName = getUiClassNameMapping(uiStyle, name, this.props.uiType);
      if(!uiInitialStates) uiInitialStates = {};

      return <ComposedComponent {...other} getUiClassName = {getUiClassName} uiInitialStates={uiInitialStates}/>;
    }

  };
}

export default withStyles;
