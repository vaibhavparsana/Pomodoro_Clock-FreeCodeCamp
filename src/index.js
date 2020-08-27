import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const defultMunites = 25;
const defultBreak = 5;
const defultInterval = 1000;

const defultState = {
  breakTime: defultBreak,
  sessionTime: defultMunites,
  isBreak: true,
  isTimer: true,
  isPause: true,
  seconds: defultMunites * 60
};

let myInterval = setInterval(function () {

}, defultInterval);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = defultState;

    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);

    this.startBtn = this.startBtn.bind(this);
    this.resetBtn = this.resetBtn.bind(this);

    this.timer = this.timer.bind(this);
    clearInterval(myInterval);
  }



  startBtn() {
    clearInterval(myInterval);
    let countdown = 0;
    this.setState((state) => ({
      isPause: !state.isPause,
      isTimer: false
    }), () => {
      if (!this.state.isPause) {
        myInterval = setInterval(this.timer, defultInterval);
      }
    })

  }

  timer() {
    this.setState((state) => ({
      seconds: state.seconds - 1
    }), function () {

      if (this.state.seconds < 0) {
        clearInterval(myInterval);

        this.setState((state) => ({
          seconds: (state.isBreak ? state.breakTime : state.sessionTime) * 60,
          isBreak: !state.isBreak,
        }), () => {
          myInterval = setInterval(this.timer, defultInterval);
        })
      }
    })
  }
  resetBtn() {
    clearInterval(myInterval);
    this.setState(defultState);
    this.player.currentTime = 0;
    this.player.pause();
  }

  breakIncrement() {
    if (this.state.isTimer && this.state.breakTime <= 59) {
      this.setState((state) => ({
        breakTime: state.breakTime + 1
      }));
    }
  }
  breakDecrement() {
    if (this.state.isTimer && this.state.breakTime > 1) {
      this.setState((state) => ({
        breakTime: state.breakTime - 1
      }));
    }
  }
  sessionIncrement() {
    if (this.state.isTimer && this.state.sessionTime <= 59) {
      this.setState((state) => ({
        sessionTime: state.sessionTime + 1,
        seconds: (state.sessionTime + 1) * 60
      }));
    }
  }
  sessionDecrement() {
    if (this.state.isTimer && this.state.sessionTime > 1) {
      this.setState((state) => ({
        sessionTime: state.sessionTime - 1,
        seconds: (state.sessionTime - 1) * 60
      }));
    }
  }


  getFormatedReamaingTime() {
    if (this.state.seconds == 0) {
      this.player.src = 'https://themushroomkingdom.net/sounds/wav/smb/smb_gameover.wav';
      this.player.currentTime = 0;
      this.player.play();

    }
    let minutes = Math.floor(this.state.seconds / 60);
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return (`${minutes}:${(this.state.seconds % 60) < 10 ? '0' : ''}${(this.state.seconds % 60)}`);
  }

  render() {
    return (
      <div className="container">
        <div className="break-container">
          <h1 id="break-label">Break Length</h1>
          <h1 id="break-length">{this.state.breakTime}</h1>
          <button id="break-increment" onClick={this.breakIncrement}><i className="fa fa-arrow-up"></i></button>
          <button id="break-decrement" onClick={this.breakDecrement}><i className="fa fa-arrow-down"></i></button>
        </div>

        <div className="timer-container">
          <h1 id="timer-label" style={this.state.seconds < 60 ? { color: 'red' } : { color: 'white' }}>{!this.state.isBreak ? 'Break' : 'Session'}</h1>
          <h1 id="time-left" style={this.state.seconds < 60 ? { color: 'red' } : { color: 'white' }}>{this.getFormatedReamaingTime()}</h1>
          <button id="start_stop" onClick={this.startBtn}><i className= {this.state.isPause?"fa fa-play":"fa fa-pause"}></i></button>
          <button id="reset" onClick={this.resetBtn}><i className="fa fa-retweet"></i></button>
        </div>

        <div className="session-container">
          <h1 id="session-label">Session Length</h1>
          <h1 id="session-length">{this.state.sessionTime}</h1>
          <button id="session-increment" onClick={this.sessionIncrement}><i className="fa fa-arrow-up"></i></button>
          <button id="session-decrement" onClick={this.sessionDecrement}><i className="fa fa-arrow-down"></i></button>
        </div>
        <audio id="beep" ref={ref => this.player = ref} />

      </div>
    );
  }
};



ReactDOM.render(<App />, document.getElementById("root"));
