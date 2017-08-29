import React, {Component} from 'react';
import {
    AppRegistry,
    PermissionsAndroid,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';

import AnylineOCR from 'anyline-ocr-react-native-module';

import Result from './Result';

import config from '../config/anyline';


export default class Receipts extends React.Component {

    state = {
        hasScanned: false,
        result: '',
        imagePath: '',
        fullImagePath: '',
        barcode: '',
        scanMode: '',
        meterType: '',
        cutoutBase64: '',
        fullImageBase64: '',
    };

    openOCR = () => {
        AnylineOCR.setupScanViewWithConfigJson(
            JSON.stringify(config),
            'ANALOG_METER',
            this.onResult,
            this.onError
        );
    };

    requestCameraPermission = async() => {


        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Camera permission allowed');
                this.openOCR();
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    hasCameraPermission = async() => {
        try {
            const result = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.CAMERA);
            return result;
        } catch (err) {
            console.warn(err);
        }
    };

    checkCameraPermissionAndOpen = () => {
        this.hasCameraPermission().then((hasCameraPermission) => {
            console.log('hasCameraPermission result is ' + hasCameraPermission);
            if (hasCameraPermission) {
                console.log('Opening OCR directly');
                this.openOCR();
            } else {
                this.requestCameraPermission();
            }
        });
    };

    onResult = (dataString) => {
        const data = JSON.parse(dataString);

        this.setState({
            hasScanned: true,
            result: data.reading,
            imagePath: data.imagePath,
            fullImagePath: data.fullImagePath,
            scanMode: data.scanMode,
            meterType: data.meterType,
            cutoutBase64: data.cutoutBase64,
            fullImageBase64: data.fullImageBase64,
        });
    };

    onError = (error) => {
        console.error(error);
        alert(error);
    };

    render() {
        const {
            hasScanned,
            result,
            imagePath,
            fullImagePath,
            barcode,
            scanMode,
            meterType,
            cutoutBase64,
            fullImageBase64,
        } = this.state;

        const platformText = (Platform.OS === 'android') ?
            (<Text onPress={this.checkCameraPermissionAndOpen}>Open OCR reader!</Text>) :
            (<Text onPress={this.openOCR}>Open OCR reader!</Text>);

        return (
            <View style={styles.container}>
                {hasScanned ? (
                        <Result
                            result={result}
                            imagePath={imagePath}
                            fullImagePath={fullImagePath}
                            barcode={barcode}
                            scanMode={scanMode}
                            meterType={meterType}
                            cutoutBase64={cutoutBase64}
                            fullImageBase64={fullImageBase64}
                        />
                    ) : (
                        platformText
                    )}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});




// import React from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
// import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
// import { ImagePicker } from 'expo';
// import AnylineOCR from 'anyline-ocr-react-native-module';
// import config from '../config/anyline';
//
// export default class Receipts extends React.Component {
//   static navigationOptions = {
//     // header: null,
//     // title: 'Receipts',
//   };
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: {},
//       user_id: this.props.navigation.state.params.user_id,
//       trip_id: this.props.navigation.state.params.trip_id,
//       newAmount: 0,
//       err: false,
//       updateUsers: this.props.navigation.state.params.updateUsers,
//       image: null,
//       text: '',
//     };
//   }
//   componentDidMount() {
//     fetch(`https://split-trip.herokuapp.com/users/${this.state.user_id}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         }
//     })
//     .then(result => result.json())
//     .then(user => this.setState({ user: user[0] }));
//   }
//
//   update = (e) => {
//     if (e < 0) {
//       this.setState({ err: true });
//     } else {
//       this.setState({ err: false });
//       this.setState({ newAmount: e });
//     }
//   }
//
//   post = () => {
//     if (this.state.newAmount > 0) {
//       const amount = Number(this.state.user.amount_spent) + Number(this.state.newAmount);
//
//       fetch(`https://split-trip.herokuapp.com/users/${this.state.user_id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//         body: JSON.stringify({ amount_spent: amount })
//       })
//       .then(() => {
//         this.setState({ newAmount: 0 });
//         this.props.navigation.goBack();
//       });
//     }
//   }
//
//   updateUser = () => {
//     fetch(`https://split-trip.herokuapp.com/users/${this.state.user_id}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         }
//     })
//     .then(result => result.json())
//     .then(user => this.setState({ user: user[0] }));
//   }
//
//   _pickImage = async () => {
//     let result = await ImagePicker.launchCameraAsync();
//     console.log(result);
//     if (!result.cancelled) {
//       this.setState({ image: result.uri });
//     }
//   };
//
//   openOCR = () => {
//         AnylineOCR.setupScanViewWithConfigJson(
//             JSON.stringify(config),
//             'ANALOG_METER',
//             this.onResult,
//             this.onError
//         );
//     };
//
//     onResult = (dataString) => {
//         const text = JSON.parse(dataString);
//         this.setState({ text });
//     };
//
//     onError = (error) => {
//         console.error(error);
//         alert(error);
//     };
//
//   render() {
//     const { navigate } = this.props.navigation;
//     let { image } = this.state;
//     return (
//       <View style={styles.user}>
//         <Text style={styles.name}>{this.state.user.name}</Text>
//         <Image source={{ uri: this.state.user.image_url}} style={styles.image}/>
//         <TouchableOpacity onPress={() => navigate('EditUser', { user_id: this.state.user_id, updateUsers: this.state.updateUsers, updateUser: this.updateUser })}>
//           <Text>Edit User</Text>
//         </TouchableOpacity>
//
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//           <Button
//             title="Take a picture of the receipt"
//             onPress={this._pickImage}
//           />
//           {image &&
//             <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//         </View>
//
//         <View style={styles.form}>
//           <FormLabel>Amount Spent</FormLabel>
//           <FormInput onChangeText={this.update} val={this.state.newAmount}/>
//           {this.state.err ? <FormValidationMessage>Please enter a positive number</FormValidationMessage> : null}
//         </View>
//         <TouchableOpacity onPress={this.post}>
//           <Text>Add New Receipt</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   user: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: 100,
//     height: 100,
//   },
//   name: {
//     fontSize: 80,
//   },
//   form: {
//     marginVertical: 30,
//     paddingHorizontal: 15,
//     marginLeft: 100,
//   },
// });
