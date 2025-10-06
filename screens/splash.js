import React from 'react';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { icons } from '../constants';

function Splash() {

    return (
        <View style={{
            flex: 1,
        }}>
            <View style={{
                overflow: 'hidden',
                width: "100%",
                height: "100%",
                position: 'absolute',
                borderTopLeftRadius: 400,
                borderBottomLeftRadius: 400,
                backgroundColor: 'transparent'
            }}>
                <View />
                <LinearGradient
                    colors={['rgba(109, 195, 255, .2)', 'rgba(109, 195, 255,.6)']}
                    style={{ width: "100%", height: "100%" }}
                >
                </LinearGradient>
            </View>

            <View style={{
                overflow: 'hidden',
                width: "100%",
                height: "100%",
                position: 'absolute',
                borderTopRightRadius: 400,
                borderBottomRightRadius: 400,
                backgroundColor: 'transparent'
            }}>
                <View />
                <LinearGradient
                    colors={['rgba(109, 195, 255,.6)', 'rgba(109, 195, 255, .2)']}
                    style={{ width: "100%", height: "100%" }}
                >
                </LinearGradient>
            </View>

            <View style={{
                position: 'relative',
                bottom: -600,
                alignSelf: 'center',
                alignItems: 'center'

            }}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={{
                    color: "#fff"
                }}>
                    version 1.0
                </Text>
            </View>

            <Image
                resizeMode="contain"
                style={{

                    position: 'relative',
                    alignSelf: 'center',
                    top: "40%",
                    tintColor: "#fff",
                    width: 250,
                    height: 100,
                    zIndex: 100,
                }} source={icons.cleanAppLogo} 
            />

        </View>
    );
}

export default Splash;