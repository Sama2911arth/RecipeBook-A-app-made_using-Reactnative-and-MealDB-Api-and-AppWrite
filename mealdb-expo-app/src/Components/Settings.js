// src/screens/Settings.js
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Switch, Divider, Avatar, Button } from 'react-native-paper';

const Settings = ({ navigation }) => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);

    const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
    const toggleNotifications = () => setIsNotificationsEnabled(!isNotificationsEnabled);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileSection}>
                <Avatar.Image size={80} source={{ uri: 'https://via.placeholder.com/80' }} />
                <Button mode="contained" onPress={() => navigation.navigate('Profile')}>
                    Edit Profile
                </Button>
            </View>
            <Divider />
            <List.Section>
                <List.Subheader>Preferences</List.Subheader>
                <List.Item
                    title="Dark Theme"
                    left={() => <List.Icon icon="theme-light-dark" />}
                    right={() => (
                        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
                    )}
                />
                <List.Item
                    title="Notifications"
                    left={() => <List.Icon icon="bell" />}
                    right={() => (
                        <Switch value={isNotificationsEnabled} onValueChange={toggleNotifications} />
                    )}
                />
            </List.Section>
            <Divider />
            <List.Section>
                <List.Subheader>Account</List.Subheader>
                <List.Item
                    title="Change Account"
                    left={() => <List.Icon icon="lock" />}
                    onPress={() => navigation.navigate('Signup')}
                />
                <List.Item
                    title="Logout"
                    left={() => <List.Icon icon="logout" />}
                    onPress={() => navigation.navigate('Signup')}
                />
            </List.Section>
        </ScrollView>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    profileSection: {
        alignItems: 'center',
        padding: 16,
    },
});