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
      show: 'show'
    }
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(e){
    this.setState({mainInput: e.target.value});
  }

  componentDidMount(){
    this.interval = window.setInterval(async () => {
      this.setState({
        show: ''
      });
      await this.wait();
      if(this.counter < this.hellos.length){
        this.setState({
          hello: this.hellos[this.counter++],
          show: 'show'
        });
      } else {
        this.setState({
          hello: 'Would you like to report an issue?',
          show: 'show'
        });
        window.clearInterval(this.interval);
      }


    }, 500);
  }

  async wait() {
    return new Promise(res => window.setTimeout(res,200));
  }

  componentWillUnmount(){
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">
        <div className="container d-flex flex-column justify-content-center page">
          <div className="container">
            <h1 className={`fade ${this.state.show}`}>{this.state.hello}</h1>
            <input className="form-control" onChange={this.updateInput}></input>
          </div>
        </div>
      </div>
    );
  }
}
