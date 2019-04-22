import { ResFontSizes, ResHeight, ResWidth } from "../../ui/index";
export default {
    root: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    v1: {
        flex: 0.8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 3
    },
    v2: {
        flex: 9.2,
        margin: 6,
    },
    v3: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    text: {
        width: "100%",
        textAlign: "center",
        fontSize: ResFontSizes(1.5),
        fontFamily: "Montserrat-Regular"
    },
    checkbox: {
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    checktext: {
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        color: "#5e5e5e",
        fontSize: ResFontSizes(1.6),
        fontFamily: "Montserrat-Regular"
    },
    flatitem: {
        padding: 3,
        paddingTop: 10,
        flexDirection: 'column',
    },
    item1: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    item2: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        marginRight: 3,
    },
    item22: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    add: {
        flex: 0.3,
        padding: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    add1: {
        flex: 0.4,
        padding: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addtext: {
        width: 50,
        fontSize: ResFontSizes(1.7),
        fontFamily: "Montserrat-Regular",
        justifyContent: 'center',
        alignItems: "center",
        alignItems: 'center',
        textAlign: 'center',
    },
    adds: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: ResFontSizes(2.5),
        fontFamily: "Montserrat-Regular"
    },
    button: {
        margin: 5,
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        width: ResWidth(40),
        backgroundColor: '#FA486F',
    },
    buttontext: {
        fontSize: ResFontSizes(1.8),
        color: "white",
        textAlign: "center",
        fontFamily: "Montserrat-Regular",

    },
    nocart: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    subtitle: {
        flex: 0.7,
        paddingLeft: 8,
        textAlign: "left",
        fontSize: ResFontSizes(1.4),
        fontFamily: "Montserrat-Regular",
    },
}  