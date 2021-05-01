import React from 'react';
import {View, ActivityIndicator, StyleSheet, Image, AsyncStorage} from 'react-native';
import {getData, returnData} from '../Functions';

export default class Splash extends React.Component{

    async componentDidMount(){
        let data = await getData();
        if(data) {
            await AsyncStorage.getItem('help').then((help) => {
                console.log(help);
                if(help == '1') {
                    this.props.navigation.navigate('Route');
                }else{
                    this.props.navigation.navigate('Help');
                }
            });
        }
    }

    render() {
        return (
           <View style={{flex:1,justifyContent: 'center',alignItems:'center',backgroundColor:'white'}}>
               <Image style={{flex:1,resizeMode:'contain',width:300,height:300}} source={require('../../assets/img/logo.jpeg')}/>
                   <ActivityIndicator color={'lightblue'} style={style.loading}/>
           </View>
        );
    }
}

let style = StyleSheet.create({
    loading:{
        position:'absolute',
        bottom:18,
        left:0,
        right:0
    }
})
