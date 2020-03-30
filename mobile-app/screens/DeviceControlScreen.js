import React, { useState } from "react";
import { View, Text, StyleSheet, Slider } from "react-native";

const DeviceControlScreen = props => {
   const device = props.navigation.getParam("device");
   const url = props.navigation.getParam("url");
   const [value, setValue] = useState(device.licht);

   const changeValueHandler = lightValue => {
      fetch("http://" + url + "/value?params=" + lightValue)
         .then(response => {
            if (response.status === 200) {
               return response.json();
            }
         })
         .then(json => {
            setValue(lightValue);
            console.log(json);
         })
         .catch(err => {
            setConnection(false);
            Alert.alert(
               "Connection failed!",
               "Input has to be a valid IP address or a DNS name",
               [
                  {
                     text: "Okay",
                     style: "destructive"
                  }
               ]
            );
            console.log("Fehler: " + err);
         });
   };
   return (
      <View style={styles.container}>
         <Text style={styles.title}>{device.name}</Text>
         <Text style={styles.title}>{value}</Text>
         <Text style={styles.title}>{url}</Text>
         <Slider
            onValueChange={value => changeValueHandler(value)}
            style={{ width: 200, height: 40 }}
            value={device.licht}
            minimumValue={0}
            maximumValue={255}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
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
DeviceControlScreen.navigationOptions = {
   headerTitle: "Good Light"
};
export default DeviceControlScreen;
