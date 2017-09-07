import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { FormInput } from 'react-native-elements';
import styles from '../css/TripUsers';
import colors from '../css/colors';



export default class TripUsers extends React.Component {
  static navigationOptions = {
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      top: 0,
      left: 0,
      right: 0,
      borderBottomWidth: 0
    },
    headerTintColor: '#e4ad5a',
  };

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      trip_id: this.props.navigation.state.params.trip_id,
      name: this.props.navigation.state.params.trip_name,
      text: '',
      admin: this.props.navigation.state.params.admin,
      admin_id: this.props.navigation.state.params.admin_id,
      image_url: this.props.navigation.state.params.image_url,
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

  updateUsers = () => {
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

  search = (text) => this.setState({text})



  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <Image source={require('../css/background2.png')} style={styles.backgroundimage}></Image>

        {
          this.state.admin[0].id === this.state.admin_id
          ? <View style={styles.topContainer}>
              <TouchableOpacity onPress={() => navigate('NewUser', { trip_name: this.state.name, trip_id: this.state.trip_id, updateUsers: this.updateUsers })} style={styles.shadow}>
                <Text style={styles.newUser}>New Person</Text>
              </TouchableOpacity>
              <FormInput placeholder='Search for trips'
                placeholderTextColor={colors.lightYellow}
                onChangeText={this.search}
                containerStyle={styles.search1}
                inputStyle={{color: colors.lightYellow, marginTop: 15}} />
            </View>
          : <View style={styles.topContainer}>
              <FormInput placeholder='Search for trips'
                placeholderTextColor={colors.lightYellow}
                onChangeText={this.search} containerStyle={styles.search} inputStyle={{color: colors.lightYellow}} />
            </View>
        }

        <ScrollView style={{backgroundColor: 'transparent'}}>
          {
            this.state.users.filter(e => e.name.includes(this.state.text))
              .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
              .map(e => {
              return (
                <TouchableOpacity key={e.id} style={styles.users} onPress={() => navigate('Receipts', {
                  user_id: e.id,
                  updateUsers: this.updateUsers,
                  trip_id: this.state.trip_id
                })}>
                      <Text style={styles.title}>
                        {e.name}
                      </Text>
                      <View key={e.id} style={styles.box}>
                        <Image source={{uri: e.image_url}} style={styles.image} />
                      </View>
              </TouchableOpacity>
              );
            })
          }

        </ScrollView>
        <View style={styles.foot}>
          <View style={styles.shadow2}>
            <TouchableOpacity onPress={() => navigate('Total', {
              trip_id: this.state.trip_id,
              admin: this.state.admin,
              admin_id: this.state.admin_id,
              name: this.state.name
            })}>
              <Text style={styles.footer}>
                Total Trip
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
