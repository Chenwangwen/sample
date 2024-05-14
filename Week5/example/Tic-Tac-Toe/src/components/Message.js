import { StyleSheet, View, Text, ScrollView } from 'react-native';
import COLOR from '../constants/color';

export const Message = ({text}) => {
    return (
      <View style={styles.container}>
        <ScrollView>
        <Text style={styles.text}> {text} </Text>
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      height: "70%",
      width: '80%',
      padding: 10,
      borderWidth: 2,
      backgroundColor: COLOR.DARKGRAY,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    text: {
        fontSize: 12.5,
        color: COLOR.WHITE,
      },
  });