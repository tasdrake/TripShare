import React from 'react';
import { Root } from './config/router';
import { AppRegistry } from 'react-native';

class App extends React.Component {
  render() {
    return <Root />;
  }
}

AppRegistry.registerComponent('TripShare', () => App);
