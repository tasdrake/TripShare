import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';



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
      newAmount: 0,
      err: false,
    };
  }
  componentDidMount() {
    fetch(`https://split-trip.herokuapp.com/users/${this.state.user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        }
    })
    .then(result => result.json())
    .then(user => this.setState({ user: user[0] }));
  }

  update = (e) => {
    if (e < 0) {
      this.setState({ err: true });
    } else {
      this.setState({ err: false });
      this.setState({ newAmount: e });
    }
  }

  post = () => {
    if (this.state.newAmount > 0) {
      const amount = Number(this.state.user.amount_spent) + Number(this.state.newAmount);

      fetch(`https://split-trip.herokuapp.com/users/${this.state.user_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ amount_spent: amount })
      })
      .then(() => {
        this.setState({ newAmount: 0 });
        this.props.navigation.goBack();
      });
    }
  }

  render() {
    return (
      <View style={styles.user}>
        <Text style={styles.name}>{this.state.user.name}</Text>
        <Image source={{ uri: this.state.user.image_url}} style={styles.image}/>

        <FormLabel>Name</FormLabel>
        <FormInput onChangeText={this.update} val={this.state.newAmount}/>
        {this.state.err ? <FormValidationMessage>Please enter a positive number</FormValidationMessage> : null}
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
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 80
  }
});
