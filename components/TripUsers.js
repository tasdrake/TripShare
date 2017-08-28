import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

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
    fetch(`http://localhost:3000/users/trip/${this.state.trip_id}`, {
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
    return (
      <ScrollView>
        {
          this.state.users.map(e => {
            return (
              <TouchableOpacity key={e.id} style={styles.users} >
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
