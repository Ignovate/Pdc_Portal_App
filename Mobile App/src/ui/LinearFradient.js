import React from "react"
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

const LinearFradient = () => (
    <LinearGradient
        colors={['#FA486F', '#Fc5766', '#FD6A61']}
        start={{ x: 0.0, y: 0.25 }} end={{ x: 1.0, y: 1.0 }}
        locations={[0, 0.5, 0.6]}
        style={{
            flex: 1,
            flexDirection: 'row',
            left: 0,
            right: 0
        }} />
);
LinearFradient.propTypes = {
    navigation: PropTypes.object.isRequired
}
export default LinearFradient