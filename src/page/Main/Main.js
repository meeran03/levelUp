import React from 'react';
import {View, ScrollView, Text, ActivityIndicator, Modal, FlatList, TouchableOpacity, StyleSheet,I18nManager} from 'react-native';
import Slider from '../../component/Slider';
import Crasoual from '../../component/Crasoual';
import {returnData,userData} from '../../Functions';
import {Card, Header, Icon, Image} from 'react-native-elements';
import SearchHeader from 'react-native-search-header';
import {Config} from '../../Config';
import Product from '../../component/Product';
import FastImage from 'react-native-fast-image';
import {Lng,Lng2} from '../../Language';
import CustomMenu from '../User/CustomMenu'

export default class Main extends React.PureComponent{

    state = {
        q           : null,
        search      : null,
        data        : null,
        modalSearch : false,
        user        : null
    }

    async componentDidMount(): void {
        this.setState({data : await returnData()});
        let user = await userData();
        this.setState({user:user});
        console.log("User is : ",this.state.user)
    }
    async search(query){
        this.setState({search:null});
        if(query.nativeEvent.text == null || query.nativeEvent.text == ''){
            return;
        }
        let content = await fetch(Config.url + '/api/v' + Config.version + '/product/search?q='+ query.nativeEvent.text);
        content = await content.json();
        if(content != undefined && content.status == '1'){
            this.setState({search:content.data});
        }
    }
    _render = () =>{
        let lan = I18nManager.isRTL ? Lng : Lng2
        if(this.state.data == null)
            return(
                <View style={{flex:1, justifyContent:'center'}}>
                    <ActivityIndicator/>
                </View>
            )
        else
            return(
                <View style={{flex:1}}>
                    <Header
                        containerStyle={{height:60}}
                        backgroundColor={Config.customColor}
                        rightComponent={<Icon name='search' color='black' type='feather' onPress={()=>{this.setState({modalSearch:true})}} />}
                        rightContainerStyle={{bottom:16,right:14}}
                        leftComponent={<Icon name='menu' color='black' type='feather' onPress={() => this.props.navigation.openDrawer()} />}
                        leftContainerStyle={{bottom:16,left:14}}
                        centerComponent={
                            <Image source={require('../../../assets/img/logo.jpeg')} style={{resizeMode:"contain",width:100,height:50}} 
                            />
                        }
                        centerContainerStyle={{bottom:13}}
                        
                    />
                    <ScrollView style={{flex:1,backgroundColor:'#eaeaea'}}>
                        <Text 
                            style={{marginHorizontal:10,fontSize :22,color:Config.secondaryColor,
                            marginVertical:20,fontWeight:'bold'
                            }}>
                            {lan.welcome}
                        </Text>
                        <Text style={{marginHorizontal:10,fontSize :20,color:'grey',marginVertical:-10}}>{lan.welcomeSub}</Text>
                        <CustomMenu navigation={this.props.navigation}/>
                        <Crasoual navigation={this.props.navigation} data={this.state.data.content.new} title={lan.newest_courses}/>
                        <Crasoual navigation={this.props.navigation} data={this.state.data.content.vip} title={lan.featured_courses}/>
                        <Crasoual navigation={this.props.navigation} data={this.state.data.content.popular} title={lan.most_popular_courses}/>
                        <Crasoual navigation={this.props.navigation} data={this.state.data.content.sell} title={lan.most_viewed_courses}/>
                        <View style={{height:220,marginTop:10}}>
                            {/* <Slider navigation={this.props.navigation} data={this.state.data.content.slider} ids={this.state.data.content.slider_id}/> */}
                        </View>
                        { this.state.user &&  ( 
                        <Card  style={{marginBottom : 20}} containerStyle={{justifyContent: 'center',alignItems : "center"}}>
                            <FastImage style={Style.img} source={require('../../../assets/img/custom.jpg')}/>
                            <Text style={{textAlign : 'center',marginTop:20}} >{lan.customText}</Text>
                            <View style={{flexDirection :'row',justifyContent : 'space-between',marginVertical: 20}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('User',{screen : "Register"})} style={{paddingHorizontal :20,borderRightColor : 'grey',borderRightWidth:0.5}}>
                                    <Text style={{color:Config.primaryColor,fontSize : 18}}>{lan.register}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('User',{screen : "Login"})} style={{paddingHorizontal :20,borderLeftColor : 'grey',borderLeftWidth:0.5}}>
                                    <Text style={{color:Config.primaryColor,fontSize : 18}}>{lan.Login}</Text>
                                </TouchableOpacity>
                            </View>
                        </Card>)
                        } 
                        <View style={{marginVertical : 20}}/>
                    </ScrollView>
                    <Modal animationType={'slide'} visible={this.state.modalSearch} onRequestClose={()=>{this.setState({modalSearch:false})}}>
                        <View style={{flex:1,backgroundColor:Config.background}}>
                            <SearchHeader
                                refs={'searchHeader'}
                                placeholder={lan.search}
                                placeholderColor ={Config.grayColor}
                                autoFocus={true}
                                onEnteringSearch={(txt)=>{this.setState({q:txt})}}
                                onSearch={(t)=>{this.search(t)}}
                                headerBgColor={Config.headerBgColor}
                                iconColor={'#fff'}
                                inputColor={'gray'}
                                visibleInitially={true}
                            />
                            {this.state.search == null ?
                                <ActivityIndicator style={{marginTop:150,alignSelf:'center'}}/>
                                :
                                <FlatList data={this.state.search} style={{marginTop:70,marginBottom:0}} renderItem={({item})=>{
                                    return(
                                        <TouchableOpacity onPress={()=>{this.setState({modalSearch:false});this.props.navigation.navigate('Product',{id:item.id})}}>
                                            <Card containerStyle={Style.container}>
                                                <FastImage style={Style.image} source={{uri:item.thumbnail}}/>
                                                <View style={Style.text}>
                                                    <Text numberOfLines={1} style={{fontFamily:'robotobold',fontSize:17,color:Config.sectionsColor}}>{item.title}</Text>
                                                    <Text style={{color:Config.greenColor,marginTop:10,fontSize:17}}>{item.currency}{item.price}</Text>
                                                    <Text style={{color:Config.grayColor,marginTop:10,fontSize:17}}>{item.duration}</Text>
                                                </View>
                                            </Card>
                                        </TouchableOpacity>
                                    )
                                }}/>
                            }
                        </View>
                    </Modal>
                </View>
            )
    }

    render() {
        return (
            this._render()
        );
    }
}

const Style = StyleSheet.create({
    container:{
        flex: 1,
        height:105,
        borderRadius:8,
        padding:0,
        margin:10,
        marginBottom:13,
        marginTop:0,
        elevation:5
    },
    image:{
        position:'absolute',
        left:-1,
        top:0,
        width:140,
        height: 105,
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8
    },
    text:{
        marginLeft:150,
        top: 10,
    },
    img : {
        width:140,
        height: 105,
        resizeMode : 'contain',
        alignSelf : 'center'
    }
})

