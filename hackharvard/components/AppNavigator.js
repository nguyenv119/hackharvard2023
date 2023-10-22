import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Calendar from '../screens/Calendar'; 
import Insights from '../screens/Insights'; 
import NewEntryScreen from '../screens/NewEntryScreen'; 
import EmotionRating from '../screens/EmotionRating'; 

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Insights" component={Insights} />
      <Tab.Screen name="EmotionRating" component={EmotionRating} />
      <Tab.Screen name="NewEntryScreen" component={NewEntryScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;