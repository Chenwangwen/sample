import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../constants/color';

const TButton = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.buttonDisabled : {}]}
      onPress={disabled ? null : onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttonbackgroundColor, 
    padding: 15,
    borderRadius: 5,
    margin: 10,
  },
  buttonDisabled: {
    backgroundColor: colors.buttonDisabledBackgroundColor, 
  },
  buttonText: {
    color: colors.buttontextcolor, 
    fontSize: 18,
    textAlign: 'center',
  },
});
  
export default TButton;
