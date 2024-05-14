import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./src/screens/Home";
import { Credits } from "./src/screens/Credits";
import { Rules } from "./src/screens/Rules";
import { Load } from "./src/screens/Load";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Load" component={Load} />
        <Stack.Screen name="Credits" component={Credits} />
        <Stack.Screen name="Rules" component={Rules} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}