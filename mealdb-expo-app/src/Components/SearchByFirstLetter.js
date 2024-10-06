import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { mealdb_api } from './MealSearchByName';

const SearchByFirstLetter = () => {
    const [searchLetter, setSearchLetter] = useState("");
    const [meals, setMeals] = useState([]);

    const searchByFirstLetter = async () => {
        if (searchLetter.length === 1) {
            try {
                const response = await axios.get(`${mealdb_api}search.php?f=${searchLetter}`);
                setMeals(response.data.meals || []);
            } catch (error) {
                console.error(error);
            }
        } else {
            setMeals([]);
        }
    };

    useEffect(() => {
        searchByFirstLetter();
    }, [searchLetter]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter a letter"
                value={searchLetter}
                onChangeText={setSearchLetter}
                maxLength={1}
            />
            <FlatList
                data={meals}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item }) => (
                    <View style={styles.mealItem}>
                        <Text style={styles.mealName}>{item.strMeal}</Text>
                        <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
                    </View>
                )}
                ListEmptyComponent={<Text>No meals found.</Text>}
            />
        </View>
    );
};

export default SearchByFirstLetter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    mealItem: {
        marginBottom: 16,
    },
    mealName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    mealImage: {
        width: 100,
        height: 100,
    },
});