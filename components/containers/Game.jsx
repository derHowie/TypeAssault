'use strict';
import React from 'react';
import TypeSwitch from 'type-switch';
import helpers from '../../utils/helpers.js';
import TransitionGroup from 'react-addons-transition-group';
import Message from '../elements/Message.jsx';
import Player from '../elements/Player.jsx';
import Droid from '../elements/Droid.jsx';
import Pulser from '../elements/Pulser.jsx';
import waves from '../../data/waves.js';
import words from '../../data/words.js';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      enemies: []
    };
    this.currentEnemy = null;
    this.currentEnemyIndex = -1;
    this.letters = 'abcdefghijklmnopqrstuvwxyz';
    this.waveCount = 0;
    this.score = 0;
    this.accuracy = null;
    this.currentStreak = 0;
    this.highStreak = 0;
    this.clock = 0;
    this.waveLaunching = false;

    this.launchWave = this.launchWave.bind(this);
    this.populateWave = this.populateWave.bind(this);
    this.reduceLetters = this.reduceLetters.bind(this);
    this.findWord = this.findWord.bind(this);
    this.removeEnemy = this.removeEnemy.bind(this);
    this.addEnemy = this.addEnemy.bind(this);
    this.concludePath = this.concludePath.bind(this);
    this.grabEnemyContainer = this.grabEnemyContainer.bind(this);
    this.grabEnemies = this.grabEnemies.bind(this);

    this.TypeSwitch = new TypeSwitch({stubbornMode: true});
    this.TypeSwitch.on('correct', () => {
      this.TypeSwitch.broadcast('targetAcquired');
      helpers.changeLetterColor(this.currentEnemy.wordIdentifier, this.TypeSwitch.getGameStats().currentIndex);
    });
    this.TypeSwitch.on('complete', () => {
      this.removeEnemy();
      setTimeout(() => {
        document.addEventListener('keypress', this.findWord, false);
      });
    });
  }

  launchWave() {
    this.waveLaunching = true;
    document.addEventListener('keypress', this.findWord, false);
    this.TypeSwitch.start('');
    this.TypeSwitch.pauseGame();
    this.populateWave();
  }

  populateWave() {
    var waveData = waves(10);
    var possibleWords = [words.oneSyllable, words.twoSyllable];
    var newWave = waveData.map((enemy, index) => {
      var newEnemy = {};
      newEnemy.componentIdentifier = '[data-enemy=\"' + index + '\"]';
      newEnemy.wordIdentifier = '[data-word=\"' + index + '\"]';
      newEnemy.containerIdentifier = '[data-container=\"' + index + '\"]';
      newEnemy.isDead = false;
      if (enemy.type === 'droid') {
        newEnemy.word = this.reduceLetters(possibleWords[0]);
        newEnemy.letterArray = helpers.createWord(newEnemy.word);
        newEnemy.component = (
          <Droid
            launchTime={enemy.delay}
            xCoord={Math.random() * 525}
            yCoord={-50}
            enemyIndex={index}
            containerIdentifier={newEnemy.containerIdentifier}
            letterArray={newEnemy.letterArray}
            key={index}/>
        );
      } else if (enemy.type === 'pulser') {
        var wordString = this.reduceLetters(possibleWords[1]);
        var possibleXCoords = [Math.floor((Math.random() * 170) + 35), Math.floor((Math.random() * 180) + 295)];
        newEnemy.word = wordString;
        newEnemy.letterArray = helpers.createWord(newEnemy.word);
        newEnemy.component = (
          <Pulser
            launchTime={enemy.delay}
            xCoord={possibleXCoords[Math.floor(Math.random() * possibleXCoords.length)]}
            yCoord={-65}
            enemyIndex={index}
            containerIdentifier={newEnemy.containerIdentifier}
            letterArray={newEnemy.letterArray}
            reduceLetters={this.reduceLetters}
            grabEnemies={this.grabEnemies}
            addEnemy={this.addEnemy}
            concludePath={this.concludePath}
            key={index}/>
        );
      }
      return newEnemy;
    });
    this.setState({
      enemies: newWave
    });
  }

  reduceLetters(wordBank) {
    var availableCharacter = this.letters[Math.floor(Math.random() * this.letters.length)];
    var availableWordArray = wordBank.filter((word) => {
      return word.charAt(0) === availableCharacter ? true : false;
    });
    var newWord = availableWordArray[Math.floor(Math.random() * availableWordArray.length)];
    this.letters = this.letters.replace(newWord.charAt(0), '');
    return newWord;
  }

  findWord(e) {
    var pressedCharCode = (typeof e.which === 'number') ? e.which : e.keyCode;
		var pressedKeyChar = String.fromCharCode(pressedCharCode);

    this.state.enemies.forEach((enemy, index) => {
      if (enemy.word.charAt(0) === pressedKeyChar && !enemy.isDead && parseInt($(enemy.containerIdentifier).css('top'), 10) > 5) {
        this.currentEnemyIndex = index;
        this.currentEnemy = enemy;
        this.TypeSwitch.changeCurrentIndex(1);
        this.TypeSwitch.start(enemy.word);
        this.TypeSwitch.broadcast('targetAcquired');
        helpers.changeLetterColor(this.currentEnemy.wordIdentifier, 1);
        document.removeEventListener('keypress', this.findWord);
      }
    });
  }

  removeEnemy() {
    this.letters = this.letters + this.currentEnemy.word.charAt(0);
    helpers.changeLetterColor(this.currentEnemy.wordIdentifier, this.TypeSwitch.getGameStats().currentIndex);

    var adjustedEnemyArray = this.state.enemies;
    adjustedEnemyArray[this.currentEnemyIndex].isDead = true;
    this.setState({
      enemies: adjustedEnemyArray
    });

    this.currentEnemy = null;
    this.currentEnemyIndex = null;
    this.TypeSwitch.resetGame();
  }

  addEnemy(enemy) {
    var adjustedEnemyArray = this.state.enemies;
    adjustedEnemyArray.push(enemy);
    this.setState({
      enemies: adjustedEnemyArray
    });
  }

  concludePath(index) {
    if (this.currentEnemy && this.state.enemies[index].word === this.currentEnemy.word) {
      this.currentEnemy = null;
      this.currentEnemyIndex = null;
      this.TypeSwitch.resetGame();
      document.addEventListener('keypress', this.findWord, false);
    }

    var adjustedEnemyArray = this.state.enemies;
    adjustedEnemyArray[index].isDead = true;
    this.setState({
      enemies: adjustedEnemyArray
    });
  }

  grabEnemyContainer() {
    return this.currentEnemy.containerIdentifier;
  }

  grabEnemies() {
    return this.state.enemies;
  }

  render() {
    var message = this.waveLaunching ? null : <Message launchWave={this.launchWave}/>;
    var enemies = this.state.enemies.map((enemy) => {
      return enemy.isDead ? null : enemy.component;
    });
    return (
      <div id="gameWrapper">
        <TransitionGroup>
          {message}
          <Player
            TypeSwitch={this.TypeSwitch}
            grabTarget={this.grabEnemyContainer}
            removeEnemy={this.removeEnemy}/>
          {enemies}
        </TransitionGroup>
      </div>
    )
  }
};

export default Game;
