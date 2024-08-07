import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CameraComponent from './components/CameraComponent.js';
import SearchScreen from './components/SearchScreen.js';
import SavedMedia from './components/SavedMedia.js';
import Home from './screens/Home.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Camera" component={CameraComponent} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="SavedMedia" component={SavedMedia} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
  },
});

export default App;

// <Stack.Screen
//   name="Login"
//   component={LoginScreen}
//   options={({navigation}) => ({
//     title: 'Login',
//     headerTitleStyle: styles.headerTitle,
//   })}
// />
// <Stack.Screen
//   name="Register"
//   component={RegisterScreen}
//   options={({navigation}) => ({
//     title: 'Register',
//     headerTitleStyle: styles.headerTitle,
//   })}
// />
// <Stack.Screen
//   name="Products"
//   component={ProductsList}
//   options={({navigation}) => ({
//     title: 'Products',
//     headerTitleStyle: styles.headerTitle,
//     headerLeft: () => <></>,
//     headerRight: () => <CartIcon navigation={navigation} />,
//   })}
// />
// <Stack.Screen
//   name="ProductDetails"
//   component={ProductDetails}
//   options={({navigation}) => ({
//     title: 'Product details',
//     headerTitleStyle: styles.headerTitle,
//     headerRight: () => <CartIcon navigation={navigation} />,
//   })}
// />
// <Stack.Screen
//   name="Cart"
//   component={Cart}
//   options={({navigation}) => ({
//     title: 'My cart',
//     headerTitleStyle: styles.headerTitle,
//     headerRight: () => <CartIcon navigation={navigation} />,
//   })}
// />
