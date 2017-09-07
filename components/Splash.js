import React from 'react';
import {
  Image,
  Linking,
  Platform,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import styles from '../css/Splash';


export default class Splash extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      admin: {
        id: 0
      }
    };
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
    Linking.getInitialURL().then((url) => {
      if (url) this.handleOpenURL({url});
    });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = ({url}) => {
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      admin: JSON.parse(decodeURI(user_string))
    });

    if (Platform.OS === 'ios') {
      SafariView.addEventListener("onDismiss", () => {
        const {navigate} = this.props.navigation;
        navigate('Trips', {admin: this.state.admin});
      });
      SafariView.dismiss();
    }
  }

  loginWithFacebook = () => this.openURL('https://split-trip.herokuapp.com/auth/facebook');

  openURL = (url) => {
    if (Platform.OS === 'ios') {
      SafariView.show({url: url, fromBottom: true});
    } else {
      Linking.openURL(url);
    }

  };

  render() {
    const { admin } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

        <Image source={require('../css/background2.png')} style={styles.image}/>

        <View>
          <TouchableOpacity style={styles.shadow}>
            <Icon.Button name="facebook" backgroundColor="transparent" onPress={this.loginWithFacebook} {...styles.icon}>
              Login with Facebook to Create or Edit Trips
            </Icon.Button>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigate('Trips', {admin})} style={styles.tripButton}>
          <Text style={styles.buttonText}>Add Receipts and See Totals</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
