import React, { useState } from "react";
import { View, Text, StyleSheet, Slider } from "react-native";

const DeviceControlScreen = props => {
   const device = props.navigation.getParam("device");
   const url = props.navigation.getParam("url");
   const [pwmValue, setPwmValue] = useState(device.variables.pwmValue);
   const [displayPercent, setDisplayPercent] = useState(
      ((device.variables.pwmValue / 255) * 100).toFixed(0)
   );

   const changeValueHandler = updatedPwmValue => {
      fetch("http://" + url + "/change?params=" + updatedPwmValue);
      setPwmValue(updatedPwmValue);
      const percent = ((updatedPwmValue / 255) * 100).toFixed(0);
      setDisplayPercent(percent);
   };
   return (
      <View style={styles.container}>
         <Text style={styles.title}>{device.name}</Text>
         <Text style={styles.title}>{url}</Text>
         <Text style={styles.title}>{displayPercent + "%"}</Text>

         <Slider
            onValueChange={pwmValue => changeValueHandler(pwmValue)}
            style={{ width: 200, height: 40 }}
            value={pwmValue}
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
   headerTitle: "Connected Device"
};
export default DeviceControlScreen;
