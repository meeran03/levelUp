import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet,I18nManager} from 'react-native';
import Panel from '../../component/Panel';
import Input from '../../component/Input';
import MyButton from '../../component/MyButton';
import {Config} from '../../Config';
import {Lng,Lng2} from '../../Language';
import {showMessage} from 'react-native-flash-message';

export default class Remember extends React.Component{
    lan = I18nManager.isRTL ? Lng : Lng2;
    state = {
        email   : null,
        spinner : false
    }
    async _forgetPassword(){
        if(this.state.email == null || this.state.email == '')
            return;

        this.setState({spinner:true});
        let content = await fetch(Config.url + '/api/v' + Config.version + '/user/remember', {
            method  : 'POST',
            headers : {
                'Accept'        : 'application/json',
                'Content-Type'  : 'application/json'
            },
            body    : JSON.stringify({
                email   : this.state.email
            })
        });
        content = await content.json();
        if(content && content.status == '1'){
            showMessage({
                message : this.lan.send_successfully,
                type    : 'success'
            });
            this.setState({email:null})
        }else{
            if(content){
                showMessage({
                    message : content.error,
                    type    : 'danger'
                })
            }
        }
        this.setState({spinner:false});
    }

    render(){
        let lan = I18nManager.isRTL ? Lng : Lng2;
        return(
            <ScrollView style={style.body}>
                <View style={{flex: 1,verticalAlign:'center',height:'auto',alignItems:'center', justifyContent:'center'}}>
                    <Panel style={{width:'100%',height:'auto',justifyContent:'center'}} cardStyle={{padding:25,paddingTop:20,paddingBottom:30}}>
                        <Text style={{alignSelf:'center',fontSize:20,fontFamily:'robotobold'}}>{Lng.recover}</Text>
                        <View style={{height:5}}/>
                        <Text style={{alignSelf:'center',fontSize:14,fontFamily:'robotolight',color: Config.grayColor}}>{lan.simply_email}</Text>
                        <View style={{height:30}}/>
                        <Input onChangeText={(t)=>{this.setState({email:t})}} value={this.state.email} icon={'mail'} placeholder={lan.email_ph} label={lan.Email_address}/>
                        <View style={{height:40}}/>
                        <MyButton onPress={()=>{this._forgetPassword()}} label={lan.Send}/>
                    </Panel>
                    <View style={{height:20}}/>
                    <Text>Your problem solved?</Text>
                    <View style={{height:10}}/>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}}><Text style={{fontFamily:'robotobold', fontSize:17}}>{lan.Back_to_Login}</Text></TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

let style = StyleSheet.create({
    body:{
        flex:1,
        padding:20,
        backgroundColor:Config.background,
    }
});
