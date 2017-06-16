import CHARACTERS from './characters';
import * as Chance from 'chance';

class Generator {
  static generatePlayers(maxPlayers = 4) {
    let players = [];
    for (let i = 0; i < maxPlayers; i++) {
      let p = this.newPlayer();
      players.push(p);
    }
    return players;
  }

  static newPlayer(attrs = {}) {
    let chance = new Chance();
    return {
      id: this.randomId(),
      name: attrs.name || chance.name(),
      slogan: attrs.slogan || "Go easy on me!",
      main: attrs.main || this.randomMain(),
      rating: attrs.rating || this.randomRating(),
      matches: [],
    };
  }

  static randomId() {
    return `${Math.floor(Math.random() * 99999999999)}`;
  }

  static randomRating() {
    return Math.floor(Math.random() * 10);
  }

  static randomMain() {
    const keys = Object.keys(CHARACTERS);
    return {
      character: keys[Math.floor(keys.length * Math.random())],
      color: Math.floor(Math.random() * 8) + 1,
    }
  }
}

export default Generator;