import React from 'react';
import Helper from '../utils/helpers';
import { shallow } from 'enzyme';
import PlayerDebugFight from "../player/PlayerDebugFight";

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
    const wrapper = shallow(<PlayerDebugFight players={players} />);
    wrapper.find('#fightButton').simulate('submit');
    expect(Helper.fuzzyCheck(wrapper.state().victoryCount, 500, 50).toBeTruthy);
  });
});