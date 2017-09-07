import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '../css/colors';
import { FormInput } from 'react-native-elements';
import styles from '../css/Trips';

export default class Trips extends React.Component {
  static navigationOptions = {
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      top: 0,
      left: 0,
      right: 0,
      borderBottomWidth: 0
    },
    headerTintColor: colors.darkYellow
  }

  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      text: '',
      admin: [this.props.navigation.state.params.admin]
    };
  }

  componentDidMount() {
    fetch('https://split-trip.herokuapp.com/trips', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(result => result.json()).then(trips => this.setState({trips}));
    
    if (this.state.admin[0].name) {
      fetch(`https://split-trip.herokuapp.com/login/${this.state.admin[0].name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(res => res.json()).then(admin => this.setState({admin}));
    }
  }

  updateTrip = () => {
    fetch('https://split-trip.herokuapp.com/trips', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(result => result.json()).then(trips => this.setState({trips}));
  }

  search = (text) => this.setState({text})

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={{ paddingTop: 60 }}>

        <Image source={require('../css/background2.png')} style={styles.backgroundimage}></Image>

        {
          this.state.admin[0].name
            ? <View style={styles.topContainer}>
                <TouchableOpacity onPress={() => navigate('NewTrip', {
                  updateTrip: this.updateTrip,
                  admin_id: this.state.admin[0].id
                })} style={styles.shadow}>
                  <Text style={styles.newTrip}>New Trip</Text>
                </TouchableOpacity>
                <FormInput placeholder='Search for trips'
                  placeholderTextColor={colors.lightYellow}
                  onChangeText={this.search}
                  containerStyle={styles.search1}
                  inputStyle={{ color: colors.lightYellow, marginTop: 15 }}
                  selectionColor={colors.lightYellow}/>
              </View>
            : <View style={styles.topContainer}>
                <FormInput placeholder='Search for trips'
                  placeholderTextColor={colors.lightYellow}
                  onChangeText={this.search}
                  containerStyle={styles.search}
                  inputStyle={{ color: colors.lightYellow }}/>
              </View>
        }

        <ScrollView>
          {
            this.state.trips.filter(e => e.name.includes(this.state.text)).map(e => {
            return (
              <TouchableOpacity key={e.id} style={styles.trips} onPress={() => navigate('TripUsers', {
                trip_id: e.id,
                trip_name: e.name,
                admin: this.state.admin,
                admin_id: e.admin_id,
                image_url: e.image_url
              })}>
                <Text style={styles.title}>{e.name}</Text>
                <View key={e.id} style={styles.box}>
                  <Image source={e.id === 2
                    ? require('../css/e2.jpg')
                    : {
                      uri: e.image_url
                    }} style={styles.image}/>
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
