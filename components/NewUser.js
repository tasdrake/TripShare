import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
const {height, width} = Dimensions.get('window');


export default class NewUser extends React.Component {
  static navigationOptions = {
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent',  top: 0, left: 0, right: 0, borderBottomWidth: 0,},
    headerTintColor: '#e4ad5a',
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image_url: 'https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png',
      phone: '',
      nameErr: false,
      urlErr: false,
      phoneErr: false,
      trip_name: this.props.navigation.state.params.trip_name,
      trip_id: this.props.navigation.state.params.trip_id,
      updateUsers: this.props.navigation.state.params.updateUsers,
      imageError: false,
      load: false,
    };
  }

  post = () => {
    let phone = this.state.phone;
    phone = phone.split(/[)(-]/g).join('');
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
      fetch(`https://split-trip.herokuapp.com/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          image_url: this.state.image_url,
          phone,
          trip_id: this.state.trip_id
        })
      })
      .then(res => res.json())
      .then(() => {
        this.state.updateUsers();
        this.props.navigation.goBack();
      });
    }
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
    } else if (isNaN(Number(e.split(/[)(-]/).join('')))) {
      return;
    } else if (e.length > 13) {
      return;
    } else if (e.length > this.state.phone.length) {
      if (e.length === 1) e = '(' + e;
      if (e.length === 4) e += ')';
      if (e.length === 8) e += '-';
      this.setState({ phoneErr: false });
      this.setState({ phone: e });
    } else {
      if (e.length === 1) e = e.slice(0, e.length - 1);
      if (e.length === 5) e = e.slice(0, e.length - 1);
      if (e.length === 9) e = e.slice(0, e.length - 1);
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
        <Image source={require('../css/background2.png')} style={styles.backgroundimage}></Image>

        <FormLabel containerStyle={{width: 395, alignItems: 'flex-start'}} labelStyle={{color: '#ffd391', backgroundColor: 'transparent'}}>Name</FormLabel>
        <FormInput onChangeText={this.updateName} containerStyle={{width: 350, borderBottomColor: '#ffd391'}} placeholderTextColor='#ffd391' inputStyle={{color: '#ffd391'}} />
        {this.state.nameErr ? <FormValidationMessage labelStyle={{color: '#f46319', backgroundColor: 'transparent'}}>Please enter a name</FormValidationMessage> : null}

        <FormLabel containerStyle={{width: 395, alignItems: 'flex-start'}} labelStyle={{color: '#ffd391', backgroundColor: 'transparent'}}>Image URL</FormLabel>
        <FormInput onChangeText={this.updateUrl} containerStyle={{width: 350, borderBottomColor: '#ffd391'}} placeholderTextColor='#ffd391' inputStyle={{color: '#ffd391'}} />
        {this.state.urlErr ? <FormValidationMessage labelStyle={{color: '#f46319', backgroundColor: 'transparent'}}>Please enter a URL for the user icon</FormValidationMessage> : null}

        <FormLabel containerStyle={{width: 395, alignItems: 'flex-start'}} labelStyle={{color: '#ffd391', backgroundColor: 'transparent'}}>Phone Number</FormLabel>
        <FormInput onChangeText={this.updatePhone} containerStyle={{width: 350, borderBottomColor: '#ffd391'}} placeholderTextColor='#ffd391' inputStyle={{color: '#ffd391'}} value={this.state.phone}/>
        {this.state.phoneErr ? <FormValidationMessage labelStyle={{color: '#f46319', backgroundColor: 'transparent'}}>Please enter a 10 digit phone number</FormValidationMessage> : null}
        <Text>{'\n\n\n'}</Text>
        {
          this.state.imageError
            ? <Text style={{textAlign: 'center'}}>Could not load the image {'\n\n'} Please try another</Text>
            : <View style={styles.box}>
              <Image source={{uri: this.state.image_url}} onError={this.imgErr} onLoad={this.imgErrClear} style={styles.image}/>
            </View>
        }

        <TouchableOpacity onPress={this.post} >
          <Text style={styles.newButton}>Add {this.state.name} to {this.state.trip_name}</Text>
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
    borderRadius: 50,
    overflow: 'hidden',
  },
  name: {
    fontSize: 80,
  },
  newButton: {
    marginTop: 50,
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
    fontWeight: 'bold'
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
});
