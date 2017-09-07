import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';
import colors from '../css/colors';
import styles from '../css/NewTrip';
import forms from '../css/forms';

export default class NewTrip extends React.Component {
  static navigationOptions = {
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      top: 0,
      left: 0,
      right: 0,
      borderBottomWidth: 0
    },
    headerTintColor: colors.darkYellow,
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
      this.setState({ image_url: 'https://cdn.pixabay.com/photo/2016/07/30/00/03/mountain-road-1556177_1280.jpg' });
    } else {
      this.setState({ urlErr: false });
      this.setState({ image_url: e });
    }
  }

  imgErr = () => this.setState({ imageError: true });

  imgErrClear = () => this.setState({ imageError: false, load: true });

  render() {
    return (
      <View style={styles.user}>
        <Image source={require('../css/background2.png')} style={styles.backgroundimage}/>

        <FormLabel containerStyle={forms.labelContainer} labelStyle={forms.labelStyle}>
          Trip Name
        </FormLabel>
        <FormInput onChangeText={this.updateName}
          containerStyle={forms.input}
          placeholderTextColor={colors.lightYellow}
          inputStyle={{color: colors.lightYellow}}
          selectionColor={colors.lightYellow} />
        {
          this.state.nameErr
            ? <FormValidationMessage labelStyle={forms.warn}>
                Please enter a name for the trip
              </FormValidationMessage>
            : null
        }

        <FormLabel containerStyle={forms.labelContainer} labelStyle={forms.labelStyle}>
          Image URL
        </FormLabel>
        <FormInput onChangeText={this.updateUrl}
          containerStyle={forms.input}
          placeholderTextColor={colors.lightYellow}
          inputStyle={{color: colors.lightYellow}}
          selectionColor={colors.lightYellow} />
        {
          this.state.urlErr
            ? <FormValidationMessage labelStyle={forms.warn}>
                Please enter a URL for a picture for the trip
              </FormValidationMessage>
            : null
        }

        <Text>{'\n\n\n'}</Text>

        {
          this.state.imageError
            ? <Text style={forms.warn}>
                Could not load the image {'\n\n'} Please try another
              </Text>
            : <View style={this.state.load ? styles.box : null}>
                <Image source={{uri: this.state.image_url}}
                  onError={this.imgErr}
                  onLoad={this.imgErrClear}
                  style={styles.image}/>
              </View>
        }

        <TouchableOpacity onPress={this.post} style={styles.shadow}>
          <Text style={styles.newButton}>Create a New Trip</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
