import React from 'react'
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Modal,
  Text,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from 'react-native';
import colors from './colors';
import { material } from 'react-native-typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');


const ActionButton = ({ testID, onPress, colorAccent, label }) => (
  <TouchableHighlight
    testID={testID}
    style={styles.actionContainer}
    underlayColor={colors.androidPressedUnderlay}
    onPress={onPress}
  >
    <Text style={[material.button, { color: colorAccent }]}>{label}</Text>
  </TouchableHighlight>
);

const MaterialDialog = ({
  visible,
  scrolled,
  title,
  titleColor,
  colorAccent,
  backgroundColor,
  addPadding,
  onOk,
  onCancel,
  onClear,
  okLabel,
  cancelLabel,
  children,
  paddingd
}) => (
    <Modal
      animationType={'fade'}
      transparent
      hardwareAccelerated
      visible={visible}
      onRequestClose={onCancel}
      supportedOrientations={['portrait', 'landscape']}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: paddingd,
          alignItems: 'flex-start',
          backgroundColor: colors.backgroundOverlay,
        }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <View
              style={[
                styles.modalContainer,
                (title != null || (addPadding && title == null)) && styles.modalContainerPadding,
                { backgroundColor },
              ]}
            >
              <TouchableWithoutFeedback>
                <View>
                  {title != null ? (
                    <View style={scrolled ? styles.titleContainerScrolled : styles.titleContainer}>
                      <Text style={[material.title, { color: titleColor }]}>{title}</Text>
                      <TouchableOpacity onPress={onClear}>
                        <Text style={[material.title, { color: titleColor }]}>{"Clear"}</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  <View
                    style={
                      scrolled
                        ? [
                          styles.contentContainerScrolled,
                          addPadding && styles.contentContainerScrolledPadding,
                        ]
                        : [styles.contentContainer, addPadding && styles.contentContainerPadding]
                    }
                  >
                    {children}
                  </View>
                  {onOk != null && onCancel != null ? (
                    <View
                      style={scrolled ? styles.actionsContainerScrolled : styles.actionsContainer}
                    >
                      {/* <ActionButton
                      testID="dialog-cancel-button"
                      colorAccent={colorAccent}
                      onPress={onCancel}
                      label={cancelLabel}
                    /> */}
                      <ActionButton
                        testID="dialog-ok-button"
                        colorAccent={colorAccent}
                        onPress={onOk}
                        label={okLabel}
                      />
                    </View>
                  ) : null}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
const styles = StyleSheet.create({

  modalContainer: {
    width: wp("70%"),
    borderRadius: 2,
    elevation: 24,
    overflow: 'hidden',
    padding: 8,
    marginTop: height / 7
  },
  modalContainerPadding: {
    paddingTop: 4,
  },
  titleContainer: {
    paddingHorizontal: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainerScrolled: {
    paddingHorizontal: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.androidBorderColor,
  },
  contentContainer: {
    flex: -1,
  },
  contentContainerPadding: {
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  contentContainerScrolled: {
    flex: -1,
    maxHeight: height - 264, // (106px vertical margin * 2) + 52px
  },
  contentContainerScrolledPadding: {
    paddingHorizontal: 4,
  },
  actionsContainer: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,

  },
  actionsContainerScrolled: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,

  },
  actionContainer: {
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    minWidth: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#181717",
  },
});

MaterialDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onOk: PropTypes.func,
  cancelLabel: PropTypes.string,
  okLabel: PropTypes.string,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  colorAccent: PropTypes.string,
  scrolled: PropTypes.bool,
  addPadding: PropTypes.bool,
  paddingd: PropTypes.string
};

MaterialDialog.defaultProps = {
  okLabel: 'Done',
  cancelLabel: 'CANCEL',
  title: undefined,
  titleColor: colors.androidPrimaryTextColor,
  backgroundColor: colors.background,
  colorAccent: colors.androidColorAccent,
  scrolled: false,
  addPadding: true,
  onOk: undefined,
  onCancel: undefined,
  onClear: undefined,
};

ActionButton.propTypes = {
  testID: PropTypes.string.isRequired,
  colorAccent: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default MaterialDialog;