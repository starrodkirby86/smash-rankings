import CHARACTERS from './characters';
import * as Chance from 'chance';

class Battler {
  static fight(playerA, playerB) {
    const playerACharacter = playerA.main.character;
    const playerBCharacter = playerB.main.character;
    let playerATierScore = 80 / CHARACTERS[playerACharacter].tier;
    let playerBTierScore = 80 / CHARACTERS[playerBCharacter].tier;
    let playerAScore = playerATierScore * Math.pow(2.55, playerA.rating);
    let playerBScore = playerBTierScore * Math.pow(2.55, playerB.rating);

    let total = (playerAScore + playerBScore);

    let chance = new Chance();
    return chance.bool({likelihood: Math.floor((playerAScore / total) * 100)});
  }

  static roundRobin(player, players) {
    let matches = [];
    for (let i = 0; i < players.length; i++) {
      const p = players[i];
      if (player.id === p.id)
        continue;
      matches.push(
        {
          opponent: p.id,
          victorious: this.fight(player, p),
        }
      );
    }
    return matches;
  }

// TODO: Cache information so it shows more T/F kinds of things.
  // TODO: Test accuracy of score
  static
  generateRoundRobinMatches(players) {
    for (let i = 0; i < players.length; i++) {
      players[i].matches = this.roundRobin(players[i], players);
    }
  }
}

export default Battler;