import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MealSearchByName from './MealSearchByName';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import MealByArea from './MealByArea';
import MealByCategory from './MealByCategory';
import Settings from './Settings';
import Ionicons from '@expo/vector-icons/Ionicons';



const Center = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused
                        ? 'home'
                        : 'home-outline';
                } else if (route.name === 'Meals by Area') {
                    iconName = focused ? 'pizza' : 'pizza-outline';
                }
                else if (route.name === 'Categories') {
                    iconName = focused ? 'list' : 'list-outline';
                }
                else if (route.name === 'Search Meals') {
                    iconName = focused ? 'search' : 'search-outline';
                }
                else if (route.name === 'Settings') {
                    iconName = focused ? 'settings' : 'settings-outline';
                }


                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        })}
        >
            <Tab.Screen name="Categories" component={MealByCategory} />
            <Tab.Screen name="Meals by Area" component={MealByArea} />
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search Meals" component={MealSearchByName} />
            <Tab.Screen name="Settings" component={Settings} />


        </Tab.Navigator>

    )

}

export default Center

const styles = StyleSheet.create({})