import React, { Component } from "react";
import {
    View,
    Text,
    Alert,
    ListView,
    NetInfo,
    TouchableOpacity,
    TextInput,
    BackHandler
} from "react-native";
import Base from "../home/Base";
import Style from "../mycart/MyCartStyle";
import LinearGradient from "react-native-linear-gradient";
import Icons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Service from "../../service/Service";
import SnackBar from 'react-native-snackbar-component';

export default class EditerOrder extends Base {

    constructor(props) {
        super(props);
        let ccc;
        this.parent_id = '';
        this.state = {
            dataSource: [],
            prev: [],
            loading: false,
            success: false,
            isConnected: true
        };
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
        this.setState({ loading: true });
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        Service.getInstance()._singleListOrder(this.props.navigation.getParam("order_id", []), this.OnRequestCompletedListener, "SINGLEORDER");
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        this.props.navigation.setParams({ editDrawerMenu: () => this.drawerMenus() });
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

    onBackPress = () => {

        if (JSON.stringify(this.state.dataSource) !== JSON.stringify(this.state.prev)) {
            Alert.alert(
                ' Are you sure',
                ' Do you want to update the quantity?',
                [
                    {
                        text: 'No Thanks!', onPress: () => {
                            this.setState({ dataSource: this.state.prev });
                            this.props.navigation.goBack();
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'OK', onPress: () => {
                            this.proceedOrder("Back");
                        },
                    }
                ]
            );
            return true;
        }
    }

    drawerMenus = () => {
        if (JSON.stringify(this.state.dataSource) !== JSON.stringify(this.state.prev)) {
            Alert.alert(
                ' Are you sure',
                ' Do you want to update the quantity?',
                [
                    {
                        text: 'No Thanks!', onPress: () => {
                            this.setState({ dataSource: this.state.prev });
                            this.props.navigation.openDrawer();
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'OK', onPress: () => {

                            this.proceedOrder("drawer");
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
        this.setState({ loading: false });
        if (reqName == "SINGLEORDER") {
            this.props.navigation.setParams({ edittitle: responseData.order_number });
            if (responseData != undefined) {
                this.parent_id = responseData.billing.parent_id;
                const rows = buildSelectedRows(responseData.items);
                this.setState({ dataSource: rows });
                this.setState({ prev: rows });
            }
        } else if (reqName == "EDITER") {

            if (responseData.status === "success") {

                if (ccc == "drawer") {
                    this.props.navigation.openDrawer();
                } else if (ccc == "Back") {
                    const { navigation } = this.props;
                    navigation.goBack();
                    navigation.state.params.getData();
                } else if (ccc == "proceedOrder") {
                    this.moveToSuccess("success");
                }
            }
        }
        else if (reqName == "CANCEL_ORDER") {
            if (responseData.status === "success") {
                this.moveToSuccess("Cancel");
            }
        }
    }

    _handePressAdd = (item, rowID) => {
        const data = [...this.state.dataSource];
        if (data[rowID].selected) {
            if (data[rowID].qty > 0) {
                data[rowID] = Object.assign({}, data[rowID], {
                    qty: data[rowID].qty + 1,
                });
                this.setState({ dataSource: data });
            }
        } else {
            this._showAlert("Please Select Checkbox", "OK");
        }
    }

    _handePressMinus = (item, rowID) => {
        const data = [...this.state.dataSource];
        if (data[rowID].selected) {
            if (data[rowID].qty > 1) {
                data[rowID] = Object.assign({}, data[rowID], {
                    qty: data[rowID].qty - 1,
                });
                this.setState({ dataSource: data });
            }
        } else {
            this._showAlert("Please Select Checkbox", "OK");
        }
    }
    onRowPress = (rowData, rowID) => {
        const Alldata = [...this.state.dataSource];
        const select = Alldata.filter(row => row.selected);

        if (rowData.selected) {
            if (select.length > 1) {
                Alert.alert(
                    ' Are you sure',
                    ' Do you want to remove the product?',
                    [
                        {
                            text: 'No Thanks!', onPress: () => {

                            },
                            style: 'cancel',
                        },
                        {
                            text: 'OK', onPress: () => {
                                Alldata[rowID] = Object.assign({}, Alldata[rowID], {
                                    selected: !Alldata[rowID].selected,
                                });
                                this.setState({ dataSource: Alldata });
                            },
                        }
                    ]
                );
                return true;
            } else {
                this._showAlert("Order Must Contain Minimum 1 Product", "OK")
            }
        } else {
            Alldata[rowID] = Object.assign({}, Alldata[rowID], {
                selected: !Alldata[rowID].selected,
            });
            this.setState({ dataSource: Alldata });
        }
    }

    proceedOrder = (mm) => {
        ccc = mm
        const select = this.state.dataSource.filter(row => row.selected);
        let product = {};
        if (select.length > 0) {
            select.map((item) => {
                product[item.product_id] = item.qty;
            });
            this.setState({ loading: true });
            Service.getInstance().editerOrder(product, this.parent_id, this.OnRequestCompletedListener, "EDITER");
        } else {
            this._showAlert("Order Must Contain Minimum 1 Product", "OK")
        }
    }
    Ok = () => {
        this.setState({ loading: true });
        const order_id = this.props.navigation.getParam('order_id');
        Service.getInstance().cancelOrder(order_id, this.OnRequestCompletedListener, "CANCEL_ORDER");
    }
    cancelOrder = () => {
        Alert.alert(
            '',
            'Do you want to cancel the order?',
            [
                { text: 'Cancel', onPress: () => false },
                { text: 'OK', onPress: () => this.Ok() },
            ],
            { cancelable: false }
        );

    }
    selectType = (value, rowID) => {
        const data = [...this.state.dataSource];
        if (value.length > 0) {
            data[rowID] = Object.assign({}, data[rowID], {
                itemType: parseInt(value),
                qty: parseInt(value)
            });
            this.setState({ dataSource: data });
        } else {
            data[rowID] = Object.assign({}, data[rowID], {
                itemType: 0,
                qty: 0
            });
            this.setState({ dataSource: data });
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
                                    size={27}
                                    color={"#6bbb6e"}
                                    name="minus" />
                            </TouchableOpacity>
                        </View>
                        <View style={Style.add}>
                            <TextInput
                                style={Style.addtext}
                                maxLength={4}
                                onChangeText={(text) => this.selectType(text, rowID)}
                                keyboardType={'phone-pad'}
                                value={(rowData.selected ? rowData.qty : 0).toString()}
                            />
                        </View>
                        <View style={Style.add}>
                            <TouchableOpacity onPress={() => this._handePressAdd(rowData, rowID)}>
                                < EntypoIcon
                                    size={27}
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
                <View style={Style.v2}>
                    <ListView
                        dataSource={ds.cloneWithRows(this.state.dataSource)}
                        renderSeparator={this.FlatListItemSeparator}
                        renderRow={(rowData, sectionID, rowID, highlightRow) => this.FlatListItem(rowData, rowID)}
                        keyExtractor={(item, index) => item.item_id} />
                </View>
                <View style={Style.v3}>
                    <LinearGradient
                        start={{ x: 0.0, y: 0.25 }}
                        end={{ x: 0.5, y: 1.0 }}
                        locations={[0, 0.5, 0.6]}
                        colors={['#FA3D68', '#FB5360', '#Fc6656']}
                        style={Style.button}>
                        <TouchableOpacity style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
                            onPress={() => this.cancelOrder()}>
                            <Text style={Style.buttontext}>Cancel Order</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <LinearGradient
                        start={{ x: 0.0, y: 0.25 }}
                        end={{ x: 0.5, y: 1.0 }}
                        locations={[0, 0.5, 0.6]}
                        colors={['#FA3D68', '#FB5360', '#Fc6656']}
                        style={Style.button}>
                        <TouchableOpacity style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
                            onPress={() => this.proceedOrder("proceedOrder")}>
                            <Text style={Style.buttontext}>Submit Order</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
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
            selected: true,
            totalItem: 0
        }),
    );
    return rows;
}