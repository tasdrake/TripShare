import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { SearchBar } from 'react-native-elements';

export default class Trips extends React.Component {
  // static navigationOptions = {
  //    header: null,
  //  }

  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      text: '',
      admin: this.props.navigation.state.params.user,
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
    if (this.state.user) {
      fetch('https://split-trip.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(this.state.user)
      })
      .then(res => res.json())
      .then(admin => this.setState({admin}));
    }
  }

  updateTrip = () => {
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

  search = (text) => this.setState({text})

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View>
          {
            this.state.admin
              ? <TouchableOpacity onPress={() => navigate('NewTrip', { updateTrip: this.updateTrip })}>
                <Text style={styles.newTrip}>Create a New Trip</Text>
              </TouchableOpacity>
              : null
          }
        </View>
        <SearchBar
          round
          lightTheme
          onChangeText={this.search}
          placeholder='Search for a Specific Trip' />
        <ScrollView>
          {
            this.state.trips.filter(e => e.name.includes(this.state.text)).map(e => {
              return (
                <TouchableOpacity key={e.id} style={styles.trips} onPress={() => navigate('TripUsers', { trip_id: e.id, trip_name: e.name, admin: this.state.admin })}>
                  <Text style={styles.title}>{e.name}</Text>
                  <Image source={{uri: e.image_url}} style={styles.image} />
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>
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
  trips: {
    marginVertical: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
  },
  newTrip: {
    textAlign: 'center',
    marginTop: 40,

  },
});
