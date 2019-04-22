import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Dimensions } from 'react-native'
import Login from '../pages/login/Login';
import { Home, AllProduct, WishList, MyCart, MainScreen, ReviewOrder, MyOrder, EditerOrder, Success, Notification, ViewOrder, CancelOrder } from '../pages/home/index';
import Style from '../style/Styles';
import { createStackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/EvilIcons";
import { DrawerButton, BackButton, LinearFradient, DrawerMenu } from '../ui';
import NotificationButton from '../ui/NotificationButton'
import { Constants } from "../service/Constants";

export const stackNavigator = (signedIn = false) => {

  renderAllProduct = (params) => {

    return (
      <View style={Style.headerView}>
        <Icon
          size={36}
          color={"white"}
          name="search"
          style={Style.rightlastIcon}
          onPress={() => params.search()} />
        <Icon
          size={36}
          color={"white"}
          name="heart"
          style={Style.rightlastIcon}
          onPress={() => params.wish()}
        />
        <TouchableOpacity
          onPress={() => params.mycart()}>
          <NotificationButton />
        </TouchableOpacity>
      </View>
    );
  }

  renderHomeSearch = (params) => {

    return (
      <View style={Style.headerView}>
        <Icon
          size={36}
          color={"white"}
          name="search"
          style={Style.rightlastIcon}
          onPress={() => params.searchHome()} />
      </View>
    )

  }

  renderWishlist = (params) => {
    return (
      <View style={Style.headerView}>
        <TouchableOpacity onPress={() => params.mycarts()}>
          <NotificationButton />
        </TouchableOpacity>
      </View>
    )
  }
  renderReview = (params) => {
    return (
      <View style={Style.headerView}>
        <TouchableOpacity onPress={() => params.myCart()}>
          <NotificationButton />
        </TouchableOpacity>
      </View>
    );
  }

  renderMyCart = () => {
    return (
      <View style={Style.headerView}>
        <NotificationButton />
      </View>
    );
  }

  return createStackNavigator(
    {
      login: {
        screen: Login,
        navigationOptions: {
          headerLeft: null,
          drawerLabel: () => null
        }
      },
      MainScreen:
      {
        screen: MainScreen,
        headerMode: "none",
        navigationOptions: {
          headerLeft: null,
          drawerLockMode: "locked-closed",
        }
      },
      Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
          const { params = {} } = navigation.state;
          return {
            headerLeft: (
              <View style={Style.homenavtitle}>
                <View style={Style.leftContainer}>
                  <DrawerButton navigation={navigation} />
                </View>
                <Image
                  source={{ uri: Constants.IMAGEBASE + '/logohome.png' }}
                  style={{ width: 50, height: 50, borderRadius: 50 / 2, backgroundColor: '#ffffff' }}
                  resizeMode='cover' />
                <View style={Style.rightContainer}>
                </View>
              </View>
            ),
            headerRight: (
              this.renderHomeSearch(params)
            ),
            headerBackground: (
              <LinearFradient />
            ),
          }
        }
      },
      All: {
        screen: AllProduct,
        navigationOptions: ({ navigation }) => {
          const { params = {} } = navigation.state;
          return {
            headerLeft: (
              <View style={Style.navtitle}>
                <DrawerMenu onClick={() => params.drawer()} />
                <Text style={Style.navigationTitle}>All Products</Text>
              </View>),
            headerBackground: (
              <LinearFradient />
            ),
            headerRight: (
              this.renderAllProduct(params)
            )
          }
        },
      },
      Wishlist: {
        screen: WishList,
        navigationOptions: ({ navigation }) => {
          const { params = {} } = navigation.state;
          return {
            headerLeft: (
              <View style={Style.navtitle}>
                <DrawerMenu onClick={() => params.drawers()} />
                <Text style={Style.navigationTitle}>My Wishlist</Text>
              </View>),
            headerBackground: (
              <LinearFradient />
            ),
            headerRight: (
              this.renderWishlist(params)
            )
          }
        }
      },
      MyCart: {
        screen: MyCart,
        navigationOptions: ({ navigation }) => {
          const { params = {} } = navigation.state;
          return {
            headerLeft: (
              <View style={Style.navtitle}>
                <DrawerMenu onClick={() => params.drawerMenu()} />
                <Text style={Style.navigationTitle}>My Cart</Text>
              </View>),
            headerBackground: (
              <LinearFradient />
            ),
            headerRight: (
              this.renderMyCart()
            )
          }
        }
      },
      EditerOrder: {
        screen: EditerOrder,
        navigationOptions: ({ navigation }) => {
          const { params = {} } = navigation.state;
          return {
            headerLeft: (
              <View style={Style.navtitle}>
                <DrawerMenu onClick={() => params.editDrawerMenu()} />
                <Text style={Style.navigationTitle}>{"Order ID : " + navigation.getParam('edittitle', [])}</Text>
              </View>),
            headerBackground: (
              <LinearFradient />
            ),
            // headerRight: (
            //  // this.renderMyCart(navigation, 3, "MyCart")
            // )
          }
        }
      },
      ReviewOrder: {
        screen: ReviewOrder,
        navigationOptions: ({ navigation }) => {
          const { params = {} } = navigation.state;
          return {
            headerLeft: (
              <View style={Style.navtitle}>
                <BackButton navigation={navigation} />
                <Text style={Style.navigationTitle}>Review Order</Text>
              </View>),
            headerBackground: (
              <LinearFradient />
            ),
            headerRight: (
              this.renderReview(params)
            )
          }
        }
      },
      MyOrder: {
        screen: MyOrder,
        navigationOptions: ({ navigation }) => ({
          headerLeft: (
            <View style={Style.navtitle}>
              <DrawerButton navigation={navigation} />
              <Text style={Style.navigationTitle}>My Orders</Text>
            </View>),
          headerBackground: (
            <LinearFradient />
          ),
        })
      },
      viewOrder: {
        screen: ViewOrder,
        navigationOptions: ({ navigation }) => ({
          headerLeft: (
            <View style={Style.navtitle}>
              <BackButton navigation={navigation} />
              <Text style={Style.navigationTitle}>{"Order ID : " + navigation.getParam('edittitle', [])}</Text>
            </View>),
          headerBackground: (
            <LinearFradient />
          )
        })
      },
      success: {
        screen: Success,
        navigationOptions: {
          headerLeft: null,
          drawerLockMode: "locked-closed"
        }
      },
      Cancel: {
        screen: CancelOrder,
        navigationOptions: {
          headerLeft: null,
          drawerLockMode: "locked-closed"
        }
      },
      Notification: {
        screen: Notification,
        navigationOptions: ({ navigation }) => ({
          headerLeft: (
            <View style={Style.navtitle}>
              <DrawerButton navigation={navigation} />
              {/* <BackButton navigation={navigation} /> */}
              <Text style={Style.navigationTitle}>Notifications</Text>
            </View>),
          headerBackground: (
            <LinearFradient />
          ),
        })
      },
    },
    {
      initialRouteName: signedIn ? "Home" : "MainScreen",
      headerMode: "screen",
      cardStyle: {
        backgroundColor: "transparent"
      }
    });
}
export default stackNavigator;