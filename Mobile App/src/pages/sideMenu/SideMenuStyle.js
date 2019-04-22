import { StyleSheet, Platform } from "react-native";

export default {
  root: {
    flex: 1,
    backgroundColor: "#ffffff"
  },

  imageContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%"
  },
  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.70
  },
  imageCircle: {
    height: 100,
    width: 100,
    borderWidth: 1,
    marginLeft: 10,
    ...Platform.select({
      ios: {
        marginTop: 20,
        marginLeft: 20,
      }
    }),
  },
  editIcon: {
    width: 20,
    height: 20,
    right: 20,
    position: "absolute"
  },
  userName: {
    alignSelf: "center",
    color: "#282828",
    width: "60%",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    ...Platform.select({
      ios: {
        marginTop: 20,
      }
    })
  },
  profileEmail: {
    marginTop: 3,
    fontSize: 12,
    marginLeft: 10,
  },
  button1: {
    marginTop: 5,
    height: 33,
    width: 90,
    backgroundColor: "rgba(239,126,98,1)",
    opacity: 1,
    borderWidth: 1,
    borderColor: "rgba(239,126,98,1)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  text4: {
    backgroundColor: "transparent",
    fontSize: 12,
    color: "rgba(255,255,255,1)"
  },
  itemsParent: {
    marginTop: 50
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: "#E9E9E9"
  },
  menuIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: "contain",
  },
  menuNames: {
    alignSelf: "center",
    fontSize: 16,
    marginLeft: 20,
    color: "#000000",
  },
  line: {
    height: 1,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#E9E9E9"
  }

};
