import { Platform, StyleSheet } from "react-native";
import Color from "../style/Color";
import { ResHeight, ResWidth, ResFontSizes } from '../ui/index';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  headerView: {
    flexDirection: "row"
  },
  headerViews: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    alignSelf: "center",
    resizeMode: "center",
    height: 50,
    width: 50
  },
  titleHeader: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        borderBottomWidth: 0
      }
    }),
  },
  navigationTitle: {
    fontWeight: "500",
    fontSize: ResFontSizes(2.5),
    color: "#ffffff",
    alignSelf: "center",
    marginLeft: 15,
    fontFamily: "Montserrat-Regular"
  },
  navigationHeader: {
    elevation: 0,
    shadowOpacity: 0,
    shadowColor: "transparent",
    backgroundColor: "#ffffff",
    borderBottomWidth: 0
  },
  icons: {
    padding: 5,
    marginLeft: 10
  },
  rightIcon: {
    marginRight: 20,
    color: "#ffffff"
  },
  rightlastIcon: {
    marginRight: 20,
    color: "#ffffff",
  },
  rightlastText: {
    marginRight: 20,
    color: "#ffffff",
    fontFamily: "Montserrat-Regular"
  },
  navtitle: {
    flexDirection: 'row',
  },
  homenavtitle: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

});