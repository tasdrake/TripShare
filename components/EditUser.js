import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';



export default class NewUser extends React.Component {
  static navigationOptions = {
    // header: null,
    // title: 'Receipts',
  };

  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.navigation.state.params.user_id,
      user: {},
      nameErr: false,
      urlErr: false,
      phoneErr: false,
      name: '',
      image_url: ' ',
      phone: '',
      updateUsers: this.props.navigation.state.params.updateUsers,
      updateUser: this.props.navigation.state.params.updateUser,
      imageError: false,
      load: false,
    };
  }

  post = () => {
    if (this.state.phone.length !== 10) {
      this.setState({ phoneErr: true });
    } else if (!this.state.name && !this.state.image_url && !this.state.phone) {
      this.setState({ nameErr: true, urlErr: true, phoneErr: true });
    } else if (!this.state.name && !this.state.image_url) {
      this.setState({ nameErr: true, urlErr: true });
    } else if (!this.state.name && !this.state.phone) {
      this.setState({ nameErr: true, phoneErr: true });
    } else if (!this.state.phone && !this.state.image_url) {
      this.setState({ phoneErr: true, urlErr: true });
    } else if (!this.state.name) {
      this.setState({ nameErr: true });
    } else if (!this.state.image_url || !this.state.load) {
      this.setState({ urlErr: true });
    } else {
      fetch(`https://split-trip.herokuapp.com/users/${this.state.user_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          image_url: this.state.image_url,
          phone: this.state.phone,
        })
      })
      .then(res => res.json())
      .then(() => {
        this.state.updateUsers();
        this.state.updateUser();
        this.props.navigation.goBack();
      });
    }
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
    .then(user => {
      this.setState({
        name: user[0].name,
        image_url: user[0].image_url,
        phone: user[0].phone
      });
    });
  }

  updateName = (e) => {
    if (!e) {
      this.setState({ nameErr: true });
      this.setState({ name: e });
    } else {
      this.setState({ nameErr: false });
      this.setState({ name: e });
    }
  }

  updateUrl = (e) => {
    this.setState({ imageError: false, load: false });
    if (!e) {
      this.setState({ urlErr: true });
      this.setState({ image_url: e });
    } else {
      this.setState({ urlErr: false });
      this.setState({ image_url: e });
    }
  }

  updatePhone = (e) => {
    if (!e) {
      this.setState({ phoneErr: true });
      this.setState({ phone: e });
    } else {
      this.setState({ phoneErr: false });
      this.setState({ phone: e });
    }
  }

  imgErr = () => {
    window.setTimeout(() => {
      if (!this.state.load) this.setState({ imageError: true });
    }, 1500);
  }

  imgErrClear = () => {
    this.setState({ imageError: false, load: true });
  }

  render() {
    return (
      <View style={styles.user}>

        <FormLabel>Name</FormLabel>
        <FormInput onChangeText={this.updateName} value={this.state.name}/>
        {this.state.nameErr ? <FormValidationMessage>Please enter a name</FormValidationMessage> : null}

        <FormLabel>Image URL</FormLabel>
        <FormInput onChangeText={this.updateUrl} value={this.state.image_url}/>
        {this.state.urlErr ? <FormValidationMessage>Please enter a URL for the user icon</FormValidationMessage> : null}

        <FormLabel>Phone Number</FormLabel>
        <FormInput onChangeText={this.updatePhone} value={this.state.phone}/>
        {this.state.phoneErr ? <FormValidationMessage>Please enter a 10 digit phone number</FormValidationMessage> : null}
        <Text>{'\n\n\n'}</Text>
        {
          this.state.imageError
            ? <Text style={{textAlign: 'center'}}>Could not load the image {'\n\n'} Please try another</Text>
            : <Image source={{uri: this.state.image_url}} onError={this.imgErr} onLoad={this.imgErrClear} style={{width: 100,
            height: 100}}/>
        }


        <TouchableOpacity onPress={this.post} style={styles.newButton}>
          <Text>Edit {this.state.name}</Text>
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
