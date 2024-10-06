import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';
export const mealdb_api = 'https://www.themealdb.com/api/json/v1/1/';



export default function CategorySearch({ route }) {
    const { categoryName } = route.params;
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState("");
    const navigation = useNavigation();

    const fetchMealsByCategory = async () => {
        try {
            const response = await axios.get(`${mealdb_api}filter.php?c=${categoryName}`);
            setMeals(response.data.meals);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchMealsByCategory();
    }, [categoryName]);

    const filteredMeals = selectedMeal ? meals.filter((meal) => meal.strMeal.toLowerCase().includes(selectedMeal.toLowerCase())) : meals;

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <StatusBar style="auto" />
                <TextInput
                    placeholder='Search for a meal'
                    value={selectedMeal}
                    onChangeText={setSelectedMeal}

                />
            </View>
            {filteredMeals.length === 0 ? (
                <Text>No meals available</Text>
            ) : (
                <FlatList
                    data={filteredMeals}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={({ item }) => (
                        item && (
                            <Card style={styles.card} onPress={() => navigation.navigate("MealDetails", { mealId: item.idMeal, mealName: item.strMeal })}>
                                <Card.Cover source={{ uri: item.strMealThumb }} style={styles.cardImage} />
                                <Card.Content>
                                    <Title style={styles.cardTitle}>{item.strMeal}</Title>
                                    <Paragraph>{item.strCategory}</Paragraph>
                                </Card.Content>
                            </Card>)
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    search: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 16,
        paddingTop: 5
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    card: {
        marginVertical: 8,
        borderRadius: 10,
        elevation: 2,
    },
    cardImage: {
        height: 100,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});


