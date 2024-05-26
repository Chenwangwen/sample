import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { restoreToken } from './src/store/authSlice';
import { fetchOrders } from './src/store/ordersSlice';
import store from './src/store/store';
import { Provider } from 'react-redux';

import Categories from './src/screens/Categories';
import CategoryProducts from './src/screens/CategoryProducts';
import ProductDetail from './src/screens/ProductDetail';
import ShoppingCart from './src/screens/ShoppingCart';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import MyOrdersScreen from './src/screens/MyOrdersScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: 'green' },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen name="Categories" component={Categories} />
    <Stack.Screen name="CategoryProducts" component={CategoryProducts} options={({ route }) => ({ title: route.params?.category })} />
    <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Product Details' }} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: 'blue' },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
    <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'User Profile' }} />
  </Stack.Navigator>
);

const AppContent = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const totalItems = useSelector(state => state.cart.totalItems);

  useEffect(() => {
    dispatch(restoreToken());
  }, [dispatch]);

  const handleTabPress = (navigation, routeName) => {
    if (!isLoggedIn) {
      Alert.alert('Error', 'Please sign in or sign up to access this screen', [{ text: 'OK' }]);
    } else {
      if (routeName === 'MyOrders') {
        dispatch(fetchOrders());
      }
      navigation.navigate(routeName);
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Products') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'ShoppingCart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'MyOrders') {
              iconName = focused ? 'receipt' : 'receipt-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Products"
          component={HomeStack}
          options={{ tabBarLabel: 'Products' }}
        />
        <Tab.Screen
          name="ShoppingCart"
          component={ShoppingCart}
          options={{ tabBarLabel: 'Shopping Cart', tabBarBadge: totalItems > 0 ? totalItems : null }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              handleTabPress(navigation, 'ShoppingCart');
            },
          })}
        />
        <Tab.Screen
          name="MyOrders"
          component={MyOrdersScreen}
          options={{ tabBarLabel: 'My Orders' }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              handleTabPress(navigation, 'MyOrders');
            },
          })}
        />
        <Tab.Screen
          name="Profile"
          component={AuthStack}
          options={{ tabBarLabel: 'Profile' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
