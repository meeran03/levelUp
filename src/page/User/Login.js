import React from 'react';
import {View, ScrollView, StyleSheet,I18nManager
    , Image, Dimensions, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import {userLogin} from '../../Functions';
import {Lng, Lng2} from '../../Language';
import { Config } from '../../Config';
import Panel from '../../component/Panel';
import Input from '../../component/Input';
import MyButton from '../../component/MyButton';
import Spinner from 'react-native-loading-spinner-overlay';
import { showMessage, hideMessage }from 'react-native-flash-message';
import Dashboard from './Dashboard';
import {Card, Header, Icon, Overlay} from 'react-native-elements';
import {GoogleSignin,GoogleSigninButton,statusCodes} from 'react-native-google-signin';




export default class Login extends React.Component{

    state = {
        spinner : false,
        username: null,
        password: null,
        login   : false,
        visible : false,
        name    : null, 
    }

    async register(){
        if(this.state.username == null
            || this.state.password == null
            || this.state.username == null
            || this.state.name == null
        ){
            showMessage({
                message : Lng.empty_field,
                type    : 'danger'
            });
            return;
        }
        this.setState({spinner:true});
        let result = await fetch(Config.url + '/api/v' + Config.version + '/user/register', {
            method  : 'POST',
            headers : {
                'Accept'        : 'application/json',
                'Content-Type'  : 'application/json'
            },
            body    : JSON.stringify({
                username    : this.state.name,
                password    : this.state.password,
                re_password : this.state.password,
                email       : this.state.username,
                name        : this.state.name
            })
        });
        result = await result.json();
        if(result.status && result.status == '1'){
            showMessage({
                message : result.data.description,
                type    : 'success'
            });
            this.setState({spinner:false});
            this.props.navigation.navigate('Login');
        }
        if(result.status && result.status != '1'){
            showMessage({
                message : "An Entry With this Email Already Exists",
                type    : 'danger'
            })
            await GoogleSignin.signOut();
        }
        this.setState({spinner:false});
    }

    signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const res = await GoogleSignin.signIn();
          //setloggedIn(true);
          console.log("Response from the google : ",res)
          this.setState({
              visible : true,
              username : res.user.email,
              name : res.user.givenName
          })
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            alert('Cancelled');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            alert('Signin in progress');
            // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            alert('PLAY_SERVICES_NOT_AVAILABLE');
            // play services not available or outdated
          } else {
            // some other error happened
            console.log(error)
          }
        }
      };

    handleGoodleSignIn = async() => {
        if(this.state.username == null || this.state.password == null){
            showMessage({
                message : "Username Or Password Empty!",
                type    : "danger"
            });
            return;
        }
        this.setState({spinner:true});
        let content = await fetch(Config.url+'/api/v'+Config.version+'/user/login', {
            method  : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body    : JSON.stringify({
                Secret  : Config.secret,
                username: this.state.username,
                password: this.state.password
            })
        })

        content = await content.json();
        this.setState({spinner:false});
        if(content.status == '1'){
            showMessage({
                message : 'successfully login',
                type    : 'info'
            });
            await AsyncStorage.setItem('user_login','1');
            await AsyncStorage.setItem('google_login','1');
            await AsyncStorage.setItem('user',JSON.stringify(content.data.user));
            this.props.navigation.navigate('Dashboard');
        }
        if(content.status == '-1'){
            this.register();
        }

        this.setState({visible:false})
    } 

    async componentDidMount(): void {

        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            if(await userLogin()){
                this.props.navigation.navigate('Dashboard');
            }
        });
        if(await userLogin()){
            this.props.navigation.navigate('Dashboard');
        }
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    async userLogin(){
        if(this.state.username == null || this.state.password == null){
            showMessage({
                message : "Username Or Password Empty!",
                type    : "danger"
            });
            return;
        }
        this.setState({spinner:true});
        let content = await fetch(Config.url+'/api/v'+Config.version+'/user/login', {
            method  : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body    : JSON.stringify({
                Secret  : Config.secret,
                username: this.state.username,
                password: this.state.password
            })
        })

        content = await content.json();
        console.log(content)
        this.setState({spinner:false});
        if(content.status == '-1'){
            showMessage({
                message : content.error,
                type    : 'danger'
            })
            return;
        }
        if(content.status == '1'){
            showMessage({
                message : 'successfully login',
                type    : 'info'
            });
            await AsyncStorage.setItem('user_login','1');
            await AsyncStorage.setItem('user',JSON.stringify(content.data.user));
            this.props.navigation.navigate('Dashboard');
        }
        this.setState({visible:false})
    }


    _render(){
        let Lan = I18nManager.isRTL ? Lng : Lng2;
        if(this.state.login){
            return <Dashboard/>
        }
        return (<ScrollView style={style.body}>
            <Header
                containerStyle={{height:60}}
                backgroundColor={Config.customColor}
                leftComponent={<Icon name='menu' color='black' type='feather' onPress={() => this.props.navigation.openDrawer()} />}
                leftContainerStyle={{bottom:14,left:14}}
                centerComponent={
                    <Image source={require('../../../assets/img/logo.jpeg')} style={{resizeMode:"contain",width:100,height:50}} 
                    />
                }
                centerContainerStyle={{bottom:13}}
                
            />
            <View style={{flex: 1,verticalAlign:'center',height:'100%',alignItems:'center', justifyContent:'center'}}>
                <View style={{width:'100%',height:'auto',justifyContent:'center',padding:25,paddingTop:20,paddingBottom:30,paddingRight:20}}>
                    <Text style={{fontSize:25,fontFamily:'robotobold',color:Config.sectionsColor}}>{Lan.login}</Text>
                    <View style={{height:5}}/>
                    <Text style={{fontSize:18,fontFamily:'robotolight',color: Config.grayColor}}>{Lan.Start_learning}</Text>
                    <View style={{height:30}}/>
                    <Input icon={'mail'} onChangeText={(usr)=>{this.setState({username:usr})}} placeholder={Lan.Email_address}/>
                    <View style={{height:10}}/>
                    <Input icon={'key'} onChangeText={(psw)=>{this.setState({password:psw})}} password={true} placeholder={Lan.Password}/>
                    <View style={{height:40}}/>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Remember')}}>
                        <Text style={{color:Config.primaryColor,fontSize : 18}}>{Lan.forget_password}</Text>
                    </TouchableOpacity>
                    <View style={{height:20}}/>
                    <MyButton label={I18nManager.isRTL ? 'تسجيل الدخول' : "Login"} onPress={()=>{this.userLogin()}}/>
                </View>
                <View style={{flexDirection:I18nManager.isRTL ?'row-reverse' :'row',alignItems:'center'}}>
                    <View style={{height:20}}/>
                    <Text>{I18nManager.isRTL ? 'ليس لديك حساب بعد؟ ' : "New Here? "}</Text>
                    <View style={{height:10}}/>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Register')}}><Text style={{fontFamily:'robotobold', fontSize:17}}>{Lan.register}</Text></TouchableOpacity>
                    <View style={{height:30}}/>
                </View>
                <View style={{justifyContent:'center',alignItems:"center",alignSelf:'center',paddingTop:20}}>
                    <Text>{I18nManager.isRTL ? 'او المتابعة بحس' : "Other Sign In Options"}</Text>
                    <GoogleSigninButton
                        style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Standard}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={() => this.signIn()} />
                </View>
            </View>
            <Spinner visible={this.state.spinner}/>
            <Overlay
                isVisible={this.state.visible}
                windowBackgroundColor="rgba(28, 161, 255, 0.3)"
                overlayBackgroundColor="white"
                width="70%"
                height="50%"
            >
                <View style={{justifyContent:"center",alignItems:'center',flex:1}}>
                <Text style={{textAlign:'right'}}>Enter Your Password</Text>
                <View style={{height:10}}/>
                <Input icon={'key'} onChangeText={(psw)=>{this.setState({password:psw})}} password={true} placeholder={Lan.Password}/>
                <View style={{height:40}}/>
                <MyButton label={Lan.Login} onPress={()=>{this.handleGoodleSignIn()}}/>
                </View>
            </Overlay>
        </ScrollView>)
    }
    render() {
        return this._render();
    }
}

let style = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:Config.background,
    }
});
