import React, { Component } from 'react';
import { View,Image,Text } from 'react-native';
import { Header, Icon, Overlay} from 'react-native-elements';
import {Config} from '../../Config';
import {Lng} from '../../Language'


export default function Terms(props) {

    return (
      <View style={{backgroundColor:'white',flex:1}}>
            <Header
                containerStyle={{height:60}}
                backgroundColor={Config.customColor}
                rightComponent={<Icon name='menu' color='black' type='feather' onPress={() => props.navigation.openDrawer()} />}
                rightContainerStyle={{bottom:14,right:14}}
                centerComponent={
                    <Image source={require('../../../assets/img/logo.jpeg')} style={{resizeMode:"contain",width:100,height:50}} 
                    />
                }
                centerContainerStyle={{bottom:13}}
            />
            
        <Text  style={{textAlign:"center",paddingVertical:20,fontSize:20}}>Terms and Conditions</Text>
        <Image source={require('../../../assets/img/logo.jpeg')} 
            style={{
                resizeMode:"contain",width:200,height:200,
                alignSelf: "center"
            }} />
        <Text style={{fontWeight:'500',fontSize: 20,textAlign:"left",paddingVertical:20,color:Config.primaryColor,paddingHorizontal:10}}>Terms and Conditions</Text>
        <Text style={{paddingHorizontal:12,textAlign:'justify',fontSize:15}} >{Lng.PrivacyText}</Text>
      </View>
    );
}
