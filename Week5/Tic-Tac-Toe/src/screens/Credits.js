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
      <Message text={`Thank you to Teacher Larry for patiently teaching this class. His dedication to spreading knowledge and helping students to grow has been truly inspiring. This course has covered a wide range of topics, each carefully chosen to give us a solid foundation in mobile application development.

We also owe a debt of gratitude to all the teaching assistants who worked tirelessly behind the scenes. Their support, whether it be through answering our questions, providing feedback on our assignments, or simply offering words of encouragement, has been invaluable.

A special thanks to the course developers who designed this curriculum. Their vision for a comprehensive learning experience has allowed us to gain practical skills that we can apply in real-world scenarios.

We cannot forget the contributions of our classmates. Learning from each other, sharing insights, and collaborating on projects have enriched our learning experience. The diversity of perspectives and the collective wisdom of this group have been a constant source of inspiration.

Finally, we want to acknowledge the support from our families and friends. Balancing studies with personal commitments can be challenging, and their understanding and encouragement have made this journey possible.

This course has been more than just a learning experience; it has been an opportunity to connect with like-minded individuals, to challenge ourselves, and to grow both personally and professionally. We look forward to applying what we've learned and making a positive impact in the world of technology.

Thank you all for being part of this journey.`} />
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
