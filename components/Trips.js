import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation'

export default class Trips extends React.Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props);
    this.state = {
      trips: []
    };
  }
  componentDidMount() {
    fetch('https://split-trip.herokuapp.com/trips', {
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
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        {
          this.state.trips.map(e => {
            return (
              <TouchableOpacity key={e.id} style={styles.trips} onPress={() => navigate('TripUsers', { trip_id: e.id })}>
                <Text style={styles.title}>{e.name}</Text>
                <Image source={{uri: e.image_url}} style={styles.image} />
              </TouchableOpacity>
            );
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  trips: {
    marginVertical: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
  }
});
