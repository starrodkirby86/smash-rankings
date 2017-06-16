import React from 'react';
import PlayerCard from './PlayerCard';
import PlayerEditForm from './PlayerEditForm';
import PropTypes from 'prop-types';

class PlayerEditable extends React.Component {
  state = {
    editFormOpen: false
  };

  handleEditClick = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = (player) => {
    this.props.onFormSubmit(player);
    this.closeForm();
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    return (
      (this.state.editFormOpen) ? <PlayerEditForm
        player={this.props.player}
        id={this.props.player.id}
        name={this.props.player.name}
        slogan={this.props.player.slogan}
        main={this.props.player.main}
        location={this.props.player.location}
        rating={this.props.player.rating}
        onFormSubmit={this.handleSubmit}
        onFormClose={this.handleFormClose} />
        :
        <PlayerCard
          player={this.props.player}
          onEditClick={this.handleEditClick}
          onTrashClick={this.props.onTrashClick}
        />
    )
  }
}

PlayerEditable.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onTrashClick: PropTypes.func.isRequired,
};

export default PlayerEditable;