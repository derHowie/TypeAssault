'use strict';

export default function waves(waveNum) {
  var waveArray = [];
  var enemyCount = waveNum + 8 > 18 ? 18 : waveNum + 8;
  var specialEnemyProb = .05 * waveNum;

  for (var i = 0; i < enemyCount; i++) {
    var enemy = {
      type: 'droid',
      delay: (650 * i) + (Math.random() * 300)
    };

    if (Math.random() < specialEnemyProb) {
      // enemy.type = waveNum > 4 && Math.random() < (specialEnemyProb / 2) ? 'rocketeer' : 'pulser';
      enemy.type = 'pulser';
    }

    waveArray.push(enemy);
  }

  return waveArray;
}
