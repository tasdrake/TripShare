import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

export default class TripUsers extends React.Component {
  static navigationOptions = {
    // header: null,
    // headerBackTitle: this.state.name,
    // headerBackTitle: this.state.name,
    headerStyle: {
      // backgroundColor: 'white',
    },
    headerBackTitleStyle: {
    },
    // headerTintColor: 'black',
    headerTitleStyle: {
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      trip_id: this.props.navigation.state.params.trip_id,
      name: this.props.navigation.state.params.trip_name,
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
      <View style={styles.container}>
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
        <View>
          <TouchableOpacity onPress={() => navigate('Total', { trip_id: this.state.trip_id })}>
            <Text style={styles.footer}>Total Trip</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
  },
  footer: {
    textAlign: 'center',
    marginBottom: 10,
  }
});
