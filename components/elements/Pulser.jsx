'use strict';
import React from 'react';
import helpers from '../../utils/helpers.js';
import words from '../../data/words.js';
import Droid from './Droid.jsx';

class Pulser extends React.Component {
  constructor(props) {
    super(props);
    this.$container = null;
    this.spawningInterval = null;

    this.positionPulser = this.positionPulser.bind(this);
    this.launch = this.launch.bind(this);
    this.spawnDroid = this.spawnDroid.bind(this);
  }

  componentDidMount() {
    this.$container = $(this.props.containerIdentifier);
    this.positionPulser();
    setTimeout(() => {
      this.launch();
    }, this.props.launchTime);
  }

  componentWillLeave(callback) {
    clearInterval(this.spawningInterval);
    this.$container.stop();
    this.$container.fadeOut({
      duration: 600,
      easing: 'linear',
      complete: callback
    });
  }

  positionPulser() {
    this.$container.css({
      position: 'absolute',
      top: this.props.yCoord + 'px',
      left: this.props.xCoord + 'px'
    });
  }

  launch() {
    this.$container.animate({
      top: '750px'
    }, {
      easing: 'linear',
      duration: 16000,
      step: () => {
        if (parseInt(this.$container.css('top'), 10) > 620) {
          clearInterval(this.spawningInterval);
          this.props.concludePath(this.props.enemyIndex);
        }
      }
    });
    this.spawningInterval = setInterval(() => {
      this.spawnDroid();
    }, 3900);
  }

  spawnDroid() {
    var totalEnemies = this.props.grabEnemies().filter((enemy) => {
      return !enemy.isDead;
    });
    if (totalEnemies.length < 26) {
      var spawningElementLocation = {
        x: parseInt(this.$container.css('left'), 10),
        y: parseInt(this.$container.css('top'), 10)
      };
      var newDroidOrigin = {
        x: spawningElementLocation.x > 250 ? spawningElementLocation.x - 20 : spawningElementLocation.x + 20,
        y: spawningElementLocation.y - 45
      };
      var possibleWords = words.oneSyllable;
      var newDroidIndex = this.props.grabEnemies().length;
      var newDroid = {};
      newDroid.componentIdentifier = '[data-enemy=\"' + newDroidIndex + '\"]';
      newDroid.wordIdentifier = '[data-word=\"' + newDroidIndex + '\"]';
      newDroid.containerIdentifier = '[data-container=\"' + newDroidIndex + '\"]';
      newDroid.isDead = false;
      newDroid.word = this.props.reduceLetters(possibleWords);
      newDroid.letterArray = helpers.createWord(newDroid.word);
      newDroid.component = (
        <Droid
          launchTime={0}
          xCoord={newDroidOrigin.x}
          yCoord={newDroidOrigin.y}
          enemyIndex={newDroidIndex}
          containerIdentifier={newDroid.containerIdentifier}
          letterArray={newDroid.letterArray}
          endGame={this.props.endGame}
          key={'p' + newDroidIndex.toString()}/>
      );
      this.props.addEnemy(newDroid);
    }
  }

  render() {
    return (
      <div className="enemyContainer" data-container={this.props.enemyIndex}>
        <div className="word" data-word={this.props.enemyIndex}>{this.props.letterArray}</div>
        <i className="pulser fa fa-times-circle-o" data-enemy={this.props.enemyIndex}></i>
      </div>
    );
  }
};

Pulser.propTypes = {
  letterArray: React.PropTypes.array.isRequired,
  containerIdentifier: React.PropTypes.string.isRequired,
  launchTime: React.PropTypes.number.isRequired,
  xCoord: React.PropTypes.number.isRequired,
  yCoord: React.PropTypes.number.isRequired,
  enemyIndex: React.PropTypes.number.isRequired,
  reduceLetters: React.PropTypes.func.isRequired,
  grabEnemies: React.PropTypes.func.isRequired,
  addEnemy: React.PropTypes.func.isRequired,
  concludePath: React.PropTypes.func.isRequired,
  endGame: React.PropTypes.func.isRequired
};

export default Pulser;
