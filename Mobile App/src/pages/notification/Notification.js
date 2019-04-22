import React from "react";
import { View, Text, TouchableOpacity, Image, ListView, BackHandler, NetInfo, RefreshControl } from "react-native";
import { ResWidth, ResHeight } from "../../ui/index"
import Base from "../home/Base";
import Service from "../../service/Service";
import Style from "./NotificationStyle";
import SInfo from "react-native-sensitive-info";
import SnackBar from 'react-native-snackbar-component';
import { Constants } from "../../service/Constants";
import FCM from "react-native-fcm";


export default class Notification extends Base {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
      isConnected: true,
      refreshing: false,

    }
    // SInfo.getItem("customer_id", {}).then(value => {
    //   if (value != "" && value != "null" && value != null) {

    //   }
    // });

  }
  OnRequestCompletedListener = (responseData, reqName) => {
    //alert(JSON.stringify(responseData));
    ////  const filter_data = responseData.response.filter(row => row.fcm_id == value);
    //  alert(JSON.stringify(filter_data));
    if (reqName == "NOTIFY") {
      if (responseData != undefined) {
        SInfo.getItem("fcm_token", {}).then(value => {
          this.setState({
            data: responseData.response.filter(x => x.fcm_id == value),
          }, function () {
          });
        });
      }
    }
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };
  onBackPress = () => {
    this.props.navigation.goBack();
    return true;
  }
  componentDidMount() {
    SInfo.setItem("targetScreen", "false", {});
    FCM.removeAllDeliveredNotifications();
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    SInfo.getItem("customer_id", {}).then(value => {
      if (value != "" && value != "null" && value != null) {
        Service.getInstance()._mynotification(this.OnRequestCompletedListener, "NOTIFY", value);
      }
    });

    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);

  }
  onRefresh() {
    SInfo.getItem("customer_id", {}).then(value => {
      if (value != "" && value != "null" && value != null) {
        Service.getInstance()._mynotification(this.OnRequestCompletedListener, "NOTIFY", value);
      }
    });
  }
  renderitem = (item, rowID) => {

    return (

      <TouchableOpacity >
        <View style={Style.flatitem}>
          <View style={Style.item2}>
            <View style={Style.v1}>
              <Text style={Style.title}>{item.message}</Text>
            </View>
            <Text style={Style.subtitle}>{item.created_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );

  }

  render() {
    const { navigate } = this.props.navigation;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <View style={Style.contains}>
        {this.state.data.length > 0 ?
          <ListView
            dataSource={ds.cloneWithRows(this.state.data)}
            renderRow={(item, rowID) => this.renderitem(item, rowID)}
            keyExtractor={(item, index) => item.increment_id}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
          />
          :
          <View style={Style.noOrder}>

            <Image
              source={{ uri: Constants.IMAGEBASE + '/nonotification.png' }}
              style={{
                width: ResWidth(50),
                height: ResHeight(50),
                borderRadius: 200 / 2,
                backgroundColor: '#ffffff'
              }}
              resizeMode='cover' />

            <Text>Looks like you do not have any notification.</Text>
          </View>
        }
        {this.state.loading ? <Base /> : null}
        <SnackBar
          visible={!this.state.isConnected}
          backgroundColor={"red"}
          textMessage="No Internet Connection" />
      </View>
    );
  }
}
