'use strict';
import React from 'react';
import Projectile from './Projectile.jsx';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: null,
      projectiles: []
    };

    this.aim = this.aim.bind(this);
    this.fire = this.fire.bind(this);
    this.removeRocket = this.removeRocket.bind(this);

    this.props.TypeSwitch.on('targetAcquired', () => {
      this.aim();
      this.fire();
    });
  }

  aim() {
    var ship = document.getElementById('player');
    var target = document.querySelector(this.props.grabTarget());
    var xCoord = parseInt(target.style.left, 10);
    var yCoord = parseInt(target.style.top, 10);
    var numerator = xCoord - 250;
    var denominator = 650 - yCoord;
    var angleRad = (Math.atan(numerator / denominator));
    var angleDegree = ((angleRad * (180 / Math.PI))) - 90;
    ship.style.transform = 'translateX(-50%) rotate(' + angleDegree + 'deg)';

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

  render() {
    var projectiles = this.state.projectiles.map((rocket) => {
      if (!rocket.isDead) {
        return rocket.component;
      }
    });
    return (
      <div>
        <i id="player" className="fa fa-space-shuttle"></i>
        {projectiles}
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
