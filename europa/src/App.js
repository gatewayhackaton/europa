import React, { Component } from 'react';
import './App.scss';

export default class App extends Component {
  constructor(props){
    super(props);
    this.hellos = ['Hello', 'Bonjour', 'Hallo', 'Buongiorno '];
    this.counter = 1;

    this.state = {
      mainInput: '',
      hello: this.hellos[0],
      classes: 'show'
    }
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(e){
    this.setState({mainInput: e.target.value});
  }

  componentDidMount(){
    this.interval = window.setInterval(async () => {
      this.setState({
        classes: ''
      });
      await this.wait();
      if(this.counter <= this.hellos.length){
        this.setState({
          hello: this.hellos[this.counter++],
          classes: 'show'
        });
      } else {
        window.clearInterval(this.interval);
      }


    }, 2500);
  }

  async wait() {
    return new Promise(res => window.setTimeout(res,200));
  }

  componentWillUnmount(){
    window.clearInterval(this.interval);
  }

  render() {
    if(this.counter <= this.hellos.length)
      return (
        <div className="App">
          <div className="container d-flex flex-column justify-content-center page">
            <div className="container mw">
              <h3 className={`fade ${this.state.classes}`}>{this.state.hello}</h3>
              <input className="mx-auto form-control form-control-sm" onChange={this.updateInput}></input>
            </div>
          </div>
        </div>
      );
    return (
      <div className="App">
        <div className="container d-flex flex-column justify-content-center page">
          <div className="container mw d-flex flex-column align-items-center">
            <div className={`unroll`}>
              <h3>Report an issue...  </h3>
            </div>
            <input className="mx-auto form-control form-control-sm" onChange={this.updateInput}></input>
          </div>
        </div>
      </div>
    );
  }
}
