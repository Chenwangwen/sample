import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import RulesScreen from './src/screens/Rules';
import CreditsScreen from './src/screens/Credits';
import LoadGameScreen from './src/screens/Load';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Rules" component={RulesScreen} />
        <Stack.Screen name="Credits" component={CreditsScreen} />
        <Stack.Screen name="Load" component={LoadGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
