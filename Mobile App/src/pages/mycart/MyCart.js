import React, { Component } from "react";
import { View, Text, TextInput, NetInfo, ListView, Image, TouchableOpacity, Alert, BackHandler } from "react-native";
import Style from "./MyCartStyle";
import Base from '../home/Base';
import LinearGradient from "react-native-linear-gradient";
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Service from "../../service/Service";
import SInfo from "react-native-sensitive-info";
import { ResWidth, ResHeight, ResFontSizes } from '../../ui';
import SnackBar from "react-native-snackbar-component";
import { connect } from 'react-redux';
import * as actionTypes from '../../Redux/Actions'
import { Constants } from "../../service/Constants";

class MyCart extends Base {

    constructor() {
        super();
        let ccc;
        this.state = {
            cartData: [],
            prev: [],
            selectedItems: [],
            isConnected: true,
            selectAll: true,
            loading: false,
        }
    }

    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({ isConnected });
        } else {
            this.setState({ isConnected });
        }
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }
    componentWillMount() {
        this.cartCountFunction();
    }

    onBackPress = () => {
        if (JSON.stringify(this.state.cartData) !== JSON.stringify(this.state.prev)) {
            Alert.alert(
                ' Are you sure',
                ' Do you want to update the quantity?',
                [
                    {
                        text: 'No Thanks!', onPress: () => {
                            this.setState({ cartData: this.state.prev });
                            this.props.navigation.goBack();
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'OK', onPress: () => {
                            this.onProceed("UPDATE");
                        },
                    }
                ]
            );
            return true;
        } else {
            this.props.navigation.goBack();
            return true;
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({ drawerMenu: () => this.drawerMenus() });
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

    }

    cartCountFunction = () => {
        SInfo.getItem("quote_id", {}).then(quote_id => {
            if (quote_id != null) {
                this.setState({ loading: true });
                this.props.updateCartCount(0);
                Service.getInstance()._getCart(quote_id, this.OnRequestCompletedListener, "CART");
            }
        });
    }

    drawerMenus = () => {
        if (JSON.stringify(this.state.cartData) !== JSON.stringify(this.state.prev)) {
            Alert.alert(
                ' Are you sure',
                ' Do you want to update the quantity?',
                [
                    {
                        text: 'No Thanks!', onPress: () => {
                            this.setState({ cartData: this.state.prev });
                            this.props.navigation.openDrawer();
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'OK', onPress: () => {

                            this.onProceed("drawerMenu");
                        },
                    }
                ]
            );
            return true;
        } else {
            this.props.navigation.openDrawer();
        }
    }


    OnRequestCompletedListener = (responseData, reqName) => {

        if (reqName == "CART") {
            if (responseData.items != undefined) {
                this.setState({ cartData: [] });
                this.setState({ prev: [] });
                const rows = buildSelectedRows(responseData.items);
                this.setState({ cartData: rows });
                this.setState({ prev: rows });
                var count = 0;
                if (responseData.items != undefined) {
                    for (var i = 0; i < responseData.items.length; i++) {
                        count = count + 1;
                    }
                } else {
                    count = 0;
                }
                this.props.updateCartCount(responseData.items.length);
            }
        }
        else if (reqName == "DELETE") {
            this.cartCountFunction();
        }
        else if (reqName == "UPDATE") {
            const rows = buildSelectedRows(responseData.items);
            this.setState({ cartData: rows });
            this.setState({ prev: rows });
            if (ccc == "UPDATE") {
                this.props.navigation.goBack();
            } else if (ccc == "drawerMenu") {
                this.props.navigation.openDrawer();
            } else {
                this.moveToReviewOrder();
            }

        }

        this.setState({ loading: false });
    }
    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                }}
            />
        );
    }

    Cancel = (rowID) => {
        const data = [...this.state.cartData];
        data[rowID] = Object.assign({}, data[rowID], {
            selected: true,
        });
        this.setState({ cartData: data });
    }

    Ok = (rowData, rowID) => {
        //console.log(rowData.item_id);
        SInfo.getItem("quote_id", {}).then(quote_id => {
            if (quote_id != null) {
                Service.getInstance().DeletedItem(quote_id, rowData.item_id, this.OnRequestCompletedListener, "DELETE");
            }
        });
    }

    onProceed = (mm) => {
        ccc = mm;
        let product = {};
        const select = this.state.cartData.filter(row => row.selected && parseInt(row.qty) != 0);
        const deselect = this.state.cartData.filter(row => row.selected && row.qty == "0" && row.qty == "");
        if (deselect.length > 0) {
            deselect.map((item) => {
                SInfo.getItem("quote_id", {}).then(quote_id => {
                    if (quote_id != null) {
                        // console.log(item.item_id + "   " + quote_id);
                        Service.getInstance().DeletedItem(quote_id, item.item_id, this.OnRequestCompletedListener, "DELETE");
                    }
                });
            });
        }
        if (select.length > 0) {
            select.map((item) => {
                let req = {};
                req["action"] = "replace";
                req["qty"] = item.qty;
                product[item.product_id] = req;
            });
            SInfo.getItem("quote_id", {}).then(quote_id => {
                if (quote_id != null) {
                    this.setState({ loading: true });
                    Service.getInstance().updateCart(quote_id, product, this.OnRequestCompletedListener, "UPDATE");
                }
            });
        } else {
            this._showAlert("Please select minimum one item", "OK")
        }
    }

    onRowPress = (rowData, rowID) => {
        //  console.log(JSON.stringify(rowData));
        Alert.alert(
            '',
            'Do you want to remove the item?',
            [
                { text: 'Cancel', onPress: () => this.Cancel(rowID) },
                { text: 'OK', onPress: () => this.Ok(rowData, rowID) },
            ],
            { cancelable: false }
        );
    }

    _handePressAdd = (item, rowID) => {
        const data = [...this.state.cartData];
        if (data[rowID].selected) {
            if (data[rowID].qty > 0) {
                if (data[rowID].qty < 99999) {
                    data[rowID] = Object.assign({}, data[rowID], {
                        qty: (data[rowID].qty + 1)
                    });
                    this.setState({ cartData: data });
                }
                else {
                    alert("Maximum limit reached");
                }
            }
        } else {
            this._showAlert("Please Select Checkbox", "OK");
        }
    }

    _handePressMinus = (item, rowID) => {
        const data = [...this.state.cartData];
        if (data[rowID].selected) {
            if (data[rowID].qty > 1) {
                data[rowID] = Object.assign({}, data[rowID], {
                    qty: (data[rowID].qty - 1)
                });
                this.setState({ cartData: data });
            }
        } else {
            this._showAlert("Please Select Checkbox", "OK");
        }
    }

    selectType = (value, rowID, selected) => {
        const data = [...this.state.cartData];
        if (value.length > 0) {
            data[rowID] = Object.assign({}, data[rowID], {
                itemType: parseInt(value),
                qty: parseInt(value)
            });
            this.setState({ cartData: data });
        } else {
            data[rowID] = Object.assign({}, data[rowID], {
                itemType: 0,
                qty: 0
            });
            this.setState({ cartData: data });
        }
    }
    FlatListItem = (rowData, rowID) => {
        return (
            <View style={Style.flatitem}>
                <View style={Style.item1}>
                    <View style={Style.checkbox}>
                        <TouchableOpacity onPress={() => this.onRowPress(rowData, rowID)}>
                            <Icons
                                name={rowData.selected ? 'check-box' : 'check-box-outline-blank'}
                                color={rowData.selected ? "#E72222" : "#a5a5a5"}
                                size={30} />
                        </TouchableOpacity>
                    </View>
                    <Text style={Style.checktext}>{rowData.product_name}</Text>
                    <View style={Style.checkbox1}>
                    </View>
                </View>
                <View style={Style.item2}>
                    <Text style={Style.subtitle}>{rowData.supplier}</Text>
                    <View style={Style.item22} >
                        <View style={Style.add}>
                            <TouchableOpacity onPress={() => this._handePressMinus(rowData, rowID)}>
                                <EntypoIcon
                                    size={28}
                                    color={"#6bbb6e"}
                                    name="minus" />
                            </TouchableOpacity>
                        </View>
                        <View style={Style.add1}>
                            <TextInput
                                style={Style.addtext}
                                maxLength={5}
                                keyboardType={'phone-pad'}
                                onChangeText={(text) => this.selectType(text, rowID, rowData.selected)}
                                value={(rowData.selected ? rowData.qty : 1).toString()}
                            />
                            {/* <Text style={Style.addtext}>{rowData.selected ? rowData.qty : 0}</Text> */}
                        </View>
                        <View style={Style.add}>
                            <TouchableOpacity onPress={() => this._handePressAdd(rowData, rowID)}>
                                < EntypoIcon
                                    size={28}
                                    color={"#6bbb6e"}
                                    name="plus" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <View style={Style.root}>
                {this.state.cartData.length > 0 ?
                    <View style={Style.root}>
                        <View style={Style.v2}>
                            <ListView
                                showsHorizontalScrollIndicator={false}
                                dataSource={ds.cloneWithRows(this.state.cartData)}
                                renderSeparator={this.FlatListItemSeparator}
                                renderRow={(rowData, sectionID, rowID, highlightRow) => this.FlatListItem(rowData, rowID)} />
                        </View>
                        <View style={Style.v3}>
                            <LinearGradient
                                colors={['#FA486F', '#Fc5766', '#FD6A61']}
                                start={{ x: 0.0, y: 0.25 }}
                                end={{ x: 1.0, y: 1.0 }}
                                locations={[0, 0.5, 0.6]}
                                style={Style.button} >
                                <TouchableOpacity style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
                                    onPress={() => this.onProceed()}>
                                    <Text style={Style.buttontext}>PROCEED</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>

                    </View>
                    :
                    <View style={Style.nocart}>
                        <Image
                            source={{ uri: Constants.IMAGEBASE + '/emptycart.png' }}
                            style={{ width: ResWidth(50), height: ResHeight(50), borderRadius: 200 / 2, backgroundColor: '#ffffff' }}
                            resizeMode='cover' />
                        <Text style={{ fontSize: 15, fontWeight: '800' }}>Your Cart is empty!</Text>
                        <Text>Add items to it now.</Text>
                    </View>
                }
                <SnackBar
                    visible={!this.state.isConnected}
                    backgroundColor={"red"}
                    textMessage="No Internet Connection" />
                {this.state.loading ? <Base /> : null}
            </View>
        )
    }
}
function buildSelectedRows(items) {
    const rows = items.map(item =>
        Object.assign({}, item, {
            selected: true,
            qtys: 1,

        }),
    );
    return rows;
}


const mapDispatchToProps = (dispatch) => ({
    updateCartCount: (count) => dispatch((dispatch({ type: actionTypes.UPDATE_CART_COUNT, data: count })))
})

export default connect(null, mapDispatchToProps)(MyCart);


