import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import fullScreenImg from './__data__/colorado_landscape_4k-750x1334.jpg';
import avatorImg from './__data__/icons8-user-filled-50.png';
import RNFetchBlob from 'react-native-fetch-blob';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '100%'
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: '#d6d7da'
  },
  cameraIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0
  }
});

export default class PersonalInfo extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static defaultProps = {};

  state = {
    name: '',
    address: '',
    avatorUri: ''
  };

  fillName = (text) => {
    this.setState({
      name: text
    });
  };

  fillAddress = (text) => {
    this.setState({
      address: text
    });
  };

  goCamera = () => {
    const onTakePicture = async (key, uri) => {
      this.setState({
        avatorUri: uri
      });
      const result = await RNFetchBlob.fetch(
        'POST',
        'https://www.googleapis.com/upload/storage/v1/b/staging.auctionmall-53ad1.appspot.com/o?uploadType=media&name=eden-liu',
        {
          Authorization:
            'Bearer ya29.GlzTBUbr5lyXpZV4NSRwV3X9YQsjsmC7rsgOeZrlPJ4Kan4KoR7u5X3PxPBnouJKY99gUuSpwcFX0vTo8pCtVjwMpRxtdvZM7NF2lV52ifjdAKiDpDLwakOzy_YJvw'
        },
        RNFetchBlob.wrap(uri)
      );
      console.log(result);
    };
    this.props.navigation.navigate('Camera', { key: 'avatar', onTakePicture });
  };

  render() {
    const { avatorUri } = this.state;
    return (
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          source={fullScreenImg}
          style={styles.fullScreen}
          blurRadius={20}
        />
        <View style={[styles.container, styles.center]}>
          <TouchableOpacity onPress={this.goCamera}>
            <Image
              source={avatorUri ? { uri: avatorUri } : avatorImg}
              resizeMode="cover"
              style={styles.avatar}
            />
            <Icon name="camera" size={30} style={styles.cameraIcon} color="#000f" />
          </TouchableOpacity>
          <TextInput
            value={this.state.name}
            onChangeText={this.fillName}
            ref={(input) => {
              this.nameRef = input;
            }}
            onSubmitEditing={() => this.addressRef.focus()}
            returnKeyType="next"
            placeholder="請輸入姓名"
            underlineColorAndroid="transparent"
            style={styles.input}
          />
          <TextInput
            value={this.state.address}
            onChangeText={this.fillAddress}
            ref={(input) => {
              this.addressRef = input;
            }}
            returnKeyType="done"
            placeholder="請輸入地址"
            underlineColorAndroid="transparent"
            style={styles.input}
          />
        </View>
      </View>
    );
  }
}
