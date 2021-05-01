import React from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    ScrollView,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    AsyncStorage, Modal,I18nManager
} from 'react-native';
import {getProduct, userData} from '../../Functions';
import Video from 'react-native-video';
import {Config} from '../../Config';
import MyWeb from '../../component/MyWeb';
import {Avatar, Button, ButtonGroup, Card, Header, Icon, Input} from 'react-native-elements';
import Crasoual from '../../component/Crasoual';
import StarRating from 'react-native-star-rating/StarRating';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {showMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import {Lng,Lng2} from '../../Language';

export default class ProductView extends React.PureComponent{
    lan = I18nManager.isRTL ? Lng : lan2;
    state = {
        modalSupport    : false,
        modalComment    : false,
        modalBuy        : false,
        product         : undefined,
        token           : null,
        tabIndex        : 1,
        spinnerComment  : false,
        spinnerSupport  : false,
        spinnerBuy      : false,
    }
    async componentDidMount(): void {
        let id = this.props.route.params.id;
        let data = await getProduct(id);
        this.setState({product:data});

        let user = await userData();
        if(user['token'] != undefined){
            this.setState({token:user['token']});
        }

        console.log(this.state.product.buy);
    }

    _openCommentModal = () => {
        if(this.state.token == null) {
            showMessage({
                message : this.lan.please_login,
                type    : 'danger'
            })
            return;
        }else{
            this.setState({modalComment:true});
        }
    }
    _openBuyModal = () => {
        if(this.state.token == null) {
            showMessage({
                message : this.lan.please_login,
                type    : 'danger'
            })
            return;
        }else{
            this.setState({modalBuy:true});
        }
    }
    _openSupportModal = () => {
        if(this.state.token == null) {
            showMessage({
                message : this.lan.please_login,
                type    : 'danger'
            });
            return;
        }else{
            if(this.state.product.buy == '1'){
                this.setState({modalSupport:true});
            }else{
                showMessage({
                    message : this.lan.purchase_first,
                    type    : 'danger'
                })
                return;
            }
        }
    }

    async _sendComment(){
        if(this.state.commentTxt == undefined || this.state.commentTxt == ''){
            this.refs.message.showMessage(this.lan.write_a_review_first);
            return;
        }

        this.setState({spinnerComment:true});
        let result = await fetch(Config.url + '/api/v' + Config.version + '/product/comment',{
            method  : 'POST',
            headers : {
                'Accept'        : 'application/json',
                'Content-Type'  : 'application/json'
            },
            body    : JSON.stringify({
                token   : this.state.token,
                secret  : Config.secret,
                id      : this.state.product.id,
                comment : this.state.commentTxt
            })
        });

        result = await result.json();
        this.setState({spinnerComment:false});
        if(result != undefined && result.status == '1'){
            this.setState({modalComment:false});
            showMessage({
                message : this.lan.successfully_done,
                type    : 'success'
            });
        }else{
            this.refs.message.showMessage(result.error);
        }

    }
    async _sendSupport(){}


    _renderTabs = () => {
        let lan = I18nManager.isRTL ? Lng : Lng2;
        if(this.state.tabIndex == 0){
            return (
                <MyWeb style={{backgroundColor:Config.background}} html={this.state.product['content']}/>
            )
        }
        if(this.state.tabIndex == 1){
            return(
                <View style={{flex:1}}>
                <FlatList
                    data={this.state.product['parts']}
                    renderItem={({item, index})=>{
                        return(
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Part')}}>
                                <View style={style.partContainer}>
                                    <View style={{width:'80%',flex:1,flexDirection:'row'}}>
                                        {(item['free'] == 1 || this.state.product.buy == 1)?<Icon style={style.partContainerIcon} name={'play-circle'} type={'feather'}/>:<Icon style={style.partContainerIcon} name={'lock'} type={'feather'}/>}
                                        <Text style={style.partContainerText}>0{index+1}. {item['title']}</Text>
                                    </View>
                                    <View style={{width:'20%',alignItems:'flex-end'}}>
                                        <Text style={{fontFamily:'robotolight',color:Config.grayColor}}>{item.duration}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                <View style={{height:100}}/>
                </View>
            )
        }
        if(this.state.tabIndex == 2){
            return(
                <View>
                    <FlatList data={this.state.product.comments} renderItem={({item})=>{
                        return(
                            <Card containerStyle={{borderRadius:10,marginTop:0,marginBottom:8}}>
                                <Text style={{fontFamily:'robotobold'}}>{item.user}</Text>
                                <View style={{height:5}}/>
                                <Text style={{fontFamily:'robotolight',color:'#adadad'}}>{item.comment}</Text>
                            </Card>
                        )
                    }}/>
                    <View style={{height:100}}/>
                </View>
            )
        }
    }
    _renderButton = () => {
        let lan = I18nManager.isRTL ? Lng : Lng2;
        if((this.state.tabIndex == 0 || this.state.tabIndex == 1) && this.state.product.buy == '0'){
            return (
                <View style={{position:'absolute',height:60, width:'100%',bottom:0,backgroundColor:'#fff',elevation:10}}>
                    <Button title={lan.enroll_on_the_course} containerStyle={{width:'80%',alignSelf:'center',paddingTop:10}} buttonStyle={{backgroundColor:Config.secondaryColor,borderRadius:25}} onPress={()=>{this._openBuyModal()}}/>
                </View>
            )
        }
        if(this.state.tabIndex == 2){
            return (
                <View style={{position:'absolute',height:60, width:'100%',bottom:0,backgroundColor:'#fff',elevation:10}}>
                    <Button title={lan.write_a_review} onPress={()=>{this._openCommentModal()}} containerStyle={{width:'80%',alignSelf:'center',paddingTop:10}} buttonStyle={{backgroundColor:Config.secondaryColor,borderRadius:25}}/>
                </View>
            )
        }
        if(this.state.tabIndex == 3){
            return (
                <View style={{position:'absolute',height:60, width:'100%',bottom:0,backgroundColor:'#fff',elevation:10}}>
                    {this.state.product.support == '1'?
                        <Button onPress={()=>{this._openSupportModal()}} title={lan.send_support_massage} containerStyle={{width:'80%',alignSelf:'center',paddingTop:10}} buttonStyle={{backgroundColor:Config.secondaryColor,borderRadius:25}}/>
                        :
                        <Button title={lan.support_is_disabled} containerStyle={{width:'80%',alignSelf:'center',paddingTop:10}} buttonStyle={{backgroundColor:Config.grayColor,borderRadius:25}}/>
                    }
                </View>
            )
        }
    }

    _render = () => {
        let lan = I18nManager.isRTL ? Lng : Lng2;

        if(this.state.product == undefined){
            return (<View style={{flex:1,justifyContent:'center'}}><ActivityIndicator/></View>)
        }else{
            return(
                <View style={{flex:1, backgroundColor: Config.background}}>
                    <Header
                        containerStyle={{height:60}}
                        backgroundColor={Config.primaryColor}
                        leftComponent={<Icon name='ios-arrow-back' color='black' type='ionicon' onPress={()=>{this.props.navigation.goBack();}} />}
                        leftContainerStyle={{bottom:14,left:14}}
                        centerComponent={{text:this.state.product.title,numberOfLines:1,style:{color:'black',fontFamily:'robotobold'}}}
                        centerContainerStyle={{bottom:13}}
                    />
                    <ScrollView>
                        <Video
                        paused={true}
                        fullscreenAutorotate={true}
                        controls={true}
                        source={{uri: Config.url+'/'+this.state.product['sample']}}
                        //poster={Config.url+this.state.product['cover']}
                        posterResizeMode={'cover'}
                        style={{flex:1,height:240,backgroundColor:'#000'}}
                    />
                        <View style={{padding:13}}>
                            <Text style={{fontFamily:'robotobold',fontSize:18}}>{this.state.product.title}</Text>
                            <View style={style.detailsContainer}>
                                <Icon name={'clock'} type={'feather'} color={Config.grayColor} style={style.detailsIcon}/>
                                <Text style={style.detailsText}>{this.state.product['duration']} Min | {this.state.product.category.title}</Text>
                            </View>
                            <View style={{height:10}}/>
                            <View style={{borderBottomWidth:1,borderBottomColor:'#E1E1E4',paddingBottom:5,flex:1,flexDirection:'row'}}>
                                <View style={{width:'75%',height:'auto'}}>
                                    <Text style={{fontFamily:'robotobold',color:Config.greenColor,fontSize:17}}>{this.state.product.currency}{this.state.product.price}</Text>
                                </View>
                                <View style={{width:'25%',height:'auto'}}>
                                    <StarRating disabled={true} starSize={15} containerStyle={{top:6}} starStyle={{color:Config.goldenColor}} rating={this.state.product.rates} maxStars={5}/>
                                </View>
                            </View>
                            <View style={{height:15}}/>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <View style={{width:'70%'}}>
                                    <Avatar size={'medium'} title={'PA'} rounded={true} source={{uri:this.state.product.user.avatar}}/>
                                    <Text style={{fontFamily:'robotoregular',position:'absolute', left: 70,top:15}}>{this.state.product.user.name}</Text>
                                </View>
                                <View style={{width:'30%'}}>
                                    <Button onPress={()=>{this.props.navigation.navigate('Profile',{id:this.state.product.user.id})}} title={lan.profile} titleStyle={{fontSize:12,color:Config.secondaryColor}} buttonStyle={{backgroundColor:'transparent',borderColor:Config.secondaryColor,borderWidth:2,borderRadius:20,padding:0,paddingTop:5,paddingBottom:5}} containerStyle={{top:8}}/>
                                </View>
                            </View>
                        </View>
                        <SegmentedControlTab
                            values={[lan.details, lan.lessons, lan.comments,lan.support]}
                            onTabPress={(index)=>{this.setState({tabIndex:index})}}
                            selectedIndex={this.state.tabIndex}
                            firstTabStyle={{borderRadius:0,borderBottomLeftRadius:0}}
                            tabsContainerStyle={{padding:15}}
                            tabStyle={{borderWidth:0,backgroundColor:'transparent',borderRadius:0,padding:24,borderBottomWidth:2,borderBottomColor:'transparent',paddingLeft:10,paddingRight:10}}
                            tabTextStyle={{paddingBottom:5,fontFamily:'robotobold',fontSize:14,color:Config.grayColor}}
                            activeTabStyle={{borderBottomWidth:2,backgroundColor:'transparent',borderBottomColor:Config.primaryColor}}
                            activeTabTextStyle={{color:Config.primaryColor}}
                            lastTabStyle={{borderBottomRightRadius:0}}
                        />
                        <View>
                        {this._renderTabs()}
                        </View>
                </ScrollView>
                    {this._renderButton()}
                    <Modal onRequestClose={()=>{this.setState({modalComment:false})}} visible={this.state.modalComment}>
                        <View style={{flex:1, backgroundColor: Config.background}}>
                            <Header
                                containerStyle={{height:60}}
                                backgroundColor={Config.customColor}
                                leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={()=>{this.setState({modalComment:false})}} />}
                                leftContainerStyle={{bottom:10}}
                                centerComponent={{text:lan.write_a_review,numberOfLines:1,style:{color:'#fff',fontFamily:'robotobold'}}}
                                centerContainerStyle={{bottom:9}}
                            />
                            <Input onChangeText={(txt)=>{this.setState({commentTxt:txt})}} multiline={true} scrollEnabled={true} containerStyle={{height:'100%',width:'100%',borderWidth:0,flex:1}} inputContainerStyle={{borderBottomWidth:0}} placeholder={lan.leave_comment}/>
                            <View style={{elevation:4,flex:1, flexDirection:'row',position:'absolute',width:'100%',height:60,bottom:0,left:0,backgroundColor:'#fff'}}>
                                <View style={{width:'100%',paddingTop:10}}>
                                    <Button onPress={()=>{this._sendComment()}} title={lan.Send} buttonStyle={{width:'80%',alignSelf:'center',backgroundColor:Config.secondaryColor,borderRadius:20}}/>
                                </View>
                            </View>
                        </View>
                        <FlashMessage ref={'message'}/>
                        <Spinner visible={this.state.spinnerComment}/>
                    </Modal>
                    <Modal onRequestClose={()=>{this.setState({modalSupport:false})}} visible={this.state.modalSupport}>
                        <View style={{flex:1, backgroundColor: Config.background}}>
                            <Header
                                containerStyle={{height:60}}
                                backgroundColor={Config.primaryColor}
                                leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={()=>{this.setState({modalSupport:false})}} />}
                                leftContainerStyle={{bottom:10}}
                                centerComponent={{text:lan.support,numberOfLines:1,style:{color:'#fff',fontFamily:'robotobold'}}}
                                centerContainerStyle={{bottom:9}}
                            />
                            <Input onChangeText={(txt)=>{this.setState({supportTxt:txt})}} multiline={true} scrollEnabled={true} containerStyle={{height:'100%',width:'100%',borderWidth:0,flex:1}} inputContainerStyle={{borderBottomWidth:0}} placeholder={lan.leave_comment}/>
                            <View style={{elevation:4,flex:1, flexDirection:'row',position:'absolute',width:'100%',height:60,bottom:0,left:0,backgroundColor:'#fff'}}>
                                <View style={{width:'100%',paddingTop:10}}>
                                    <Button onPress={()=>{this._sendSupport()}} title={lan.support} buttonStyle={{width:'80%',alignSelf:'center',backgroundColor:Config.secondaryColor,borderRadius:20}}/>
                                </View>
                            </View>
                        </View>
                        <FlashMessage ref={'message'}/>
                        <Spinner visible={this.state.spinnerSupport}/>
                    </Modal>
                    <Modal onRequestClose={()=>{this.setState({modalBuy:false})}} visible={this.state.modalBuy}>
                        <View style={{flex:1, backgroundColor: Config.background}}>
                            <Header
                                containerStyle={{height:60}}
                                backgroundColor={Config.primaryColor}
                                leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={()=>{this.setState({modalBuy:false})}} />}
                                leftContainerStyle={{bottom:10}}
                                centerComponent={{text:lan.enroll_on_the_course,numberOfLines:1,style:{color:'#fff',fontFamily:'robotobold'}}}
                                centerContainerStyle={{bottom:9}}
                            />
                            <View style={{elevation:4,flex:1, flexDirection:'row',position:'absolute',width:'100%',height:60,bottom:0,left:0,backgroundColor:'#fff'}}>
                                <View style={{width:'100%',paddingTop:10}}>
                                    <Button onPress={()=>{}} title={lan.pay} buttonStyle={{width:'80%',alignSelf:'center',backgroundColor:Config.secondaryColor,borderRadius:20}}/>
                                </View>
                            </View>
                        </View>
                        <FlashMessage ref={'message'}/>
                        <Spinner visible={this.state.spinnerBuy}/>
                    </Modal>
                </View>
            )
        }
    }
    render(){
        return(
            this._render()
        )
    }
}

let style = StyleSheet.create({
    detailsContainer:{
        padding: 10,
        margin: 0,
        flex:1,
        alignItems:'flex-start',
        position: 'relative',
        backgroundColor:'transparent',
        borderWidth:0,
        elevation:0,
    },
    detailsIcon:{
        position:'absolute',
        left:0,
    },
    detailsText:{
        position: 'absolute',
        left:36,
        top:12,
        color: 'gray'
    },
    partContainer:{
        flex:1,
        flexDirection:'row',
        height:48,
        backgroundColor: 'transparent',
        marginTop:2,
        padding:10,
        alignItems: 'flex-start',
        paddingLeft: 15,
        paddingRight: 15,
    },
    partContainerIcon:{
        position:'absolute',
        left:0
    },
    partContainerText:{
        position:'absolute',
        fontFamily:'robotolight',
        left:36,
        top: 3
    }
});
