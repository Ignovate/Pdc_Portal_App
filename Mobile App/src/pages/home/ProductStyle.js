import { StyleSheet, Platform } from "react-native";
import { ResWidth, ResHeight, ResFontSizes } from '../../ui';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default {
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#ffffff"
  },
  view1: {
    height: hp("7%"),
    flexDirection: 'row',
    backgroundColor: "#E8E8E8",
    alignItems: 'center'
  },
  searchs: {
    height: hp("7%"),
    backgroundColor: "#ffffff",
    flexDirection: "row"
  },
  view2: {
    flex: 8.4,
  },
  viewsd: {
    flex: 9.2,
    flexDirection: "column"
  },
  nodatas: {
    flex: 8.4,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: ResFontSizes(1.6),
    fontFamily: "Montserrat-Regular",
    backgroundColor: '#ffffff'
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
    alignItems: 'center'
  },
  item3: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  item22: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  checkbox: {
    flex: 9,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkbox1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checktext: {
    flex: 6.5,
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
  emptytext: {
    padding: 8,
    fontSize: ResFontSizes(2),
    color: "#B1AFAE",
    textAlign: "center",
    fontWeight: "800",
    fontFamily: "Montserrat-Regular"
  },
  emptytext1: {
    padding: 8,
    fontSize: ResFontSizes(1.6),
    color: "#B1AFAE",
    textAlign: "center",
    fontWeight: "800",
    fontFamily: "Montserrat-Regular"
  },
  bestseller: {
    padding: 3,
    backgroundColor: '#F3476F',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  besttext: {
    fontSize: ResFontSizes(1.3),
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Montserrat-Regular"
  },
  searchbar: {
    flex: 8.5,
    backgroundColor: "#FFFFFF",
  },

  searchcontainer: {
    flex: 1,
    margin: 2,
    backgroundColor: "#FFFFFF",
    justifyContent: 'center',
    borderWidth: 0, //no effect
    shadowColor: 'white', //no effect
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  clear: {
    flex: 1.5,
    backgroundColor: "#FFFFFF",
    justifyContent: 'center',
    alignItems: 'center'
  }
}