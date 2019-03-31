import React, { Component } from 'react';
import TileBoard from './TileBoard.js';
import Upload from './Upload.js';
import Report from './Report.js';
import './App.scss';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import SpeechRecognition from 'react-speech-recognition';

class App extends Component {
  constructor(props){
    super(props);
    this.stream = null;
    props.recognition.lang = 'en-US';
    props.stopListening();
    this.listening = false;
    window.addEventListener('click', () => {
      if(this.listening){
        props.stopListening();
      } else {
        props.startListening();
      }
      this.listening = !this.listening;
    })

    this.triggers = [
      {
        phrase: /form/,
        function: () => this.askQuestion.bind(this)('Are you a Bulgarion national?', [
          {text: 'yes', classes: 'bg-success'},
          {text: 'no', classes: 'bg-danger'},
        ], (reply) => {
          this.setState({
            file:{
              isEuCitizen: reply
            }
          });
          this.askQuestion.bind(this)('Are you a European Union citizen?', [
            {text: 'yes', classes: 'bg-success'},
            {text: 'not sure', classes: 'bg-secondary'},
            {text: 'no', classes: 'bg-danger'},
          ], (reply) => {
            let file = this.state.file;
            file.enjoysSnow = reply;
            this.setState({
              file: file
            });
            this.promptImageUpload();
            window.setTimeout(() => console.log(this.state.file), 500)
          });
        })
      },
      {
        phrase: /no/,
        function: () => this.askQuestion.bind(this)('Do you like green', [
          {text: 'yes', classes: 'bg-success'},
          {text: 'no', classes: 'bg-danger'},
        ])
      },
    ];


    this.hellos = ['Hello', 'Bonjour', 'Hallo', 'Buongiorno '];
    this.counter = 1;

    this.state = {
      mainInput: '',
      hello: this.hellos[0],
      classes: 'show',
      refine: '',
      waitingForPicture: false
    }
    this.updateInput = this.updateInput.bind(this);
    this.promptImageUpload = this.promptImageUpload.bind(this);
  }

  updateInput(e){
    this.setState({mainInput: e.target.value});
    for(let trigger of this.triggers){
      if(e.target.value.match(trigger.phrase)){
        trigger.function();
      }
    }
  }

  askQuestion(title, tiles, callback){
    let ref = (<TileBoard title={title} tiles={tiles} callback={callback} key={Math.random()}/>);
    this.setState({
      refine: ref
    });
  }

  promptImageUpload(){
    let ref = (<Upload key={Math.random()} takePic={() => this.setState({waitingForPicture: true})}/>);
    this.setState({
      refine: ref
    });
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


    }, 500);
  }

  async wait() {
    return new Promise(res => window.setTimeout(res,200));
  }

  componentWillUnmount(){
    window.clearInterval(this.interval);
  }

  title(){
    if(this.counter <= this.hellos.length)
      return (<h3 className={`fade ${this.state.classes}`}>{this.state.hello}</h3>);
    return (
      <div className="unroll mx-auto">
        <h3>Report an issue...</h3>
      </div>
    );
  }

  componentDidUpdate(old){
    console.log('componentDidUpdate');
    if(old.transcript != this.props.transcript)
      this.setState({mainInput: this.props.transcript});
    if(!this.state.analyzed){
      let input = document.querySelector('input');
      for(let trigger of this.triggers){
        if(input.value.match(trigger.phrase)){
          this.state.analyzed = true;
          trigger.function();
        }
      }
    }
  }

  afterPic(dataUri){
    this.setState({pic: dataUri, waitingForPicture: false});
  }

  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return "no stt";
    }
    if(this.state.waitingForPicture)
      return (<Camera idealFacingMode="environment" className="camera" onTakePhoto={this.afterPic.bind(this)}/>);
    if(this.state.pic)
      return (<Report pic={this.state.pic}/>);
    return (
      <div className="App">
        <div className="container d-flex flex-column justify-content-center page">
          <div className="container mw">
            {this.title()}
            <input className="mx-auto form-control form-control-sm" value={this.state.mainInput} onChange={this.updateInput}></input>
            {this.state.refine}
          </div>
        </div>
      </div>
    );
  }
}

export default SpeechRecognition(App);
