import React from 'react';
import Helper from '../utils/helpers';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

class PlayerDebugFight extends React.Component {
  state = {
    firstPlayer: 0,
    secondPlayer: 0,
    matchLength: 100,
    victoryCount: 0,
  };

  handleFirstPlayerChange = (e) => {
    this.setState({
      firstPlayer: e.target.value,
    });
  };

  handleSecondPlayerChange = (e) => {
    this.setState({
      secondPlayer: e.target.value,
    });
  };

  handleMatchLengthChange = (e) => {
    this.setState({
      matchLength: e.target.value,
    });
  };

  handleFight = () => {
    this.setState({
      victoryCount: Helper.simulateBattles(this.props.players[this.state.firstPlayer],
        this.props.players[this.state.secondPlayer],
        this.state.matchLength)
    });
  };

  render() {
    let playerChoices = this.props.players.map((player, index) => {
      return <option
        key={player.id}
        value={index}
      >
        {player.name}
      </option>;
    });
    if (this.props.players.length === 0)
      return (
        <div>
          Please add some players. :(
        </div>
      );
    else
      return (
        <Form>
          <Form.Group>
            <Form.Field
              label="Player 1"
              control="select"
              onChange={this.handleFirstPlayerChange}
              value={this.state.firstPlayer}
            >
              {playerChoices}
            </Form.Field>
            <Form.Field
              label="Player 2"
              control="select"
              onChange={this.handleSecondPlayerChange}
              value={this.state.secondPlayer}
            >
              {playerChoices}
            </Form.Field>
          </Form.Group>
          <Form.Field
            label='How many matches?'
            control='input'
            type='number'
            value={this.state.matchLength}
            min={0}
            onChange={this.handleMatchLengthChange}
          />
          <Form.Field
            id="fightButton"
            control={Button}
            type='button'
            onClick={this.handleFight}
          >
            Simulate {this.state.matchLength} fights!
          </Form.Field>
          <p>{this.props.players[this.state.firstPlayer].name} is victorious {this.state.victoryCount} times!</p>
        </Form>
      );
  }
}

PlayerDebugFight.propTypes = {
  players: PropTypes.array.isRequired,
};

export default PlayerDebugFight;