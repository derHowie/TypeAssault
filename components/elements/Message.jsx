'use strict';
import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.$container = null;

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.$container = $('#messageContainer');
    this.$container.animate({
      opacity: 1
    }, {
      duration: 750
    });
  }

  componentWillLeave(callback) {
    this.$container.animate({
      top: '200px',
      opacity: 0
    }, {
      duration: 600,
      complete: callback
    });
  }

  handleClick() {
    this.$container.animate({
      top: '200px',
      opacity: 0
    }, {
      duration: 600,
      complete: () => {
        this.props.queueNextWave();
      }
    });
  }

  render() {
    var message;
    switch(this.props.messageType) {
      case 'startGame':
        message = (
          <div>
            <h1>TypeAssault</h1>
            <button id="start" onClick={() => {this.handleClick()}}>
              Start Game
            </button>
          </div>
        );
        break;
      case 'nextWave':
        var text = 'Wave ' + this.props.count;
        message = (
          <div>
            <h1>{text}</h1>
          </div>
        );
        break;
      case 'gameOver':
        var stats = this.props.grabStats();
        var score = 'score: ' + stats.score;
        var accuracy = 'accuracy: ' + stats.accuracy.toString().slice(0, 6) + '%';
        var longestStreak = 'longest streak: ' + stats.longestStreak;
        message = (
          <div>
            <h1>Game Over</h1>
            <h3>{score}</h3>
            <h3>{accuracy}</h3>
            <h3>{longestStreak}</h3>
            <button id="start" onClick={() => {this.handleClick()}}>
              Play Again
            </button>
          </div>
        );
        break;
    };
    return (
      <div id="messageContainer">
        {message}
      </div>
    );
  }
};

Message.propTypes = {
  queueNextWave: React.PropTypes.func.isRequired,
  messageType: React.PropTypes.string.isRequired,
  count: React.PropTypes.number.isRequired,
  grabStats: React.PropTypes.func.isRequired
};

export default Message;
