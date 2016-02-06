import React, { PropTypes, Component } from 'react';
import { Map, List } from 'immutable';

class Canvas extends Component {

    static contextTypes = {
        viewport: PropTypes.object.isRequired
    };

    static propTypes = {
        layers: PropTypes.array.isRequired
    };

    state = {
      intervals: List()
    };

    drawCanvas() {
        let height = this.canvasDiv.offsetHeight;
        let width = this.canvasDiv.offsetWidth;
        let canvasObj = this;

        this.props.layers.map(function(layer){
            let layerNumber = 'layer'+layer.index;
            let canvas = canvasObj[layerNumber];
            let intervalFuncs= layer.toDraw(canvas,width,height);
            if(intervalFuncs) {
              canvasObj.setState(({intervals})=>({intervals:canvasObj.state.intervals.push(...intervalFuncs)}));
            }

        });
    };

    render() {
        let canvasObj = this;
        return (
            <div ref={(ref)=>this.canvasDiv=ref} data-layout='canvas' style={{overflow:"hidden"}}>
              {this.props.layers.map(function(layer) {
                let layerNumber = 'layer'+layer.index;
                return <canvas key={layer.index} ref={(ref)=>canvasObj[layerNumber]=ref} style={{zIndex:layer.index,position:"absolute", top:0,left:0}}/>;})}
            </div>
        );
    }


    componentDidMount() {
       this.drawCanvas();
    }

    componentWillReceiveProps() {
      this.state.intervals.forEach(function(interval){
        clearInterval(interval);
      });
      this.setState(({intervals})=>({intervals:List()}));
      this.drawCanvas();
    }

}

export default Canvas;
