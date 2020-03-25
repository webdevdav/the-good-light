import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/Colors';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';

const ConnectScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [connection, setConnection] = useState(false);
    const [buttonWidth, setButtonWidth] = useState(
        Dimensions.get('window').width / 4
    );

    const resetInputHandler = () => {
        setEnteredValue('');
    };

    const confirmInputHandler = () => {
        fetch(enteredValue)
            .then(response =>
                response.status === 200
                    ? setConnection(true)
                    : Alert.alert(
                          'Connection failed!',
                          'Input has to be a valid IP address or a DNS name',
                          [
                              {
                                  text: 'Okay',
                                  style: 'destructive'
                                  //  onPress: resetInputHandler
                              }
                          ]
                      )
            )
            .catch(err => {
                setConnection(false);
                Alert.alert(
                    'Connection failed!',
                    'Input has to be a valid IP address or a DNS name',
                    [
                        {
                            text: 'Okay',
                            style: 'destructive'
                            //   onPress: resetInputHandler
                        }
                    ]
                );
            });

        Keyboard.dismiss();
    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    let connectionStatus;

    if (connection) {
        connectionStatus = (
            <Card style={styles.summaryContainer}>
                <BodyText>Status</BodyText>
                <NumberContainer>{'Connected'}</NumberContainer>
                <MainButton onPress={() => {}}>Go to lamp</MainButton>
            </Card>
        );
    } else {
        connectionStatus = null;
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={30}
            >
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
                                onChangeText={input => setEnteredValue(input)}
                                value={enteredValue}
                            />
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
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    inputContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    input: {
        width: '80%',
        textAlign: 'center'
    },
    summaryContainer: {
        margin: 20,
        alignItems: 'center'
    }
});
ConnectScreen.navigationOptions = {
    headerTitle: 'Connect'
};

export default ConnectScreen;
