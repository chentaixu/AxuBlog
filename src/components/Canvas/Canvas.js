import React, { PropTypes, Component } from 'react';
import { Map, List } from 'immutable';

class Canvas extends Component {

    static contextTypes = {
        viewport: PropTypes.object.isRequired
    };

    static propTypes = {
        layers: PropTypes.array.isRequired
    };

    drawCanvas() {
        let height = this.canvasDiv.scrollHeight;
        let width = this.canvasDiv.offsetWidth;
        let canvasObj = this;
        this.props.layers.map(function(layer){
            let layerNumber = 'layer'+layer.index;
            let canvas = canvasObj[layerNumber];

            canvas.width = width;
            canvas.height= height;
            layer.toDraw(canvas,width,height);
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

    componentDidUpdate() {
        this.drawCanvas();
    }

}

export default Canvas;
