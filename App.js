import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/page/Splash';
import Route from './src/page/Route';
import {View, I18nManager} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import Help from './src/page/Help';
import Profile from './src/page/User/Profile';
console.disableYellowBox = true;
import {GoogleSignin,GoogleSigninButton} from 'react-native-google-signin';



const Stack = createStackNavigator();

export default class App extends React.Component{
    componentDidMount() {
        GoogleSignin.configure({
            webClientId : '710646278015-1b9g1d8ni2br2okkcadldroa2sble2kr.apps.googleusercontent.com'
        });
    }
    render() {
        return (
            <View style={{flex:1}}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Splash" options={{headerShown:false}} component={Splash} />
                        <Stack.Screen name="Help" options={{headerShown:false}} component={Help} />
                        <Stack.Screen name="Route"  options={{headerShown:false}} component={Route}  />
                    </Stack.Navigator>
                </NavigationContainer>
                <FlashMessage position="top" />
            </View>
        )

    }
}
