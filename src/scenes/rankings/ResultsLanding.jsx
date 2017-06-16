import React from 'react';
import Helper from '../../common/utils/helpers';
import characterImage from '../../common/utils/reference';
import PropTypes from 'prop-types';
import { Grid, Header, Icon, Image, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class ResultsLanding extends React.Component {
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
