import { StyleSheet, View, Image, ScrollView, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { mealdb_api } from './MealSearchByName';
import { Card, Text, Title, Paragraph, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const CategoryDetails = ({ route }) => {
    const navigation = useNavigation();
    const { categoryName } = route.params;
    const [mealDetails, setmealDetails] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState("");



    const fetchmealDetails = async (categoryName) => {
        try {
            const response = await axios.get(`${mealdb_api}filter.php?c=${categoryName}`);
            setmealDetails(response.data.meals);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchmealDetails(categoryName);
    }, [selectedMeal]);



    if (!mealDetails) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    const mealImage = mealDetails.strMealThumb;
    const mealName = mealDetails.strMeal;


    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <StatusBar style="auto" />
                <TouchableOpacity style={styles.searchInput} onPress={() => navigation.navigate("Category Search", { categoryName })}>
                    <Text style={styles.text}>Search for a {categoryName}  </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={mealDetails}
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

        </View>
    );
}
export default CategoryDetails;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        //textAlign: 'center',
        marginTop: 5,
        marginLeft: 10
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        backgroundColor: '#8B78E6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        paddingTop: 5,
        fontWeight: 'bold',
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


