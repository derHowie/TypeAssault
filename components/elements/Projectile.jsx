'use strict';
import React from 'react';

class Projectile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      explosions: []
    };
    this.$rocket = null;
    this.rocketIndex = this.props.rocketIdentifier.replace(/\D/g, '');
    this.$target = $(this.props.target);
    this.targetCoords = {
      x: parseFloat(this.$target.css('left'), 10),
      y: parseFloat(this.$target.css('top'), 10)
    };

    this.launch = this.launch.bind(this);
    this.appendExplosions = this.appendExplosions.bind(this);
    this.animateExplosion = this.animateExplosion.bind(this);
  }

  componentDidMount() {
    this.$rocket = $(this.props.rocketIdentifier);
    this.$rocket.css('transform', 'translateX(-50%) rotate(' + this.props.orientation + 'deg)');
    this.launch();
  }

  launch() {
    this.$rocket.animate({
      left: this.targetCoords.x + 'px',
      top: this.targetCoords.y + 20 + 'px'
    }, {
      duration: (parseInt(this.$rocket.css('top'), 10) - parseInt(this.$target.css('top'), 10)) / 2,
      complete: () => {
        this.$rocket.css('display', 'none');
        this.appendExplosions();
      }
    });
  }

  animateExplosion($el, color, delay, callback) {
    setTimeout(() => {
      $el.css({
        left: this.targetCoords.x + (Math.random() * 20) - 20 + 'px',
        top: this.targetCoords.y + (Math.random() * 20) + 15 + 'px',
        color: color
      })
      .animate({
        fontSize: 50,
        opacity: 0
      }, {
        duration: 400,
        complete: () => {
          if (callback) {
            callback(this.rocketIndex);
          }
        }
      });
    }, delay);
  }

  appendExplosions(coords) {
    var adjustedExplosionArray = [];
    for (var i = 0; i < 3; i++) {
      var explosion =
      <i
        className="fa fa-circle explosion"
        data-explosion={this.rocketIndex.toString() + i}
        key={'r' + i}
      />
      adjustedExplosionArray.push(explosion);
    }

    this.setState({
      explosions: adjustedExplosionArray
    });

    this.animateExplosion(
      $('[data-explosion=\"' + this.rocketIndex.toString() + 0 + '\"]'),
      'yellow',
      0
    );
    this.animateExplosion(
      $('[data-explosion=\"' + this.rocketIndex.toString() + 1 + '\"]'),
      'orange',
      75
    );
    this.animateExplosion(
      $('[data-explosion=\"' + this.rocketIndex.toString() + 2 + '\"]'),
      'red',
      150,
      this.props.removeRocket
    );
  }

  render() {
    var explosions = this.state.explosions.map((explosion) => {
      return explosion;
    });
    return (
      <div>
        <i className="fa fa-rocket projectile" data-rocket={this.rocketIndex}></i>
        {explosions}
      </div>
    );
  }
};

Projectile.propTypes = {
  rocketIdentifier: React.PropTypes.string.isRequired,
  target: React.PropTypes.string.isRequired,
  orientation: React.PropTypes.number.isRequired,
  removeRocket: React.PropTypes.func.isRequired
};

export default Projectile;
