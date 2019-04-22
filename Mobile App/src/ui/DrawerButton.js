import React from "react";
import { TouchableOpacity, Image } from 'react-native';
import { ResWidth, ResHeight, ResFontSizes } from '.';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const DrawerButton = ({ navigation }) => (
  <TouchableOpacity
    style={{ marginLeft: 10 }}
    onPress={() => navigation.openDrawer()}>
    <Icon name="menu" size={ResWidth(8)} color="#ffffff" />
  </TouchableOpacity>
);
DrawerButton.propTypes = {
  navigation: PropTypes.object.isRequired
};
export default DrawerButton;
