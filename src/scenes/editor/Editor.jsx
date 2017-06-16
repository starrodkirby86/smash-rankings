import React from 'react';
import PropTypes from 'prop-types';
import PlayerEditableList from "../../common/player/PlayerEditableList";
import PlayerEditToggleableForm from '../../common/player/PlayerEditToggleableForm';
import { Button, Container, Divider, Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

class Editor extends React.Component {
  state = {
    isReadyToRedirect: false,
  };

  handleFighting = () => {
    this.props.onHandleFighting();
    this.setState({isReadyToRedirect: true});
  };

  redirectToResults() {
    return (
      <Redirect
        push
        to="/results"
      />
    );
  }

  renderEditor() {
    return (
      <div>
        <Grid columns={2}
              centered>
          <Grid.Row>
            <Grid.Column>
              <Container>
                <PlayerEditableList
                  players={this.props.players}
                  onFormSubmit={this.props.onEditFormSubmit}
                  onTrashClick={this.props.onTrashClick}
                />
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Container textAlign="center">
          <PlayerEditToggleableForm onFormSubmit={this.props.onCreateFormSubmit}/>
          <Button
            id="roundRobinButton"
            content="Fight!"
            size="huge"
            icon="protect"
            labelPosition="right"
            onClick={this.handleFighting}/>
        </Container>
      </div>
    );
  }

  render() {
    return (this.state.isReadyToRedirect) ? this.redirectToResults() : this.renderEditor();
  }
}

Editor.propTypes = {
  onEditFormSubmit: PropTypes.func.isRequired,
  onTrashClick: PropTypes.func.isRequired,
  onCreateFormSubmit: PropTypes.func.isRequired,
  onHandleFighting: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
};

export default Editor;