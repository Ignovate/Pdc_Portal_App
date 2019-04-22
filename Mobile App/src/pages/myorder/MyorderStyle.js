import { ResFontSizes, ResWidth, ResHeight } from "../../ui/index"

export default {
    contains: {
        flex: 10,
        flexDirection: "column",
        //  backgroundColor: '#ffffff'
        backgroundColor: '#f6f6f6'

    },
    flatitem:
    {
        margin: 6,
        padding: 13,
        flexDirection: "column",
        borderRadius: 8,
        shadowColor: "#fafafa",
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
        shadowOpcity: 5,
        elevation: 2,
        backgroundColor: 'white'
    },
    item1: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checktext: {
        color: "#5e5e5e",
        fontSize: ResFontSizes(2),
        fontFamily: "Montserrat-Regular"
    },

    flatitem1: {
        padding: 3,
        paddingTop: 10,
        flexDirection: 'column',
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    writeicon: {
        width: ResWidth(5),
        height: ResWidth(5)
    },
    item2: {
        margin: 2,
        //flexDirection: "row",
        //alignItems: "center",
        //justifyContent: "center"
    },
    v1: {
        flex: 7,
        flexDirection: "row",
        //alignItems: "center",
        justifyContent: "space-between"
    },
    v2: {
        flex: 3,
        alignSelf: "flex-end"

    },
    title: {
        fontFamily: "Montserrat-Regular",
        fontWeight: "400",
        fontSize: ResFontSizes(2)
    },
    subtitle: {
        fontFamily: "Montserrat-Regular",
        fontWeight: "200",
        fontSize: ResFontSizes(1.6)
    },
    button: {
        backgroundColor: "red",
        width: ResWidth(30),
        height: ResWidth(7),
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        fontFamily: "Montserrat-Regular",
        fontWeight: "400",
        fontSize: ResFontSizes(2),
        color: "white"

    },
    noorder: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    checkbox: {
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    item3: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

};