import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';
export const mealdb_api = 'https://www.themealdb.com/api/json/v1/1/';



export default function SearchforCategories() {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigation = useNavigation();

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${mealdb_api}categories.php`);
            setCategories(response.data.categories);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);

    const filteredCategories = selectedCategory ? categories.filter((category) => category.strCategory.toLowerCase().includes(selectedCategory.toLowerCase())) : categories;

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <StatusBar style="auto" />
                <TextInput
                    placeholder='Search for a Category'
                    value={selectedCategory}
                    onChangeText={setSelectedCategory}

                />
            </View>
            {filteredCategories.length === 0 ? (
                <Text>No categories available</Text>
            ) : (
                <FlatList
                    data={filteredCategories}
                    keyExtractor={(item) => item.idCategory}
                    renderItem={({ item }) => (
                        item && (
                            <Card style={styles.card} onPress={() => navigation.navigate("Category Details", { categoryName: item.strCategory })}>
                                <Card.Cover source={{ uri: item.strCategoryThumb }} style={styles.cardImage} />
                                <Card.Content>
                                    <Title style={styles.cardTitle}>{item.strCategory}</Title>
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
        //padding: 16,
        backgroundColor: '#fff',
        //paddingRight: 16,
    },
    search: {
        height: 40,
        width: '100%',
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


