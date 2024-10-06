import { StyleSheet, View, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { mealdb_api } from './MealSearchByName';
import { Card, Text, Title, Paragraph, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


const MealDetails = ({ route }) => {
    const navigation = useNavigation();
    const { mealId, mealName } = route.params;
    const [mealDetails, setMealDetails] = useState(null);




    const fetchMealDetails = async (mealId) => {
        try {
            const response = await axios.get(`${mealdb_api}lookup.php?i=${mealId}`);
            setMealDetails(response.data.meals[0]);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchMealDetails(mealId);
    }, [mealId]);



    if (!mealDetails) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
    const mealImage = mealDetails.strMealThumb;
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = mealDetails[`strIngredient${i}`];
        const measure = mealDetails[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push({ key: `${i}`, ingredient, measure });
        }
    }
    console.log(ingredients);
    return (
        <View style={styles.container}>
            <StatusBar />
            <ScrollView>
                <View style={styles.header}>
                    <IconButton
                        icon="arrow-left"
                        size={24}
                        onPress={() => navigation.goBack()}
                    />
                    <Title style={styles.headerTitle}>{mealName}</Title>
                </View>
                <Card style={styles.card}>
                    <Card.Cover source={{ uri: mealImage }} style={styles.image} />
                    <Card.Content>
                        <Title style={styles.title}>{mealName}</Title>
                        <Paragraph style={styles.instructions}>{mealDetails.strInstructions}</Paragraph>
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
        </View>
    )
}

export default MealDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        marginTop: 40,
        borderRadius: 10,
        width: 350
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 8,
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
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    ingredientText: {
        fontSize: 16,
        marginLeft: 16
    },
})