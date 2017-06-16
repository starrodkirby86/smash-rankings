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
      slogan: attrs.slogan || this.randomQuotes(),
      main: attrs.main || this.randomMain(),
      rating: attrs.rating || this.randomRating(),
      location: attrs.location || this.randomFlag(),
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

  static randomQuotes() {
    let chance = new Chance();
    return chance.pickone(QUOTES);
  }

  static randomFlag() {
    let chance = new Chance();
    return chance.country({full: true});
  }
}

const QUOTES = ["Go easy on me!",
  "I'm using tilt controls!",
  "It's time to tip the scales!",
  "Playing this game is suffering...",
  "Oh myy. Ohhhh my.",
  "Hi!'); DROP TABLE SMASHERS;",
  "Nico nico nii!",
  "My pocket character is Cloud.",
  "Have you ever purchased a Qolsys IQ Panel?",
  "Come on, step it up!",
  "You're too slow!",
  "Don't stop me NOW! I'm having such a good time...",
  "I've come up with a new recipe.",
  "Pro gamers only.",
  "gg ez",
  "When they asked me about a player slogan, I simply replied... 'Uhhh...'",
  "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues.",
  "My memes!",
  "Legalize Duck Hunt again!",
  "A lot of people have been wondering...",
  "Life is this beautiful crazy thing, and sometimes you do go out like a buster.",
  "Harness the power of Mountain Dew!",
  "TEAM BEER!",
  "I'm a selfish pufferfish that wishes we have human recognizable rights!",
];

export default Generator;