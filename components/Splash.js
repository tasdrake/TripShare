import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View,
  Button,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
// import client_id from '../key';

class Splash extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      admin: null
    };
  }
  static navigationOptions = {
     header: null,
   }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = ({ url }) => {
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      admin: JSON.parse(decodeURI(user_string))
    });

    if (Platform.OS === 'ios') {
      SafariView.addEventListener("onDismiss", () => {
        const {navigate} = this.props.navigation;
        navigate('Trips', {admin: this.state.admin});
        }
      );
      SafariView.dismiss();
    }
  }

  loginWithFacebook = () => this.openURL('https://split-trip.herokuapp.com/auth/facebook');


  openURL = (url) => {
      if (Platform.OS === 'ios') {
        SafariView.show({
          url: url,
          fromBottom: true,
        });
      }
      else {
        Linking.openURL(url);
      }

  };


  render(){
    const { admin } = this.state;
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>Welcome to TripShare {'\n'} login to create a trip or continue to see active trips</Text>
        </View>
        <Button onPress={() => navigate('Trips', {admin})} title='Go to trips'></Button>
        {/* Login buttons */}
        <View style={styles.buttons}>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={this.loginWithFacebook}
            {...iconStyles}
          >
            Login with Facebook
          </Icon.Button>
        </View>

      </View>
    );
  }
}
const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
});

export default Splash;
