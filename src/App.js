import React, { Component } from 'react';

var letters = {
  0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G',
  7: 'H', 8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N',
  14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T', 20: 'U',
  21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z',
};

var word = getWord();

function Hangman(props) {
  const filepath = "./hangman/" + props.value + ".png";
  return (
    <img src={filepath} alt=""></img>
  );
}

function Letter(props) {
  return (
    <h2 className={props.value[1]}>{props.value[0]}</h2>
  );
}

class Word extends Component {
  renderLetter(i) {
    var letterClass = "letterHidden";
    this.props.isShown[i] ? letterClass = "letterShown" : {};

    return (
      <Letter
        key={i}
        value={[this.props.wordLetters[i], letterClass]}
      />
    );
  }

  render() {
    var letters = Array(word.length).fill(null);
    for (let i = 0; i < word.length; i++) {
      letters[i] = this.renderLetter(i);
    }
    return (
      <div className="word">
        {letters}
      </div>
    );
  }
}

function RestartButton(props) {
  return (
    <button className="restartButton" onClick={props.onClick}>
      RESTART
    </button>
  );
}

function Button(props) {
  var btnClass = "button";

  if (props.value[1] != null) {
    props.value[1] ? btnClass = "buttonTrue" : btnClass = "buttonFalse";
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
        value={[this.props.buttons[i], this.props.isTrue[i]]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="game-board">
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
    const isTrue = Array(26).fill(null);
    for (let i = 0; i < buttons.length; i++) {
      buttons[i] = letters[i];
    }
    const wordLetters = Array(word.length).fill(null);
    for (let i = 0; i < word.length; i++) {
      wordLetters[i] = word.charAt(i);
    }
    const isShown = Array(word.length).fill(false);

    this.state = {
      buttons: buttons,
      isTrue: isTrue,
      wordLetters: wordLetters,
      isShown: isShown,
      stepNumber: 6,
    };
  }

  handleClick(i) {
    const buttons = this.state.buttons.slice();
    const isTrue = this.state.isTrue.slice();
    const wordLetters = this.state.wordLetters.slice();
    const isShown = this.state.isShown.slice();
    let stepNumber = this.state.stepNumber;

    if (isShown.every(ifTrue) || stepNumber === 0) {
      return;
    }

    if (wordLetters.indexOf(buttons[i].toLowerCase()) >= 0) {
      isTrue[i] = true;
      for (let j = 0; j < wordLetters.length; j++) {
        wordLetters[j] === buttons[i].toLowerCase() ? isShown[j] = true : {};
      }
    } else {
      isTrue[i] = false;
      stepNumber !== 0 ? stepNumber -= 1 : {};
    }

    this.setState({
      isTrue: isTrue,
      isShown: isShown,
      stepNumber: stepNumber,
    });
  }

  toStart() {
    word = getWord();
    const buttons = Array(26).fill(null);
    const isTrue = Array(26).fill(null);
    for (let i = 0; i < buttons.length; i++) {
      buttons[i] = letters[i];
    }
    const wordLetters = Array(word.length).fill(null);
    for (let i = 0; i < word.length; i++) {
      wordLetters[i] = word.charAt(i);
    }
    const isShown = Array(word.length).fill(false);

    this.setState({
      buttons: buttons,
      isTrue: isTrue,
      wordLetters: wordLetters,
      isShown: isShown,
      stepNumber: 6,
    });
  }

  render() {
    const buttons = this.state.buttons.slice();
    const isTrue = this.state.isTrue.slice();
    const wordLetters = this.state.wordLetters.slice();
    const isShown = this.state.isShown.slice();
    const stepNumber = this.state.stepNumber;

    var status = null;

    if (isShown.every(ifTrue)) {
      status =
      <div className="status">
        <h2 className="guesses">YOU WON!</h2>
      </div>
    } else {
      if (stepNumber !== 0) {
        status =
        <div className="status">
          <h2 className="guesses">GUESSES LEFT: {stepNumber}</h2>
        </div>;
      } else {
        for (let j = 0; j < isShown.length; j++) {
          isShown[j] = true;
        }
        status =
        <div className="status">
          <h2 className="guesses">YOU LOST!</h2>
        </div>
        ;
      }
    }

    return (
      <div className="game">
        <div className="hangman">
          <Hangman
            value={stepNumber}
          />
        </div>
        {status}
        <Word
          wordLetters={wordLetters}
          isShown={isShown}
        />
        <Board
          buttons={buttons}
          isTrue={isTrue}
          onClick={i => this.handleClick(i)}
        />
        <RestartButton
          onClick={() => this.toStart()}
        />
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
  rawFile.open("GET", "./dict.txt", false);
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

function ifTrue(boo) {
  return boo;
}
