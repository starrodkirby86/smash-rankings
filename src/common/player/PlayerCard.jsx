import React from 'react';
import PropTypes from 'prop-types';
import CHARACTERS from '../utils/characters';
import characterImage from '../utils/reference';
import { Card, Icon, Image } from 'semantic-ui-react';

class PlayerCard extends React.Component {
  handleTrashClick = () => {
    this.props.onTrashClick(this.props.player.id);
  };

  render() {
    let myCharacter = CHARACTERS[this.props.player.main.character];
    return (
      <Card color={myCharacter.color}>
        <Card.Content>
          <Image
            floated="left"
            size="large"
            src={characterImage(this.props.player.main.character, this.props.player.main.color)}
          />
          <Card.Header>
            {this.props.player.name}
          </Card.Header>
          <Card.Meta>
            {myCharacter.name} Player
          </Card.Meta>
          <Card.Description>
            {this.props.player.slogan}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="game" />
          Skill Level {this.props.player.rating}
        </Card.Content>
        <Card.Content extra>
          <Icon
            circular
            name="edit"
            onClick={this.props.onEditClick} />
          <Icon
            circular
            name="trash"
            onClick={this.handleTrashClick} />
        </Card.Content>
      </Card>
    );

  };
}

const characterPropTypes = {
  character: PropTypes.string.isRequired,
  color: PropTypes.number.isRequired,
};

const playerPropTypes = {
  name: PropTypes.string.isRequired,
  slogan: PropTypes.string.isRequired,
  main: PropTypes.shape(characterPropTypes).isRequired,
  rating: PropTypes.number.isRequired,
};

PlayerCard.propTypes = {
  player: PropTypes.shape(playerPropTypes).isRequired,
  onEditClick: PropTypes.func.isRequired,
  onTrashClick: PropTypes.func.isRequired,
};


export default PlayerCard;
