'use strict';
import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.$container = null;
    this.clicked = false;

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
    //prevents double clicking start button from breaking the game
    if (!this.clicked) {
      this.clicked = true;
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
        message = (
          <div>
            <h1>Game Over</h1>
            <div>
              <p className="statLabel">score</p>
              <p className="stat">{stats.score}</p>
            </div>
            <div>
              <p className="statLabel">longest streak</p>
              <p className="stat">{stats.longestStreak}</p>
            </div>
            <div>
              <p className="statLabel">accuracy</p>
              <p className="stat">{stats.accuracy.toString().slice(0, 5) + '%'}</p>
            </div>
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
