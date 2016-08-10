'use strict';
import React from 'react';
import Projectile from './Projectile.jsx';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: null,
      projectiles: [],
      explosions: []
    };
    this.$element = null;

    this.aim = this.aim.bind(this);
    this.fire = this.fire.bind(this);
    this.removeRocket = this.removeRocket.bind(this);
    this.deathAnimation = this.deathAnimation.bind(this);

    this.props.TypeSwitch.on('targetAcquired', () => {
      this.aim();
      this.fire();
    });
    this.props.TypeSwitch.on('gameStart', () => {
      this.$element.css({
        opacity: 1,
        display: 'block',
        transform: 'translateX(-50%) rotate(-90deg)'
      })
      .animate({
        top: '650px'
      }, {
        duration: 750
      });
    });
    this.props.TypeSwitch.on('gameOver', () => {
      this.deathAnimation();
    });
  }

  componentDidMount() {
    this.$element = $('#player');
  }

  aim() {
    var target = document.querySelector(this.props.grabTarget());
    var xCoord = parseInt(target.style.left, 10);
    var yCoord = parseInt(target.style.top, 10);
    var numerator = xCoord - 250;
    var denominator = 650 - yCoord;
    var angleRad = (Math.atan(numerator / denominator));
    var angleDegree = ((angleRad * (180 / Math.PI))) - 90;
    this.$element.css('transform', 'translateX(-50%) rotate(' + angleDegree + 'deg)');
    this.setState({
      orientation: angleDegree
    });
  }

  fire() {
    var adjustedProjectileArray = this.state.projectiles;
    var newRocket = {};
    var newRocketComponent = (
      <Projectile
        rocketIdentifier={'[data-rocket=\"' + adjustedProjectileArray.length + '\"]'}
        target={this.props.grabTarget()}
        orientation={this.state.orientation + 45}
        removeRocket={this.removeRocket}
        key={adjustedProjectileArray.length}/>
    );
    newRocket.component = newRocketComponent;
    newRocket.isDead = false;
    adjustedProjectileArray.push(newRocket);
    this.setState({
      projectiles: adjustedProjectileArray
    });
  }

  removeRocket(index) {
    var adjustedProjectileArray = this.state.projectiles;
    adjustedProjectileArray[index].isDead = true;
    this.setState({
      projectiles: adjustedProjectileArray
    });
  }

  deathAnimation() {
    var endGameExplosions = [];
    var origin = {
      x: 260,
      y: 650
    };
    var colors = ['red', 'yellow', 'orange'];
    for (var i = 0; i < 12; i++) {
      var conflagration = (
        <i
          className="fa fa-circle conflagration"
          data-conflagration={i}
          key={'c' + i}
        />
      );
      endGameExplosions.push(conflagration);
    }
    this.setState({
      explosions: endGameExplosions
    });
    this.state.explosions.forEach((explosion, index) => {
      this.$element.fadeOut(2000);
      setTimeout(() => {
        $('[data-conflagration=\"' + index + '\"]').css({
          left: origin.x + (Math.random() * 32) - 32 + 'px',
          top: origin.y + (Math.random() * 25) - 25 + 'px',
          color: colors[Math.floor(Math.random() * colors.length)]
        })
        .animate({
          fontSize: 70,
          opacity: 0
        }, {
          duration: 750,
          complete: () => {
            if (index > 10) {
              this.$element.css('top', '750px');
              this.setState({
                explosions: []
              });
            }
          }
        });
      }, 50 * index);
    });
  }

  render() {
    var projectiles = this.state.projectiles.map((rocket) => {
      if (!rocket.isDead) {
        return rocket.component;
      }
    });
    var explosions = this.state.explosions.map((explosion) => {
      return explosion;
    });
    return (
      <div>
        <i id="player" className="fa fa-space-shuttle"></i>
        {projectiles}
        {explosions}
      </div>
    )
  }
};

Player.propTypes = {
  TypeSwitch: React.PropTypes.object.isRequired,
  grabTarget: React.PropTypes.func.isRequired,
  removeEnemy: React.PropTypes.func.isRequired
};

export default Player;
