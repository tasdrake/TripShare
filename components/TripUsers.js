import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
const {height, width} = Dimensions.get('window');
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';




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
        {/* <Image source={this.state.trip_id === 2 ? require('../css/e2.jpg') : {uri: this.state.image_url}} style={styles.backgroundimage}></Image> */}
        <Image source={require('../css/background2.png')} style={styles.backgroundimage}></Image>

        {
          this.state.admin[0].id === this.state.admin_id
          ? <View style={styles.topContainer}>
              <TouchableOpacity onPress={() => navigate('NewUser', { trip_name: this.state.name, trip_id: this.state.trip_id, updateUsers: this.updateUsers })}>
                {/* <Text style={styles.newUser}>Add Someone to {this.state.name}</Text> */}
                <Text style={styles.newUser}>New Person</Text>
              </TouchableOpacity>
              <FormInput placeholder='Search for trips' placeholderTextColor='#ffd391' onChangeText={this.search} containerStyle={styles.search, {width: 210, borderBottomColor: '#ffd391'}} inputStyle={{color: '#ffd391', marginTop: 15}} />
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
        <ScrollView style={{backgroundColor: 'transparent'}}>
          {/* <View style={{alignItems: 'center', marginTop: 20}}> */}


          {


            this.state.users.filter(e => e.name.includes(this.state.text)).sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map(e => {
              return (
                <TouchableOpacity key={e.id}  style={styles.users} onPress={() => navigate('Receipts', { user_id: e.id, updateUsers: this.updateUsers, trip_id: this.state.trip_id })}>
                {/* <TouchableOpacity key={e.id} > */}
                  {/* style={styles.boxContainer} */}
                  {/* <View style={{    width: 150,
                      height: 150,
                      backgroundColor: '#ffd391',  shadowOpacity: 0.7,
                      shadowOffset: {width: 1, height: 1},}}> */}

                      <Text style={styles.title}>{e.name}</Text>
                      <View key={e.id} style={styles.box}>
                        <Image source={{uri: e.image_url}} style={styles.image} />
                      </View>
                  {/* </TouchableOpacity> */}
                {/* </View> */}
              </TouchableOpacity>
              );
            })
          }
          {/* </View> */}
        </ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigate('Total', { trip_id: this.state.trip_id, admin: this.state.admin, admin_id: this.state.admin_id })} >
            <Text style={styles.footer}>Total Trip</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    // color: '#3e2e26',
    color: '#ffd391'
  },
  users: {
    // marginVertical: 40,
    flex: 1,
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: 30
    // shadowOpacity: 0.7,
    // shadowOffset: {width: 1, height: 1},
    // overflow: 'hidden'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // overflow: 'hidden',
  },
  footer: {
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e4ad5a',
    backgroundColor: '#e4ad5a',
    padding: 12,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    fontSize: 16,
    color: '#2a0001',
    fontWeight: 'bold',
    width: 200,
    marginTop: 10,
  },
  newUser: {
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e4ad5a',
    backgroundColor: '#e4ad5a',
    padding: 12,
    borderRadius: 10,
    // width: 160,
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
    borderRadius: 50,
  },
  backgroundimage: {
    position: 'absolute',
    height,
    width,
    // opacity: 0.3
  },
  boxContainer: {
    // overflow: 'hidden',
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
    borderRadius: 20,
    // borderRadius: 10,
    marginVertical: 10,
  },
  search: {
    borderBottomColor: '#ffd391',
  },
  topContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    marginBottom: 10,
  },
});
