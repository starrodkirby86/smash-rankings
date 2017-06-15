import Battler from './battle';

class Helper {
  /*
    Finds the player by a certain ID and returns that player.
   */
  static findPlayerById(players, id) {
    return players.find((player) => id === player.id);
  }

  /*
    Returns the amount of victories playerA has over playerB for battles.
   */
  static simulateBattles(playerA, playerB, battles = 100) {
    let counter = 0;
    for (let i = 0; i < battles; i++)
      if (Battler.fight(playerA, playerB)) counter++;
    return counter;
  }

  /*
    Does a fuzzy check to see if the number is in range of what you want.
    tolerance is the margin of error.
   */
  static fuzzyCheck(toCheck, expected, tolerance = 5) {
    return (expected - tolerance) < toCheck && (expected + tolerance) > toCheck;
  }
}

export default Helper;