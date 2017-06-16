import React from 'react';
import Helper from '../../common/utils/helpers';
import characterImage from '../../common/utils/reference';
import PropTypes from 'prop-types';
import { Container, Grid, Header, Icon, Image, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class ResultsLanding extends React.Component {
  determineWinners() {
    let winners = [];
    if (this.props.sortedPlayers.length === 0)
      return winners;
    let counter = 0;
    do {
      winners.push(this.props.sortedPlayers[counter]);
      counter++;
    } while (counter !== this.props.sortedPlayers.length - 1 &&
    Helper.getMatchStatistics(winners[0])[0] === Helper.getMatchStatistics(this.props.sortedPlayers[counter])[0]);
    return winners;
  }

  renderWinners() {
    let winners = this.determineWinners();
    const winnerRenders = winners.map((winner, index) => (
      <Header key={index}
              as="h1">
        {winner.name}
      </Header>
    ));
    return (
      <Container
        text
        textAlign="center">
        <Header as="h1">And the {winners.length === 1 ? "winner is..." : "winners are..."}</Header>
        {winnerRenders}
      </Container>
    );
  }

  render() {

    const victoryCounts = this.props.sortedPlayers.map((player) => {
      return Helper.getMatchStatistics(player);
    });

    const playerCells = this.props.sortedPlayers.map((player, index) => {
      return (
        <Table.Row
          key={index}
        >
          <Table.Cell>
            <Header as="h4"
                    image>
              <Image src={characterImage(player.main.character, player.main.color)}
                     shape="rounded"
                     size="tiny"/>
              <Header.Content>
                <Link to={`results/${player.id}`}>
                  {player.name}
                </Link>
                <Header.Subheader>
                  <Icon name="game"/>
                  Skill Level {player.rating}
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            {victoryCounts[index][0]} - {victoryCounts[index][1]}
          </Table.Cell>
        </Table.Row>
      )
    });
    return (
      <Grid
        columns={3}
        centered>
        <Grid.Row>
          {this.renderWinners()}
        </Grid.Row>
        <Grid.Row>
          <Table
            basic="very"
            celled
            collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Player</Table.HeaderCell>
                <Table.HeaderCell>Record</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {playerCells}
            </Table.Body>
          </Table>
        </Grid.Row>
      </Grid>
    );
  }
}

ResultsLanding.propTypes = {
  sortedPlayers: PropTypes.array.isRequired,
};

export default ResultsLanding;
