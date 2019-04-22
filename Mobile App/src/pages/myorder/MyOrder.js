import React, { Component } from "react";
import {
    View,
    Text,
    ListView,
    Image,
    TouchableOpacity,
    NetInfo,
    RefreshControl,
    BackHandler
} from "react-native";
import Base from "../home/Base";
import Style from "./MyorderStyle";
import Service from "../../service/Service";
import { ResFontSizes, ResWidth, ResHeight } from "../../ui/index"
import SInfo from "react-native-sensitive-info";
import SnackBar from 'react-native-snackbar-component';
import { Constants } from "../../service/Constants";


export default class MyOrder extends Base {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            isConnected: true,
            refreshing: false
        }

    }

    componentWillMount() {
        this.getData()
    }
    getData = () => {
        SInfo.getItem("customer_id", {}).then(value => {
            if (value != "" && value != "null" && value != null) {
                Service.getInstance()._myOrder(value, this.OnRequestCompletedListener, "MYORDER");
            }
        });
    }


    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({ isConnected });
        } else {
            this.setState({ isConnected });
        }
    };
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }
    handleBackPress = () => {
        this.moveToHome(); // works best when the goBack is async
        return true;
    }

    _showProgress = () => {
        this.setState({ loading: true });
    }
    _hideProgress = () => {
        this.setState({ loading: false });
    }

    OnRequestCompletedListener = (responseData, reqName) => {
        if (reqName == "MYORDER") {
            if (responseData != undefined) {
                const rows = buildSelectedRows(responseData);
                this.setState({ data: this.sortByKey(rows, "ordered_date") });
            }
        }
    }
    sortByKey = (array, key) => {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }
    comp(a, b) {
        return Date.parse(b.ordered_date) - Date.parse(a.ordered_date);
    }

    onRowPress = (item, rowID) => {
        const { navigate } = this.props.navigation
        if (item.status === "Pending") {
            this.props.navigation.navigate("EditerOrder", { 'order_id': item.order_id, onGoBack: () => this.getData() });
        } else {
            navigate("viewOrder", { 'order_id': item.order_id });
        }
    }

    color = (item) => {
        if (item.status == "Canceled") {
            return "#D80A0A";
        } else if (item.status == "Pending") {
            return "#F89560";
        } else {
            return "#61B057";
        }
    }


    renderitem = (item, rowID) => {
        return (
            <TouchableOpacity onPress={() => this.onRowPress(item, rowID)}>
                <View style={Style.flatitem}>
                    <View style={Style.item}>
                    </View>
                    <View style={Style.item2}>
                        <View style={Style.v1}>
                            <Text style={Style.title}>{"ORDER ID-" + item.increment_id}</Text>
                            {item.status == "Pending" ?
                                <Image
                                    source={{ uri: Constants.IMAGEBASE + '/editpencil.png' }}
                                    style={{ width: ResWidth(4), height: ResHeight(4), borderRadius: 200 / 2, backgroundColor: '#ffffff' }}
                                    resizeMode='cover' /> : null}
                        </View>
                        <Text style={Style.subtitle}>{item.ordered_date}</Text>
                        <View style={Style.v2}>
                            <View style={{
                                backgroundColor: this.color(item),
                                width: ResWidth(30),
                                height: ResWidth(7),
                                borderRadius: 10,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text style={Style.buttonText}>{item.status}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
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
                                onRefresh={() => this.getData}
                            />
                        }
                    />
                    :
                    <View style={Style.noorder}>
                        <Image
                            source={{ uri: Constants.IMAGEBASE + '/noorder.png' }}
                            style={{
                                width: ResWidth(50),
                                height: ResHeight(50),
                                borderRadius: 200 / 2,
                                backgroundColor: '#ffffff'
                            }}
                            resizeMode='cover' />
                        <Text style={{ fontSize: 15, fontWeight: '800' }}>No orders found</Text>
                        <Text>Looks like you do not have any orders.</Text>
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

function buildSelectedRows(items) {
    const rows = items.map(item =>
        Object.assign({}, item, {
            selected: item.status === "Pending",
        }),
    );
    return rows;
}