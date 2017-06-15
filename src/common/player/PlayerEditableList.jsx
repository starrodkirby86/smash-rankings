import React from 'react';
import PlayerEditable from "./PlayerEditable";
import { Card } from "semantic-ui-react";
import PropTypes from 'prop-types';

class PlayerEditableList extends React.Component {
  render() {
    const playerCards = this.props.players.map((player) => {
      return <PlayerEditable
        key={player.id}
        player={player}
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick}
      />
    });

    return (
      <div>
        <Card.Group>
          {playerCards}
        </Card.Group>
      </div>
    );
  }
}

PlayerEditableList.propTypes = {
  players: PropTypes.array.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onTrashClick: PropTypes.func.isRequired,
};

export default PlayerEditableList;