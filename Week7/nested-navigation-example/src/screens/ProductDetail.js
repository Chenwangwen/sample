import { View, Text, Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Order } from './Order';
import Icon from 'react-native-vector-icons/Ionicons';

const Tabs = createBottomTabNavigator();

const ProductDetailCom = ({ navigation, route }) => {
  const { id, name, price } = route.params.prod;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Product Detail Screen</Text>
      <Text style={styles.text}>Product ID: {id}</Text>
      <Text style={styles.text}>Product Name: {name}</Text>
      <Text style={styles.text}>Product Price: ${price}</Text>
      <View style={{ marginLeft: 20 }}>
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
      </View>
    </View>
  );
};

export const ProductDetail = ({ route }) => {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="ProdDetCom" 
        component={ProductDetailCom}
        initialParams={{ prod: route.params.prod }}
        options={{ headerShown: false, tabBarLabel: "Product Detail" , tabBarIcon: ({ focused, color, size }) => (
          <Icon name={focused ? 'document-text-outline' : 'document-text-outline'} size={size} color={color} />
        ),}}
      />
      <Tabs.Screen name="Order" component={Order}   options={{
    tabBarLabel: 'Order',
    tabBarIcon: ({ focused, color, size }) => (
      <Icon name={focused ? 'cart-outline' : 'cart-outline'} size={size} color={color} />
    ),
  }}/>
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 16,
    padding: 10,
  }
});
