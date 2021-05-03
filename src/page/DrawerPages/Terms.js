import React, { Component } from 'react';
import { View,Image,Text,I18nManager, ScrollView } from 'react-native';
import { Header, Icon, Overlay} from 'react-native-elements';
import {Config} from '../../Config';
import {Lng,Lng2} from '../../Language'


export default function Terms(props) {
    let lan = I18nManager.isRTL ? Lng : Lng2
    return (
      <ScrollView style={{backgroundColor:'white',flex:1}}>
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
            
        <Text  style={{textAlign:"center",paddingVertical:20,fontSize:20}}>{lan.terms}</Text>
        <Image source={require('../../../assets/img/logo.jpeg')} 
            style={{
                resizeMode:"contain",width:200,height:200,
                alignSelf: "center"
            }} />
        <Text style={{fontWeight:'500',fontSize: 20,textAlign:"left",paddingVertical:20,color:Config.primaryColor,paddingHorizontal:10}}>{lan.terms}</Text>
        <Text style={{paddingHorizontal:12,textAlign:'justify',fontSize:15}} >{lan.termsConditions}</Text>
      </ScrollView>
    );
}
