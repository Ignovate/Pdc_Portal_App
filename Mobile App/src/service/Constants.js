
//const baseurl = "https://www.dev.pdcorders.com/api/rest/v2/"; //UAT BASEURL
const baseurl = "https://www.pdcorders.com/api/rest/v2/"; //LIVE BASEURL
//const baseurl = "https://www.melonberries.com/pdc/api/rest/v2/"; //melonbaries BASEURL
export class Constants {

    static ADDCART = baseurl + "addcart";
    static GETCART = baseurl + "cart/";
    static DELETE = baseurl + "cart/";
    static UPDATECART = baseurl + "addcart/";
    static WISHLISTADD = baseurl + "wishlist/";
    static WISHLISTDELETE = baseurl + "wishlist/"
    static WISHLISTGET = baseurl + "wishlist/"
    static PROCESSORDER = baseurl + "processorder/";
    static CANCELORDER = baseurl + "ordercancel/";
    static MYNOTIFICATION = baseurl + "notification/";
    static MYORDER = baseurl + "customer/orders/";
    static SINGLEORDER = baseurl + "order/";
    static DELETE_NOTIFY = baseurl + "customer/";
    static HOME = baseurl + "homescreen/store/en/limit/";

    /*START UAT - API URLs
    static LOGIN = "https://www.dev.pdcorders.com/api/rest/v2/customer";
    static CATEGORY = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_uat_en_categories/query";
    static BRAND = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_uat_en_products/facets/brand/query";
    static SUPPLIER = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_uat_en_products/facets/supplier/query";
    static ALLDATA = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_uat_en_products/query/";
    static ASCDATA = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_uat_en_products_name_asc/query";
    static DSCDATA = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_uat_en_products_name_desc/query";
    static image = 'https://www.dev.pdcorders.com/media/catalog/category/';
    static IMAGEBASE = "https://www.dev.pdcorders.com/appimages";
    END UAT - API URLs*/


    // static LOGIN = "https://www.dev.pdcorders.com/api/rest/v2/customer";
    // static CATEGORY = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_uat_en_categories/query";
    // static CATEGORYs = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_uat_en_products/facets/categories.level0/query";
    // static BRAND = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_uat_en_products/facets/brand/query";
    // static SUPPLIER = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_uat_en_products/facets/supplier/query";
    // static ALLDATA = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_uat_en_products/query/";
    // static ASCDATA = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_uat_en_products_name_asc/query";
    // static DSCDATA = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_uat_en_products_name_desc/query";
    // static image = 'https://www.dev.pdcorders.com/media/catalog/category/';
    // static IMAGEBASE = "https://www.dev.pdcorders.com/appimages";

    /*START LIVE - API URLs*/
    static LOGIN = "https://www.pdcorders.com/api/rest/v2/customer";
    static CATEGORY = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_live_en_categories/query";
    static BRAND = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_live_en_products/facets/brand/query";
    static SUPPLIER = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_live_en_products/facets/supplier/query";
    static ALLDATA = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_live_en_products/query/";
    static ASCDATA = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_live_en_products_name_asc/query";
    static DSCDATA = "https://A821I348LK-dsn.algolia.net/1/indexes/pdc_live_en_products_name_desc/query";
    static image = 'https://www.pdcorders.com/media/catalog/category/';
    static IMAGEBASE = "https://www.pdcorders.com/appimages";
    /*END LIVE - API URLs*/
}