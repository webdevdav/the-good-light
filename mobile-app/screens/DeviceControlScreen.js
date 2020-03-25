import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DeviceControlScreen = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the good Light!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontFamily: 'open-sans-bold'
    }
});
DeviceControlScreen.navigationOptions = {
    headerTitle: 'Good Light'
};
export default DeviceControlScreen;
