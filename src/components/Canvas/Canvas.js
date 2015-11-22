import React, { PropTypes, Component } from 'react';
import { Map, List } from 'immutable';

class Canvas extends Component {

    static contextTypes = {
        viewport: PropTypes.object.isRequired
    };

    static propTypes = {
        toDraw: PropTypes.func.isRequired
    };


    drawCanvas() {
        let canvas = this.canvasNode;
        let height = this.canvasDiv.offsetHeight;
        let width = this.canvasDiv.offsetWidth;
        this.props.toDraw(canvas,width,height);
    };

    render() {
        return (
            <div ref={(ref)=>this.canvasDiv=ref} data-layout='canvas'>
              <canvas ref={(ref)=>this.canvasNode=ref} />
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
