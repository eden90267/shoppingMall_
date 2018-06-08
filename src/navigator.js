import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './containers/Home';
import Counter from './containers/Counter';
import Camera from './components/Camera';
import PersonalInfo from './components/PersonalInfo';

const styles = StyleSheet.create({
  tabBar: {
    height: 90
  },
  tabLabel: {
    fontSize: 16
  }
});

const AppNavigator = new StackNavigator(
  {
    Home: { screen: Home },
    Counter: { screen: Counter },
    Camera: { screen: Camera },
    PersonalInfo: { screen: PersonalInfo }
  },
  {
    headerMode: 'none'
  }
);

export default AppNavigator;
