import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';
export const mealdb_api = 'https://www.themealdb.com/api/json/v1/1/';



export default function MealBymeals() {
    const [areas, setAreas] = useState([]);
    const [selectedarea, setSelectedArea] = useState("");
    const navigation = useNavigation();

    const fetchAreas = async () => {
        try {
            const response = await axios.get(`${mealdb_api}list.php?a=list`);
            setAreas(response.data.meals);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        fetchAreas();
    }, []);

    const filteredAreas = selectedarea ? areas.filter((area) => area.strArea.toLowerCase().includes(selectedarea.toLowerCase())) : areas;

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <StatusBar style="auto" />

                <TextInput placeholder='Search for a specific area.'
                    value={selectedarea}
                    onChangeText={(text) => setSelectedArea(text)}
                />


            </View>
            {TextInput.length === 0 ? (
                <FlatList
                    data={areas}
                    keyExtractor={(item) => item.strArea}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("Area Details", { areaName: item.strArea })}>
                            <View style={styles.Area}>

                                <Text style={styles.Areatext}>{item.strArea}</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                />
            ) : (
                <FlatList
                    data={filteredAreas}
                    keyExtractor={(item) => item.strArea}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("Area Details", { areaName: item.strArea })}>
                            <View style={styles.Area}>

                                <Text style={styles.Areatext}>{item.strArea}  </Text>

                            </View>
                        </TouchableOpacity>
                    )}

                />
            )}



        </View>

    )
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
    text: {
        color: 'black',
        fontWeight: 'bold',
        //textAlign: 'center',
        marginTop: 5,
    }
    ,
    Area: {
        height: 60,
        borderColor: '#ddd',
        width: 350,
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
    Areatext: {
        color: 'black',
        fontWeight: 'bold',
        //textAlign: 'center',
        //marginTop: 5,
        paddingTop: 5
    }

});

