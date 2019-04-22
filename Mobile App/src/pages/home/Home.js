import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    NetInfo,
    ActivityIndicator,
    Image,
    FlatList,
    ListView,
    TouchableOpacity,
    Platform
} from 'react-native'
import Style from './HomeStyle';
import Base from './Base';
import CardView from 'react-native-cardview';
import ServiceCall from "../../service/Service";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import FCM from "react-native-fcm";
import { registerKilledListener, registerAppListener } from "../../service/Listeners";
import SnackBar from 'react-native-snackbar-component';
import SideMenu from "../sideMenu/SideMenu";
import sortJsonArray from 'sort-json-array';
import { Constants } from '../../service/Constants';
import SInfo from "react-native-sensitive-info";
registerKilledListener();

export default class Home extends Base {

    constructor() {
        super();
        this.onEndReachedCalledDuringMomentum = true;
        this.categorys = [];
        this.brands = [];
        this.suppliers = [];
        this.sorts = [];
        this.atoz = false;
        this.state = {
            page: 10,
            bestsellers: [],
            categories: [],
            isRefreshing: false,
            isConnected: true,
            index: 0,
            selectData: [],
            loading: false,
        };
    }

    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({ isConnected });
        } else {
            this.setState({ isConnected });
        }
    };

    handleLoadMore = () => {
        if (this.state.bestsellers.length > 5) {
            if (!this.onEndReachedCalledDuringMomentum) {
                this.setState(state => ({
                    isRefreshing: true
                }), () => this.loadUsers());
                this.onEndReachedCalledDuringMomentum = true;
            }
        }
    };

    loadUsers() {
        const { page } = this.state;
        ServiceCall.getInstance().getHomeData(page, this.OnRequestCompletedListener, "Home");
        ServiceCall.getInstance().getCategory("", "", this.OnRequestCompletedListener, "CATEGORY");
    }

    OnRequestCompletedListener = (responseData, reqName) => {
        let cate = [];
        if (reqName == "Home") {
            data = sortJsonArray(responseData.categories, 'name', 'asc');
            this.setState({
                bestsellers: [...this.state.bestsellers, ...responseData.bestsellers],
                isRefreshing: false,
            });
        } else if (reqName == "CATEGORY") {
            let arr = [];
            responseData.hits.map((item) => {
                if (item.product_count > 0) {
                    arr.push(item);
                }
            });
            this.setState({
                categories: arr,
            });
        }
    }

    async componentDidMount() {
        this.props.navigation.setParams({ searchHome: () => this.moveToAll("SEARCH", "") });
        await FCM.createNotificationChannel({ id: 'default', name: 'Default', description: 'general usage', priority: 'high' });
        registerAppListener(this.props.navigation);
        SInfo.getItem("targetScreen", {}).then(value => {
            if (value == "true") {
                FCM.getInitialNotification().then(notif => {
                    // console.log(notif.targetScreen);
                    if (notif && notif.targetScreen === "detail") {
                        setTimeout(() => {
                            this.props.navigation.push("Notification");
                        }, 500);
                    }
                });
            }
        });

        try {
            let result = await FCM.requestPermissions({
                badge: false,
                sound: true,
                alert: true
            });
        } catch (e) {
            console.error(e);
        }
        FCM.getFCMToken().then(token => {
            //   console.log("TOKEN (getFCMToken)", token);
            // this.setState({ token: token || "" });
        });
        if (Platform.OS === "ios") {
            FCM.getAPNSToken().then(token => {
                //console.log("APNS TOKEN (getFCMToken)", token);
            });
        }
        //BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        this.loadUsers();
        SideMenu.getName();
    }
    componentWillUnmount() {
        // BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }
    renderRowItem = (rowData) => {
        return (
            <CardView
                cardElevation={5}
                cornerRadius={3}
                style={Style.offerslist}>
                <TouchableOpacity
                    onPress={() => this.moveToAll("BEST", 0)}>
                    <Text style={Style.text1}>{rowData.name}</Text>
                </TouchableOpacity>
            </CardView>
        );
    }

    renderFooter() {
        return this.state.isRefreshing ? <ActivityIndicator size="small" animating /> : null
    }
    moveToAll = (data, index) => {
        let req = [];
        let json = {};
        let ind;

        if ("BEST" == data) {
            json["value"] = 0;
            json["label"] = "{value:BestSeller,selected:true}";
            req.push(json);
            ind = 1
        } else if ("ALL" == data) {
            ind = 2;
        } else if ("SEARCH" == data) {
            ind = 4;
        }
        else {
            json["value"] = index;
            json["label"] = data;
            req.push(json);
            ind = 3;
        }
        this.props.navigation.navigate("All", {
            data: req,
            index: ind
        });
    }

    render() {
        const { bestsellers, isRefreshing, categories } = this.state;
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <ImageBackground source={{ uri: Constants.IMAGEBASE + '/background.png' }} style={Style.root}>
                <View style={Style.root}>
                    <View style={Style.view1}>
                        <TouchableOpacity
                            style={Style.titleView} onPress={() => this.moveToAll("BEST", 0)}>
                            <Text style={Style.text}>Best Sellers</Text>
                            <Icon name="arrow-right" size={26} color="#FF3366" />
                        </TouchableOpacity>
                    </View>
                    <View style={Style.view2}>
                        <ListView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            dataSource={ds.cloneWithRows(bestsellers)}
                            onEndReached={() => this.handleLoadMore()}
                            onEndReachedThreshold={5}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false }}
                            renderFooter={() => this.renderFooter()}
                            renderRow={(rowData, sectionID, rowID, highlightRow) => this.renderRowItem(rowData)
                            } />
                    </View>
                    <View style={Style.view1}>
                        <TouchableOpacity
                            onPress={() => this.moveToAll("ALL", "")}
                            style={Style.titleView}>
                            <Text style={Style.text}>All Products</Text>
                            <Icon name="arrow-right" size={26} color="#FF3366" />
                        </TouchableOpacity>
                    </View>
                    <View style={Style.view3}>
                        <FlatList
                            data={categories}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) =>
                                <CardView
                                    cardElevation={3}
                                    cornerRadius={3}
                                    style={Style.all_product}>
                                    <TouchableOpacity
                                        onPress={() => this.moveToAll(item, index)}
                                        style={Style.button}>
                                        <Image source={{ uri: "https:" + item.image_url }}
                                            style={Style.button_icon} />
                                        <Text style={Style.button_text}>{item.name}</Text>
                                    </TouchableOpacity>
                                </CardView>}
                            keyExtractor={i => i.name} />
                    </View>
                    {this.state.loading ? <Base /> : null}
                    <SnackBar
                        visible={!this.state.isConnected}
                        backgroundColor={"red"}
                        textMessage="No Internet Connection" />
                </View>
            </ImageBackground>);
    }
}
