import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';
export const mealdb_api = 'https://www.themealdb.com/api/json/v1/1/';

const AreaDetails = ({ route }) => {
    const { areaName } = route.params;
    const [areaDetails, setAreaDetails] = useState([]);
    const navigation = useNavigation();

    const fetchAreaDetails = async (areaName) => {
        try {
            const response = await axios.get(`${mealdb_api}filter.php?a=${areaName}`);
            setAreaDetails(response.data.meals);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchAreaDetails(areaName);
    }, [areaName]);
    return (
        <View style={styles.container}>
            <FlatList
                data={areaDetails}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item }) => (
                    item && (
                        <Card style={styles.card} onPress={() => navigation.navigate("MealDetails", { mealId: item.idMeal, mealName: item.strMeal })}>
                            <Card.Cover source={{ uri: item.strMealThumb }} style={styles.cardImage} />
                            <Card.Content>
                                <Title style={styles.cardTitle}>{item.strMeal}</Title>

                            </Card.Content>
                        </Card>)
                )}
            />
        </View>
    )
}

export default AreaDetails

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
})