import React from 'react';
import { Dimensions, Alert, StyleSheet, ActivityIndicator, Text, View, FlatList } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CaptureButton2 from '../ui/CaptureButton2';
import Config from 'react-native-config'
import Firebase from "../../Firebase";
import RNFetchBlob from 'react-native-fetch-blob'
import uuid from 'react-native-uuid';
import { Icon } from "react-native-elements";

export default class CameraClarifai extends React.Component {

  static navigationOptions = {
    headerRight: <Icon name="exit-to-app" color="#fff" />,
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      itemsFromClarifai: [],
      retrievedData: false,
      imagefirebase: ''
    }
  }

  takePicture = async function(){
    if (this.camera) {
      this.camera.pausePreview();
      this.setState((previousState, props) => ({
        loading: true
      }));
      const options = {
        base64: true
      };
      const data = await this.camera.takePictureAsync(options)
      this.saveImageToFirebase2(data);
    }
  }

  // saveImageToFirebase2(image){
  //   var UUID = uuid.v1();
  //   this.setState({ loading: true })
  //   const Blob = RNFetchBlob.polyfill.Blob
  //   const fs = RNFetchBlob.fs
  //   window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  //   window.Blob = Blob

  //   const uid = "ItemPhoto"
  //   const imageRef = Firebase.storage.ref(uid).child(UUID+".jpg")
  //   let mime = 'image/jpg'

  //   Blob.build(image.base64, { type: `${mime};BASE64` })
  //     .then((blob) => {
  //       uploadBlob = blob
  //       return imageRef.put(blob, { contentType: mime })
  //     })
  //     .then(() => {
  //       uploadBlob.close()
  //       return imageRef.getDownloadURL()
  //     })
  //     .then((url) => {
  //       this.setState({
  //         imagefirebase: url
  //       }, () => {
  //         this.identifyImage(image);
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }


  saveImageToFirebase2(imagetaken){
    let uploadBlob = null
    let mime = 'image/jpg'
    const uid = "ItemPhoto"
    var UUID = uuid.v1();

    const originalXMLHttpRequest = window.XMLHttpRequest;
    const originalBlob = window.Blob;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = RNFetchBlob.polyfill.Blob

    const imageRef = Firebase.storage.ref(uid).child(UUID+".jpg")


    Blob.build(imagetaken.base64, { type: `${mime};BASE64` })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        window.XMLHttpRequest = originalXMLHttpRequest ;
        window.Blob = originalBlob
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        this.setState({
          imagefirebase: url
        }, () => {
          this.identifyImage(imagetaken);
        });

      })
      .catch((error) => {
        console.log(error);
      })

  }

  identifyImage(imageData){
    const Clarifai = require('clarifai');
    const app = new Clarifai.App({
      apiKey: Config.KEY_2
    });
    app.models.predict(Clarifai.GENERAL_MODEL, {base64: imageData.base64})
      .then((response) => this.props.navigation.navigate('CameraSelectItem', {
          imagePath: imageData,
          items: response.outputs[0].data.concepts,
          imagefirebase: this.state.imagefirebase
        })
          .catch((err) => alert(err))
      );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <RNCamera ref={ref => {this.camera = ref;}} style={styles.preview}>
          <ActivityIndicator size="large" style={styles.loadingIndicator} color="#fff" animating={this.state.loading}/>
          <CaptureButton2 buttonDisabled={this.state.loading} onClick={this.takePicture.bind(this)}/>
        </RNCamera>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyle:{
    height: 150,
    justifyContent: 'center'
  }
});