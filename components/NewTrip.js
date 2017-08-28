import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';



export default class NewTrip extends React.Component {
  static navigationOptions = {
    // header: null,
    // title: 'Receipts',
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image_url: '',
      nameErr: false,
      urlErr: false,
    };
  }

  post = () => {
    console.log(this.state.name, this.state.image_url);
    if (!this.state.name && !this.state.image_url) {
      this.setState({ nameErr: true, urlErr: true });
    } else if (!this.state.name) {
      this.setState({ nameErr: true });
    } else if (!this.state.image_url) {
      this.setState({ urlErr: true });
    } else {
      fetch(`https://split-trip.herokuapp.com/trips/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          image_url: this.state.image_url
        })
      })
      .then(() => this.props.navigation.goBack());
    }
  }

  updateName = (e) => {
    if (!e) {
      this.setState({ nameErr: true });
    } else {
      this.setState({ err: false });
      this.setState({ name: e });
    }
  }

  updateUrl = (e) => {
    if (!e) {
      this.setState({ urlErr: true });
    } else {
      this.setState({ err: false });
      this.setState({ image_url: e });
    }
  }

  render() {
    return (
      <View style={styles.user}>

        <FormLabel>Trip Name</FormLabel>
        <FormInput onChangeText={this.updateName} val={this.state.newAmount}/>
        {this.state.nameErr ? <FormValidationMessage>Please enter a name for the trip</FormValidationMessage> : null}

        <FormLabel>Image URL</FormLabel>
        <FormInput onChangeText={this.updateUrl} val={this.state.newAmount}/>
        {this.state.urlErr ? <FormValidationMessage>Please enter a URL for a picture for the trip</FormValidationMessage> : null}

        <TouchableOpacity onPress={this.post} style={styles.newButton}>
          <Text>Create a New Trip</Text>
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
    fontSize: 80,
  },
  newButton: {
    marginTop: 50,
  },
});
