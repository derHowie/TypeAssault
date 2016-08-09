'use strict';
import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillLeave() {
    $('#startContainer').fadeOut(500);
  }

  handleClick() {
    this.props.launchWave();
  }

  render() {
    return (
      <div id="startContainer">
        <h1>TypeAssault</h1>
        <button id="start" onClick={() => {this.handleClick()}}>
          Start Game
        </button>
      </div>
    );
  }
};

Message.propTypes = {
  launchWave: React.PropTypes.func.isRequired
};

export default Message;
