import React, { useState } from "react";
import {
   View,
   StyleSheet,
   Button,
   TouchableWithoutFeedback,
   Keyboard,
   Alert,
   Dimensions,
   ScrollView,
   KeyboardAvoidingView,
   Switch,
   Text
} from "react-native";
import BodyText from "../components/BodyText";
import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/Colors";
import MainButton from "../components/MainButton";

const ConnectScreen = props => {
   const [enteredIPorDNS, setEnteredIPorDNS] = useState("");
   const [connection, setConnection] = useState(false);
   const [deviceProps, setDeviceProps] = useState({});
   const [https, setHttps] = useState(false);

   const buttonWidth = Dimensions.get("window").width / 4;
   let connectionStatus;
   let preUrl = https ? "https://" : "http://";
   const resetInputHandler = () => {
      setEnteredIPorDNS("");
   };

   const securityHandler = () => {
      setHttps(!https);
   };

   const confirmInputHandler = () => {
      fetch(preUrl + enteredIPorDNS + "/variables")
         .then(response => {
            if (response.status === 200) {
               return response.json();
            }
         })
         .then(json => {
            setDeviceProps(json);
         })
         .then(() => setConnection(true))
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
         });

      Keyboard.dismiss();
   };

   if (connection) {
      connectionStatus = (
         <Card style={styles.summaryContainer}>
            <BodyText>{"Name: " + deviceProps.name}</BodyText>
            <BodyText>{"Hardware: " + deviceProps.hardware}</BodyText>
            <BodyText>{"ID: " + deviceProps.id}</BodyText>
            <MainButton
               onPress={() => {
                  setConnection(false);
                  props.navigation.navigate({
                     routeName: "DeviceControlScreen",
                     params: {
                        device: deviceProps,
                        url: preUrl + enteredIPorDNS
                     }
                  });
               }}
            >
               Go
            </MainButton>
         </Card>
      );
   } else {
      connectionStatus = null;
   }

   return (
      <ScrollView>
         <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
            <TouchableWithoutFeedback
               onPress={() => {
                  Keyboard.dismiss();
               }}
            >
               <View style={styles.screen}>
                  <Card style={styles.inputContainer}>
                     <BodyText>IP or DNS</BodyText>
                     <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalization="none"
                        autoCorrect={false}
                        onChangeText={input => setEnteredIPorDNS(input)}
                        value={enteredIPorDNS}
                     />
                     <View style={styles.switchContainer}>
                        <Text>HTTPS</Text>
                        <Switch onValueChange={securityHandler} value={https} />
                     </View>
                     <View style={styles.buttonContainer}>
                        <View style={{ width: buttonWidth }}>
                           <Button
                              color={Colors.accent}
                              title="Reset"
                              onPress={resetInputHandler}
                           />
                        </View>
                        <View style={{ width: buttonWidth }}>
                           <Button
                              color={Colors.primary}
                              title="Connect"
                              onPress={confirmInputHandler}
                           />
                        </View>
                     </View>
                  </Card>
                  {connectionStatus}
               </View>
            </TouchableWithoutFeedback>
         </KeyboardAvoidingView>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      padding: 10,
      alignItems: "center"
   },
   buttonContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      paddingHorizontal: 15
   },
   inputContainer: {
      width: "80%",
      minWidth: 300,
      maxWidth: "95%",
      alignItems: "center"
   },
   title: {
      fontSize: 20,
      marginVertical: 10,
      fontFamily: "open-sans-bold"
   },
   input: {
      width: "80%",
      textAlign: "center"
   },
   summaryContainer: {
      margin: 20,
      alignItems: "center"
   },
   switchContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
   }
});
ConnectScreen.navigationOptions = {
   headerTitle: "Connect"
};

export default ConnectScreen;
