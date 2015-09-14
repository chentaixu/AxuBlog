/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react'; // eslint-disable-line no-unused-vars
import invariant from 'fbjs/lib/invariant';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

let count = 0;
let DEFAULT_TYPE='default';
let VARIANT_TYPE='variant';

const getThemeStyle = (name, cssTheme, variant) => !variant? cssTheme[name][DEFAULT_TYPE]:cssTheme[name][VARIANT_TYPE][variant];

const getUiAttributes = (attrs, style) => {
  let uiString = '';
  if(!(attrs instanceof Array)) return uiString;
  attrs.map((attr)=>{
    let localAttr = style.locals[attr];
    localAttr? (uiString=uiString+localAttr+' '):(uiString=uiString+attr+' ');
  });
  return uiString.trim();
};

function withStyles(name, styles) {
  return (ComposedComponent) => class WithStyles extends Component {

    static propTypes = {
      variant: PropTypes.string,
      uiList: PropTypes.array

    };

    static contextTypes = {
      onInsertCss: PropTypes.func.isRequired,
      cssTheme: PropTypes.object.isRequired
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
      this.themeStyle =  getThemeStyle(name, this.context.cssTheme, this.props.variant);
      if (canUseDOM) {
        invariant(styles[this.themeStyle].use, `The style-loader must be configured with reference-counted API.`);
        styles[this.themeStyle].use();
      } else {
        this.context.onInsertCss(styles[this.themeStyle].toString());
      }
    }

    componentWillUnmount() {
      styles[this.themeStyle].unuse();
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
      let styleObj = styles[this.themeStyle];
      let {uiList, ...other} = this.props;
      let uiStringVal = getUiAttributes(uiList,styleObj);
      return <ComposedComponent {...other} uiString={uiStringVal}/>;
    }

  };
}

export default withStyles;
