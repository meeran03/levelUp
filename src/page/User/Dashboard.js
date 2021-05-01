import React from 'react';
import {View, ScrollView, StyleSheet, AsyncStorage,I18nManager, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import {Config} from '../../Config';
import Menu from './Menu';
import {Button, Card, Header, Icon, Text} from 'react-native-elements';
import {userData} from '../../Functions';
import {Lng,Lng2} from '../../Language';
import Financial from './Financial/Financial';
import {GoogleSignin} from 'react-native-google-signin'

export default class Dashboard extends React.Component{

    state = {
        user : null
    }

    async _logOut(){
        let value = await AsyncStorage.getItem('google_login');
        if(value == '1') {
            await GoogleSignin.signOut();
        }
        await AsyncStorage.removeItem('user_login');
        await AsyncStorage.removeItem('user');
        this.props.navigation.navigate('Login');
    }

    async componentDidMount(): void {
        let user = await userData();
        this.setState({user:user});
    }

    render(){
        let lan = I18nManager.isRTL ? Lng : Lng2;
        return(
            this.state.user == null?
                <View style={{justifyContent:'center', flex:1, backgroundColor:Config.background}}>
                    <ActivityIndicator/>
                </View>
                :
                this.state.user.vendor == '1'?
                    <View style={{flex:1,backgroundColor:Config.background}}>
                        <Header
                            containerStyle={{height:60,paddingLeft:15,paddingRight:15}}
                            backgroundColor={Config.customColor}
                            leftComponent={<Icon name='log-out' color='black' type='feather' onPress={()=>{this._logOut()}} />}
                            leftContainerStyle={{bottom:14,left: 5}}
                            rightComponent={<Icon name='settings' color='black' type='feather' onPress={()=>{this.props.navigation.navigate('Setting');}} />}
                            rightContainerStyle={{bottom:14, right: 5}}
                            centerComponent={
                            <Image source={require('../../../assets/img/logo.jpeg')} style={{resizeMode:"contain",width:100,height:50}} 
                            />
                            }
                            centerContainerStyle={{bottom:13}}
                        />
                        <View style={{height:10}}/>
                        <Menu navigation={this.props.navigation} vendor={this.state.user.vendor}/>
                        <ScrollView>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <Card containerStyle={[Style.box,{backgroundColor:'#f955c8'}]}>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Financial')}}>
                                        <Text style={Style.boxText}>{lan.new_sales}</Text>
                                        <View style={{height:10}}/>
                                        <Text style={Style.boxCount}>{this.state.user.new_sales}</Text>
                                    </TouchableOpacity>
                                </Card>
                                <Card containerStyle={[Style.box,{backgroundColor:'#33BFFE'}]}>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Financial',{tab:2})}}>
                                    <Text style={Style.boxText}>{lan.Account_charge}</Text>
                                    <View style={{height:10}}/>
                                    <Text style={Style.boxCount}>{this.state.user.currency}{this.state.user.credit}</Text>
                                    </TouchableOpacity>
                                </Card>
                            </View>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <Card containerStyle={[Style.box,{backgroundColor:'#fe7089'}]}>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('TicketList')}}>
                                    <Text style={Style.boxText}>{lan.new_messages}</Text>
                                    <View style={{height:10}}/>
                                    <Text style={Style.boxCount}>{this.state.user.new_messages}</Text>
                                    </TouchableOpacity>
                                </Card>
                                <Card containerStyle={[Style.box,{backgroundColor:'#33E38A'}]}>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('TicketList',{tab:1})}}>
                                    <Text style={Style.boxText}>{lan.new_comment}</Text>
                                    <View style={{height:10}}/>
                                    <Text style={Style.boxCount}>{this.state.user.comments}</Text>
                                    </TouchableOpacity>
                                </Card>
                            </View>
                            <View style={{height:15}}/>
                            <View style={{padding:18}}>
                                <Text style={{fontFamily:'robotobold',fontSize:20,color:Config.sectionsColor}}>{lan.account_summary}</Text>
                                <View style={{height:20}}/>
                                <View style={Style.row}>
                                    <View style={Style.inputWrap}>
                                        <Text style={Style.label}>{lan.today_sales}</Text>
                                    </View>
                                    <View style={Style.inputWrap2}>
                                        <Text style={Style.label2}>{this.state.user.currency}{this.state.user.sell.today}</Text>
                                    </View>
                                </View>
                                <View style={Style.row}>
                                    <View style={Style.inputWrap}>
                                        <Text style={Style.label}>{lan.monthly_sales}</Text>
                                    </View>
                                    <View style={Style.inputWrap2}>
                                        <Text style={Style.label2}>{this.state.user.currency}{this.state.user.sell.month}</Text>
                                    </View>
                                </View>
                                <View style={Style.row}>
                                    <View style={Style.inputWrap}>
                                        <Text style={Style.label}>{lan.total_sale}</Text>
                                    </View>
                                    <View style={Style.inputWrap2}>
                                        <Text style={Style.label2}>{this.state.user.currency}{this.state.user.sell.total}</Text>
                                    </View>
                                </View>
                                <View style={Style.row}>
                                    <View style={Style.inputWrap}>
                                        <Text style={Style.label}>{lan.Ready_to_payout}</Text>
                                    </View>
                                    <View style={Style.inputWrap2}>
                                        <Text style={Style.label2}>{this.state.user.currency}{this.state.user.income}</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                :
                    <View style={{flex:1,backgroundColor:Config.background}}>
                        <Header
                            containerStyle={{height:60,paddingLeft:15,paddingRight:15}}
                            backgroundColor={Config.customColor}
                            leftComponent={<Icon name='log-out' color='black' type='feather' onPress={()=>{this._logOut()}} />}
                            leftContainerStyle={{bottom:14,left: 5}}
                            rightComponent={<Icon name='settings' color='black' type='feather' onPress={()=>{this.props.navigation.navigate('Setting');}} />}
                            rightContainerStyle={{bottom:14, right: 5}}
                            centerComponent={
                            <Image source={require('../../../assets/img/logo.jpeg')} style={{resizeMode:"contain",width:100,height:50}} 
                            />
                            }
                            centerContainerStyle={{bottom:13}}
                        />
                        <View style={{height:10}}/>
                        <Menu navigation={this.props.navigation}/>
                        <ScrollView>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <Card containerStyle={[Style.box,{backgroundColor:'#E359DB'}]}>
                                    <Text style={Style.boxText}>{lan.Courses}</Text>
                                    <View style={{height:10}}/>
                                    <Text style={Style.boxCount}>{this.state.user.courses}</Text>
                                </Card>
                                <Card containerStyle={[Style.box,{backgroundColor:'#33BFFE'}]}>
                                    <Text style={Style.boxText}>{lan.Account_charge}</Text>
                                    <View style={{height:10}}/>
                                    <Text style={Style.boxCount}>{this.state.user.currency}{this.state.user.credit}</Text>
                                </Card>
                            </View>
                            <View style={{height:10}}/>
                            <View style={{padding:18}}>
                                <Text style={{fontFamily:'robotobold',fontSize:20,color:Config.sectionsColor}}>{lan.start_teaching}</Text>
                                <View style={{height:30}}/>
                                <Image style={{alignSelf:'center',width:250,height:250}} source={require('../../../assets/img/become_vendor.png')}/>
                                <View style={{height:40}}/>
                                <Button onPress={()=>{this.props.navigation.navigate('TicketList',{mode:'vendor'})}} title={lan.become_insructor} titleStyle={{fontSize:18,color:'#fff'}} buttonStyle={{backgroundColor:Config.secondaryColor,borderColor:Config.secondaryColor,borderWidth:1,borderRadius:20}} containerStyle={{top:8}}/>
                                <View style={{height:20}}/>
                            </View>

                        </ScrollView>
                    </View>
        )
    }
}

const Style = StyleSheet.create({
    box:{
        borderRadius:15,
        height:120,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    boxText:{
        fontFamily: 'robotobold',
        color:'#fafafa',
        fontSize:16
    },
    boxCount:{
        fontFamily: 'robotobold',
        color:'#fafafa',
        fontSize:16,
        alignSelf:'center'
    },
    row: {
        flex: 1,
        flexDirection: "row",
        paddingLeft: 35,
        paddingRight: 35,
        marginBottom:5
    },
    inputWrap: {
        flex: 1,
        marginBottom: 10
    },
    inputWrap2: {
        flex: 1,
        marginBottom: 10,
        alignItems: 'flex-end'
    },
    label:{
        fontFamily:'robotobold',
    },
    label2:{
        fontFamily:'robotobold',
        color:Config.grayColor
    }
})
