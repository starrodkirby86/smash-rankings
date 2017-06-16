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

  /*
   PlayerA and PlayerB duke it out. Their match record is saved into their 'matches' section.
   */
  static assignMatch(playerA, playerB) {
    const result = this.fight(playerA, playerB);
    playerA.matches.push(
      {
        opponent: playerB.id,
        victorious: result,
      }
    );
    playerB.matches.push(
      {
        opponent: playerA.id,
        victorious: !result,
      }
    );
  }

  /*
   Clears the matches for a single player.
   */
  static clearMatches(player) {
    player.matches.length = 0;
  }

  static roundRobin(players) {
    players.map((player) => {
      this.clearMatches(player);
      return 0;
    });
    for (let i = 0; i < players.length - 1; i++)
    {
      for (let j = i + 1; j < players.length; j++)
      {
        this.assignMatch(players[i], players[j]);
      }
    }
  }
}

export default Battler;