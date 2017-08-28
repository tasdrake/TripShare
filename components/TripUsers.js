import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

export default class Trips extends React.Component {
  static navigationOptions = {
    // header: null,
    title: 'Trips',
  };

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      trip_id: this.props.navigation.state.params.trip_id
    };
  }
  componentDidMount() {
    fetch(`https://split-trip.herokuapp.com/users/trip/${this.state.trip_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        }
    })
    .then(result => result.json())
    .then(users => this.setState({ users }));
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <ScrollView>
          {
            this.state.users.map(e => {
              return (
                <TouchableOpacity key={e.id} style={styles.users} onPress={() => navigate('Receipts', { user_id: e.id })}>
                  <Text style={styles.title}>{e.name}</Text>
                  <Image source={{uri: e.image_url}} style={styles.image} />
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>
        <TouchableOpacity onPress={() => navigate('Total', { trip_id: this.state.trip_id })}>
          <Text>Total Trip</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  users: {
    marginVertical: 40,
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 75,
    height: 75,
  }
});
