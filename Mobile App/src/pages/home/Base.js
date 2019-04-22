import React, { Component } from "react";
import { StackActions, NavigationActions } from "react-navigation";
import { InteractionManager, Alert, StyleSheet } from "react-native";
import {
  BarIndicator
} from "react-native-indicators";
import Service from "../../service/Service";
import SInfo from "react-native-sensitive-info";
import Permissions from 'react-native-permissions';

export default class Base extends Component {
  static navigationOptions = {
    headerStyle: {
      position: "absolute",
      top: 0,
      left: 0
    },
    headerBackTitleStyle: {
      opacity: 0
    },
    headerTintColor: "#fff"
  };

  constructor(props) {
    super(props);

    this.state = {
      _value: ""
    };
  }

  async _permissions() {
  }

  _showAlert(message, button) {
    Alert.alert("", message, [{ text: button, onPress: () => { } }], {
      cancelable: false
    });
  }

  MoveToAddCart = () => {

    const navigateAction = NavigationActions.navigate({
      routeName: 'MyCart',
      params: {},
      action: NavigationActions.navigate({ routeName: 'MyCart' }),
    });
    this.props.navigation.dispatch(navigateAction);
  }
  resetToAddCart = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MyCart' })],
    });
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.dispatch(resetAction);
    });
  }

  moveToHome = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.dispatch(resetAction);
    });
  }

  moveToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'login' })],
    });
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.dispatch(resetAction);
    });
  }

  _moveToMainScreen = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MainScreen' })],
    });
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.dispatch(resetAction);
    });
  }

  backToHome = () => {
    const backAction = NavigationActions.back({
      key: 'MyOrder',
    });
    this.props.navigation.dispatch(backAction);
  }
  moveToReviewOrder = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'ReviewOrder',
      params: {},
      action: NavigationActions.navigate({ routeName: 'ReviewOrder' }),
    });
    this.props.navigation.dispatch(navigateAction);
  }
  moveToSuccess = (nav) => {
    const navigateAction = NavigationActions.navigate({
      routeName: nav,
      params: {},
      action: NavigationActions.navigate({ routeName: nav }),
    });
    this.props.navigation.dispatch(navigateAction);
  }
  moveToEditerOrder = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'EditerOrder',
      params: {},
      action: NavigationActions.navigate({ routeName: 'EditerOrder' }),
    });
    this.props.navigation.dispatch(navigateAction);
  }
  moveToMyorder = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MyOrder' })],
    });
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.dispatch(resetAction);
    });

  }

  render() {
    return <BarIndicator color="#23CE01" style={styles.progress} count={4} />;
  }
}

const styles = StyleSheet.create({
  progress: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.6)",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

