import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default class Trips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    };
  }
  componentDidMount() {
    fetch('http://localhost:3000/trips', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        }
    })
    .then(result => result.json())
    .then(trips => this.setState({ trips }));
  }

  render() {
    return (
      <ScrollView>
        {
          this.state.trips.map(e => {
            return (
              <View key={e.id} style={styles.trips}>
                <Text style={styles.title}>{e.name}</Text>
                <Image source={{uri: e.image_url}} style={{width: 200, height: 200}} />
              </View>
            );
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  trips: {
    marginVertical: 40,
  }
});
