import React from "react";
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/MaterialIcons"

const BackButton = ({ navigation, title }) => {
  back = () => {
    this.props.navigation.goBack()

  }
  return (
    <TouchableOpacity
      style={{ marginLeft: 10 }}
      onPress={() => navigation.goBack()}>
      <Icon name="arrow-back" size={26} color="#FFFFFF" />
    </TouchableOpacity>
  )

}

BackButton.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default BackButton;
