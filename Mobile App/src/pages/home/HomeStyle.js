import { StyleSheet, Platform } from "react-native";
import { ResWidth, ResHeight, ResFontSizes } from '../../ui';
export default {
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  view1: {
    flex: 0.9,

  },
  view2: {
    flex: 2.3,
    backgroundColor: '#F6F6F6',
  },
  grid1: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view3: {
    flex: 5.9,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: '#F6F6F6',
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffFFFFFF',
    borderWidth: 0,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 3,
    borderColor: '#F7F7F7',

  },
  arrow_icon: {
    height: ResHeight(5),
    width: ResHeight(5),
  },
  text: {
    color: "#333333",
    fontSize: ResFontSizes(2),
    justifyContent: 'center',
    fontFamily: 'Montserrat-Regular',
    alignItems: 'center',
  },
  text1: {
    fontSize: ResFontSizes(1.5),
    justifyContent: 'center',
    padding: 8,
    color: "#333333",
    fontFamily: 'Montserrat-Regular',
    alignItems: 'center',
  },
  offerslist: {
    backgroundColor: 'white',
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: ResWidth(46),
  },
  all_product: {
    backgroundColor: "#ffffff",
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: ResWidth(40),
    height: ResWidth(40),
  },
  button: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  button_icon: {
    height: ResHeight(10),
    width: ResHeight(10),
  },
  button_text: {
    margin: 10,
    color: "#333333",
    fontFamily: 'Montserrat-Regular',
    fontSize: ResFontSizes(1.7),
  },


}