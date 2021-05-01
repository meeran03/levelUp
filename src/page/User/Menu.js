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
            {index:2,icon:'video', text:this.lan.Courses,route:"Courses"},
            {index:3,icon:'bar-chart-2', text:this.lan.Financial,route:"Financial"},
            {index:4,icon:'film', text:this.lan.Channels,route:"Channel"},
            {index:5,icon:'headphones', text:this.lan.support,route:"TicketList"}
        ],
        menusUser : [
            {index:2,icon:'video', text:this.lan.Courses,route:"Courses"},
            {index:3,icon:'bar-chart-2', text:this.lan.Financial,route:"Financial"},
            {index:5,icon:'headphones', text:this.lan.support,route:"TicketList"}
        ]
    }
    render(){
        return(
            <View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flexDirection : I18nManager.isRTL ? 'row' : 'row-reverse',
                        alignItems : 'flex-end',
                        alignContent : "flex-end"
                    }}
                    horizontal={true}
                    data={(this.props.vendor == 1)?this.state.menus:this.state.menusUser}
                    renderItem={({item})=>{
                    return (
                        <TouchableOpacity activeOpacity={1} onPress={()=>{this.props.navigation.navigate(item.route)}}>
                            <View style={Style.item}>
                                <Icon size={19} containerStyle={Style.itemIcon} name={item.icon} type={'feather'}/>
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
        backgroundColor: '#CAD8EF',
        width: 'auto',
        height: 50,
        margin: 5,
        padding: 18,
        paddingTop:15,
        borderRadius: 30,
        elevation:2,
        alignItems : 'center',
        alignContent : 'center',
        paddingHorizontal : 30
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
