import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ImageBackground, ScrollView } from 'react-native'
import React from 'react';
import RandomMeal from './RandomMeal';
import SearchByMainIngredient from './SearchByMainIngredient';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window')

const Home = () => {
    const navigation = useNavigation();
    return (
        <View>
            <ScrollView>
                <View style={styles.RandomMeal}>
                    <TouchableOpacity onPress={() => navigation.navigate("Random Meals")}>
                        <View style={styles.imgContainer}>

                            <ImageBackground style={styles.img} source={{ uri: "https://media.gettyimages.com/id/103332899/photo/valentines-day-breakfast-tray.jpg?s=612x612&w=gi&k=20&c=Mv9rwyQlSLSJ_dL3ysG4aMai5Nj5Evds34hwZebXDaQ=" }}>
                                <View style={styles.TextContainer}>
                                    <Text style={styles.RandomText}>Select a Random Dish </Text>
                                </View>
                            </ImageBackground>

                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("SearchByMainIngredient")}>
                    <View style={styles.RandomMeal}>

                        <View style={styles.imgContainer}>

                            <ImageBackground style={styles.img} source={{ uri: "https://becomevegetarian.org/wp-content/uploads/2022/03/Lacto-ovo-vegetarian.jpg" }}>
                                <View style={styles.TextContainer}>
                                    <Text style={styles.RandomText}>Search Dishes by Main Ingredient </Text>
                                </View>
                            </ImageBackground>

                        </View>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Restaurants")}>
                    <View style={styles.Restaurants}>

                        <View style={styles.ResContainer}>

                            <ImageBackground style={styles.Res} source={{ uri: "https://files.oaiusercontent.com/file-JCpSlSVQogkvRgDHFdBTwWI3?se=2024-09-22T16%3A53%3A52Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D1a572ae7-316b-40b8-9f5b-e5e3a67a7771.webp&sig=5eIE8XY0NQYpsB28RsRcjNmJJ3osSa%2B7tCt5w29waXo%3D" }}>
                                <View style={styles.ResTextContainer}>
                                    <Text style={styles.RandomText}>Find Restaurants Nearby. </Text>
                                </View>
                            </ImageBackground>

                        </View>

                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    RandomMeal: {
        height: 150,
        width: width - 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        marginLeft: 15,
        marginTop: 20,
        borderRadius: 15,
        borderColor: "grey",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    imgContainer: {
        height: 150,
        width: width - 30,
        borderRadius: 15,
        overflow: 'hidden',
    },
    img: {
        height: 150,
        width: width - 30,
        borderRadius: 15,

    },
    TextContainer: {
        backgroundColor: 'rgba(0,0.5,0.5,0.5)',
        height: 50,
        width: width - 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DAE0E2',
        //borderWidth: 1,
        marginTop: 100,
        //borderBottomWidth: 1,
        //borderLeftWidth: 1
    },
    Restaurants: {
        height: 800,
        width: width - 30,
        alignItems: 'center',
        ml: 15,
    }
    ,
    ResContainer: {
        height: 600,
        width: width - 30,
        borderRadius: 15,
        overflow: 'hidden',
        marginTop: 30,
        marginLeft: 25
    },
    Res: {
        height: 600,
        width: width - 30,
        borderRadius: 15,

    },
    ResTextContainer: {
        backgroundColor: 'rgba(0,0.5,0.5,0.5)',
        height: 50,
        width: width - 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DAE0E2',
        //borderWidth: 1,
        marginTop: 550,
        //borderBottomWidth: 1,
        //borderLeftWidth: 1
    },


})