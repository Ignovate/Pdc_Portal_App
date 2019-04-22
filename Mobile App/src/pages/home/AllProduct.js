import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ListView,
    ActivityIndicator,
    KeyboardAvoidingView,
    TouchableOpacity,
    NetInfo,
    BackHandler,
    Alert,
    TextInput
} from 'react-native'
import Style from './ProductStyle';
import Base from './Base';
import MenuDialog from "../../ui/MenuDialog";
import BrandDialog from "../../ui/BrandDialog";
import SortDialog from "../../ui/SortDialog";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { ResWidth, ResHeight } from '../../ui';
import LinearGradient from "react-native-linear-gradient";
import Service from "../../service/Service";
import SInfo from "react-native-sensitive-info";
import { SearchBar } from 'react-native-elements';
import SnackBar from 'react-native-snackbar-component'
import SideMenu from "../sideMenu/SideMenu";
import sortJsonArray from 'sort-json-array';
import { connect } from 'react-redux';
import { Constants } from '../../service/Constants';
import * as actionTypes from '../../Redux/Actions';


class AllProduct extends Base {

    constructor() {
        super();
        let flagNav;
        let ccc;
        let ddd;
        let quote_id;
        this.categorys = [];
        this.brands = [];
        this.suppliers = [];
        this.sorts = [];
        this.atoz = false;
        this.state = {
            page: 0,
            searchFlag: false,
            modalcat: false,
            Category: false,
            modalbrand: false,
            brand: false,
            modelsupplier: false,
            supplier: false,
            modelsort: false,
            sort: false,
            categorySelectedItems: [],
            brandSelectedItems: [],
            supplierSelectedItems: [],
            sortSelectedItems: [],
            Alldata: [],
            categotyData: [],
            BrandData: [],
            SupplierData: [],
            CartCount: "",
            SortData: [
                {
                    "value": "BestSeller",
                },
                {
                    "value": "A to Z",
                },
                {
                    "value": "Z to A",
                },
            ],
            loading: false,
            selectedItems: [],
            isConnected: true,
            isRefreshing: false,
            quantity: 0,
            qty_txt: "0",
            search: "",
            csearch: "",
            bsearch: "",
            ssearch: "",
        };
        this.onEndReachedCalledDuringMomentum = true;
    }

    componentWillMount() {
        this.props.updateCartCount(0);
        const Selectdata = this.props.navigation.getParam('data', []);
        const index = this.props.navigation.getParam('index', []);
        if (index == 1) {
            this.setState({ sortSelectedItems: Selectdata });
            this.sorts.push("mode:BestSeller");
        } else if (index == 2) {
        } else if (index == 3) {
            this.setState({ categorySelectedItems: Selectdata });
            this.categorys.push("categories.level0:" + Selectdata[0].label.name);
        } else if (index == 4) {
            this.setState({ searchFlag: true });
        }
        this.callBack();
    }

    callBack = () => {
        this.setState({ loading: true });
        SInfo.getItem("customer_id", {}).then(customer_id => {
            if (customer_id != "" && customer_id != "null" && customer_id != null) {
                Service.getInstance()._getWishList(customer_id, this.OnRequestWishList, "WISHLIST");

            }
        });
    }
    OnRequestWishList = (responseData, reqName) => {
        if (reqName == "WISHLIST") {
            if (responseData != undefined) {
                this.setState({ selectedItems: responseData });
                this.onUpdateCart();
                this.getMenuData();
            }
        }
    }

    onUpdateCart = () => {
        SInfo.getItem("quote_id", {}).then(quote_id => {
            if (quote_id != null) {
                Service.getInstance()._getCart(quote_id, this.onRequestUpdateCart, "CART");
            }
        });
    }

    onRequestUpdateCart = (responseData, reqName) => {
        if (reqName == "CART") {
            this.setState({ loading: false });
            if (responseData != undefined) {
                var count = 0;
                if (responseData.items != undefined) {
                    for (var i = 0; i < newFunction(responseData); i++) {
                        count = count + 1;
                    }
                } else {
                    count = 0;
                }
                this.quote_id = responseData.quote_id;
                this.props.updateCartCount(count);
            }
        }
    }


