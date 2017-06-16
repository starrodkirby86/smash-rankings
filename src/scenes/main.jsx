import React from 'react';
import Generator from '../common/utils/generator';
import Battler from '../common/utils/battle';
import Title from '../scenes/title/Title';
import Editor from '../scenes/editor/Editor';
import Results from '../scenes/rankings/Results';
import { Route, Switch } from 'react-router-dom';

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
      <Switch>
        <Route
          exact
          path="/"
          component={Title}
        />

        <Route
          exact
          path="/edit"
          render={(props) => (
            <Editor onEditFormSubmit={this.handleEditFormSubmit}
                    onTrashClick={this.handleTrashClick}
                    onCreateFormSubmit={this.handleCreateFormSubmit}
                    onHandleFighting={this.handleFighting}
                    players={this.state.players}/>
          )}
        />

        <Route
          exact
          path="/results"
          render={(props) => (
            <Results players={this.state.players} />
          )}
          />
      </Switch>
    );
  }
}

export default Main;