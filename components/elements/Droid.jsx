'use strict';
import React from 'react';

class Droid extends React.Component {
  constructor(props) {
    super(props);
    this.$container = null;

    this.positionDroid = this.positionDroid.bind(this);
    this.hypotenuse = this.hypotenuse.bind(this);
    this.launch = this.launch.bind(this);
  }

  componentDidMount() {
    this.$container = $(this.props.containerIdentifier);
    this.positionDroid();
    setTimeout(() => {
      this.launch();
    }, this.props.launchTime);
  }

  componentWillLeave(callback) {
    this.$container.stop();
    this.$container.fadeOut({
      duration: 400,
      easing: 'linear',
      complete: callback
    });
  }

  positionDroid() {
    this.$container.css({
      position: 'absolute',
      top: this.props.yCoord + 'px',
      left: this.props.xCoord + 'px'
    });
  }

  hypotenuse() {
    var a = 650 - parseFloat(this.$container.css('top'), 10);
    var b = 250 - parseFloat(this.$container.css('top'), 10);
    var aSq = a * a;
    var bSq = b * b;
    return Math.sqrt(aSq + bSq);
  }

  launch() {
    this.$container.animate({
      top: '650px',
      left: '250px'
    }, {
      easing: 'linear',
      duration: this.hypotenuse() * 18
    });
  }

  render() {
    return (
      <div className="enemyContainer" data-container={this.props.enemyIndex}>
        <div className="word" data-word={this.props.enemyIndex}>{this.props.letterArray}</div>
        <i className="droid fa fa-asterisk" data-enemy={this.props.enemyIndex}></i>
      </div>
    )
  }
};

Droid.propTypes = {
  letterArray: React.PropTypes.array.isRequired,
  containerIdentifier: React.PropTypes.string.isRequired,
  launchTime: React.PropTypes.number.isRequired,
  xCoord: React.PropTypes.number.isRequired,
  yCoord: React.PropTypes.number.isRequired,
  enemyIndex: React.PropTypes.number.isRequired
};

export default Droid;
