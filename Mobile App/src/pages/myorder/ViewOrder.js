import React, { Component } from "react";
import { ScrollView, ListView, Text, View, NetInfo, BackHandler } from 'react-native';
import Base from "../home/Base";
import styles from "../revieworder/Styles";
import Service from "../../service/Service";
import SInfo from "react-native-sensitive-info";
import SnackBar from 'react-native-snackbar-component';
export default class ReviewOrder extends Base {

    constructor(props) {
        super(props);
        this.state = {
            reviewData: [],
            loading: false,
            qtyTotal: 0,
            invoicedTotal: 0.0000,
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

    handleBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
        this.setState({ loading: true });
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        Service.getInstance()._singleListOrder(this.props.navigation.getParam("order_id", []), this.OnRequestCompletedListener, "SINGLEORDER");
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }
    OnRequestCompletedListener = (responseData, reqName) => {
        this.setState({ loading: false });
        if (reqName == "SINGLEORDER") {
            if (responseData != undefined) {
                this.setState({ reviewData: responseData.items });
                responseData.items.map((item) => {
                    this.setState({ qtyTotal: this.state.qtyTotal + item.qty });
                    this.setState({ invoicedTotal: this.state.invoicedTotal + item.qty_invoiced });
                });
                if (responseData != undefined) {
                    var count = 0;
                    if (responseData.items != undefined) {
                        for (var i = 0; i < responseData.items.length; i++) {
                            count = count + 1;
                        }
                    } else {
                        count = 0;
                    }
                    this.setState({
                        count: count
                    });
                    this.props.navigation.setParams({ count: count });
                    this.props.navigation.setParams({ edittitle: responseData.order_number });
                }
            }
        } else if (reqName == "PLACEORDER") {
            SInfo.setItem("quote_id", "", {});
            this.moveToSuccess();
        }
    }


    placeOrder = () => {
        let items = {};
        const data = [...this.state.reviewData];
        if (data.length > 0) {
            this.setState({ loading: true });
            data.map((item) => {
                items[item.product_id] = item.qty;
            });

            SInfo.getItem("customer_id", {}).then(customer_id => {
                if (customer_id != null) {
                    Service.getInstance().processOrder(customer_id, items, this.OnRequestCompletedListener, "PLACEORDER");
                }
            });

        }
    }


    FlatListItem = (item) => {
        return (
            <View style={styles.title}>
                <Text style={styles.textItem}>{item.product_name}</Text>
                {/* <Text style={styles.textItem1}>{item.price}</Text> */}
                <Text style={styles.textItem1}>{item.qty}</Text>
                <Text style={styles.textItem2}>{item.qty_invoiced}</Text>
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
                                {/* <Text style={styles.text1}>Unit</Text> */}
                                <Text style={styles.text1}>Ordered</Text>
                                <Text style={styles.text2}>Accepted</Text>
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
                                <Text style={styles.total}>Total</Text>
                                {/* <Text style={styles.textItem1}>{item.price}</Text> */}
                                <Text style={styles.total1}>{this.state.qtyTotal}</Text>
                                <Text style={styles.total2}>{this.state.invoicedTotal}</Text>
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
                    {/* <LinearGradient
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
                    </LinearGradient> */}
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


