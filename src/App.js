import React, { Component } from 'react';
import Main from "./scenes/main";
import { Header, Divider, Icon } from 'semantic-ui-react';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header
            as="h1"
            size="huge"
            icon
            textAlign="center">
            <Icon name="fire"/>
            The Smash Ranking
          </Header>
          <Divider />
          <div>
            <Main />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
