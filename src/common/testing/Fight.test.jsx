import React from 'react';
import Helper from '../utils/helpers';
import { shallow } from 'enzyme';
import PlayerDebugFight from "../player/PlayerDebugFight";
import Main from "../../scenes/main";

describe('<PlayerDebugFight />', () => {
  it('Should roughly be even between two evenly matched competitors', () => {
    const players = [
      {
        id: '00',
        name: "Pablo Neruda",
        slogan: "Go easy on me!",
        main: {
          character: "bayonetta",
          color: 1,
        },
        rating: 5,
        matches: [],
      },
    ];
    const wrapper = shallow(<PlayerDebugFight players={players}/>);
    wrapper.find('#fightButton').simulate('submit');
    expect(Helper.fuzzyCheck(wrapper.state().victoryCount, 500, 50).toBeTruthy);
  });

  // TODO: This will probably break when we change the layouting. Make this an individual button to shallow render
  it('Have every RR match correspond to each other (W/L opposite)', () => {
    const wrapper = shallow(<Main />);
    wrapper.find('#roundRobinButton').simulate('submit');
    const players = wrapper.state().players;
    players.map((player) => {
      player.matches.map((match) => {
        expect(Helper.findMatch(
          player,
          Helper.findPlayerById(players, match.opponent))).toEqual(!match.victorious)
      })
    });
  });
});