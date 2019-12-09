import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

var letters = {
  0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G',
  7: 'H', 8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N',
  14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T', 20: 'U',
  21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z',
};

var word = getWord();

class Hangman extends Component {
  render() {
    return (
      <h1></h1>
    );
  }
}

function Letter(props) {
  return (
    <h2>{props.value}</h2>
  );
}

class Word extends Component {
  renderLetter(i) {
    return (
      <Letter
        key={i}
        value={this.props.wordLetters[i]}
      />
    );
  }

  render() {
    var letters = Array(word.length).fill(null);
    for (let i = 0; i < word.length; i++) {
      letters[i] = this.renderLetter(i);
    }
    return (
      <div className="word-row">
        {letters}
      </div>
    );
  }
}

function Button(props) {
  var btnClass = null;
  if (props.value[1]) {
    if (props.value[2]) {
      btnClass = "buttonTrue";
    } else {
      btnClass = "buttonFalse";
    }
  } else {
    btnClass = "button";
  }

  return (
    <button className={btnClass} onClick={props.onClick}>
      {props.value[0]}
    </button>
  );
}

class Board extends Component {
  renderButton(i) {
    return (
      <Button
        value={[this.props.buttons[i], this.props.isClicked[i], this.props.isTrue[i]]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderButton(0)}
          {this.renderButton(1)}
          {this.renderButton(2)}
          {this.renderButton(3)}
          {this.renderButton(4)}
          {this.renderButton(5)}
          {this.renderButton(6)}
        </div>
        <div className="board-row">
          {this.renderButton(7)}
          {this.renderButton(8)}
          {this.renderButton(9)}
          {this.renderButton(10)}
          {this.renderButton(11)}
          {this.renderButton(12)}
          {this.renderButton(13)}
        </div>
        <div className="board-row">
          {this.renderButton(14)}
          {this.renderButton(15)}
          {this.renderButton(16)}
          {this.renderButton(17)}
          {this.renderButton(18)}
          {this.renderButton(19)}
          {this.renderButton(20)}
        </div>
        <div className="board-row">
          {this.renderButton(21)}
          {this.renderButton(22)}
          {this.renderButton(23)}
          {this.renderButton(24)}
          {this.renderButton(25)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);

    const buttons = Array(26).fill(null);
    const isClicked = Array(26).fill(false);
    const isTrue = Array(26).fill(false);
    for (let i = 0; i < buttons.length; i++) {
      buttons[i] = letters[i];
    }
    const wordLetters = Array(word.length).fill(null);
    for (let i = 0; i < word.length; i++) {
      wordLetters[i] = word.charAt(i);
    }

    this.state = {
      buttons: buttons,
      isClicked: isClicked,
      isTrue: isTrue,
      wordLetters: wordLetters,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const buttons = this.state.buttons.slice();
    const isClicked = this.state.isClicked.slice();
    isClicked[i] = true;
    let step = this.state.stepNumber + 1;

    const wordLetters = this.state.wordLetters.slice();
    let isIn = false;
    for (let lett of wordLetters) {
      if
    }

    this.setState({
      isClicked: isClicked,
      stepNumber: step,
    });
  }

  render() {
    const buttons = this.state.buttons.slice();
    const isClicked = this.state.isClicked.slice();
    const isTrue = this.state.isTrue.slice();
    const wordLetters = this.state.wordLetters.slice();

    return (
      <div className="game">
        <div className="hangman">
          <Hangman />
        </div>
        <div className="word">
          <Word
            wordLetters={wordLetters}
          />
        </div>
        <div className="game-board">
          <Board
            buttons={buttons}
            isClicked={isClicked}
            isTrue={isTrue}
            onClick={i => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Game />
    );
  }
}

export default App;

// ========================================================================
// Additional stuff
// ========================================================================

function getWord() {
  var words;

  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", "dict.txt", false);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        var allText = rawFile.responseText;
        words = allText.split('\n');
      }
    }
  }
  rawFile.send(null);

  var rand = 0 + Math.random() * (words.length + 1 - 0);
  return words[Math.floor(rand)];
}
