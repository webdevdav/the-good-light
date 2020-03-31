import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const WelcomeScreen = props => {
   return (
      <View style={styles.container}>
         <Text style={styles.title}>Welcome to the good Light!</Text>
         <Button
            title="Connect a Device"
            onPress={() => {
               props.navigation.replace({
                  routeName: "ConnectScreen"
               });
            }}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
   },
   title: {
      fontSize: 24,
      fontFamily: "open-sans-bold"
   }
});
WelcomeScreen.navigationOptions = {
   headerTitle: "Good Light"
};

export default WelcomeScreen;
