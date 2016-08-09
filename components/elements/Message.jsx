'use strict';
import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillLeave(callback) {
    $('#messageContainer').animate({
      top: '200px',
      opacity: 0
    }, {
      duration: 600,
      complete: callback
    });
  }

  handleClick() {
    this.props.queueNextWave();
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
        message = (
          <div>
            <h1>Game Over</h1>
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
  count: React.PropTypes.number.isRequired
};

export default Message;
