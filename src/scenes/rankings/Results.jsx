import React from 'react';
import Helper from '../../common/utils/helpers';
import characterImage from '../../common/utils/reference';
import PropTypes from 'prop-types';
import { Grid, Header, Icon, Image, Table } from 'semantic-ui-react';

class Results extends React.Component {
  render() {
    const sortedPlayers = this.props.players.sort((playerA, playerB) => {
      return Helper.getMatchStatistics(playerA)[0] < Helper.getMatchStatistics(playerB)[0];
    });

    const victoryCounts = sortedPlayers.map((player) => {
      return Helper.getMatchStatistics(player);
    });

    const playerCells = sortedPlayers.map((player, index) => {
      return(
        <Table.Row
          key={index}
        >
          <Table.Cell>
            <Header as="h4"
                    image>
              <Image src={characterImage(player.main.character, player.main.color)}
                     shape="rounded"
                     size="tiny" />
              <Header.Content>
                {player.name}
                <Header.Subheader>
                  <Icon name="game" />
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

Results.propTypes = {
  players: PropTypes.array.isRequired,
};

export default Results;
