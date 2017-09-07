import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
// import MKTextField from 'react-native-material-kit';
const {height, width} = Dimensions.get('window');

export default class NewTrip extends React.Component {
  static navigationOptions = {
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent',  top: 0, left: 0, right: 0, borderBottomWidth: 0,},
    headerTintColor: '#e4ad5a',
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image_url: 'https://cdn.pixabay.com/photo/2016/07/30/00/03/mountain-road-1556177_1280.jpg',
      nameErr: false,
      urlErr: false,
      updateTrip: this.props.navigation.state.params.updateTrip,
      imageError: false,
      load: true,
      admin_id: this.props.navigation.state.params.admin_id,
    };
  }

  post = () => {
    // if (!this.state.name && !this.state.image_url) {
    //   this.setState({ nameErr: true, urlErr: true });
    // } else
    if (!this.state.name) {
      this.setState({ nameErr: true });
    } else if (!this.state.load) {
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
    console.log('err1');
    console.log(this.state.image_url.length > 1);
    if (!this.state.load && this.state.image_url.length > 1) {
      this.setState({ imageError: true });
      console.log('err2');
    }
  }

  imgErrClear = () => {
    this.setState({ imageError: false, load: true });
  }

  render() {
    return (
      <View style={styles.user}>
        <Image source={require('../css/background2.png')} style={styles.backgroundimage}></Image>
        <FormLabel containerStyle={{width: 395, alignItems: 'flex-start'}} labelStyle={{color: '#ffd391', backgroundColor: 'transparent'}}>Trip Name</FormLabel>
        <FormInput onChangeText={this.updateName} containerStyle={{width: 350, borderBottomColor: '#ffd391'}} placeholderTextColor='#ffd391' inputStyle={{color: '#ffd391'}} />
        {this.state.nameErr ? <FormValidationMessage labelStyle={{color: '#f46319', backgroundColor: 'transparent'}}>Please enter a name for the trip</FormValidationMessage> : null}

        <FormLabel containerStyle={{width: 395, alignItems: 'flex-start'}} labelStyle={{color: '#ffd391', backgroundColor: 'transparent'}}>Image URL</FormLabel>
        <FormInput onChangeText={this.updateUrl} containerStyle={{width: 350, borderBottomColor: '#ffd391'}} placeholderTextColor='#ffd391' inputStyle={{color: '#ffd391'}} />
        {this.state.urlErr ? <FormValidationMessage labelStyle={{color: '#f46319', backgroundColor: 'transparent'}}>Please enter a URL for a picture for the trip</FormValidationMessage> : null}
        <Text>{'\n\n\n'}</Text>

        {
          this.state.imageError
            ? <Text style={{textAlign: 'center'}}>Could not load the image {'\n\n'} Please try another</Text>
            : <View style={this.state.load ? styles.box : null}>
                <Image source={{uri: this.state.image_url}} onError={this.imgErr} onLoad={this.imgErrClear} style={styles.image}/>
              </View>
        }

        <TouchableOpacity onPress={this.post} style={styles.shadow}>
          <Text style={styles.newButton}>Create a New Trip</Text>
          <View shadowOpacity={ 0.7 } style={{ height: 45, width: 200, borderRadius: 10, shadowOffset: {width: 1, height: 1}, marginTop: -45, zIndex: -1, backgroundColor: 'transparent'}}></View>
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
  load: {
    width: 100,
    height: 100,
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
    // marginTop: 50,
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
  box: {
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
    borderRadius: 20,
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
    shadow: {
      marginTop: 50,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#e4ad5a',
      backgroundColor: '#e4ad5a',
      padding: 12,
      borderRadius: 10,
      // width: 150,
      // overflow: 'hidden',
      shadowOpacity: 0.7,
      shadowOffset: {width: 1, height: 1}
    },
});
