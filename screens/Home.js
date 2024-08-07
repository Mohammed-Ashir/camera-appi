// src/screens/HomeScreen.js
import React from 'react';
import {View, Button} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
      <Button
        title="Go to Camera"
        onPress={() => navigation.navigate('Camera')}
      />
      <Button
        title="Go to Search"
        onPress={() => navigation.navigate('Search')}
      />
      <Button
        title="Go to Saved Media"
        onPress={() => navigation.navigate('SavedMedia')}
      />
    </View>
  );
};

export default Home;
