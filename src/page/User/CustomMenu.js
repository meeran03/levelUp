import React from 'react';
import {FlatList, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import { StyleSheet, TouchableOpacity,I18nManager } from 'react-native';
import {Config} from '../../Config';
import {Lng,Lng2} from '../../Language';


export default class Menu extends React.Component{
    lan = I18nManager.isRTL ? Lng : Lng2;
    state = {
        menus : [
            {index:2,icon:'user', text:this.lan.User,route:Lng2.User},
            {index:3,icon:'file-text', text:this.lan.News,route:Lng2.News},
            {index:4,icon:'grid', text:this.lan.Category,route:Lng2.Category},
            {index:5,icon:'home', text:this.lan.Home,route:Lng2.Home}
        ]
    }
    render(){
        return(
            <View>
                <Text style={{marginHorizontal:10,fontSize :22,color:Config.secondaryColor,
                            marginTop:40,fontWeight:'bold'
                            }}>{this.lan.customMenuText}</Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flexDirection : I18nManager.isRTL ? 'row' : 'row-reverse',
                        alignItems : 'flex-end',
                        alignContent : "flex-end"
                    }}
                    horizontal={true}
                    data={this.state.menus}
                    renderItem={({item})=>{
                    return (
                        <TouchableOpacity activeOpacity={1} onPress={()=>{this.props.navigation.navigate(item.route)}}>
                            <View style={Style.item}>
                                <Icon size={19} containerStyle={Style.itemIcon} color={Config.customColor} name={item.icon} type={'feather'}/>
                                <Text style={Style.itemText}>{item.text}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}/>
            </View>
        )
    }
}

const Style = StyleSheet.create({
    item: {
        backgroundColor: Config.primaryColor,
        width: 'auto',
        height: 50,
        margin: 5,
        padding: 18,
        paddingTop:15,
        borderRadius: 5,
        elevation:2,
        alignItems : 'center',
        alignContent : 'center',
        paddingHorizontal : 30,
        margin : 10
    },
    itemIcon:{
        position:'absolute',
        left: 15,
        top:15
    },
    itemText:{
        paddingLeft : I18nManager.isRTL ? 0: 19,
        paddingRight : I18nManager.isRTL ? 19: 0,
        fontFamily:'robotobold',
        color: Config.customColor,
        textAlignVertical : 'center'
    }
})
