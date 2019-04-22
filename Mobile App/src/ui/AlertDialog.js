import React from "react";
import { TouchableOpacity, View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/MaterialIcons"

const AlertDialog = ({ navigation, title }) => {

    alert();
    Alert.alert(
        'Selected items will be cleared',
        ' Add items in to cart now?',
        [
            {
                text: 'CANCEL', onPress: () => {
                },
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    //this.props.navigation;

                },
            }
        ]
    );


}
AlertDialog.prototype = {
    navigation: PropTypes.object.isRequired
};


export default AlertDialog;
