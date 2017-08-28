import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

export default class Receipts extends React.Component {
  static navigationOptions = {
    // header: null,
    title: 'Receipts',
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      user_id: this.props.navigation.state.params.user_id
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

  render() {
    // const { navigate } = this.props.navigation;
    console.log(this.state.user.image_url);
    console.log(this.state.user.paid);
    return (
      <View style={styles.user}>
        <Text style={styles.name}>{this.state.user.name}</Text>
        <Image source={{ uri: this.state.user.image_url}} style={styles.image}/>
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
