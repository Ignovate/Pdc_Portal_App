import { Dimensions } from 'react-native'
import BackButton from './BackButton';
import DrawerButton from './DrawerButton';
import LinearFradient from "./LinearFradient";
import DrawerMenu from "./DrawerMenu";

export { BackButton, DrawerButton, LinearFradient, DrawerMenu }
export default { BackButton, DrawerButton, LinearFradient, DrawerMenu }


const { height, width } = Dimensions.get('window');

export const ResHeight = (h) => {
  return height * (h / 100);
};

export const ResWidth = (w) => {
  return width * (w / 100);
};

export const ResFontSizes = (f) => {
  return Math.sqrt((height * height) + (width * width)) * (f / 100);
};