    fetchData = () => {
        this.setState({ loading: true });
        console.log(JSON.stringify(this.state.categorySelectedItems) + " " + JSON.stringify(this.state.brandSelectedItems) + "  " + JSON.stringify(this.state.supplierSelectedItems))
        console.log("categorys " + this.categorys + "   brands " + this.brands + "  suppliers  " + this.suppliers + "  sorts " + this.sorts + " atoz " + this.atoz + " ztoa " + this.ztoa)
        Service.getInstance().getAllData(this.state.search, this.state.page, this.categorys, this.brands, this.suppliers, this.sorts, this.atoz, this.ztoa, this.onAllData, "ALLDATA");
    }

    onAllData = (responseData, reqName) => {
        try {
            this.setState({
                BrandData: []
            });
            if (reqName == "ALLDATA") {
                if (responseData != undefined) {
                    const { Alldata, page } = this.state;
                    if (responseData.nbPages >= page) {
                        const rows = buildSelectedRows(responseData.hits, this.state.selectedItems);
                        this.setState({
                            Alldata: [...Alldata, ...rows],
                            isRefreshing: false,
                        });
                        this.setState({ rows: rows });
                    }
                    this.setState({ loading: false });

                    try {
                        let cx = [];
                        for (x in responseData.facets["categories.level0"]) {
                            let json = {}
                            json["name"] = x;
                            cx.push(json);
                        }

                        this.setState({
                            categotyData: sortJsonArray(cx, 'name', 'asc'),
                        });

                        let bx = [];
                        for (x in responseData.facets["brand"]) {
                            let json = {}
                            json["name"] = x;
                            bx.push(json);
                        }

                        this.setState({
                            BrandData: sortJsonArray(bx, 'name', 'asc'),
                        });
                        let sx = [];
                        for (x in responseData.facets["supplier"]) {
                            let json = {}
                            json["name"] = x;
                            sx.push(json);
                        }

                        this.setState({
                            SupplierData: sortJsonArray(sx, 'name', 'asc'),
                        });

                    } catch (e) {
                        console.log(e instanceof ReferenceError); // true
                    }
                }
            } else if (reqName == "BRAND") {
                let bx = [];
                var i;
                for (i = 0; i < responseData.facetHits.length; i++) {
                    let json = {}
                    json["name"] = responseData.facetHits[i].value;
                    bx.push(json);
                }
                this.setState({
                    BrandData: sortJsonArray(bx, 'name', 'asc'),
                });

            }
        } catch (e) {

        }
    }

    findCategory = (result) => {
        this.setState({ categorySelectedItems: [] });
        if (result != undefined) {
            this.alertBox("Category", false);
            this.setState(state => ({
                categorySelectedItems: result.selectedItems
            }), () => this.getMenuData());
        }
    }
    findBrand = (result) => {
        this.setState({ brandSelectedItems: [] });
        if (result != undefined) {
            this.alertBox("Brand", false);
            this.setState(state => ({
                brandSelectedItems: result.selectedItems
            }), () => this.getMenuData());
        }
    }
    findSuplier = (result) => {
        this.setState({ supplierSelectedItems: [] });
        if (result != undefined) {
            this.alertBox("Supplier", false);
            this.setState(state => ({
                supplierSelectedItems: result.selectedItems
            }), () => this.getMenuData());
        }
    }
    findSort = (result) => {
        this.setState({ sortSelectedItems: [] });
        if (result != undefined) {
            this.atoz = false;
            this.ztoa = false;
            this.alertBox("Sort", false);
            this.setState(state => ({
                sortSelectedItems: result.selectedItems
            }), () => this.getMenuData());
        }
    }


