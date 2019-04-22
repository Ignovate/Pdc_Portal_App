import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  NetInfo
} from 'react-native';
import Icon from "react-native-vector-icons/SimpleLineIcons"
import styles from "./LoginStyle";
import Base from "../home/Base";
import LinearGradient from "react-native-linear-gradient";
import ServiceCall from "../../service/Service";
import SInfo from "react-native-sensitive-info";
import FCM, { NotificationActionType } from "react-native-fcm";
import SnackBar from 'react-native-snackbar-component';
import { Constants } from '../../service/Constants';
import {
  widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default class LoginScreen extends Base {

  static navigationOptions = {
    header: null,
  }
  constructor() {
    super();
    this.state = {
      progrstatus: false,
      isConnected: true
    }
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };
  componentDidMount() {
    loc(this);
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }
  componentWillUnmount() {
    rol();
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  OnRequestCompletedListener = (responseData, reqName, fcm_Id) => {
    if (reqName == "LOGIN") {
      this.setState({ progrstatus: false });
      if (responseData.messages != undefined) {
        this._showAlert("Incorrect Username or Password", "OK");
      } else {
        SInfo.setItem("fcm_token", fcm_Id, {});
        SInfo.setItem("token_id", responseData.token_id, {});
        SInfo.setItem("customer_id", responseData.customer_id, {});
        SInfo.setItem("token", responseData.token, {});
        SInfo.setItem("secret", responseData.secret, {});
        SInfo.setItem("name", responseData.name, {});
        SInfo.setItem("address", JSON.stringify(responseData.address), {});
        this.moveToHome();
      }
    }
  }

  _sendVerify() {
    if (this.state.isConnected) {
      if (this.state.username == undefined || this.state.password == undefined) {
        this._showAlert("Please enter a Username and Password", "OK");
      } else {
        this.setState({ progrstatus: true });
        FCM.getFCMToken().then(token => {
          ServiceCall.getInstance()._loginPage(
            this.state.username,
            this.state.password,
            token,
            this.OnRequestCompletedListener,
            "LOGIN"
          );
        });
      }
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.background}>
        <View style={styles.markWrap}>
          <Image
            source={{ uri: Constants.IMAGEBASE + '/logo.png' }}
            style={styles.mark}
            resizeMode="contain" />
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Icon name="user" size={24} color="#FF3366" />
            </View>
            <TextInput
              placeholder="Email"
              keyboardType="default"
              autoCorrect={false}
              onChangeText={text => this.setState({ username: text })}
              placeholderTextColor="#717171"
              style={styles.input} />
          </View>
          <View style={styles.inputWrap}>
            <View
              style={styles.iconWrap}>
              <Icon name="lock" size={24} color="#FF3366" />
            </View>
            <TextInput
              placeholderTextColor="#717171"
              placeholder="Password"
              style={styles.input}
              autoCorrect={false}
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry />
          </View>
          <TouchableOpacity
            onPress={() => this._sendVerify()}
            activeOpacity={.5}>
            <LinearGradient
              colors={['#FA486F', '#Fc5766', '#FD6A61']}
              start={{ x: 0.0, y: 0.25 }} end={{ x: 1.0, y: 1.0 }}
              locations={[0, 0.5, 0.6]}
              style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>
        {this.state.progrstatus ? <Base /> : null}
        <SnackBar
          visible={!this.state.isConnected}
          backgroundColor={"red"}
          textMessage="No Internet Connection" />
      </KeyboardAvoidingView >
    );
  }
}
