import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Trips from './components/Trips';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Trips />
        <Image
  source={{url: 'https://static.tacdn.com/img2/solutions/road_trips/tips/tips-1.png'}}
/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