    getMenuData = () => {
        this.setState({ loading: true });
        this.categorys = [];
        this.brands = [];
        this.suppliers = [];
        this.atoz = false;
        this.ztoa = false;
        this.sorts = [];
        this.setState({ Alldata: [] });
        if (this.state.categorySelectedItems.length > 0) {
            this.state.categorySelectedItems.map((item) => {
                this.categorys.push("categories.level0:" + item.label.name);
            });
        }

        if (this.state.brandSelectedItems.length > 0) {
            this.state.brandSelectedItems.map((item) => {
                this.brands.push("brand:" + item.label.name);
            });
        }
        if (this.state.supplierSelectedItems.length > 0) {
            this.state.supplierSelectedItems.map((item) => {
                this.suppliers.push("supplier:" + item.label.name);
            });
        }
        if (this.state.sortSelectedItems.length > 0) {
            if (this.state.sortSelectedItems.length == "2") {
                this.state.sortSelectedItems.map((item) => {
                    if (this.state.sortSelectedItems[0].value == "0" && this.state.sortSelectedItems[1].value == "1") {
                        this.atoz = true;
                        this.ztoa = false;
                        this.sorts.push("mode: BestSeller");
                    }
                    else if (this.state.sortSelectedItems[0].value == "0" && this.state.sortSelectedItems[1].value == "2") {
                        this.ztoa = true;
                        this.atoz = false;
                        this.sorts.push("mode: BestSeller");
                    }
                    else {
                        this.atoz = false;
                        this.ztoa = false;
                        this.sorts = [];
                    }
                });
            }
            else {
                this.state.sortSelectedItems.map((item) => {
                    if (this.state.sortSelectedItems[0].value == "0") {
                        this.sorts.push("mode: BestSeller");
                        this.ztoa = false;
                        this.atoz = false;
                    }
                    else if (this.state.sortSelectedItems[0].value == "1") {
                        this.ztoa = false;
                        this.atoz = true;
                    }
                    else if (this.state.sortSelectedItems[0].value == "2") {
                        this.ztoa = true;
                        this.atoz = false;
                    }
                    else {
                        this.atoz = false;
                        this.ztoa = false;
                        this.sorts = [];
                    }
                });
            }
        }

        this.fetchData();
    }

    componentDidMount() {
        SideMenu.getName();
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        this.props.navigation.setParams({ wish: () => this.alertBox("Wishlist", false) });
        this.props.navigation.setParams({ mycart: () => this.alertBox("MyCart", false) });
        this.props.navigation.setParams({ drawer: () => this.alertBox("drawerMenu", false) });
        this.props.navigation.setParams({ search: () => this.searchMethod() });
    }

