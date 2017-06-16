import React from 'react';
import { Button, Container, Header, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Title extends React.Component {
  render() {
    return (
      <Container
        text
        textAlign="center"
      >
        <Header as="h1">
          Settle it in Smash!
        </Header>
        <p>
          Ever wondered who would win in a potential Round Robin? Instead of actually duking it out and, god forbid,
          <i>play</i> Smash, why not simulate everything instead?! Select all competitors in the Round Robin
          tournament, then initiate the battle and see who comes out victorious!
        </p>
        <Form>
          <Form.Field
            label='Initial Players to Create'
            control='input'
            type='number'
            value={this.props.maxPlayers}
            min={1}
            onChange={this.props.onMaxPlayersChange}
          />

          <Button
            as={Link}
            to="/edit"
            id="gettingStartedButton"
            content="Get Started"
            size="huge"
            icon="user circle"
            labelPosition="left"/>
        </Form>
      </Container>
    );
  }
}

Title.propTypes = {
  maxPlayers: PropTypes.number.isRequired,
  onMaxPlayersChange: PropTypes.func.isRequired,
};

export default Title;
