import React, { Component } from 'react';
import Tile from './Tile.js';

export default class TileBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      animation: 'fadeInUp'
    }
    this.dismiss = this.dismiss.bind(this);
  }

  async dismiss(file){
    this.setState({
      animation: 'fadeOutDown'
    });
    await new Promise(res => window.setTimeout(res,500));
    if(typeof this.props.callback != 'undefined')
      this.props.callback(file);
  }

  render(){
    return (
      <div className={"d-flex flex-column align-items-center pt-3 animated "+this.state.animation}>
        <h5 className="tile-title">{this.props.title}</h5>
        <div className="d-flex align-items-center pt-3">

          <div className="input-group mb-3">
            <div className="custom-file">
            <h5 className="tile-title">{this.props.title}</h5>
              <Tile classes="tile bg-secondary" text="browse..." interact={() => {
                this.dismiss();
                document.querySelector('#file-input').click();
              }}/>
              <input type="file" className="custom-file-input tile" id="file-input" hidden></input>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
