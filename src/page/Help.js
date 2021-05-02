import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {Config} from '../Config';
import {AsyncStorage, Image,I18nManager} from 'react-native';
import {Lng,Lng2} from '../Language';

export default class Help extends React.Component{
    lan = I18nManager.isRTL ? Lng : Lng2
    state = {
        pages : [
            {
                backgroundColor: Config.onboarding1Color,
                image: <Image style={{height:300,width:300}} source={require('../../assets/img/slide1.jpeg')} />,
                title: this.lan.onboarding1,
                subtitle: this.lan.onboarding1_sub
            },
            {
                backgroundColor: Config.onboarding2Color,
                image: <Image style={{height:300,width:300}} source={require('../../assets/img/slide2.jpeg')} />,
                title: this.lan.onboarding2,
                subtitle: this.lan.onboarding2_sub
            },
            {
                backgroundColor: Config.onboarding3Color,
                image: <Image style={{height:300,width:300}} source={require('../../assets/img/slide3.jpeg')} />,
                title: this.lan.onboarding3,
                subtitle: this.lan.onboarding3_sub
            },
            {
                backgroundColor: Config.onboarding3Color,
                image: <Image style={{height:300,width:300}} source={require('../../assets/img/slide4.jpeg')} />,
                title: this.lan.onboarding4,
                subtitle: this.lan.onboarding4_sub
            },
        ]
    }

    async goToRoute(){
        await AsyncStorage.setItem('help','1');
        this.props.navigation.navigate('Route');
    }

    render(){
        console.log(I18nManager.isRTL)
        return(
            <Onboarding
                pages={this.state.pages}
                onDone={()=>{
                    this.goToRoute();
                }}
                onSkip={()=>{
                    this.goToRoute();
                }}
                nextLabel={I18nManager.isRTL ? "اﻟﺘﺎﱄ" : 'Next'}
                skipLabel={I18nManager.isRTL?"ﺗﺨﻄﻲ" : "Skip"}
            />
        )
    }
}
