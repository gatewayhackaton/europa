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

  async dismiss(reply){
    this.setState({
      animation: 'fadeOutDown'
    });
    await new Promise(res => window.setTimeout(res,500));
    if(typeof this.props.callback != 'undefined')
      this.props.callback(reply);
  }

  tiles(){
    return this.props.tiles.map((t,i) => (<Tile classes={t.classes} text={t.text} interact={() => this.dismiss(t.text)} key={i}/>));
  }

  render(){
    return (
      <div className={"d-flex flex-column align-items-center pt-3 animated "+this.state.animation}>
        <h5 className="tile-title">{this.props.title}</h5>
        <div className="d-flex align-items-center pt-3">
          {this.tiles()}
        </div>
      </div>
    );
  }
}
