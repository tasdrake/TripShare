import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';

export default class Receipts extends React.Component {
  static navigationOptions = {
    // header: null,
    // title: 'Receipts',
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
  camera = (newAmount) => {
    console.log('new',newAmount);
    this.setState({ newAmount });
    console.log('state',this.state.newAmount);
  }

  render() {
    const {navigate} = this.props.navigation;
    let {image} = this.state;
    return (
            <View style={styles.user}>
              <Text style={styles.name}>{this.state.user.name}</Text>
              <Image source={{uri: this.state.user.image_url }} style={styles.image}/>
              <TouchableOpacity onPress={() => navigate('EditUser', {
                user_id: this.state.user_id,
                updateUsers: this.state.updateUsers,
                updateUser: this.updateUser
              })}>
                <Text>Edit User</Text>
              </TouchableOpacity>
              <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Button title="Take a picture of the receipt" onPress={() => navigate('Picture', { camera: this.camera })}/>
                {
                  image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }}/>
                }
              </View>
              <View style={styles.form}>
                <FormLabel>Amount Spent</FormLabel>
                <FormInput keyboardType='numeric' onChangeText={this.update} value={this.state.newAmount}/>
                {
                  this.state.err
                    ? <FormValidationMessage>Please enter a positive number</FormValidationMessage>
                    : null
                }
              </View>
              <TouchableOpacity onPress={this.post}>
                <Text>Add New Receipt</Text>
              </TouchableOpacity>
      </View>
    );
  }
}






const styles = StyleSheet.create({
  user: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100
  },
  name: {
    fontSize: 80
  },
  form: {
    marginVertical: 30,
    paddingHorizontal: 15,
  }
});
