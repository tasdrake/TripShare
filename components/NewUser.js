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
import styles from '../css/NewUser';
import forms from '../css/forms';


export default class NewUser extends React.Component {
  static navigationOptions = {
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      top: 0,
      left: 0,
      right: 0,
      borderBottomWidth: 0
    },
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
    if (phone.length !== 10) {
      this.setState({ phoneErr: true });
    } else if (!this.state.name && !this.state.phone) {
      this.setState({ nameErr: true, phoneErr: true });
    } else if (!this.state.name) {
      this.setState({ nameErr: true });
    } else if (!this.state.load) {
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
      this.setState({ image_url: 'https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png' });
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
    if (!this.state.load) this.setState({ imageError: true });
  }

  imgErrClear = () => this.setState({ imageError: false, load: true });

  render() {
    return (
      <View style={styles.user}>
        <Image source={require('../css/background2.png')} style={styles.backgroundimage}/>

        <FormLabel containerStyle={forms.labelContainer} labelStyle={forms.labelStyle}>
          Name
        </FormLabel>
        <FormInput onChangeText={this.updateName}
          containerStyle={forms.input}
          placeholderTextColor={colors.lightYellow}
          inputStyle={{color: colors.lightYellow}}
          selectionColor={colors.lightYellow} />
        {
          this.state.nameErr
            ? <FormValidationMessage labelStyle={forms.warn}>
                Please enter a name
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
                Please enter a URL for the user icon
              </FormValidationMessage>
            : null
        }

        <FormLabel containerStyle={forms.labelContainer} labelStyle={forms.labelStyle}>
          Phone Number
        </FormLabel>
        <FormInput onChangeText={this.updatePhone}
          containerStyle={forms.input}
          placeholderTextColor={colors.lightYellow}
          inputStyle={{color: colors.lightYellow}}
          value={this.state.phone}
          selectionColor={colors.lightYellow} />
        {
          this.state.phoneErr
            ? <FormValidationMessage labelStyle={forms.warn}>
                Please enter a 10 digit phone number
              </FormValidationMessage>
            : null
        }

        <Text>{'\n\n\n'}</Text>

        {
          this.state.imageError
            ? <Text style={forms.warn}>
                Could not load the image {'\n\n'} Please try another
              </Text>
            : <View style={styles.box}>
                <Image source={{uri: this.state.image_url}}
                  onError={this.imgErr}
                  onLoad={this.imgErrClear}
                  style={styles.image}/>
              </View>
        }

        <TouchableOpacity onPress={this.post} style={styles.shadow}>
          <Text style={styles.newButton}>
            Add {this.state.name} to {this.state.trip_name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
