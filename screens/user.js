import React, { useState } from 'react';
import { StyleSheet, Alert, Text, View, Image, Button, Animated, TouchableOpacity, ScrollView } from 'react-native';
import Titre from '../components/Titre'
import { icons, images, FONTS, COLORS, SIZES } from '../constants';
import Botton from '../components/Button';
import List from './list';



const User = ({ navigation }) => {

  return (
    <View style={styles.container}>

      <View style={styles.header1}>

        <View style={styles.containerMenu}>
          <Image style={{ width: 30, height: 30 }}
            resizeMode="contain"
            source={icons.menu}
          />
        </View>

      </View>

      <View style={styles.header2}>
        <View style={styles.containerLogoList}>
          <Image style={{ width: 70, height: 70, borderRadius: 600, marginLeft: 55 }}
            resizeMode="cover"
            source={images.user1}
          />
        </View>

        <View style={styles.h}>

          <View style={styles.button} >
            <Botton onPress={() => console.log('button pressed!')} >
              my Articles
            </Botton>

            <TouchableOpacity>
              <Image
                source={icons.plus}
                style={{ width: 30, height: 30, marginLeft: 5, tintColor: "#2196F3" }}
              />
            </TouchableOpacity>
          </View>

          <Titre>MESTOUR CHAYMAE</Titre>
          <View >
            <Text style={{ color: COLORS.textGray }}><Image style={{
              width: 12, height: 12, tintColor: "#FFFFFF"
            }}
              resizeMode="contain"
              source={icons.phone}
            /> 0623509207</Text>

            <Text style={{ color: COLORS.textGray }}><Image style={{ width: 12, height: 12, tintColor: "#FFFFFF" }}
              resizeMode="contain"
              source={icons.email}
            /> mestour@gmail.com</Text>

          </View>
        </View>

        <View style={styles.Description}>
          <Titre>Description</Titre>
          <Text style={{ color: COLORS.textGray }}>Note that we have set the box-sizing property to border-box. This makes sure that the padding and eventually borders are included in the total width and height of the elements.
            Read more about the box-sizing property in our CSS Box Sizing chapter.</Text>
          <Titre>Planning</Titre>

        </View>

        <View style={styles.Plan}>

          <List />
        </View>
      </View>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: "column",
    marginTop: 20,
  },
  header1: {
    //flexDirection: "column",
    // flex: 1,
    zIndex: 2,
    //flexDirection: 'row',
    marginTop: 20,
    //backgroundColor: "rgba(66, 179, 255, 0.12)",
    // justifyContent: 'center',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    //height:50,
    // alignItems: 'center',

  },
  header2: {
    flexDirection: "column",
    //  flex: 1,
    //flexDirection: 'row',
    //marginTop:400,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "relative",
    //height:50,
    // alignItems: 'center',


  },
  h: {

    alignItems: 'center',
    //flex:1,MARGIN TOP
    width: 400,
    height: 170,
    // marginTop:-500,
    //backgroundColor: "#f13a59",

  },
  Description: {
    // flex:3,
    width: 350,
    //height: 170,
    // backgroundColor: "#f13a59",
    marginTop: 10,
    //height:180,
    // marginTop:-500,
    marginLeft: 25,
    flexDirection: "column",
  },
  Plan: {
    //height: 600,
    marginTop: 10
    // alignItems: 'center',

    //backgroundColor: "#f13a59",

  },
  jour: {

    //   width: 100,
    height: 20,
    marginLeft: -60,
    //justifyContent: 'center',
    //marginTop:6,
    //flexDirection: 'row',
    // backgroundColor: "#f13a59",

  },


  containerMenu: {
    width: 50,
    height: 50,
    marginTop: 20,
    marginLeft: 20,
  },

  containerLogo: {
    width: 300,
    height: 50,
    backgroundColor: 'white',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogoList: {
    //marginTop:30,
    top: -30,
    position: 'absolute',
  },
  button: {
    marginTop: 38,
    marginLeft: 200,
    flexDirection: 'row',

  },
  date: {
    width: 250,
    height: 35,
    //marginLeft:,
    //marginTop:-10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: "#FFF",
    borderRadius: 30,
    marginBottom: 10,


  },
  B: {
    width: 250,
    height: 35,
    marginLeft: 500,
    //marginTop:-10,
    justifyContent: 'space-around',
    //  alignItems:'center',
    flexDirection: 'row',
    backgroundColor: "#FFF",
    borderRadius: 30,
    marginBottom: 10,


  },
  date2: {
    //width: 220,
    // height: 35,
    //marginLeft:,
    //marginTop:-10,
    // justifyContent: 'center',
    // flexDirection: 'row',
    //backgroundColor: "rgba(66, 179, 255, 0.12)",
    //borderRadius: 30,
    //marginBottom: 10,

  },


});

export default User;