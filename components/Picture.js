import React from 'react';
import {
  TouchableHighlight,
  View,
  Image,
} from 'react-native';
import Camera from 'react-native-camera';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import key from '../key';
import colors from '../css/colors';
import styles from '../css/Picture';
const cloudVision  = 'https://vision.googleapis.com/v1/images:annotate?key=' + key;

export default class Picture extends React.Component {
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
      captureText: null,
      showLoader: false,
      camera: this.props.navigation.state.params.camera,
    };
  }
  toggleLoader = () => {
    this.setState({
      showLoader: !this.state.showLoader
    });
  }

  takePicture = () => {
    let self = this;
    this.toggleLoader();
    this.camera.capture()
      .then((image64) => {
        axios.post(cloudVision, {
        "requests":[
          {
            "image":{
              "content": image64.data
            },
            "features":[
              {
                "type":"TEXT_DETECTION",
                "maxResults":1
              }
            ]
          }
        ]
      })
      .then((response) => {
        const textAnnotations  = response.data.responses[0].textAnnotations[0];
        const textContent = textAnnotations.description;
        const result = textContent.split(/[\n ]/).map(e => {
          if (e.match(/[0-9]/)) {
            while(!Number(e[0])) e = e.slice(1);
          }
          return e;
        }).filter(e => (!!Number(e) && e.includes('.')));
         let end = result[result.length - 1];

        self.setTextContent(end);
      })
      .catch(error => console.error(error, "error"));
      })
      .catch(err => console.error(err));
  }
  setTextContent = (textContent) => {
    this.toggleLoader();
    this.state.camera(textContent);
    this.props.navigation.goBack();
  }


  render() {
    return (
      <View style={styles.container}>

        <Spinner visible={this.state.showLoader}/>

        <Camera
          ref={(cam) => {this.camera = cam;}}
          captureQuality={Camera.constants.CaptureQuality["720p"]}
          captureTarget={Camera.constants.CaptureTarget.memory}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>

          <TouchableHighlight style={styles.capture} onPress={this.takePicture.bind(this)}>
            <Image style={{width: 150, height: 150}} source={require('../css/button.png')}/>
          </TouchableHighlight>
        </Camera>

      </View>
    );
  }
}
