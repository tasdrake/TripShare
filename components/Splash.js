import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import colors from '../css/colors';
// import client_id from '../key';

const {height, width} = Dimensions.get('window');

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: {
        id: 0
      }
    };
  }
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({url});
      }
    });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = ({url}) => {
    const [,
      user_string] = url.match(/user=([^#]+)/);
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
    const {admin} = this.state;
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>

        <Image source={require('../css/road.jpg')} style={styles.image}></Image>
        <View style={styles.container}>
          <View style={styles.content}>
            {/* <Text style={styles.title}>Welcome to TripShare {'\n'}</Text> */}
            {/* <View style={styles.box}>
              <Text>login</Text>
            </View> */}
            <Text style={styles.title} shadowOffset={{width: 10, height: 10}} shadowColor='black'>login to create a trip or continue to all see active trips</Text>
          </View>

          <View style={styles.buttons}>
            <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook} {...iconStyles}>
              Facebook login
            </Icon.Button>
            <TouchableOpacity onPress={() => navigate('Trips', {admin})} title='Go to trips' style={styles.tripButton}>
              <Text style={styles.buttonText}>Go to trips</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }
}
const iconStyles = {
  borderRadius: 10,
  iconStyle: {
    paddingVertical: 5
  },
  width: 150
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.yellow
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1}
  },
  avatar: {
    margin: 20
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  text: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    backgroundColor: 'transparent'
  },
  buttons: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',

  },
  tripButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    padding: 12,
    borderRadius: 10,
    width: 150,
    overflow: 'hidden',

  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    backgroundColor: 'transparent'
  },
  image: {
    position: 'absolute',
    height,
    width,
    opacity: 0.3
    // left: (Dimensions.get('window').width - 64) / 2,
    // borderRadius: 32,
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: 'red'
  }
});

export default Splash;