    alertBox = (mm, visible) => {
        const select = this.state.Alldata.filter(row => row.selected && row.totalItem != 0 && row.totalItem != "");
        if (select.length != 0) {
            Alert.alert(
                'Selected items will be cleared',
                ' Add items in to cart now?',
                [
                    {
                        text: 'No Thanks!', onPress: () => {
                            this.setState({ Alldata: buildSelectedRows(this.state.Alldata, this.state.selectedItems) });
                            if (mm == "MyCart") {
                                this.props.navigation.navigate('MyCart', { callBack: this.callBack() });
                            } else if (mm == "drawerMenu") {
                                this.props.navigation.openDrawer();
                            } else if (mm == "Wishlist") {
                                this.props.navigation.navigate("Wishlist");
                            } else {
                                this.tabVisible(mm, visible)
                            }
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'OK', onPress: () => {
                            this.onSubmitBtn(true, mm, visible);
                        },
                    }
                ],
                { cancelable: false },
            );
            return true;
        } else {
            if (mm == "MyCart") {
                this.props.navigation.navigate('MyCart', { callBack: this.callBack() });
            } else if (mm == "drawerMenu") {
                this.props.navigation.openDrawer();
            } else if (mm == "Wishlist") {
                this.props.navigation.navigate("Wishlist");
            } else {
                this.tabVisible(mm, visible)
            }
        }
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        this.props.navigation.navigate('Sidemenu', this.state.selectedItems.length);
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }
    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({ isConnected });
        } else {
            this.setState({ isConnected });
        }
    };
    onBackPress = () => {
        const select = this.state.Alldata.filter(row => row.selected && row.totalItem != 0 && row.totalItem != "");
        if (select.length != 0) {
            Alert.alert(
                'Selected items will be cleared',
                ' Add items in to cart now?',
                [
                    {
                        text: 'No Thanks!', onPress: () => {
                            this.setState({ Alldata: buildSelectedRows(this.state.Alldata, this.state.selectedItems) });
                            this.props.navigation.goBack();
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'OK', onPress: () => {
                            this.onSubmitBtn(true, "Back", "");
                        },
                    }
                ],
                { cancelable: false },
            );
            return true;
        }
    };
    tabVisible = (mm, visible) => {
        if (mm == "Category") {
            this.setState({ modalcat: visible });
            this.setState({ Category: visible });
            this.setState({ brand: false });
            this.setState({ supplier: false });
            this.setState({ sort: false });
        } else if (mm == "Brand") {
            this.setState({ modalbrand: visible });
            this.setState({ brand: visible });
            this.setState({ supplier: false });
            this.setState({ sort: false });
            this.setState({ Category: false });

        } else if (mm == "Supplier") {
            this.setState({ modelsupplier: visible });
            this.setState({ supplier: visible });
            this.setState({ brand: false });
            this.setState({ sort: false });
            this.setState({ Category: false });
        } else if (mm == "Sort") {
            this.setState({ modelsort: visible });
            this.setState({ sort: visible });
            this.setState({ supplier: false });
            this.setState({ brand: false });
            this.setState({ Category: false });
        }
    }
    tData = () => {
        const data = [...this.state.Alldata];
        const select = data.filter(row => row.selected || row.totalItem > 0 || row.totalItem != "");
        if (select.length > 0) {
            return false;
        } else {
            return false;
        }
    }
    onSubmitBtn = (flag, mm, visible) => {
        flagNav = flag;
        ccc = mm;
        ddd = visible;
        let product = {};
        const select = this.state.Alldata.filter(row => row.selected && row.totalItem != 0 && row.totalItem != "");
        if (select.length > 0) {
            this.setState({ loading: true });
            if (this.quote_id != undefined) {
                select.map((item) => {
                    if (item.totalItem != 0 && item.totalItem != "") {
                        let req = {};
                        req["action"] = "add";
                        req["qty"] = item.totalItem;
                        product[item.objectID] = req;
                    }
                });
                Service.getInstance().updateCart(this.quote_id, product, this.onCartSubmit, "SUBMIT");
            } else {
                select.map((item) => {
                    product[item.objectID] = item.totalItem;
                });
                SInfo.getItem("customer_id", {}).then(value => {
                    if (value != "" && value != "null" && value != null) {
                        Service.getInstance().addCart(value, product, this.onCartSubmit, "SUBMIT");
                    }
                });
            }
        } else {
            if ("ReviewOrder" == mm) {
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

    onCartSubmit = (responseData, reqName) => {

        if (reqName == "SUBMIT") {
            this.setState({ loading: false });
            SInfo.setItem("cart_order", JSON.stringify(responseData), {});
            SInfo.setItem("quote_id", responseData.quote_id, {});
            this.setState({ Alldata: unSelectedRows(this.state.Alldata) });
            if (!flagNav) {
                this.onUpdateCart();
            } else {
                const rows = this.state.Alldata.map(item =>
                    Object.assign({}, item, {
                        selected: false,
                        itemType: 0,
                        qty: 0,
                        totalItem: 0,
                        radioIndex: null
                    }));
                this.setState({ Alldata: rows });
                if (ccc == "ReviewOrder") {
                    this.moveToReviewOrder();
                } else if (ccc == "Wishlist") {
                    this.props.navigation.navigate("Wishlist");
                } else if (ccc == "SEARCH") {
                    this.onUpdateCart();
                    this.setState({ searchFlag: true });
                } else if (ccc == "drawerMenu") {
                    this.onUpdateCart();
                    this.props.navigation.openDrawer();
                } else if (ccc == "Back") {
                    this.props.navigation.goBack();
                } else if (ccc == "SEARCH1") {
                    this.onUpdateCart();
                } else if (ccc == "MyCart") {
                    this.props.navigation.navigate('MyCart', { callBack: this.callBack() });
                } else if (ccc == "FILTER") {
                    this.AllDataClear();
                } else {
                    this.onUpdateCart();
                    this.tabVisible(ccc, ddd);
                }
            }
        }
    }


    onWishlist = (responseData, reqName) => {
        if (reqName == "Wishlist") {
            this.setState({ loading: false });
        }
    }
    _handePressAdd = (item, rowID) => {
        const data = [...this.state.Alldata];
        if (data[rowID].totalItem >= 0) {
            if (data[rowID].totalItem < 99999) {
                data[rowID] = Object.assign({}, data[rowID], {
                    selected: true,
                    qty: data[rowID].qty + 1,
                    radioIndex: null,
                    totalItem: (parseInt(data[rowID].totalItem + 1)),
                    text_value: (data[rowID].totalItem + 1)
                });
                this.setState({ Alldata: data });
            }
            else {
                alert("Maximum limit reached");
            }
        }
    }

    _handePressMinus = (item, rowID) => {
        const data = [...this.state.Alldata];
        if (data[rowID].totalItem >= 1) {
            data[rowID] = Object.assign({}, data[rowID], {
                selected: true,
                qty: data[rowID].qty - 1,
                radioIndex: null,
                totalItem: (data[rowID].totalItem - 1),
                text_value: (data[rowID].totalItem - 1)
            });
            this.setState({ Alldata: data });
            if (data[rowID].totalItem - 1 == 0) {
                data[rowID] = Object.assign({}, data[rowID], {
                    qty: 0,
                    itemType: 0,
                    totalItem: "",
                    selected: false,
                    text_value: ""
                });
                this.setState({ Alldata: data });
            }
        }
    }

    edit_text = (value, rowID) => {
        const data = [...this.state.Alldata];
        if (value.length > 0) {
            data[rowID] = Object.assign({}, data[rowID], {
                selected: true,
                totalItem: parseInt(value),
                itemType: 1,
                text_value: parseInt(value),
                radio_value: "",
            });
            this.setState({ Alldata: data });
        }
        else {
            data[rowID] = Object.assign({}, data[rowID], {
                itemType: 0,
                totalItem: "",
                selected: false,
                text_value: ""
            });
            this.setState({ Alldata: data });
        }
    }

    onFocus = (text, rowID) => {
        const data = [...this.state.Alldata];
        data[rowID] = Object.assign({}, data[rowID], {
            selected: false,
            totalItem: "",
            itemType: "",
            radioIndex: null,
            radio_value: "",
            //text_value:"0"
        });
        this.setState({ Alldata: data });
    }

    selectType = (value, rowID, index) => {
        const data = [...this.state.Alldata];
        if (value.length > 0) {
            data[rowID] = Object.assign({}, data[rowID], {
                selected: true,
                totalItem: parseInt(value),
                itemType: parseInt(value),
                radioIndex: index,
                radio_value: value,
                text_value: 0
            });
            this.setState({ Alldata: data });
            const select = this.state.Alldata.filter(row => row.selected);
            SInfo.setItem("selectedItems", JSON.stringify(select), {});
        } else {
            data[rowID] = Object.assign({}, data[rowID], {
                itemType: 0,
                totalItem: "",
                selected: false,
            });
            this.setState({ Alldata: data });
        }
    }
    unSelectRadiobtn = (rowID) => {
        const data = [...this.state.Alldata];
        if (data.length > 0) {
            data[rowID] = Object.assign({}, data[rowID], {
                selected: false,
                itemType: 1,
                qty: 1,
                totalItem: 0,
                radioIndex: null,
            });
            this.setState({ Alldata: data });
        }
    }
    onRowPressWishList = (item, rowID) => {
        const data = [...this.state.Alldata];
        data[rowID] = Object.assign({}, data[rowID], {
            wishselect: !data[rowID].wishselect,
        });
        this.setState({ Alldata: data });
        SInfo.getItem("customer_id", {}).then(value => {
            if (value != "" && value != "null" && value != null) {
                if (data[rowID].wishselect) {
                    reqVal = JSON.stringify({
                        "product_id": item.objectID
                    });
                    Service.getInstance()._setWishlist(reqVal, value, this.onWishlist, "Wishlist")
                } else {
                    Service.getInstance()._removeWishlist(item.objectID, value, this.onWishlist, "Wishlist")
                }
            }
        });
    }
    onEndReached = () => {
        if (this.state.Alldata.length > 5) {
            if (!this.onEndReachedCalledDuringMomentum) {
                this.setState(state => ({
                    isRefreshing: true,
                    page: this.state.page + 1
                }), () => this.fetchData());
                this.onEndReachedCalledDuringMomentum = true;
            }
        }
    }

    SearchFilterFunction = (text) => {
        this.setState({ loading: false });
        this.setState({ search: text });
        const select = this.state.Alldata.filter(row => row.selected && row.totalItem != 0 && row.totalItem != "");
        if (select.length != 0) {
            Alert.alert(
                'Selected items will be cleared',
                ' Add items in to cart now?',
                [
                    {
                        text: 'No Thanks!', onPress: () => {
                            this.setState({ Alldata: unSelectedRows(this.state.Alldata) });
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'OK', onPress: () => {
                            this.onSubmitBtn(true, "SEARCH1", "");
                        },
                    }
                ],
                { cancelable: false },
            );
        } else {
            this.filterClear();
        }
    }
    searchMethod() {
        const select = this.state.Alldata.filter(row => row.selected && row.totalItem != 0 && row.totalItem != "");
        if (select.length != 0) {
            Alert.alert(
                'Selected items will be cleared',
                ' Add items in to cart now?',
                [
                    {
                        text: 'No Thanks!', onPress: () => {
                            this.setState({ Alldata: unSelectedRows(this.state.Alldata) });
                            this.setState({
                                searchFlag: true,
                            });
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'OK', onPress: () => {
                            this.onSubmitBtn(true, "SEARCH", "");
                        },
                    }
                ],
                { cancelable: false },
            );
        } else {
            if (!this.state.searchFlag) {
                this.setState({
                    searchFlag: true,
                });
            } else {
                this.setState({ search: "" });
                this.setState({ Alldata: [] });
                this.callBack();
                this.setState({
                    searchFlag: false,
                });
            }
        }
    }

    onTextFieldEndEditing = (text, rowID) => {
        const data = [...this.state.Alldata];
        let existingData = data[rowID]
        data[rowID] = Object.assign({}, data[rowID], {
            totalItem: (existingData.totalItem === "") ? "" : existingData.totalItem,
            /*selected already false change in drop */
        });
        this.setState({ Alldata: data });
    }



    filterClear = () => {
        const select = this.state.Alldata.filter(row => row.selected && row.totalItem != 0 && row.totalItem != "");
        if (select.length != 0) {
            Alert.alert(
                'Selected items will be cleared',
                ' Add items in to cart now?',
                [
                    {
                        text: 'No Thanks!', onPress: () => {
                            this.AllDataClear();
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'OK', onPress: () => {
                            this.onSubmitBtn(true, "FILTER", "");
                        },
                    }
                ],
                { cancelable: false },
            );
        } else {
            this.AllDataClear();
        }
    }

    AllDataClear = () => {
        if (this.state.searchFlag) {
            this.categorys = [];
            this.brands = [];
            this.suppliers = [];
            this.sorts = [];
            this.setState({ categorySelectedItems: [] });
            this.setState({ brandSelectedItems: [] });
            this.setState({ supplierSelectedItems: [] });
            this.setState({ sortSelectedItems: [] });
            this.setState({ Alldata: [] });
            this.callBack();

        }
    }


    onBrandSearch = (search) => {
        Service.getInstance()._getBrand(search, this.categorys, this.suppliers, this.onAllData, "BRAND");
    }
    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={Style.root}>{
                    this.state.searchFlag ?
                        <View style={Style.searchs}>
                            <View style={Style.searchbar}>
                                <SearchBar
                                    round={true}
                                    autoFocus={true}
                                    autoCorrect={false}
                                    value={this.state.search}
                                    rightIconContainerStyle={{ justifyContent: 'center', alignItems: "center" }}
                                    clearIcon={{ type: 'material-community', color: '#86939e', name: 'close' }}
                                    onChangeText={(text) => this.SearchFilterFunction(text)}
                                    onClear={(text) => this.SearchFilterFunction('')}
                                    searchIcon={{ size: 26, justifyContent: 'center', alignItems: "center" }}
                                    containerStyle={Style.searchcontainer}
                                    placeholderTextColor={"#747373"}
                                    inputStyle={{ backgroundColor: '#D8D5D5', color: "#747373", justifyContent: 'center', alignItems: "center", fontSize: 15, padding: 5 }}
                                    placeholder='Search Here...' />
                            </View>
                            <TouchableOpacity onPress={() => this.filterClear()} style={Style.clear}>
                                <Image
                                    style={{ width: 24, height: 24 }}
                                    source={{ uri: Constants.IMAGEBASE + "/clearfilter.png" }}
                                />
                            </TouchableOpacity>
                        </View>
                        : null
                }
                    <View style={Style.view1}>
                        <TouchableOpacity
                            style={{ flex: 2.5, }}
                            onPress={() => { this.alertBox("Category", true); }}>
                            <View style={{
                                flex: 2.5,
                                backgroundColor: this.state.Category ? "#F3476F" : "#E8E8E8",
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={Style.tabtext} >Category</Text>
                                <Icon name='chevron-down' size={32} />
                            </View>
                        </TouchableOpacity>
                        <MenuDialog
                            title={'Category'}
                            colorAccent={"#999797"}
                            items={this.state.categotyData.map((row, index) => ({ value: index, label: row }))}
                            visible={this.state.modalcat}
                            paddingd={"flex-start"}
                            selectedItems={this.state.categorySelectedItems}
                            onCancel={() => this.alertBox("Category", false)}
                            onOk={(result) => this.findCategory(result)} />
                        <TouchableOpacity
                            style={{ flex: 2.5, }}
                            onPress={() => { this.alertBox("Brand", true); }}>
                            <View style={{
                                flex: 2.5,
                                backgroundColor: this.state.brand ? "#F3476F" : "#E8E8E8",
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={Style.tabtext} >Brand</Text>
                                <Icon name='chevron-down' size={32} />
                            </View>
                        </TouchableOpacity>
                        <BrandDialog
                            title={'Brand'}
                            colorAccent={"#999797"}
                            items={this.state.BrandData.map((row, index) => ({ value: index, label: row }))}
                            visible={this.state.modalbrand}
                            selectedItems={this.state.brandSelectedItems}
                            onCancel={() => this.alertBox("Brand", false)}
                            onChange={(search) => this.onBrandSearch(search)}
                            onOk={(result) => this.findBrand(result)} />
                        <TouchableOpacity
                            style={{ flex: 2.5, }}
                            onPress={() => { this.alertBox("Supplier", true) }}>
                            <View style={{
                                flex: 2.5,
                                backgroundColor: this.state.supplier ? "#F3476F" : "#E8E8E8",
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={Style.tabtext} >Supplier</Text>
                                <Icon name='chevron-down' size={32} />
                            </View>
                        </TouchableOpacity>
                        <MenuDialog
                            title={'Supplier'}
                            colorAccent={"#999797"}
                            paddingd={"center"}
                            items={this.state.SupplierData.map((row, index) => ({ value: index, label: row }))}
                            visible={this.state.modelsupplier}
                            selectedItems={this.state.supplierSelectedItems}
                            onCancel={() => this.alertBox("Supplier", false)}
                            onOk={(result) => this.findSuplier(result)} />
                        <TouchableOpacity
                            style={{ flex: 2.5, }}
                            onPress={() => { this.alertBox("Sort", true); }}>
                            <View style={{
                                flex: 2.5,
                                backgroundColor: this.state.sort ? "#F3476F" : "#E8E8E8",
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={Style.tabtext} >Sort</Text>
                                <Icon name='chevron-down' size={32} />
                            </View>
                        </TouchableOpacity>
                        <SortDialog
                            title={'Sort'}
                            colorAccent={"#999797"}
                            items={this.state.SortData.map((row, index) => ({ value: index, label: row }))}
                            visible={this.state.modelsort}
                            selectedItems={this.state.sortSelectedItems}
                            onCancel={() => this.alertBox("Sort", false)}
                            onOk={result => this.findSort(result)} />
                    </View>
                    {this.state.Alldata.length > 0 ?
                        <View style={Style.viewsd}>
                            <View style={Style.view2}>
                                <ListView
                                    dataSource={ds.cloneWithRows(this.state.Alldata)}
                                    onEndReached={() => this.onEndReached()}
                                    onEndReachedThreshold={5}
                                    onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false }}
                                    renderFooter={() => this.renderFooter()}
                                    renderSeparator={this.FlatListItemSeparator}
                                    renderRow={(rowData, sectionID, rowID, highlightRow) => this.FlatListItem(rowData, rowID)} />
                            </View>
                            <View style={Style.view1}>
                                <View style={Style.v1}>
                                    <TouchableOpacity
                                        onPress={() => this.onSubmitBtn(false, "", "")}>
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
                                    <TouchableOpacity onPress={() => this.onSubmitBtn(true, "ReviewOrder", "")}>
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
                        </View> :
                        <View style={Style.nodatas}>
                            <Image
                                source={{ uri: Constants.IMAGEBASE + '/nosearch.png' }}
                                style={{ width: ResWidth(50), height: ResHeight(50), borderRadius: 200 / 2, backgroundColor: '#ffffff' }}
                                resizeMode='cover' />
                            <Text style={Style.emptytext}>Sorry, no results found!</Text>
                            <Text style={Style.emptytext1}>Please check the spelling or try searching for something else</Text>
                        </View>
                    }
                    {this.state.loading ? <Base /> : null}
                    <SnackBar
                        visible={!this.state.isConnected}
                        backgroundColor={"red"}
                        textMessage="No Internet Connection" />
                </View>
            </KeyboardAvoidingView>
        );
    }

    FlatListItem = (item, rowID) => {
        return (
            <View style={Style.flatitem}>
                <View style={Style.item1}>
                    <Text style={Style.checktext}>{item.name}</Text>
                    {item.mode == "BestSeller" ?
                        <View style={Style.bestseller}>
                            <Text style={Style.besttext}>BestSeller</Text>
                        </View> : null}
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
                    <Text style={Style.subtitle}>{item.supplier}</Text>
                    <View style={Style.item22} >
                        <EntypoIcon
                            style={Style.add}
                            onPress={() => this._handePressMinus(item, rowID)}
                            size={28}
                            color={"#6bbb6e"}
                            name="minus" />
                        <View style={Style.add1}>
                            <TextInput
                                style={Style.addtext}
                                maxLength={5}
                                onChangeText={(text) => this.edit_text(text, rowID)}
                                keyboardType='numeric'
                                value={(item.selected ? item.totalItem : 0).toString()}
                                onFocus={(text) => this.onFocus(text, rowID)} />
                        </View>
                        < EntypoIcon
                            style={Style.add}
                            onPress={() => this._handePressAdd(item, rowID)}
                            size={28}
                            color={"#6bbb6e"}
                            name="plus" />
                    </View>
                </View>
                <View style={Style.item3}>
                    <RadioGroup
                        size={ResWidth(5)}
                        thickness={1.2}
                        color="#5e5e5e"
                        selectedIndex={item.selected ? item.radioIndex : null}
                        activeColor='#FC5763'
                        style={Style.radiogroup}
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

    renderFooter() {
        return this.state.isRefreshing ? <ActivityIndicator size="small" animating /> : null
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
}
function newFunction(responseData) {
    return responseData.items.length;
}
function buildSelectedRows(items, selectedItems) {
    const rows = items.map(item =>
        Object.assign({}, item, {
            selected: false,
            itemType: 1,
            qty: 1,
            totalItem: 0,
            radioIndex: null,
            wishselect: selectedItems.some(i => i.product_id == item.objectID),
        }),
    );
    return rows;
}

function unSelectedRows(items) {
    const rows = items.map(item =>
        Object.assign({}, item, {
            selected: false,
            itemType: 1,
            qty: 1,
            totalItem: 0,
            radioIndex: null,
        }),
    );
    return rows;
}
const mapStateToProps = (state) => ({
    totalcount: state.cart.cartTotalCount,
});
const mapDispatchToProps = (dispatch) => ({
    updateCartCount: (count) => dispatch((dispatch({ type: actionTypes.UPDATE_CART_COUNT, data: count })))
});
export default connect(mapStateToProps, mapDispatchToProps)(AllProduct);