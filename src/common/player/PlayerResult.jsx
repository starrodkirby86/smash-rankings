import React from 'react';
import PropTypes from 'prop-types';
import CHARACTERS from '../utils/characters';
import Helper from '../utils/helpers';
import characterImage from '../utils/reference';
import { Container, Flag, Grid, Icon, Image, Header, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class PlayerResult extends React.Component {

  createResultsTable() {
    const resultCells = this.props.player.matches.map((match) => {
      const opponent = Helper.findPlayerById(this.props.players, match.opponent);
      return (
      <Table.Row>
        <Table.Cell>
          <Image
            shape="rounded"
            size="tiny"
            floated="left"
            src={characterImage(opponent.main.character, opponent.main.color)}/>
          <Header as="h4">
            <Header.Content>
              <Link to={`/results/${opponent.id}`}>{opponent.name}</Link>
            </Header.Content>
            <Header.Subheader>
              <Icon name="game"/>
              Skill Level {opponent.rating}
            </Header.Subheader>
          </Header>
        </Table.Cell>
        {(match.victorious) ?
          (<Table.Cell positive>Victory</Table.Cell>) :
          (<Table.Cell negative>Loss</Table.Cell>)}
      </Table.Row>);
    });
    return (
      <Table
        basic="very"
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Opponent
            </Table.HeaderCell>
            <Table.HeaderCell>
              Result
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {resultCells}
      </Table>
    );
  }

  render() {
    if (this.props.player !== undefined) {
      let myCharacter = CHARACTERS[this.props.player.main.character];
      return (
        <Grid columns={2}
              centered>
          <Grid.Row>
            <Grid.Column>
              <Image
                floated="left"
                fluid
                src={characterImage(this.props.player.main.character, this.props.player.main.color)}
              />
            </Grid.Column>
            <Grid.Column>
              <Container text>
                <Header as="h1">
                  <Header.Content>
                    {this.props.player.name}
                    <Header.Subheader>
                      <Flag name={this.props.player.location.toLowerCase()} /> &nbsp;
                      {myCharacter.name} Player from {this.props.player.location}
                    </Header.Subheader>
                    <Header.Subheader>
                      <Icon name="game"/>
                      Skill Level {this.props.player.rating}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
                <p>{this.props.player.slogan}</p>
              </Container>
              {this.createResultsTable()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
    else
      return (
        <div>>:(</div>
      );
  }
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

PlayerResult.propTypes = {
  players: PropTypes.array.isRequired,
  player: PropTypes.shape(playerPropTypes).isRequired,
};

export default PlayerResult;