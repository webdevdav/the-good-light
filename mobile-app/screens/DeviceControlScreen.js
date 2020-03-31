import React, { useState } from "react";
import { View, Text, StyleSheet, Slider } from "react-native";
import MainButton from "../components/MainButton";

const DeviceControlScreen = props => {
   const device = props.navigation.getParam("device");
   const url = props.navigation.getParam("url");
   const [pwmValue, setPwmValue] = useState(device.variables.pwmValue);
   const [onOff, setOnOff] = useState(device.variables.onOff);
   const [displayPercent, setDisplayPercent] = useState(
      Math.ceil((device.variables.pwmValue / 255) * 100)
   );

   const changeValueHandler = updatedPwmValue => {
      fetch(url + "/change?params=" + updatedPwmValue);
      setPwmValue(updatedPwmValue);
      const percent = Math.ceil((updatedPwmValue / 255) * 100);
      setDisplayPercent(percent);
   };

   const toggleLightHandler = () => {
      fetch(url + "/toggle");
      setOnOff(!onOff);
   };
   return (
      <View style={styles.container}>
         <Text style={styles.title}>{device.name}</Text>
         <Text style={styles.title}>{url.split("/")[2]}</Text>
         <Text style={styles.title}>{displayPercent + "%"}</Text>
         <Slider
            onValueChange={pwmValue => changeValueHandler(pwmValue)}
            style={{ width: 200, height: 40 }}
            value={pwmValue}
            minimumValue={1}
            maximumValue={255}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
         />
         <MainButton onPress={toggleLightHandler}>
            {onOff ? "Off" : "On"}
         </MainButton>
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
