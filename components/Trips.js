import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import colors from '../css/colors';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
const {height, width} = Dimensions.get('window');

export default class Trips extends React.Component {
  static navigationOptions = {
    //  header: null,
     headerStyle:{ position: 'absolute', backgroundColor: 'transparent',  top: 0, left: 0, right: 0, borderBottomWidth: 0,},
     headerTintColor: '#e4ad5a',

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
      <View style={{paddingTop: 60}}>
        {/* <Image source={require('../css/road.jpg')} style={styles.backgroundimage}></Image> */}
        <Image source={require('../css/background2.png')} style={styles.backgroundimage}></Image>


          {
            this.state.admin[0].name
              ? <View style={styles.topContainer}>
                  <TouchableOpacity onPress={() => navigate('NewTrip', { updateTrip: this.updateTrip, admin_id: this.state.admin[0].id })}>
                    <Text style={styles.newTrip}>New Trip</Text>
                  </TouchableOpacity>
                  <FormInput placeholder='Search for trips' placeholderTextColor='#ffd391' onChangeText={this.search} containerStyle={styles.search, {width: 230, borderBottomColor: '#ffd391'}} inputStyle={{color: '#ffd391', marginTop: 15}} />
                  {/* <SearchBar
                    round
                    lightTheme
                    onChangeText={this.search}
                    placeholder='Search for a Specific Trip' /> */}
                </View>
              : <View style={styles.topContainer}>
                  <FormInput placeholder='Search for trips' placeholderTextColor='#ffd391' onChangeText={this.search} containerStyle={styles.search} inputStyle={{color: '#ffd391'}} />
                </View>
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
                  <TouchableOpacity key={e.id} style={styles.trips} onPress={() => navigate('TripUsers', { trip_id: e.id, trip_name: e.name, admin: this.state.admin, admin_id: e.admin_id, image_url: e.image_url })}>
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
    color: '#ffd391',
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
    borderColor: '#e4ad5a',
    backgroundColor: '#e4ad5a',
    padding: 12,
    borderRadius: 10,
    width: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16,
    color: '#2a0001',
    fontWeight: 'bold'
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
    // opacity: 0.3
    // left: (Dimensions.get('window').width - 64) / 2,
    // borderRadius: 32,
  },
  topContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    marginBottom: 10,
  },
  search: {
    borderBottomColor: '#ffd391',
  }
});
