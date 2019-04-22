/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import routes from './src/routes/routes.js';
import SInfo from "react-native-sensitive-info";
import ConfigureStore from '././src/Redux/ConfigureStore'
import { Provider } from 'react-redux';
import firebase from 'react-native-fcm'

export default class App extends Component {

  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }
  componentWillMount() {
    SInfo.getItem("customer_id", {}).then(value => {
      if (value != "" && value != "null" && value != null) {
        this.setState({ signedIn: true, checkedSignIn: true })
      } else {
        this.setState({ signedIn: false, checkedSignIn: true })
      }
    });

  }
  componentDidMount() {
    SplashScreen.hide();
 //   Orientation.unlockAllOrientations();
    // this.notificationListener = firebase.notifications().onNotification(async (notification) => 
    // {
    //   Alert.alert(notification._title,notification._body,[{text:'ok',onPress:()=>{
    //     console.log('ok Pressed')
    //     }},
    //       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //     ],{cancelable:false})  

    // });
    // this.notificationListener = firebase.notifications().onNotification(async (notification) => 
    //   {
    //   notification.android.setChannelId('AgentX');
    //   notification.android.setSmallIcon('ic_launcher');
    //   notification.android.setLargeIcon('ic_launcher');
    //   const channel = new firebase.notifications.Android.Channel('AgentX', 'AgentX Channel', firebase.notifications.Android.Importance.Max)
    //   .setDescription('AgentX desc');
    //   // Create the channel
    //   firebase.notifications().android.createChannel(channel);
    //   firebase.notifications().displayNotification(notification).catch((error)=>{console.log(error)});
    //   // await NotificationHandler.handleNotification(notification)
    //   });
  }
  componentWillUnmount() {
  //  this.notificationListener();

  }
  render() {
    //ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const Layout = routes(signedIn);
    return (
      <Provider store={ConfigureStore}>
        <MyStatusBar backgroundColor="#FD6A61" barStyle="light-content" />
        <Layout />
      </Provider>
    )
  }
}
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor:'#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});