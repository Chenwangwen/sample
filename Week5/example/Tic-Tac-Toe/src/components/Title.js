import { StyleSheet, View, Text } from 'react-native';
import COLOR from '../constants/color';

export const Title = ({title, color}) => {
    return (
      <View style={[styles.container, {backgroundColor:  color || COLOR.GREEN }]}>
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        width: '80%',
        borderRadius: 5,
        borderWidth: 2,

      },
      text: {
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: COLOR.WHITE,
      },
  });