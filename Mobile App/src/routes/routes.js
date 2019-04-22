import { DrawerNavigator } from "react-navigation";
import StackNavigator from "./StackNavigator";
import SideMenu from "../pages/sideMenu/SideMenu";
import HomePage from "../pages/home/Home";

const routes = (signedIn = false) => {

  return DrawerNavigator(
    {
      HomePage: {
        screen: StackNavigator(signedIn),
      }
    },
    {
      contentComponent: SideMenu,
      drawerWidth: 300,
      drawerLockMode: 'locked-closed',
      drawerBackgroundColor: "rgba(255,255,255,0.8)"
    }
  )
};
export default routes;