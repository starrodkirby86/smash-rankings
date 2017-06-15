import React from 'react';
import PlayerEditForm from './PlayerEditForm';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class PlayerEditToggleableForm extends React.Component {
  state = {
    isOpen: false,
  };

  handleFormOpen = () => {
    this.setState({isOpen: true});
  };

  handleFormClose = () => {
    this.setState({isOpen: false});
  };

  handleFormSubmit = (player) => {
    this.props.onFormSubmit(player);
    this.setState({isOpen: false});
  };

  renderForm() {
    return (
      <PlayerEditForm
        onFormSubmit={this.handleFormSubmit}
        onFormClose={this.handleFormClose}
      />
    );
  }

  renderAccessToForm() {
    return (
      <Button content="Add New Player"
              size="huge"
              icon="plus"
              labelPosition="left"
              onClick={this.handleFormOpen} />
    );
  }

  render() {
    return (
      <span>
        {(this.state.isOpen) ? this.renderForm() : this.renderAccessToForm() }
      </span>
    );
  }

}

PlayerEditToggleableForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default PlayerEditToggleableForm;