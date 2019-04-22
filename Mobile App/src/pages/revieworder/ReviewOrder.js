import React, { Component } from "react";
import {
    ScrollView,
    ListView,
    Text,
    View,
    TouchableOpacity,
    NetInfo,
    BackHandler
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Base from "../home/Base";
import styles from "./Styles";
import Service from "../../service/Service";
import SInfo from "react-native-sensitive-info";
import SnackBar from 'react-native-snackbar-component';
import { connect } from 'react-redux';
import * as actionTypes from '../../Redux/Actions';
class ReviewOrder extends Base {

    constructor(props) {
        super(props);
        this.state = {
            reviewData: [],
            loading: false,
            qtyTotal: 0,
            isConnected: true
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

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentDidMount() {
        this.props.navigation.setParams({ myCart: () => this.MyCart() });
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        SInfo.getItem("quote_id", {}).then(quote_id => {
            if (quote_id != null) {
                this.setState({ loading: true });
                this.props.updateCartCount(0);
                Service.getInstance()._getCart(quote_id, this.reviewSuccess, "CART");
            }
        });
    }
    MyCart = () => {
        this.resetToAddCart();
    }
    reviewSuccess = (res, reqName) => {
        if (res != undefined) {
            this.setState({ loading: false });
            this.setState({ reviewData: res.items });
            res.items.map((item) => {
                this.setState({ qtyTotal: this.state.qtyTotal + item.qty });
            });
            if (res != undefined) {
                var count = 0;
                if (res.items != undefined) {
                    for (var i = 0; i < res.items.length; i++) {
                        count = count + 1;
                    }
                } else {
                    count = 0;
                }
                this.setState({
                    count: count
                });
                this.props.updateCartCount(count);
                //this.props.navigation.setParams({ count: count });
            }
        }
    }
    _onFailure = (res) => {

    }
    placeOrder = () => {
        let items = {};
        let body = {};
        const data = [...this.state.reviewData];
        if (data.length > 0) {
            data.map((item) => {
                items[item.product_id] = item.qty;
            });

            SInfo.getItem("customer_id", {}).then(customer_id => {
                if (customer_id != null) {
                    SInfo.getItem("address", {}).then(address => {
                        if (address != 'null') {
                            const item = JSON.parse(address);
                            let order = {};
                            order["firstname"] = item.firstname;
                            order["lastname"] = item.lastname;
                            order["street"] = item.street;
                            order["city"] = item.city;
                            order["country_id"] = item.country_id;
                            order["region"] = item.region;
                            order["postcode"] = item.postcode;
                            order["telephone"] = item.telephone;
                            body = JSON.stringify({
                                "api_key": "3f8b7bd0a274d1e398a346454a0e92b5",
                                "session": {
                                    "customer_id": customer_id
                                },
                                "payment": {
                                    "method": "cashondelivery"
                                },
                                "items": items,
                                "order": {
                                    "billing_address": order,
                                    "shipping_address": order,
                                    "shipping_method": "freeshipping_freeshipping"
                                }
                            });
                        } else {
                            body = JSON.stringify({
                                "api_key": "3f8b7bd0a274d1e398a346454a0e92b5",
                                "session": {
                                    "customer_id": customer_id
                                },
                                "payment": {
                                    "method": "cashondelivery"
                                },
                                "items": items,
                                "order": {
                                    "currency": "INR",
                                    "shipping_method": "freeshipping_freeshipping"
                                }
                            });
                        }

                        this.setState({ loading: true });
                        Service.getInstance().processOrder(body, this.processSuccess, "PLACEORDER");
                    });

                }

            });
        }
    }
    processSuccess = (res, reqName) => {
        this.setState({ loading: false });
        if (reqName == "PLACEORDER") {
            SInfo.setItem("quote_id", "", {});
            this.moveToSuccess("success");
        }
    }

    FlatListItem = (item) => {
        return (
            <View style={styles.title}>
                <Text style={styles.textItem}>{item.product_name}</Text>
                <Text style={styles.textItem1}></Text>
                <Text style={styles.textItem1}>{item.qty}</Text>
            </View>
        );
    }
    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <View style={styles.contains}>
                <View style={{
                    flex: 9.2,
                    flexDirection: "column"
                }}>
                    <ScrollView>
                        <View style={styles.layout}>
                            <Text style={styles.Details}>Details</Text>
                            <View style={{
                                width: "100%", height: 1,
                                marginBottom: 5, marginTop: 5, backgroundColor: "#B4B2B2"
                            }} />
                            <View style={styles.title}>
                                <Text style={styles.text}>Products</Text>
                                <Text style={styles.text1}></Text>
                                <Text style={styles.text1}>Quantity</Text>
                            </View>
                            <ListView
                                showsHorizontalScrollIndicator={false}
                                dataSource={ds.cloneWithRows(this.state.reviewData)}
                                renderSeparator={this.FlatListItemSeparator}
                                renderRow={(rowData, sectionID, rowID, highlightRow) => this.FlatListItem(rowData, rowID)} />
                            <View style={{
                                width: "100%", height: 1, backgroundColor: "#B4B2B2",
                                marginBottom: 5, marginTop: 5
                            }} />
                            <View style={styles.title}>
                                <Text style={styles.textItem}></Text>
                                <Text style={styles.text1}>Total</Text>
                                <Text style={styles.text1}>{this.state.qtyTotal}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View
                    style={{
                        flex: 0.8,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <LinearGradient
                        start={{ x: 0.0, y: 0.25 }}
                        end={{ x: 0.5, y: 1.0 }}
                        locations={[0, 0.5, 0.6]}
                        colors={['#FA3D68', '#FB5360', '#Fc6656']}
                        style={styles.button}>
                        <TouchableOpacity onPress={() => this.placeOrder()}>
                            <Text style={styles.buttontext}>
                                PLACE ORDER
                             </Text>
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


const mapDispatchToProps = (dispatch) => ({
    updateCartCount: (count) => dispatch((dispatch({ type: actionTypes.UPDATE_CART_COUNT, data: count })))
})

export default connect(null, mapDispatchToProps)(ReviewOrder);