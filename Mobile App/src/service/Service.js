import { Constants } from "./Constants";

let headers = {
    Accept: 'application/json',
    "Content-Type": "application/json",
    "Authorization": "agentx 336fac317cb3f7e1446ac01ebb4e0fcf"
};

let header1 = {
    "Content-Type": "application/json",
    "X-Algolia-API-Key": "252b473d0e8689d19fc1033e3a531aad",
    "X-Algolia-Application-Id": "A821I348LK"
};

let header2 = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export default class Service {
    static instance;
    static getInstance = () => {
        if (this.instance == undefined) {
            this.instance = new Service();
        }
        return this.instance;
    }

    _loginPage = (username, password, fcm_Id, successCallback, reqName) => {
        let body = JSON.stringify({
            "api_key": "3f8b7bd0a274d1e398a346454a0e92b5",
            "username": username,
            "password": password,
            "fcm_id": fcm_Id
        });

        this.APICallLogin(
            Constants.LOGIN,
            'POST',
            "",
            headers,
            body,
            successCallback,
            reqName,
            fcm_Id
        );
    }

    getHomeData = (page, successCallback, reqName) => {
        this.APICall(
            Constants.HOME,
            'GET',
            page,
            header2,
            "",
            successCallback,
            reqName
        );
    }
    getCategory = (brand, supplier, successCallback, reqName) => {
        let body = JSON.stringify({
            "hitsPerPage": 30,
            facetFilters: [brand, supplier]
        })
        this.APICall(
            Constants.CATEGORY,
            'POST',
            "",
            header1,
            body,
            successCallback,
            reqName
        );
    }
    getCategorys = (search, brand, supplier, successCallback, reqName) => {
        let body = JSON.stringify({
            "params": "query=" + search,
            "hitsPerPage": 30,
            "maxFacetHits": 100,
            facetFilters: [brand, supplier]
        })
        this.APICall(
            Constants.CATEGORYs,
            'POST',
            "",
            header1,
            body,
            successCallback,
            reqName
        );
    }
    _getBrand = (search, category, supplier, successCallback, reqName) => {

        let body = JSON.stringify({
            "params": "query=" + search,
            "maxFacetHits": 100,
            facetFilters: [category, supplier]
        });
        this.APICall(
            Constants.BRAND,
            'POST',
            "",
            header1,
            body,
            successCallback,
            reqName
        );
    }
    _getSupplier = (search, category, brand, successCallback, reqName, ) => {
        let body = JSON.stringify({
            "params": "query=" + search,
            "maxFacetHits": 100,
            facetFilters: [category, brand]
        });
        this.APICall(
            Constants.SUPPLIER,
            'POST',
            "",
            header1,
            body,
            successCallback,
            reqName
        );
    }

    getAllData = (search, page, category, brand, supplier, sorts, atoz, ztoa, successCallback, reqName) => {

        let url = "";
        if (atoz) {
            url = Constants.ASCDATA;
        }
        else if (ztoa) {
            url = Constants.DSCDATA;
        } else {
            url = Constants.ALLDATA;
        }
        let body = JSON.stringify({
            "params": "query=" + search,
            "hitsPerPage": 20,
            "page": page,
            "maxValuesPerFacet": 1000,
            "sortFacetValuesBy": "alpha",
            facetFilters: [category, brand, supplier, sorts],
            "facets": [
                "brand",
                "categories.level0",
                "mode",
                "price.AED.default",
                "supplier"
            ]

        });
        this.APICall(
            url,
            'POST',
            "",
            header1,
            body,
            successCallback,
            reqName
        );
    }

    getSearchData = (search, successCallback, reqName) => {

        let body = JSON.stringify({
            "params": "query=" + search,
            "facets": "*,brand,categories.level0",
            facetFilters: []
        });
        this.APICall(
            Constants.ALLDATA,
            'POST',
            "",
            header1,
            body,
            successCallback,
            reqName
        );
    }


    addCart = (customer_ID, product, onCartSubmit, reqName) => {
        let body = JSON.stringify({
            "api_key": "3f8b7bd0a274d1e398a346454a0e92b5",
            "customer_id": "" + customer_ID,
            "product": product
        });
        this.APICall(
            Constants.ADDCART,
            'POST',
            "",
            headers,
            body,
            onCartSubmit,
            reqName
        );
    }
    _getCart = (value, CartSuccess, reqName) => {

        this.APICall(
            Constants.GETCART,
            'GET',
            value,
            headers,
            undefined,
            CartSuccess,
            reqName
        );
    }

    updateCart = (quote_id, product, onCartSubmit, reqName) => {
        let body = JSON.stringify({
            'api_key': '3f8b7bd0a274d1e398a346454a0e92b5',
            'store_id': '2',
            'product': product,
        });

        this.APICall(
            Constants.UPDATECART,
            'PUT',
            quote_id,
            headers,
            body,
            onCartSubmit,
            reqName
        );
    }

    DeletedItem = (quote_id, item_id, deletedSuccess, reqName) => {
        this.APICall(
            Constants.DELETE,
            'DELETE',
            quote_id + "/product/" + item_id,
            headers,
            undefined,
            deletedSuccess,
            reqName
        );
    }
    processOrder = (body, successCallback, reqName) => {

        this.APICall(
            Constants.PROCESSORDER,
            'POST',
            "",
            headers,
            body,
            successCallback,
            reqName
        );
    }
    cancelOrder = (id, successCallback, reqName) => {
        let body = JSON.stringify({
            "api_key": "3f8b7bd0a274d1e398a346454a0e92b5"
        });
        this.APICall(
            Constants.CANCELORDER,
            'PUT',
            id,
            headers,
            body,
            successCallback,
            reqName
        );
    }

    _setWishlist = (data, customer_id, successCallback, reqName) => {
        this.APICall(
            Constants.WISHLISTADD,
            'POST',
            customer_id,
            headers,
            data,
            successCallback,
            reqName
        );
    }

    _getWishList = (customer_id, successCallback, reqName) => {
        this.APICall(
            Constants.WISHLISTGET,
            'GET',
            customer_id,
            header2,
            "",
            successCallback,
            reqName
        );
    }
    _removeWishlist = (product_id, customer_id, successCallback, reqName) => {
        this.APICall(
            Constants.WISHLISTDELETE,
            'DELETE',
            customer_id + "/" + "product" + "/" + product_id,
            header2,
            "",
            successCallback,
            reqName
        );
    }
    _myOrder(customer_id, successCallback, reqName) {

        this.APICall(
            Constants.MYORDER,
            'GET',
            customer_id,
            headers,
            "",
            successCallback,
            reqName
        );
    }
    _singleListOrder = (order, successCallback, reqName) => {
        this.APICall(
            Constants.SINGLEORDER,
            'GET',
            order,
            header2,
            "",
            successCallback,
            reqName
        );
    }

    editerOrder = (product, parent_id, successCallback, reqName) => {

        let body = JSON.stringify({
            'items': product,
        });
        this.APICall(
            Constants.SINGLEORDER,
            'PUT',
            parent_id,
            header2,
            body,
            successCallback,
            reqName
        );
    }

    _mynotification(successCallback, reqName, cutomer_id) {

        this.APICall(
            Constants.MYNOTIFICATION,
            'GET',
            cutomer_id,
            header2,
            "",
            successCallback,
            reqName);

    }
    logoutScreen = (successCallback, fcm, reqName) => {

        this.APICall(
            Constants.DELETE_NOTIFY,
            'DELETE',
            "fcm/" + fcm,
            header2,
            "",
            successCallback,
            reqName);
    }

    APICall = (
        url,
        methodType,
        api,
        header,
        data,
        callBack,
        reqName) => {
        fetch(url + api, {
            method: methodType,
            headers: header,
            body: data
        }).then(response => {
            return response.json();
        }).then(responseData => {
            callBack(responseData, reqName);
            return responseData;
        }).catch(error => {
            console.log(error);
        });
    }

    APICallLogin = (
        url,
        methodType,
        api,
        header,
        data,
        successCallback,
        reqName,
        fcm_Id) => {
        fetch(url + api, {
            method: methodType,
            headers: header,
            body: data
        }).then(response => {
            return response.json();
        }).then(responseData => {
            //alert(JSON.stringify(responseData));         
            successCallback(responseData, reqName, fcm_Id);
        }).catch(error => {
            console.log(error);
        });
    }

}