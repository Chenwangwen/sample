// src/components/TButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../constants/color';

const TButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: colors.textPrimary,
    textAlign: 'center',
  },
});

export default TButton;
