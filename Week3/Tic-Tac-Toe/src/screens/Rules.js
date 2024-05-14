import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/color';
import Title from '../components/Title';
import Message from '../components/Message'; 
import TButton from '../components/TButton'; 


export default function RulesScreen({ navigation }) {
    return (
      <ScrollView style={styles.container}>
        <Title text="Rules" />
        <Message text="You probably already know how to play Tic-Tac-Toe. It's a really simple game." />
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
