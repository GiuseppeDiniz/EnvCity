import React, {Component} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Animated} from 'react-native';
import { View, Text} from './Themed';

import { AntDesign, Ionicons, FontAwesome, Entypo } from '@expo/vector-icons'

export default class FabButton extends Component<any>{
    //toggle menu animation
    animation = new Animated.Value(0);    
    toggleMenu = () =>{
        const toValue =  this.open ? 0 : 1;
        Animated.spring(this.animation,{
            toValue,
            friction: 6,
            useNativeDriver: true,
        }).start();

        this.open = !this.open;
    };open: any;

    //submenu extend animation
    extendAnimation = new Animated.Value(0);
    
    label = () =>{        
        const toValue =  this.extend ? 0 : 1;
        Animated.spring(this.extendAnimation,{
            toValue,
            friction: 6,
            useNativeDriver: true,
        }).start();

        this.extend = !this.extend;        
    };extend: any;

    render(){

        const gear = {
            transform:[
            {scale: this.animation},
            {
                translateY: this.animation.interpolate({
                    inputRange: [0,1],
                    outputRange: [0,-140]
                })
            }
            ]
        }

        const question = {
            transform:[
            {scale: this.animation},
            {
                translateY: this.animation.interpolate({
                    inputRange: [0,1],
                    outputRange: [0,-70]
                })
            }
            ]
        }

        // extends ---------------------------------------

        const green = {
            transform:[
            {scale: this.extendAnimation},
            {
                translateX: this.animation.interpolate({
                    inputRange: [0,1],
                    outputRange: [0,20]
                })
            }
            ]
        }
        //--------------------------------------------------

        const rotation ={
            transform:[{
                rotate: this.animation.interpolate({
                    inputRange:[0,1],
                    outputRange:["0deg", "45deg"]
                })
            }]
        }

        return(
            <View style={[styles.container,this.props.style] }>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.button, styles.submenu, gear]}>
                        <Entypo name="globe" size={24} color="white" />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.label}>
                    <Animated.View style={[styles.button, styles.submenu, question]}>
                        <AntDesign name="question" size={20} color="white" />
                    </Animated.View>
                </TouchableWithoutFeedback>
                        
                        <Animated.View style={[styles.extend, green]}>
                            <View style={styles.legenda}></View>
                        </Animated.View>

                <TouchableWithoutFeedback onPress={this.toggleMenu}>
                    <Animated.View style={[styles.button, styles.menu, rotation]}>
                        <AntDesign name='plus' size={24} color='white'/>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        position:"absolute",
    },
    button:{
        position:"absolute",
        width: 60,
        height: 60,
        borderRadius: 60/2,
        justifyContent:'center',
        alignItems:'center',
        shadowRadius: 10,
        shadowColor: "#00213b",
        shadowOpacity: 0.3,
        shadowOffset:{
            height:10,
            width: 0,
        },
    },
    menu:{
        backgroundColor: "#00213b",
    },
    submenu:{
        width: 48,
        height: 48,
        borderRadius: 48/2,
        backgroundColor: "#00213b",
    },
    extend:{
        bottom: 10, 
        left: 8,
        position:"absolute",
        width: 60,
        height: 60,
        justifyContent:'center',
        alignItems:'center',
        shadowRadius: 10,
        shadowColor: "#00213b",
        shadowOpacity: 0.3,
        shadowOffset:{
            height:10,
            width: 0,
        },        
    },
    icon:{
        backgroundColor:'white',
        margin: 1,
    },
    legenda:{
        width: 280,
        height: 100,
        backgroundColor: '#F8F8FF',
        left: 110,
        right: -10,
        elevation: 2,
    }
});