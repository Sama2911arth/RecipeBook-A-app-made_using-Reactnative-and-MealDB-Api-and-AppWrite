import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MealSearch from './src/Components/MealSearchByName';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Center from './src/Components/Center';
import Signup from './src/auth/Signup';
import Login from './src/auth/Login';
import MealDetails from './src/Components/MealDetails';
import RandomMeal from './src/Components/RandomMeal';
import SearchByMainIngredient from './src/Components/SearchByMainIngredient';
import CategoryDetails from './src/Components/CategoryDetails';
import CategorySearch from './src/Components/CategorySearch';
import SearchforCategories from './src/Components/SearchforCategories';
import AreaDetails from './src/Components/AreaDetails';
import Restaurants from './src/Components/Restaurants';


const mealdb_api = 'https://www.themealdb.com/api/json/v1/1/';

//appwrite config
import { Client, Account, ID } from 'react-native-appwrite';

export const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66f0e3e20015db4c6867')


export const account = new Account(client);

export default function App() {
  const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Center" component={Center} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MealDetails" component={MealDetails} options={{ headerShown: false }} />
        <Stack.Screen name="Random Meals" component={RandomMeal} />
        <Stack.Screen name="SearchByMainIngredient" component={SearchByMainIngredient} options={{ title: "Search by Main Ingredient" }} />
        <Stack.Screen name="Category Details" component={CategoryDetails} />
        <Stack.Screen name="Category Search" component={CategorySearch} />
        <Stack.Screen name="Search for Categories" component={SearchforCategories} />
        <Stack.Screen name="Area Details" component={AreaDetails} />
        <Stack.Screen name="Restaurants" component={Restaurants} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


