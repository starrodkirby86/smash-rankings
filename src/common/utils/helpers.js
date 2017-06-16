import Battler from './battle';

class Helper {
  /*
   Finds the player by a certain ID and returns that player.
   */
  static findPlayerById(players, id) {
    return players.find((player) => id === player.id);
  }

  /*
   Finds if a match exists against playerA in playerB's matches.
   If so, return that match result.
   */
  static findMatch(playerA, playerB) {
    const match = playerB.matches.find((match) => {
      return playerA.id === match.opponent
    });
    return (match === undefined) ? undefined : match.victorious;
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

  /*
   Counts the victories and losses that a player has made.
   */
  static getMatchStatistics(player) {
    const matches = player.matches;
    return([matches.filter((match) => match.victorious).length, matches.filter((match) => !match.victorious).length]);
  }
}

export default Helper;