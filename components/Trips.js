import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import colors from '../css/colors';
const {height, width} = Dimensions.get('window');

export default class Trips extends React.Component {
  static navigationOptions = {
    //  header: null,
   }

  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      text: '',
      admin: [this.props.navigation.state.params.admin],
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
    if (this.state.admin[0].name) {
      fetch(`https://split-trip.herokuapp.com/login/${this.state.admin[0].name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
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
      // style={{backgroundColor: colors.lightblue}}
      <View >
        <Image source={require('../css/road.jpg')} style={styles.backgroundimage}></Image>


          {
            this.state.admin[0].name
              ? <View style={styles.topContainer}>
                  <TouchableOpacity onPress={() => navigate('NewTrip', { updateTrip: this.updateTrip, admin_id: this.state.admin[0].id })}>
                    <Text style={styles.newTrip}>Create a New Trip</Text>
                  </TouchableOpacity>
                  <SearchBar
                    round
                    lightTheme
                    onChangeText={this.search}
                    placeholder='Search for a Specific Trip' />
                </View>
              : <SearchBar
                round
                lightTheme
                onChangeText={this.search}
                placeholder='Search for a Specific Trip' />
          }
        {/* <SearchBar
          round
          lightTheme
          onChangeText={this.search}
          placeholder='Search for a Specific Trip' /> */}
        <ScrollView>
          {
            this.state.trips.filter(e => e.name.includes(this.state.text)).map(e => {
              return (
                  <TouchableOpacity key={e.id} style={styles.trips} onPress={() => navigate('TripUsers', { trip_id: e.id, trip_name: e.name, admin: this.state.admin, admin_id: e.admin_id })}>
                    <Text style={styles.title}>{e.name}</Text>
                    <View key={e.id} style={styles.box}>
                    <Image source={e.id === 2 ? require('../css/e2.jpg') : {uri: e.image_url}} style={styles.image} />
                  </View>
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
    color: colors.green,
    backgroundColor: 'transparent'
  },
  trips: {
    marginVertical: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden'
  },
  newTrip: {
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    padding: 12,
    borderRadius: 10,
    width: 150,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  box: {
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
    borderRadius: 20,
    // overflow: 'hidden'
  },
  backgroundimage: {
    position: 'absolute',
    height,
    width,
    opacity: 0.3
    // left: (Dimensions.get('window').width - 64) / 2,
    // borderRadius: 32,
  },
  topContainer: {
    flexWrap: 'nowrap'
  }
});
