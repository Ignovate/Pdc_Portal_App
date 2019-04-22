import { StyleSheet } from "react-native";
import { ResFontSizes, ResWidth, ResHeight } from "../../ui/index";
export default StyleSheet.create({
  root: {
    backgroundColor: "white",
    flex: 1
  },
  contains: {
    backgroundColor: '#f6f6f6',
    flex: 10,
    flexDirection: "column",
  },
  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  categoryCard1: {
    width: "92%",
    borderRadius: 5,
  },
  categoryCard: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  statusButton: {
    backgroundColor: "green",
    width: "20%",
    borderRadius: 5
  },
  statusBtnText: {
    backgroundColor: "transparent",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 12
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "black"
  },
  price: {
    color: "red",
    fontSize: 16,
    fontWeight: "normal",
    alignContent: "center",
  },
  noOrder: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
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
    shadowOpacity: 5,
    elevation: 5,
    backgroundColor: "#ffffff"
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  item2: {
    margin: 2,
  },
  v1: {
    flex: 7,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontFamily: "Montserrat-Regular",
    fontWeight: "400",
    fontSize: ResFontSizes(2)
  },
  subtitle: {
    fontFamily: "Montserrat-Regular",
    fontWeight: "200",
    fontSize: ResFontSizes(1.6),
    textAlign: 'right',
    color: '#1e90ff'
  },
});
