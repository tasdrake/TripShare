import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
const {height, width} = Dimensions.get('window');

// import styles from '../css/TripUsers';
// import colors from '../css/colors';

export default class Receipts extends React.Component {
  static navigationOptions = {
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent',  top: 0, left: 0, right: 0, borderBottomWidth: 0,},
    headerTintColor: '#e4ad5a',
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      user_id: this.props.navigation.state.params.user_id,
      trip_id: this.props.navigation.state.params.trip_id,
      newAmount: '',
      err: false,
      updateUsers: this.props.navigation.state.params.updateUsers,
      text: '',
    };

  }
  componentDidMount() {
    fetch(`https://split-trip.herokuapp.com/users/${this.state.user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(result => result.json()).then(user => this.setState({user: user[0]}));
  }

  update = (e) => {
    if (Number(e) < 0) {
      this.setState({err: true});
    } else {
      this.setState({err: false});
      this.setState({newAmount: String(e)});
    }
  }

  post = () => {
    if (this.state.newAmount > 0) {
      const amount = Number(this.state.user.amount_spent) + Number(this.state.newAmount);

      fetch(`https://split-trip.herokuapp.com/users/${this.state.user_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({amount_spent: amount})
      }).then(() => {
        this.setState({newAmount: ''});
        this.props.navigation.goBack();
      });
    }
  }

  updateUser = () => {
    fetch(`https://split-trip.herokuapp.com/users/${this.state.user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(result => result.json()).then(user => this.setState({user: user[0]}));
  }
  camera = (newAmount) => this.setState({ newAmount });

  render() {
    const {navigate} = this.props.navigation;
    let {image} = this.state;
    return (
            <View style={styles.user}>
              <Image source={require('../css/background2.png')} style={styles.backgroundimage}></Image>

              <Text style={styles.name}>{this.state.user.name}</Text>
              <View style={styles.box}>
                <Image source={{uri: this.state.user.image_url }} style={styles.image}/>
              </View>
              <TouchableOpacity onPress={() => navigate('EditUser', {
                user_id: this.state.user_id,
                updateUsers: this.state.updateUsers,
                updateUser: this.updateUser
              })} style={styles.shadow2}>
                <Text style={styles.editButton}>Edit User</Text>
              </TouchableOpacity>
              {/* <View shadowOpacity={ 0.7 } style={{ height: 20, width: 66, borderRadius: 10, shadowOffset: {width: 1, height: 1}, marginTop: -20, zIndex: 0, marginBottom: 5, backgroundColor: 'transparent'}}></View> */}

              <View style={styles.form}>
                <FormLabel containerStyle={{width: 395, alignItems: 'flex-start'}} labelStyle={{color: '#ffd391', backgroundColor: 'transparent'}}>Amount Spent</FormLabel>
                <FormInput keyboardType='numeric' onChangeText={this.update} value={this.state.newAmount} containerStyle={{width: 350, borderBottomColor: '#ffd391'}} placeholderTextColor='#ffd391' inputStyle={{color: '#ffd391'}} />
                {
                  this.state.err
                  ? <FormValidationMessage labelStyle={{color: '#f46319', backgroundColor: 'transparent'}}>Please enter a positive number</FormValidationMessage>
                  : null
                }
              </View>
              {/* <Text>{'\n\n\n'}</Text> */}


              <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1
              }}>

                {/* {
                  image && <Image source={{ uri: image }} style={{ width: 230, height: 200 }}/>
                } */}
              </View>
              {/* <View shadowOpacity={ 0.7 } style={{ height: 45, width: 242, borderRadius: 10, shadowOffset: {width: 1, height: 1}, marginTop: -153, zIndex: 0, marginBottom: 5, backgroundColor: 'transparent'}}></View> */}

              <TouchableOpacity onPress={this.post} style={styles.shadow3}>
                <Text style={styles.addButton}>Add New Receipt</Text>
              </TouchableOpacity>
              {/* <Text>{'\n\n\n'}</Text> */}
              <View>
                <TouchableOpacity onPress={() => navigate('Picture', { camera: this.camera })} style={styles.shadow1}>
                  <Text style={styles.button}>Take a picture of the receipt</Text>
                </TouchableOpacity>

              </View>
              {/* <View shadowOpacity={ 0.7 } style={{ height: 44, width: 158, borderRadius: 10, shadowOffset: {width: 1, height: 1}, marginTop: -49, zIndex: 0, marginBottom: 10, backgroundColor: 'transparent'}}></View> */}
      </View>
    );
  }
}






const styles = StyleSheet.create({
  user: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  name: {
    fontSize: 80,
    color: '#ffd391',
    backgroundColor: 'transparent'
  },
  form: {
    marginTop: 30,
    marginBottom: 5,
    paddingHorizontal: 15,
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
    // left: (Dimensions.get('window').width - 64) / 2,
    // borderRadius: 32,
  },
  button: {
    // marginBottom: 50,
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e4ad5a',
    backgroundColor: '#e4ad5a',
    // padding: 12,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    fontSize: 16,
    color: '#2a0001',
    fontWeight: 'bold',
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
  },
  shadow1: {
    marginBottom: 100,

    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e4ad5a',
    backgroundColor: '#e4ad5a',
    padding: 12,
    borderRadius: 10,
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
    // marginTop: 70,
  },
  editButton: {
    // marginTop: 10,
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e4ad5a',
    backgroundColor: '#e4ad5a',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    fontSize: 12,
    color: '#2a0001',
    fontWeight: 'bold',
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
  },
  shadow2: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e4ad5a',
    backgroundColor: '#e4ad5a',
    // padding: 12,
    borderRadius: 10,
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
    marginTop: 10,
  },
  addButton: {
    // marginTop: 20,
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e4ad5a',
    backgroundColor: '#e4ad5a',
    // padding: 12,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    fontSize: 16,
    color: '#2a0001',
    fontWeight: 'bold',
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
    // marginBottom: 5,
  },
  shadow3: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e4ad5a',
    backgroundColor: '#e4ad5a',
    padding: 12,
    borderRadius: 10,
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
    marginBottom: 60,
  },
});
