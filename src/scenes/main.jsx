import React from 'react';
import Generator from '../common/utils/generator';
import Battler from '../common/utils/battle';
import PlayerEditableList from "../common/player/PlayerEditableList";
import PlayerEditToggleableForm from '../common/player/PlayerEditToggleableForm';
import PlayerDebugFight from '../common/player/PlayerDebugFight';
import { Button, Container, Divider, Header, Grid, Icon } from 'semantic-ui-react';

class Main extends React.Component {
  state = {
    players: [],
  };

  componentDidMount() {
    this.setState(
      {players: Generator.generatePlayers()}
    );
  }

  handleCreateFormSubmit = (player) => {
    this.createPlayer(player);
  };

  handleTrashClick = (id) => {
    this.deletePlayer(id);
  };

  handleEditFormSubmit = (attrs) => {
    this.updatePlayer(attrs);
  };

  handleFighting = () => {
    Battler.generateRoundRobinMatches(this.state.players);
  };

  createPlayer = (player) => {
    const p = Generator.newPlayer(player);
    this.setState({
      players: this.state.players.concat(p),
    });
  };

  updatePlayer = (attrs) => {
    this.setState({
      players: this.state.players.map((player) => {
        if (player.id === attrs.id) {
          return Object.assign({}, player, {
            name: attrs.name,
            slogan: attrs.slogan,
            main: attrs.main,
            rating: attrs.rating,
          });
        } else {
          return player;
        }
      }),
    });
  };

  deletePlayer = (playerId) => {
    this.setState({
      players: this.state.players.filter(t => t.id !== playerId),
    });
  };

  render() {
    return (
      <div>
        <Header
          as="h1"
          size="huge"
          icon
          textAlign="center">
          <Icon name="fire" />
          The Smash Ranking
        </Header>
        <Divider />
        <Grid columns={2}
              centered>
          <Grid.Row>
            <Grid.Column>
              <Container>
                <PlayerEditableList
                  players={this.state.players}
                  onFormSubmit={this.handleEditFormSubmit}
                  onTrashClick={this.handleTrashClick}
                />
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Grid columns={3}
              centered>
          <Grid.Row>
            <Grid.Column>
              <Container>
                <PlayerEditToggleableForm onFormSubmit={this.handleCreateFormSubmit}/>
                <Button content="Fight!"
                        size="huge"
                        icon="protect"
                        labelPosition="right"
                        onClick={this.handleFighting} />
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <PlayerDebugFight players={this.state.players}/>
          </Grid.Row>
        </Grid>
      </div>
  )
    ;
  }
}

export default Main;