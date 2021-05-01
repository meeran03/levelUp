import React from 'react';
import {View,I18nManager, TextInput, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {Config} from '../Config';

export default class Input extends React.Component{
    render(){
        return(
            <View style={this.props.style}>
                <Text style={style.text}>{this.props.label}</Text>
                <View style={style.inputContainer}>
                    <Icon style={style.inputIcon} color={Config.grayColor} size={24} name={this.props.icon} type={'feather'}/>
                    <TextInput style={{paddingHorizontal:5}} placeholderTextColor={Config.grayColor}  placeholder={this.props.placeholder} value={this.props.value} secureTextEntry={this.props.password} onChangeText={this.props.onChangeText} />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
   text : {
       fontFamily: 'robotobold'
   },
    inputContainer:{
       alignItems:'center',
        marginTop:6,
        //borderBottomWidth: 2,
        backgroundColor: '#f7f7f7',
        paddingBottom:3,
        flexDirection:'row' ,
        width : '100%',
        borderRadius: 5,

        //justifyContent : "flex-end",
        paddingHorizontal : 8
    },
    inputIcon: {
        //alignSelf : "flex-end",
        paddingHorizontal: 8,

    }
});
