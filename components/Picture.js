import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Camera from 'react-native-camera';
import Modal from 'react-native-simple-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const cloudVisionKey = 'AIzaSyBktFQKj57KRC0AWzN-ctCItENWVDZGth0';
// Endpoints
const cloudVision  = 'https://vision.googleapis.com/v1/images:annotate?key=' + cloudVisionKey;

export default class Picture extends React.Component {
  static navigationOptions = {
    header: null,
    // title: 'Receipts',
  };
  constructor(props) {
    super(props);
    this.state = {
      captureText: null,
      showLoader: false,
      camera: this.props.navigation.state.params.camera,
    };

    this.setTextContent = this.setTextContent.bind(this);
    this.toggleLoader   = this.toggleLoader.bind(this);
  }
  toggleLoader() {
    this.setState({
      showLoader: !this.state.showLoader
    });
  }

  takePicture() {
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
        let result = textContent.split(' ').join('\n').split('\n').filter(e => e.includes('.'));
        while(!Number(result[0])) result = result.slice(1);

        self.setTextContent(result[result.length - 1]);
      })
      .catch(error => console.log(error, "error"));
      })
      .catch(err => console.error(err));
  }
  setTextContent(textContent) {
    this.toggleLoader();
    this.state.camera(textContent)
    this.props.navigation.goBack();
  }


  render() {
    return (
    <View style={styles.container}>
      <Spinner visible={this.state.showLoader}/>
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        captureQuality={Camera.constants.CaptureQuality["720p"]}
        captureTarget={Camera.constants.CaptureTarget.memory}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}>
        <TouchableHighlight style={styles.capture} onPress={this.takePicture.bind(this)}>
          <Image
            style={{width: 100, height: 100}}
            source={{uri: 'https://s22.postimg.org/yyv1p3lzl/jbnbtn.png'}}
           />
        </TouchableHighlight>
      </Camera>
      {/* <Modal
       offset={0}
       open={this.state.captureText}
       modalDidOpen={() => {}}
       modalDidClose={() => {}}
       style={{alignItems: 'center'}}>
       <View>
          {
            this.state.captureText ? <Text style={styles.descriptionText}>
            {this.state.captureText}</Text> : null
          }
          <TouchableOpacity
             style={{margin: 5}}
             onPress={() => this.setState({captureText: null})}>
             <Text>Try another</Text>
          </TouchableOpacity>
       </View>
    </Modal> */}
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#458dca'
  },
  descriptionText: {
    fontSize: 16,
    padding: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  scrollLanguage: {
    height:40,
    padding: 12,
    fontSize: 12,
    color: 'white'
  },
  activeLang: {
    height:40,
    padding: 12,
    fontSize: 12,
    backgroundColor: '#529bd8',
    color: 'white'
  },
  languagesContainer: {
    flex:0,
    height:40
  },
  languagesScrollView: {
    backgroundColor:'#1868ab'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  objectShow: {
    flex: 0,
    color: 'red',
    marginBottom: 140
  }
});
