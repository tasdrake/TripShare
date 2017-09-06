import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
const {height, width} = Dimensions.get('window');



export default class TripUsers extends React.Component {
  static navigationOptions = {
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent',  top: 0, left: 0, right: 0, borderBottomWidth: 0,},
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
        <Image source={this.state.trip_id === 2 ? require('../css/e2.jpg') : {uri: this.state.image_url}} style={styles.backgroundimage}></Image>
        {
          this.state.admin[0].id === this.state.admin_id
            ? <View>
              <TouchableOpacity onPress={() => navigate('NewUser', { trip_name: this.state.name, trip_id: this.state.trip_id, updateUsers: this.updateUsers })}>
                <Text style={styles.newUser}>Add Someone to {this.state.name}</Text>
              </TouchableOpacity>
            </View>
            : null
        }
        <SearchBar
          round
          lightTheme
          onChangeText={this.search}
          placeholder='Search for someone on the trip' />
        <ScrollView>
          <View style={{alignItems: 'center', marginTop: 20}}>


          {


            this.state.users.filter(e => e.name.includes(this.state.text)).sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map(e => {
              return (
                <TouchableOpacity key={e.id} style={styles.boxContainer}>

                  <View  style={styles.users} onPress={() => navigate('Receipts', { user_id: e.id, updateUsers: this.updateUsers, trip_id: this.state.trip_id })}>
                    <Text style={styles.title}>{e.name}</Text>
                    <View key={e.id} style={styles.box}>
                      <Image source={{uri: e.image_url}} style={styles.image} />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          }
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity onPress={() => navigate('Total', { trip_id: this.state.trip_id, admin: this.state.admin, admin_id: this.state.admin_id })}>
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
    marginBottom: 10,
    textAlign: 'center',
    color: '#ffd391'
  },
  users: {
    marginVertical: 40,
    flex: 1,
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  footer: {
    textAlign: 'center',
    marginVertical: 10,
  },
  newUser: {
    textAlign: 'center',
    marginTop: 10,
  },
  box: {
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
    borderRadius: 50,
    // overflow: 'hidden'
  },
  backgroundimage: {
    position: 'absolute',
    height,
    width,
    // opacity: 0.3
  },
  boxContainer: {
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
    borderRadius: 20,
    width: 150,
    height: 150,
    overflow: 'hidden',
    marginVertical: 10,
    backgroundColor: '#3e2e26'
  },
});
