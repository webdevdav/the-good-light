import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen';
import ConnectScreen from '../screens/ConnectScreen';
import DeviceControlScreen from '../screens/DeviceControlScreen';
import Colors from '../constants/Colors';

const LightsNavigator = createStackNavigator(
    {
        WelcomeScreen: WelcomeScreen,
        ConnectScreen: ConnectScreen,
        DeviceControlScreen: DeviceControlScreen
    },
    {
        // initialRouteName: "Categories" // starting screen
        // mode:"modal" // screen slides from bottom up
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor:
                    Platform.OS === 'android' ? Colors.primaryColor : ''
            },
            headerTintColor:
                Platform.OS === 'android' ? 'white' : Colors.primaryColor,
            headerTitle: 'A Screen' // Will be overwritten if spcific title is given in the screen
        }
    }
);

export default createAppContainer(LightsNavigator);
