'use strict';
import React from 'react';

class Hud extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var stats = this.props.grabStats();
    return (
      <div id="hud">
        <div id="score">
          <p className="statLabel">score</p>
          <p className="stat">{stats.score}</p>
        </div>
        <div id="currentStreak">
          <p className="statLabel">current streak</p>
          <p className="stat">{stats.currentStreak}</p>
        </div>
        <div id="accuracy">
          <p className="statLabel">accuracy</p>
          <p className="stat">{stats.accuracy.toString().slice(0, 5) + '%'}</p>
        </div>
      </div>
    );
  }
}

Hud.propTypes = {
  grabStats: React.PropTypes.func.isRequired
};

export default Hud;
