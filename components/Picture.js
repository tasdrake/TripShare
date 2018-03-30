import React from 'react';
import {
  TouchableHighlight,
  View,
  Image,
} from 'react-native';
import Camera from 'react-native-camera';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import colors from '../css/colors';
import styles from '../css/Picture';


import key from '../key';
const cloudVision  = 'https://vision.googleapis.com/v1/images:annotate?key=' + key;

export default class Picture extends React.Component {
  // removes the nav bar from the camera, but keeps the back button
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
      // Function to set state of the amount in my previous screen
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
    // Show spinner while waiting for image to process
    this.toggleLoader();
    // Take a picture
    this.camera.capture()
    // Send the data to the api
      .then((image64) => {
        axios.post(cloudVision, {
          "requests":[
            {
              "image":{
                "content": image64.data
              },
              "features":[
                {
                  // Set what you action you are requesting from the cloud vision api
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
          // Spliting at every new line character and space
          const result = textContent.split(/[\n ]/)
            .map(e => {
              // if the element has a number in it
              if (e.match(/[0-9]/)) {
                // remove anything is not a number before the numbers, with prices I found $ and USD were common, there could be more
                while(!Number(e[0])) e = e.slice(1);
              }
              return e;
              // if the number is a decimal, since price always has a decimal I filtered the results
          }).filter(e => (!!Number(e) && e.includes('.')));
          //  The result array contains all the prices that were on the receipt
          // The total is almost always the last element, so I take that one.
          let end = result[result.length - 1];

          // Calls function to hide loading spinner, setState, and go to the previous page
          self.setTextContent(end);
        }).catch(error => console.error(error, "error"));
      }).catch(err => console.error(err));
  }
  
  setTextContent = (textContent) => {
    // Hide loading spinner
    this.toggleLoader();
    // Sets the state for the previous screen
    this.state.camera(textContent);
    // Return to the previous screen
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
            {/* I created a custom button using photoshop to match my color scheme */}
            <Image style={{width: 150, height: 150}} source={require('../css/button.png')}/>
          </TouchableHighlight>
        </Camera>

      </View>
    );
  }
}
