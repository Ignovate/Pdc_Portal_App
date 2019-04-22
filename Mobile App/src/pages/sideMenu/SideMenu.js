import PropTypes from "prop-types";
import React from "react";
import styles from "./SideMenuStyle";
import { InteractionManager } from "react-native";
import { NavigationActions, DrawerActions, StackActions } from "react-navigation";
import Base from '../home/Base';
import All from '../home/AllProduct';
import ServiceCall from "../../service/Service";
import SInfo from "react-native-sensitive-info";
import { Constants } from "../../service/Constants";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
export default class SideMenu extends Base {
  instan;

  constructor() {
    super();
    instan = this;
    this.state = {
      name: "",
      customer_id: "",
      token: "",
    }
  }
  static getName = () => {
    SInfo.getItem("name", {}).then(value => {
      if (value != "" && value != "null" && value != null) {
        instan.setState({ name: value });
      }
    });
    SInfo.getItem("customer_id", {}).then(customer_id => {
      if (customer_id != "" && customer_id != "null" && customer_id != null) {
        instan.setState({ customer_id: customer_id });
      }
    });
    SInfo.getItem("fcm_token", {}).then(token => {
      if (token != "" && token != "null" && token != null) {
        instan.setState({ token: token });
      }
    });
  }
  navigateToScreen = (route) => {

    // const navigateAction = NavigationActions.navigate({
    //   routeName: route,
    //   action: NavigationActions.navigate({ routeName: route }), 
    // });
    // this.props.navigation.dispatch(navigateAction);
    // this.props.navigation.dispatch(DrawerActions.closeDrawer());

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })],
    });
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.dispatch(resetAction);
      this.props.navigation.dispatch(DrawerActions.closeDrawer());
    });
  };

  signOut = () => {
    ServiceCall.getInstance().logoutScreen(instan.successCallback, instan.state.token, "LOGOUT");
  }
  successCallback = (res, reqname) => {
    //alert(JSON.stringify(res));
    if (reqname == "LOGOUT") {
      SInfo.setItem("token_id", "", {});
      SInfo.setItem("customer_id", "", {});
      SInfo.setItem("token", "", {});
      SInfo.setItem("secret", "", {});
      SInfo.setItem("name", "", {});
      SInfo.setItem("address", "", {});
      SInfo.setItem("FCMtoken", "", {});
      this.moveToLogin();
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.root}>
        <ScrollView style={{ marginBottom: 10 }}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.imageCircle}
              source={{ uri: Constants.IMAGEBASE + '/profile.png' }} />

            <Text style={styles.userName}>{instan.state.name}</Text>
          </View>

          <View style={styles.itemsParent}>

            <View style={styles.line} />
            <TouchableOpacity
              style={{ flexDirection: "row", marginLeft: 10 }}
              onPress={() => this.navigateToScreen("Home")}>
              <Image
                style={styles.menuIcon}
                source={{ uri: Constants.IMAGEBASE + '/home.png' }}
              />
              <Text style={styles.menuNames}>Home</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              style={{ flexDirection: "row", marginLeft: 10 }}
              onPress={() => this.navigateToScreen("All")}>
              <Image
                style={styles.menuIcon}
                source={{ uri: Constants.IMAGEBASE + '/product.png' }}
              />
              <Text style={styles.menuNames}>All Products</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              style={{ flexDirection: "row", marginLeft: 10 }}
              onPress={() => this.navigateToScreen("MyCart")}>
              <Image
                style={styles.menuIcon}
                source={{ uri: Constants.IMAGEBASE + '/card.png' }}
              />
              <Text style={styles.menuNames}>My Cart</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              style={{ flexDirection: "row", marginLeft: 10 }}
              onPress={() => this.navigateToScreen("MyOrder")}>
              <Image
                style={styles.menuIcon}
                source={{ uri: Constants.IMAGEBASE + '/order.png' }}
              />
              <Text style={styles.menuNames}>My Orders</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              style={{ flexDirection: "row", marginLeft: 10 }}
              onPress={() => this.navigateToScreen("Wishlist")}>
              <Image
                style={styles.menuIcon}
                source={{ uri: Constants.IMAGEBASE + '/wishlist.png' }} />
              <Text style={styles.menuNames}>My Wishlist</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              style={{ flexDirection: "row", marginLeft: 10 }}
              onPress={() => this.navigateToScreen("Notification")}>
              <Image
                style={styles.menuIcon}
                source={{ uri: Constants.IMAGEBASE + '/notification.png' }} />
              <Text style={styles.menuNames}>Notification</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              style={{ flexDirection: "row", marginLeft: 10 }}
              onPress={() => this.signOut()}>
              <Image
                style={styles.menuIcon}
                source={{ uri: Constants.IMAGEBASE + '/logout.png' }} />
              <Text style={styles.menuNames}>Sign Out</Text>
            </TouchableOpacity>
            <View style={styles.line} />
          </View>
        </ScrollView>
      </View>
    );
  }

}
