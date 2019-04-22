import React from "react";
import { TouchableOpacity, Image } from 'react-native';
import { ResWidth } from '.';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const DrawerMenu = ({ onClick: handleClick }) => (
    <TouchableOpacity
        style={{ marginLeft: 10 }}
        onPress={() => handleClick()}>
        <Icon name="menu" size={ResWidth(8)} color="#ffffff" />
    </TouchableOpacity>
);


DrawerMenu.propTypes = {
    onClick: PropTypes.func

};
export default DrawerMenu;
