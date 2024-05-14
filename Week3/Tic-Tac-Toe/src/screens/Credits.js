import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/color'; 
import Title from '../components/Title';
import Message from '../components/Message'; 
import TButton from '../components/TButton'; 


export default function CreditsScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Title text="Credits" />
      <Message text="Thank you to Teacher Larry for patiently teaching this class." />
      <TButton title="Back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background, 
  },
});
