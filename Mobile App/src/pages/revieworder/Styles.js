import { StyleSheet, Platform } from "react-native";
import { ResFontSizes, ResWidth, ResHeight } from "../../ui/index"

export default {
  contains: {
    flex: 10,
    flexDirection: "column",
    backgroundColor: "#ffffff"
  },
  layout: {
    margin: 8,
    padding: 15,
    flexDirection: "column",
    borderRadius: 8,
    shadowColor: "#fafafa",
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpcity: 5,
    elevation: 2,
    backgroundColor: "White"

  },
  Details: {
    fontSize: ResFontSizes(2.5),
    fontFamily: "Montserrat-Regular",
    fontWeight: "600",
  },
  title: {
    flexDirection: "row",
    marginTop: 8,
  },
  text: {
    flex: 5,
    fontSize: ResFontSizes(2),
    fontFamily: "Montserrat-Regular",
    fontWeight: "600",
    textAlign: "left",
  },
  text1: {
    flex: 2,
    fontSize: ResFontSizes(2),
    fontFamily: "Montserrat-Regular",
    fontWeight: "600",
    textAlign: "center",
  },
  text2: {
    flex: 2,
    fontSize: ResFontSizes(2),
    fontFamily: "Montserrat-Regular",
    fontWeight: "600",
    textAlign: "left",
  },
  textItem: {
    flex: 5,
    textAlign: "left",
    fontSize: ResFontSizes(1.7),
    fontFamily: "Montserrat-Regular",
    fontWeight: "200",
  },
  textItem1: {
    flex: 2,
    textAlign: "center",
    fontSize: ResFontSizes(1.7),
    fontFamily: "Montserrat-Regular",
    fontWeight: "200",
  },
  textItem2: {
    flex: 2.5,
    textAlign: "center",
    fontSize: ResFontSizes(1.7),
    fontFamily: "Montserrat-Regular",
    fontWeight: "200",
  },
  button: {
    margin: 5,
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    width: ResWidth(45),
    backgroundColor: '#FA486F',

  },
  buttontext: {
    padding: 6,
    fontSize: ResFontSizes(1.8),
    color: "white",
    textAlign: "center",
    fontFamily: "Montserrat-Regular"
  },
  total: {
    flex: 5,
    textAlign: "right",
    fontSize: ResFontSizes(1.7),
    fontFamily: "Montserrat-Regular",
    fontWeight: "600",
  },
  total1: {
    flex: 2,
    textAlign: "center",
    fontSize: ResFontSizes(1.7),
    fontFamily: "Montserrat-Regular",
    fontWeight: "600",
  },
  total2: {
    flex: 2.5,
    textAlign: "center",
    fontSize: ResFontSizes(1.7),
    fontFamily: "Montserrat-Regular",
    fontWeight: "600",
  },
};