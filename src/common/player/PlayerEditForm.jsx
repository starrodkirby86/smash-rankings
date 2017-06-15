import React from 'react';
import CHARACTERS from '../utils/characters';
import { Button, Form, TextArea } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class PlayerEditForm extends React.Component {
  state = {
    player: this.props.player || '',
    name: this.props.name || '',
    rating: this.props.rating || 0,
    main: this.props.main || {
      character: "mario",
      color: 1
    },
    slogan: this.props.slogan || '',
  };

  handleNameChange = (e) => {
    this.setState( { name: e.target.value });
  };

  handleRatingChange = (e) => {
    const tryRating = parseInt(e.target.value, 10);
    const rating = Math.min(Math.max(tryRating, 0), 10);
    this.setState( { rating: rating });
  };

  handleMainCharacterChange = (e) => {
    const main = {
      character: e.target.value,
      color: this.state.main.color,
    };
    this.setState( { main: main });
  };

  handleMainColorChange = (e) => {
    const tryColor = parseInt(e.target.value, 10);
    const color = Math.min(Math.max(tryColor, 1), 8);
    const main = {
      character: this.state.main.character,
      color: color,
    };
    this.setState( { main: main });
  };

  handleSloganChange = (e) => {
    this.setState( { slogan: e.target.value });
  };

  handleSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.id,
      name: this.state.name,
      slogan: this.state.slogan,
      main: this.state.main,
      rating: this.state.rating,
    });
  }

  render() {
    const characterChoices = Object.keys(CHARACTERS).map((key) => {
      return <option
        key={key}
        value={key}
      >
        {CHARACTERS[key].name}
      </option>;
    });

    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            label="Smash Gamertag"
            placeholder="Falcomaster3000"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <Form.Field
            label='Rating'
            control='input'
            type='number'
            value={this.state.rating}
            min={0}
            max={10}
            onChange={this.handleRatingChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            label="Character"
            control="select"
            onChange={this.handleMainCharacterChange}
            value={this.state.main.character}
          >
            {characterChoices}
          </Form.Field>
          <Form.Field
            label='Color'
            control='input'
            type='number'
            value={this.state.main.color}
            min={1}
            max={8}
            onChange={this.handleMainColorChange}
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          label="Slogan"
          value={this.state.slogan}
          placeholder="What is your victory tagline?"
          onChange={this.handleSloganChange}
        />
        <Form.Field
          control={Button}
          type='button'
          onClick={this.handleSubmit}
        >
          Submit
        </Form.Field>
        <Form.Field
          control={Button}
          type='button'
          onClick={this.props.onFormClose}
        >
          Cancel
        </Form.Field>
      </Form>
    );
  }
}

const characterPropTypes = {
  character: PropTypes.string.isRequired,
  color: PropTypes.number.isRequired,
};

PlayerEditForm.propTypes = {
  name: PropTypes.string,
  slogan: PropTypes.string,
  main: PropTypes.shape(characterPropTypes),
  rating: PropTypes.number,
  onFormSubmit: PropTypes.func.isRequired,
  onFormClose: PropTypes.func.isRequired,
};

export default PlayerEditForm;