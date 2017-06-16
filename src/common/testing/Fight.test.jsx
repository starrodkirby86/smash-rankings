import 'jsdom-global/register';
import React from 'react';
import Helper from '../utils/helpers';
import PlayerDebugFight from "../player/PlayerDebugFight";
import App from "../../App";
import Editor from "../../scenes/Editor/editor";
import sinon from 'sinon';
import { mount, render, shallow } from 'enzyme';

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

  it('Have every RR match correspond to each other (W/L opposite)', () => {
    const wrapper = mount(<App />);
    wrapper.find('button').simulate('click');
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