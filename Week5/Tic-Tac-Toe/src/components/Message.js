import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../constants/color';

const Message = ({ text }) => {
  return <Text style={styles.message}>{text}</Text>;
};

const styles = StyleSheet.create({
  message: {
    fontSize: 18,
    backgroundColor: colors.messagebackground,
    color: colors.cellText,
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
});

export default Message;
