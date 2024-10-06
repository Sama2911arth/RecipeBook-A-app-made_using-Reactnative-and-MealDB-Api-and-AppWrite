import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';

const MAPPLE_API_KEY = "55ae2759f94cf4d48eb16f73b06e7fcf";

const fetch_restaurants = async (latitude, longitude) => {
    const radius = 10000; // 10 km
    const type = "restaurant";

    const url = `https://api.mapple.com/v1/restaurants`;

    try {
        const response = await axios.get(url, {
            params: {
                lat: latitude,
                lon: longitude,
                api: MAPPLE_API_KEY,
                radius: radius,
            }
        });
        console.log(response.data.restaurants);
        return response.data.results; // Check if this contains data
    } catch (error) {
        console.error(error);
        return [];
    }
};

const Restaurants = () => {
    const [location, set_location] = useState(null);
    const [restaurants, set_restaurants] = useState([]);
    const [loading, set_loading] = useState(false);
    const [error_msg, set_error_msg] = useState(null);

    const get_current_location_and_restaurants = async () => {
        try {
            set_loading(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                set_error_msg('Permission to access location was denied');
                set_loading(false);
                return;
            }

            const current_location = await Location.getCurrentPositionAsync({});
            console.log(current_location);
            set_location(current_location);
            const { latitude, longitude } = current_location.coords;

            const fetched_restaurants = await fetch_restaurants(latitude, longitude);
            console.log(fetched_restaurants);
            set_restaurants(fetched_restaurants);
            set_loading(false);
        } catch (error) {
            set_error_msg(error.message || 'Error fetching restaurants');
            set_loading(false);
        }
    };

    useEffect(() => {
        get_current_location_and_restaurants();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error_msg) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error_msg}</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            {restaurants.length === 0 ? (
                <Text>No Restaurants Found</Text>
            ) : (
                <FlatList
                    data={restaurants}
                    keyExtractor={(item) => item.place_id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemVicinity}>{item.vicinity}</Text>
                            <Text style={styles.itemRating}>Rating: {item.rating}</Text>
                        </View>
                    )}
                    ListEmptyComponent={<Text>No Restaurants Found</Text>}
                />
            )}
        </View>
    );
};

export default Restaurants;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    error_text: {
        color: 'red',
        marginBottom: 10,
    },
    restaurant_card: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        marginVertical: 8,
        borderRadius: 5,
    },
    restaurant_name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
