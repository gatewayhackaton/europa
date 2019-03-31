import React, { Component } from 'react';

export default class Tile extends Component {
  render(){
    return (
      <div className={`tile ${this.props.classes} d-flex flex-column align-items-center justify-content-center`}
        onClick={this.props.interact}>
        {this.props.text}
      </div>
    )
  }
}
