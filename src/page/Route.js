import React from 'react';
import {Text} from 'react-native-elements';
import {View} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Category from './Category/Category';
import Icon from 'react-native-vector-icons/Feather';
import User from './User/User';
import Index from './Main/Index';
import More from './More';
import Article from './Article/Article';
import {Alert, BackHandler} from 'react-native';
import {Config} from '../Config';
import {Lng, Lng2} from '../Language';
import {userLogin} from '../Functions';
import Dashboard from './User/Dashboard';
import PrivacyScreen from '../page/DrawerPages/Privacy'
import TermsScreen from '../page/DrawerPages/Terms'
import {CheckBox} from 'react-native-elements'
import {I18nManager} from 'react-native'
import RNRestart from 'react-native-restart'; // Import package from node modules


const Tab = createBottomTabNavigator();

import { createDrawerNavigator,  DrawerContentScrollView,
    DrawerItemList,DrawerItem } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator()

function myTabs(props) {

    if(!I18nManager.isRTL) return(
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        color = Config.grayColor;
                        if(focused){
                            color = Config.primaryColor;
                        }
                        if(route.name == 'User')
                            return <Icon name="user" size={26} color={color} />;
                        if(route.name == 'News')
                            return <Icon name="file-text" size={26} color={color} />;
                        if(route.name == 'Home')
                            return <Icon name="home" size={26} color={color} />;
                        if(route.name == 'More')
                            return <Icon name="film" size={26} color={color} />;
                        if(route.name == 'Category')
                            return <Icon name="grid" size={26} color={color} />;
                    },
                    tabBarLabel: ({ focused, color, size }) => {
                        color = Config.grayColor;
                        size  = 12;
                        if(focused){
                            color = Config.primaryColor;
                        }
                        return <Text style={{color:color, fontSize: size}}>{route.name}</Text>
                    }
                })}
               tabBarOptions={{
                   activeTintColor: Config.secondaryColor,
                   inactiveTintColor: Config.grayColor,
                   labelStyle:{color:Config.grayColor,fontsize:10},
                   tabStyle:{
                       height:55,paddingTop:5,paddingBottom:10,
                   // flexDirection:I18nManager.isRTL? 'row-reverse' : 'row'
                    },
                    
               }}
            >
                <Tab.Screen options={{
                    tabBarLabel: Lng2.Home,
                    
                }} name={Lng2.Home} data={props.data} component={Index} />
                <Tab.Screen options={{
                    tabBarLabel: Lng2.Category
                }} name={Lng2.Category} component={Category} />
                <Tab.Screen options={{
                    tabBarLabel: Lng2.News
                }} name={Lng2.News} component={Article} />
                <Tab.Screen options={{
                    tabBarLabel: Lng2.User
                }} name={Lng2.User} component={User}/>
                {/* <Tab.Screen name={Lng.More} component={More} /> */}
                </Tab.Navigator>
    )
    else return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    color = Config.grayColor;
                    if(focused){
                        color = Config.primaryColor;
                    }
                    if(route.name == 'User')
                        return <Icon name="user" size={26} color={color} />;
                    if(route.name == 'News')
                        return <Icon name="file-text" size={26} color={color} />;
                    if(route.name == 'Home')
                        return <Icon name="home" size={26} color={color} />;
                    if(route.name == 'More')
                        return <Icon name="film" size={26} color={color} />;
                    if(route.name == 'Category')
                        return <Icon name="grid" size={26} color={color} />;
                },
                tabBarLabel: ({ focused, color, size }) => {
                    color = Config.grayColor;
                    size  = 12;
                    if(focused){
                        color = Config.primaryColor;
                    }
                    return <Text style={{color:color, fontSize: size}}>{route.name}</Text>
                }
            })}
           tabBarOptions={{
               activeTintColor: Config.secondaryColor,
               inactiveTintColor: Config.grayColor,
               labelStyle:{color:Config.grayColor,fontsize:10},
               tabStyle:{
                   height:55,paddingTop:5,paddingBottom:10,
               // flexDirection:I18nManager.isRTL? 'row-reverse' : 'row'
                },
                
           }}
        >
            <Tab.Screen options={{
                tabBarLabel: Lng.User
            }} name={Lng2.User} component={User}/>
            <Tab.Screen options={{
                tabBarLabel: Lng.News
            }} name={Lng2.News} component={Article} />
            <Tab.Screen options={{
                tabBarLabel: Lng.Category
            }} name={Lng2.Category} component={Category} />
            <Tab.Screen options={{
                tabBarLabel: Lng.Home,
                
            }} name={Lng2.Home} data={props.data} component={Index} />



            </Tab.Navigator>
)
}


