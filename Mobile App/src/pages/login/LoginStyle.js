import { ResFontSizes, ResHeight, ResWidth } from "../../ui";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default {
    markWrap: {
        flex: 4,
        alignItems: "center",
        justifyContent: "center",

    },
    mark: {
        width: wp("50%"),
        height: wp("50%"),
        flex: 1,
    },
    background: {
        width: wp("100%"),
        height: hp("100%"),
        backgroundColor: "#ffffff"
    },
    wrapper: {
        flex: 6,
        margin: wp("12%")
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: hp("8%"),
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        height: wp("8%"),
        width: wp("8%"),
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        fontFamily: "Montserrat-Regular"
    },
    button: {
        backgroundColor: "#FF3366",
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center",
        marginTop: wp("15%"),
    },
    buttonText: {
        color: "#FFF",
        padding: 12,
        fontSize: ResFontSizes(2),
        fontFamily: "Montserrat-Regular"
    },

};