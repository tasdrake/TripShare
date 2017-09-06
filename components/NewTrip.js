import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
// import MKTextField from 'react-native-material-kit';


export default class NewTrip extends React.Component {
  static navigationOptions = {
    // header: null,
    // headerBackTitle: this.state.name,
    // headerBackTitle: this.state.name,
    headerStyle: {
      // backgroundColor: 'white',
    },
    headerBackTitleStyle: {
    },
    // headerTintColor: 'black',
    headerTitleStyle: {
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image_url: ' ',
      nameErr: false,
      urlErr: false,
      updateTrip: this.props.navigation.state.params.updateTrip,
      imageError: false,
      load: false,
      admin_id: this.props.navigation.state.params.admin_id,
    };
  }

  post = () => {
    if (!this.state.name && !this.state.image_url) {
      this.setState({ nameErr: true, urlErr: true });
    } else if (!this.state.name) {
      this.setState({ nameErr: true });
    } else if (!this.state.image_url || !this.state.load) {
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
          image_url: this.state.image_url,
          admin_id: this.state.admin_id
        })
      })
      .then(() => {
        this.state.updateTrip();
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

  imgErr = () => {
    if (!this.state.load && this.state.image_url > 1) this.setState({ imageError: true });
  }

  imgErrClear = () => {
    this.setState({ imageError: false, load: true });
  }

  render() {
    return (
      <View style={styles.user}>

        <FormLabel containerStyle={{width: 395, alignItems: 'flex-start'}}>Trip Name</FormLabel>
        <FormInput onChangeText={this.updateName} containerStyle={{width: 350}}/>
        {this.state.nameErr ? <FormValidationMessage>Please enter a name for the trip</FormValidationMessage> : null}

        <FormLabel containerStyle={{width: 395, alignItems: 'flex-start'}}>Image URL</FormLabel>
        <FormInput onChangeText={this.updateUrl}containerStyle={{width: 350}}/>
        {this.state.urlErr ? <FormValidationMessage>Please enter a URL for a picture for the trip</FormValidationMessage> : null}
        <Text>{'\n\n\n'}</Text>
        {
          this.state.imageError
            ? <Text style={{textAlign: 'center'}}>Could not load the image {'\n\n'} Please try another</Text>
            : <View style={styles.box}>
                <Image source={{uri: this.state.image_url}} onError={this.imgErr} onLoad={this.imgErrClear} style={styles.image}/>
              </View>
        }

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
    borderRadius: 20,
    overflow: 'hidden',
  },
  name: {
    fontSize: 80,
  },
  newButton: {
    marginTop: 50,
  },
  box: {
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
    borderRadius: 20,
    // overflow: 'hidden'
  },
});
