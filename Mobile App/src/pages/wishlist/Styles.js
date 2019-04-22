import { StyleSheet, Platform } from "react-native";
import { ResWidth, ResHeight, ResFontSizes } from '../../ui';
export default {
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  view1: {
    flex: 0.8,
    flexDirection: 'row',
    backgroundColor: "#E8E8E8",
    alignItems: 'center',
  },
  searchs: {
    height: 50,
    backgroundColor: "white",
    justifyContent: 'center',
  },
  view2: {
    flex: 8.4,
  },
  nodatas: {
    flex: 8.4,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: ResFontSizes(1.6),
    fontFamily: "Montserrat-Regular",

  },
  views: {
    margin: 6,
    flex: 9.2,
  },
  views1: {
    flex: 0.8,
    flexDirection: 'row',
    backgroundColor: "#E8E8E8",
    alignItems: 'center',
  },

  tabview: {
    flex: 2.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8
  },
  tabtext: {
    fontSize: ResFontSizes(1.5),
    fontFamily: "Montserrat-Regular"
  },
  backgroundOverlay: {
    marginTop: "25%",
    width: "60%",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "red",
  },
  flatitem: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
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
    marginRight: 13,
  },
  item3: {
    flexDirection: 'row',
    alignItems: 'center'
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
  checkbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkbox1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checktext: {
    flex: 8,
    textAlign: "left",
    fontSize: ResFontSizes(1.6),
    fontFamily: "Montserrat-Regular",
  },
  subtitle: {
    flex: 0.7,
    paddingLeft: 8,
    textAlign: "left",
    fontSize: ResFontSizes(1.4),
    fontFamily: "Montserrat-Regular",
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
  radiogroup: {
    flexDirection: "row",

  },
  radiotext: {
    fontSize: ResFontSizes(1.8),
    fontFamily: "Montserrat-Regular"
  },
  v1: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    margin: 5,
    borderRadius: 15,
    paddingLeft: 12,
    paddingRight: 12,
    width: ResWidth(35),
    backgroundColor: '#FA486F',
  },
  buttontext: {
    padding: 8,
    fontSize: ResFontSizes(1.5),
    color: "white",
    textAlign: "center",
    fontFamily: "Montserrat-Regular"
  },
  nowishlist: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },

}
