import React, { Component } from 'react';
import { View, Text, ListView, TextInput, Image, NetInfo, Alert, TouchableOpacity, RefreshControl, BackHandler } from 'react-native'

import Style from './Styles'
import Base from '../home/Base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import LinearGradient from "react-native-linear-gradient";
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Service from '../../service/Service';
import SInfo from "react-native-sensitive-info";
import { ResWidth, ResHeight, ResFontSizes } from '../../ui';
import SnackBar from 'react-native-snackbar-component';
import { connect } from 'react-redux';
import * as actionTypes from '../../Redux/Actions'
import { Constants } from "../../service/Constants";


class WishList extends Base {

    constructor(props) {
        super(props);
        let flagNav;
        let ccc;
        this.quote_id = undefined;
        this.state = {
            wish: "WISHLIST",
            FlatListItems: [],
            loading: false,
            isConnected: true,

        }
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                }} />
        );
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
    componentDidMount() {
        this.upDateCart();
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        this.props.navigation.setParams({ mycarts: () => this.MyCart() });
        this.props.navigation.setParams({ drawers: () => this.drawerMenu() });
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

    }


    upDateCart = () => {
        SInfo.getItem("customer_id", {}).then(value => {
            if (value != "" && value != "null" && value != null) {
                Service.getInstance()._getWishList(value, this.OnRequestCompletedListener, "WISHLISTS");
            }
        });
        SInfo.getItem("quote_id", {}).then(quote_id => {
            if (quote_id != null) {
                Service.getInstance()._getCart(quote_id, this.OnRequestCompletedListener, "CART");
            }
        });
    }

    alertBox = (mm) => {
        const select = this.state.FlatListItems.filter(row => row.selected && row.totalItem != 0 && row.totalItem != "");
        if (select.length != 0) {
            Alert.alert(
                'Selected items will be cleared',
                ' Add items in to cart now?',
                [
                    {
                        text: 'No Thanks!', onPress: () => {
                            var rows = buildSelectedRows(this.state.FlatListItems, this.state.selectedItems);
                            data = rows.sort(function (a, b) {
                                var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                                if (nameA < nameB) //sort string ascending
                                    return -1
                                if (nameA > nameB)
                                    return 1
                            });
                            this.setState({ FlatListItems: data });

                            if (mm == "MyCart") {
                                this.props.navigation.navigate('MyCart');
                            } else if (mm == "drawerMenu") {
                                this.props.navigation.openDrawer();
                            } else if (mm == "Back") {
                                this.props.navigation.goBack();
                            }
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'OK', onPress: () => {
                            this.onSubmitBtn(true, mm);
                        },
                    }
                ]
            );
        } else {
            if (mm == "MyCart") {
                this.props.navigation.navigate('MyCart');
            } else if (mm == "drawerMenu") {
                this.props.navigation.openDrawer();
            } else if (mm == "Back") {
                this.props.navigation.goBack();
            }
        }
    }

    MyCart = () => {
        this.alertBox("MyCart");
    }
    drawerMenu = () => {
        this.alertBox("drawerMenu");
    }
    onBackPress = () => {
        const select = this.state.FlatListItems.filter(row => row.selected && row.totalItem != 0 && row.totalItem != "");
        if (select.length != 0) {
            Alert.alert(
                'Selected items will be cleared',
                ' Add items in to cart now?',
                [
                    {
                        text: 'No Thanks!', onPress: () => {
                            var rows = buildSelectedRows(this.state.FlatListItems, this.state.selectedItems);
                            data = rows.sort(function (a, b) {
                                var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                                if (nameA < nameB) //sort string ascending
                                    return -1
                                if (nameA > nameB)
                                    return 1
                            });
                            this.setState({ FlatListItems: data });
                            this.props.navigation.goBack();
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'OK', onPress: () => {
                            this.onSubmitBtn(true, "Back");
                        },
                    }
                ]
            );
            return true;
        } else {
            this.props.navigation.goBack();
            return true;
        }
    };
    OnRequestCompletedListener = (responseData, reqName) => {

        if (reqName == "WISHLISTS") {
            this.setState({ loading: false });
            if (responseData != undefined) {
                var rows = buildSelectedRows(responseData, this.state.selectedItems);
                data = rows.sort(function (a, b) {
                    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                    if (nameA < nameB) //sort string ascending
                        return -1
                    if (nameA > nameB)
                        return 1
                });
                this.setState({ FlatListItems: data });
            }
        } else if (reqName == "CART") {
            this.setState({ loading: false });
            if (responseData != undefined) {
                var count = 0;
                if (responseData.items != undefined) {
                    for (var i = 0; i < responseData.items.length; i++) {
                        count = count + 1;
                    }
                } else {
                    count = 0;
                }
                this.quote_id = responseData.quote_id
                this.setState({
                    count: count
                });
                this.props.updateCartCount(count);
            }
        } else if (reqName == "UPDATE") {
            this.setState({ loading: false });
            SInfo.setItem("cart_order", JSON.stringify(responseData), {});
            SInfo.setItem("quote_id", responseData.quote_id, {});
            //console.log(JSON.stringify(responseData));

            if (!flagNav) {
                this.upDateCart();
            } else {
                const rows = this.state.FlatListItems.map(item =>
                    Object.assign({}, item, {
                        selected: false,
                        itemType: 0,
                        qty: 0,
                        totalItem: 0,
                        radioIndex: null
                    }));
                this.setState({ FlatListItems: rows });
                if (ccc == "drawerMenu") {
                    this.props.navigation.openDrawer();
                } else if (ccc == "CHECKOUT") {
                    this.moveToReviewOrder();
                } else if (ccc == "Back") {
                    this.props.navigation.goBack();
                }


            }
        } else if (reqName == "WISHREMOVE") {
            this.componentDidMount();
        }
    }
    onSubmitBtn = (flag, mm) => {
        flagNav = flag;
        ccc = mm;
        let product = {};
        const select = this.state.FlatListItems.filter(row => row.selected && row.totalItem != 0 && row.totalItem != "");
        if (select.length > 0) {
            this.setState({ loading: true });
            //  console.log(this.quote_id);
            if (this.quote_id != undefined) {
                select.map((item) => {
                    if (item.totalItem != 0 && item.totalItem != "") {
                        let req = {};
                        req["action"] = "add";
                        req["qty"] = item.totalItem;
                        product[item.product_id] = req;
                    }
                    else {
                        let req = {};
                        req["selected"] = "false";
                        product[item.product_id] = req;
                    }
                });
                Service.getInstance().updateCart(this.quote_id, product, this.OnRequestCompletedListener, "UPDATE");
            } else {
                select.map((item) => {
                    product[item.product_id] = item.totalItem;
                });

                SInfo.getItem("customer_id", {}).then(value => {
                    if (value != "" && value != "null" && value != null) {
                        Service.getInstance().addCart(value, product, this.OnRequestCompletedListener, "UPDATE");
                    }
                });
            }
        } else {
            if ("CHECKOUT" == mm) {
                if (this.props.totalcount > 0) {
                    this.moveToReviewOrder();
                } else {
                    this._showAlert("Please select minimum one item", "OK")
                }
            } else {
                this._showAlert("Please select minimum one item", "OK")
            }
        }
    }
    _handePressAdd = (item, rowID) => {

        const data = [...this.state.FlatListItems];

        if (data[rowID].totalItem >= 0) {
            if (data[rowID].totalItem < 99999) {
                data[rowID] = Object.assign({}, data[rowID], {
                    qty: data[rowID].qty + 1,
                    totalItem: (data[rowID].totalItem + 1),
                    text_value: (data[rowID].totalItem + 1),
                    radioIndex: null,
                });
                this.setState({ FlatListItems: data });
            }
            else {
                alert("Maximum limit reached");
            }
        }

    }
    _handePressMinus = (item, rowID) => {
        const data = [...this.state.FlatListItems];
        if (data[rowID].totalItem >= 1) {
            data[rowID] = Object.assign({}, data[rowID], {
                qty: data[rowID].qty - 1,
                totalItem: (data[rowID].totalItem - 1),
                text_value: (data[rowID].totalItem - 1),
                radioIndex: null,
                selected: true
            });
            this.setState({ FlatListItems: data });

            if (data[rowID].totalItem - 1 == 0) {

                data[rowID] = Object.assign({}, data[rowID], {
                    qty: 0,
                    itemType: 0,
                    totalItem: "",
                    selected: false,
                    text_value: ""
                });
                this.setState({ FlatListItems: data });
            }
        }
    }



    onRowPressWishList = (item, rowID) => {
        const data = [...this.state.FlatListItems];
        data[rowID] = Object.assign({}, data[rowID], {
            wishselect: !data[rowID].wishselect,
        });
        this.setState({ FlatListItems: data });
        if (data[rowID].wishselect) {
            //Service.getInstance()._setWishlist(reqVal, this.state.customer_ID, this, this.wishlistSuccess, this._onFailure)
        } else {
            SInfo.getItem("customer_id", {}).then(value => {
                if (value != "" && value != "null" && value != null) {
                    Service.getInstance()._removeWishlist(item.product_id, value, this.OnRequestCompletedListener, "WISHREMOVE")
                }
            });
        }
    }

    edit_text = (value, rowID) => {
        const data = [...this.state.FlatListItems];
        if (value.length > 0) {
            data[rowID] = Object.assign({}, data[rowID], {
                selected: true,
                totalItem: parseInt(value),
                itemType: 1,
                text_value: parseInt(value)
            });
            this.setState({ FlatListItems: data });
        } else {
            data[rowID] = Object.assign({}, data[rowID], {
                itemType: 0,
                totalItem: 0,
                selected: false,
                text_value: ""
            });
            this.setState({ FlatListItems: data });
        }
    }

    selectType = (value, rowID, index) => {
        const data = [...this.state.FlatListItems];
        if (value.length > 0) {
            data[rowID] = Object.assign({}, data[rowID], {
                selected: true,
                totalItem: parseInt(value),
                itemType: parseInt(value),
                radioIndex: index,
                radio_value: value,
                text_value: ""
            });
            this.setState({ FlatListItems: data });
        } else {
            data[rowID] = Object.assign({}, data[rowID], {
                itemType: 0,
                totalItem: 0,
                selected: false,
            });
            this.setState({ FlatListItems: data });
        }
    }
    onFocus = (text, rowID) => {
        const data = [...this.state.FlatListItems];
        data[rowID] = Object.assign({}, data[rowID], {
            itemType: "",
            totalItem: "",
            radioIndex: null,
            selected: false
        });
        this.setState({ FlatListItems: data });

    }
    unSelectRadiobtn = (rowID) => {
        const data = [...this.state.FlatListItems];
        if (data.length > 0) {
            data[rowID] = Object.assign({}, data[rowID], {
                selected: false,
                itemType: 1,
                qty: 1,
                totalItem: 0,
                radioIndex: null,
            });
            this.setState({ FlatListItems: data });
        }
    }

    FlatListItem = (item, rowID) => {

        return (
            <View style={Style.flatitem}>
                <View style={Style.item1}>
                    <Text style={Style.checktext}>{item.name}</Text>
                    <View style={Style.checkbox1}>
                        <TouchableOpacity onPress={() => this.onRowPressWishList(item, rowID)}>
                            <Icon
                                name={item.wishselect ? 'heart' : 'heart-outline'}
                                color={item.wishselect ? "#F3476F" : "#F3476F"}
                                size={30} />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={Style.item2}>
                    <Text style={Style.subtitle}></Text>
                    <View style={Style.item22} >
                        <View style={Style.add}>
                            <TouchableOpacity onPress={() => this._handePressMinus(item, rowID)}>
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
                                onChangeText={(text) => this.edit_text(text, rowID)}
                                keyboardType='numeric'
                                value={(item.selected ? item.totalItem : item.totalItem).toString()}
                                onFocus={(text) => this.onFocus(text, rowID)}
                            />
                        </View>
                        <View style={Style.add}>
                            <TouchableOpacity onPress={() => this._handePressAdd(item, rowID)}>
                                < EntypoIcon
                                    size={28}
                                    color={"#6bbb6e"}
                                    name="plus" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={Style.item3}>
                    <RadioGroup
                        size={ResWidth(5)}
                        thickness={1.2}
                        color="#5e5e5e"
                        activeColor='#FC5763'
                        style={Style.radiogroup}
                        selectedIndex={item.selected ? item.radioIndex : null}
                        onSelect={(index, value) => this.selectType(value, rowID, index)}>
                        <RadioButton
                            style={{ alignItems: 'center' }}
                            value='1'>
                            <Text style={Style.radiotext}>{"1"}</Text>
                        </RadioButton>
                        <RadioButton
                            style={{ alignItems: 'center' }}
                            value='10'>
                            <Text style={Style.radiotext}>{"10"}</Text>
                        </RadioButton>
                        <RadioButton
                            style={{ alignItems: 'center' }}
                            value='25'>
                            <Text style={Style.radiotext}>{"25"}</Text>
                        </RadioButton>
                        <RadioButton
                            style={{ alignItems: 'center' }}
                            value='50'>
                            <Text style={Style.radiotext}>{"50"}</Text>
                        </RadioButton>
                        <RadioButton
                            style={{ alignItems: 'center' }}
                            value='100'>
                            <Text style={Style.radiotext}>{"100"}</Text>
                        </RadioButton>
                    </RadioGroup>
                    {item.selected ? <TouchableOpacity onPress={() => this.unSelectRadiobtn(rowID)}><Icon name="delete-forever" size={24} /></TouchableOpacity> : null}
                </View>
            </View>
        );
    }

    onSelect = (index, value) => {
        this.setState({
            text: `Selected index: ${index} , value: ${value}`
        })
    }
    onRefresh() {
        SInfo.getItem("customer_id", {}).then(value => {
            if (value != "" && value != "null" && value != null) {
                Service.getInstance()._getWishList(value, this.OnRequestCompletedListener, "WISHLISTS");
            }
        });
        SInfo.getItem("quote_id", {}).then(quote_id => {
            if (quote_id != null) {
                Service.getInstance()._getCart(quote_id, this.OnRequestCompletedListener, "CART");
            }
        });
    }
    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <View style={{ flex: 1, flexDirection: "column", backgroundColor: 'white' }}>
                {this.state.FlatListItems.length > 0 ?
                    < View style={Style.root}>
                        <View style={Style.views}>
                            <ListView
                                dataSource={ds.cloneWithRows(this.state.FlatListItems)}
                                onEndReached={this.onEndReached}
                                onEndReachedThreshold={0.5}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.onRefresh.bind(this)}
                                    />
                                }
                                renderSeparator={this.FlatListItemSeparator}
                                renderRow={(rowData, sectionID, rowID, highlightRow) => this.FlatListItem(rowData, rowID)} />
                        </View>
                        <View style={Style.view1}>
                            <View style={Style.v1}>
                                <TouchableOpacity
                                    onPress={() => this.onSubmitBtn(false, "")}>
                                    <LinearGradient
                                        colors={['#FA486F', '#Fc5766', '#FD6A61']}
                                        start={{ x: 0.0, y: 0.25 }}
                                        end={{ x: 1.0, y: 1.0 }}
                                        style={Style.button}
                                        locations={[0, 0.5, 0.6]}>
                                        <Text
                                            style={Style.buttontext}>ADD TO CART</Text>
                                    </ LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={Style.v1}>
                                <TouchableOpacity onPress={() => this.onSubmitBtn(true, "CHECKOUT")}>
                                    <LinearGradient
                                        colors={['#FA486F', '#Fc5766', '#FD6A61']}
                                        start={{ x: 0.0, y: 0.25 }}
                                        end={{ x: 1.0, y: 1.0 }}
                                        style={Style.button}
                                        locations={[0, 0.5, 0.6]}>
                                        <Text style={Style.buttontext}>CHECKOUT</Text>
                                    </ LinearGradient>
                                </TouchableOpacity>
                            </View>

                        </View>
                        {this.state.loading ? <Base /> : null}
                    </View > :
                    <View style={Style.nowishlist}>
                        <Image
                            source={{ uri: Constants.IMAGEBASE + '/nowishlist.png' }}
                            style={{ width: ResWidth(50), height: ResHeight(50), borderRadius: 50 / 2, backgroundColor: '#ffffff' }}
                            resizeMode='cover' />
                        <Text style={{ fontSize: 15, fontWeight: '800' }}>No items yet</Text>
                        <Text>simply browse and tap on the heart icon</Text>
                    </View>
                }
                <SnackBar
                    visible={!this.state.isConnected}
                    backgroundColor={"red"}
                    textMessage="No Internet Connection" />
            </View>
        );
    }

}

function buildSelectedRows(items, selectedItems) {
    const rows = items.map(item =>
        Object.assign({}, item, {
            selected: false,//
            itemType: 1,
            qty: 0,
            totalItem: 0,
            wishselect: true,// selectedItems.some(i => i.product_id == item.objectID),
        }),
    );
    return rows;
}
const mapStateToProps = (state) => ({
    totalcount: state.cart.cartTotalCount,
})

const mapDispatchToProps = (dispatch) => ({
    updateCartCount: (count) => dispatch((dispatch({ type: actionTypes.UPDATE_CART_COUNT, data: count })))
})

export default connect(mapStateToProps, mapDispatchToProps)(WishList);