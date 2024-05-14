import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../constants/color';

const Title = ({ text, color = colors.titletextcolor, backgroundColor = colors.titleBackground }) => {
  return (
    <Text style={[styles.title, { color: color, backgroundColor: backgroundColor }]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10, 
    fontSize: 24,
    borderRadius: 10, 
    overflow: 'hidden', 
  },
});

export default Title;
