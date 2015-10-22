import React, { PropTypes, Component } from 'react';
import { Map, List } from 'immutable';
import SectionStyle from './styles/Section.css';
import withStyles from '../../decorators/withStyles';
@withStyles('Section', {SectionStyle})
class Section extends Component {

    static propTypes = {
        uiInitialStates: PropTypes.object.isRequired,
        getUiClassName: PropTypes.func.isRequired,
        uiType: PropTypes.string
    };

    state = {
        uiStates: Map(this.props.uiInitialStates)
    };

    render() {
        let uiClassName=this.props.getUiClassName(this.state.uiStates);
        switch(this.props.uiType) {
          case 'pillar':
                return(
                    <div className={uiClassName} data-uipart='main' data-layout='column'>
                      <div className={uiClassName} data-uipart='header'>
                        Hello
                      </div>
                      <div className={uiClassName} data-uipart='content'>
                        Whoops
                      </div>
                    </div>
                );
          default:
                return(
                  <div className={uiClassName} data-uipart='main'>OK</div>
                );
        }
    }

}

export default Section;
