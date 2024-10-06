import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, IconButton, Button as PaperButton } from 'react-native-paper';
import axios from 'axios';
import { mealdb_api } from './MealSearchByName';

const RandomMeal = () => {
    const [randomMeal, setRandomMeal] = useState(null);

    const SearchRandomMeal = async () => {
        try {
            const response = await axios.get(`${mealdb_api}random.php`);
            setRandomMeal(response.data.meals[0]);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        SearchRandomMeal();
    }, []);

    const ingredients = randomMeal
        ? Object.keys(randomMeal)
            .filter((key) => key.startsWith('strIngredient') && randomMeal[key])
            .map((key, index) => ({
                ingredient: randomMeal[key],
                measure: randomMeal[`strMeasure${index + 1}`],
                key: `${index}`,
            }))
        : [];

    return (
        <View style={styles.container}>
            <PaperButton mode="contained" onPress={SearchRandomMeal} style={styles.button}>
                Generate a Random Meal
            </PaperButton>
            {randomMeal && (
                <ScrollView>
                    <Card style={styles.card}>
                        <Card.Cover source={{ uri: randomMeal.strMealThumb }} style={styles.image} />
                        <Card.Content>
                            <Title style={styles.title}>{randomMeal.strMeal}</Title>
                            <Paragraph style={styles.instructions}>{randomMeal.strInstructions}</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Title style={styles.subtitle}>Ingredients</Title>
                            <FlatList
                                data={ingredients}
                                renderItem={({ item }) => (
                                    <View style={styles.ingredientItem}>
                                        <IconButton icon="blur" size={20} />
                                        <Text style={styles.ingredientText}>{`${item.ingredient} ${item.measure}`}</Text>
                                    </View>
                                )}
                                keyExtractor={(item) => item.key}
                            />
                        </Card.Content>
                    </Card>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    button: {
        marginBottom: 16,
    },
    card: {
        marginBottom: 16,
        borderRadius: 10,
        elevation: 2,
    },
    image: {
        height: 300,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    instructions: {
        fontSize: 16,
        marginVertical: 8,
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
    },
    ingredientText: {
        fontSize: 16,
        marginLeft: 8,
    },
});

export default RandomMeal;