function CustomDrawerContent(props) {
    const [language,setLanguage] = React.useState('Arabic')
    const chooseLanguage =async(lan) => {
        if (lan == 'Arabic') {
            I18nManager.forceRTL(true);
            RNRestart.Restart();
        }
        else {
            I18nManager.forceRTL(false);
            RNRestart.Restart();
        }
        setLanguage(lan)
    }

    React.useEffect(()=> {
        setLanguage(I18nManager.isRTL ? 'Arabic' : 'English')
    },[]) 

    return(
        <DrawerContentScrollView {...props}>
            <Text style={{textAlign:'center',fontSize : 17,fontWeight:'bold',paddingVertical:20}}>Settings</Text>
            <View style={{marginVertical:20}} />
            <Text style={{fontWeight:'bold',paddingHorizontal:10,fontSize:20}} >Choose Language</Text>
            <View>
                <CheckBox
                    left
                    title='العربية'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={language== 'Arabic' ? true : false}
                    onPress={() => chooseLanguage('Arabic')}
                />
                <CheckBox
                    left
                    title='English'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={language== 'English' ? true : false}
                    onPress={() => chooseLanguage('English')}
                />
            </View>
            <View style={{marginVertical:20}} />
            <Text style={{fontWeight:'bold',paddingHorizontal:10,fontSize:20}} >Others</Text>
            <DrawerItemList {...props} 
                itemStyle= {{
                    //    alignSelf: I18nManager.isRTL ? 'flex-end' : 'flex-start',
                    //    color : "white"
                }}  />
            <DrawerItem 
            inactiveTintColor="#f5e042"
            activeTintColor="#f5e042"
            icon={({ focused, color, size }) => <Icon color={"#f5e042"} size={size} name={'book'} />}            
            style={{textAlign:I18nManager.isRTL ? 'flex-end' : 'flex-start'}} label="About Us" onPress={() => props.navigation.navigate("Help")} />
            <DrawerItem 
            inactiveTintColor='red'
            icon={({ focused, color, size }) => <Icon color={'red'} size={size} name={'phone'} />}        
            style={{textAlign:I18nManager.isRTL ? 'flex-end' : 'flex-start'}} label="Contact Us" 
            onPress={() => props.navigation.navigate("Main",{screen : "User",params : {
                        screen : 'TicketList'
            }})} />
        </DrawerContentScrollView>
    )
}

export default class Route extends React.Component{

    render(){
        let lan = I18nManager.isRTL ? Lng : Lng2;
        return (
            <Drawer.Navigator 
                drawerPosition={I18nManager.isRTL ? 'right':'left'}
                drawerStyle={{
                    width : "100%",
                }}
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                drawerContentOptions={{
                    itemStyle: { marginVertical: 30 },
                }}
            >
                <Drawer.Screen name="Main" component={myTabs} options={{
                drawerLabel: ({ focused, color }) => <Text style={{color : Config.primaryColor}}>{lan.Home}</Text>,
                drawerIcon: ({focused, size}) => (
                    <Icon name="home" size={size} color={Config.primaryColor} />
                ),
                }}/>
                <Drawer.Screen name="Privacy Policy" component={PrivacyScreen} options={{
                drawerLabel: ({ focused, color }) => <Text style={{color : '#fc039d'}}>{lan.Privacy}</Text>,
                drawerIcon: ({focused, size}) => (
                    <Icon name="key" size={size} color={'#fc039d'} />
                ),
                }}/>
                <Drawer.Screen name="Terms and Conditions" component={TermsScreen} options={{
                drawerLabel: ({ focused, color }) => <Text style={{color : 'lightgreen'}}>{lan.terms}</Text>,
                drawerIcon: ({focused, size}) => (
                    <Icon name="file-text" size={size} color={'lightgreen'}  />
                ),
                }}/>
            </Drawer.Navigator>
        )
    }


}
