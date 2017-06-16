import React from 'react';
import Helper from '../../common/utils/helpers';
import PlayerResult from '../../common/player/PlayerResult';
import ResultsLanding from './ResultsLanding';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

class Results extends React.Component {
  state = {
    sortedPlayers: [],
  };

  componentWillMount() {
    this.setState({
      sortedPlayers: this.props.players.sort((playerA, playerB) => {
        const playerStatsA = Helper.getMatchStatistics(playerA);
        const playerStatsB = Helper.getMatchStatistics(playerB);
        return (playerStatsB[0] - playerStatsB[1]) - (playerStatsA[0] - playerStatsA[1]);
      })
    });
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/results/:id"
            render={({match}) => (
                <PlayerResult players={this.props.players}
                              player={Helper.findPlayerById(this.state.sortedPlayers, match.params.id)} />
            )}/>
          <Route
            path="/"
            render={() => (
              <ResultsLanding sortedPlayers={this.state.sortedPlayers}/>
            )}/>
        </Switch>
      </div>
    );
  }
}

Results.propTypes = {
  players: PropTypes.array.isRequired,
};

export default Results;
