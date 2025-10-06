import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import icons from '../constants/icons';
import { COLORS, FONTS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ServiceOfferFavorite({ item, services, navigation, data, setData }) {

    const [addedToFavorite, setAddedToFavorite] = useState(true);
    const [favoriteListHelp, setFavoriteListHelp] = useState(null);
    const [favoriteList, setFavoriteList] = useState(null);


    const storeData = async (key, value) => {
        console.log("im in stor  data" + JSON.stringify(value))
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.log('storeData : Error');
        }
    }

    const getData = async (key, setter) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            if (jsonValue !== null) {
                setter(JSON.parse(jsonValue))
            }
        } catch (e) {
            console.log('getData : Error');
        }
    }

    const favorite = () => {
        setAddedToFavorite(false)
        getData('@favoriteList', setFavoriteListHelp);  
    }

    useEffect(() => {
        console.log("help => " + JSON.stringify(favoriteListHelp))

        if (!addedToFavorite) {
            if (favoriteListHelp !== null) {
                let test = { test: (delete favoriteListHelp[`${item.id_ser}`], favoriteListHelp) };
                setFavoriteList(test.test)
                // setFavoriteList(... {"2":"2"});
            }
            else {
                setFavoriteList({});
            }
        }

    }, [favoriteListHelp])

    useEffect(() => {
        console.log("list" + JSON.stringify(favoriteList))
        if (favoriteListHelp !== null){
            storeData('@favoriteList', favoriteList)
            setData(data.filter(d => d.id_ser !== item.id_ser))
        }
    }, [favoriteList])

    return (
        <View style={styles.container}>
            {/*  image */}




            <View style={styles.imageContainer}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.push("itemDetail", item)}
                >
                    <ImageBackground style={{ flex: 1 }} source={{ uri: `http://192.168.1.108:8080/uploads/${item.image1}` }}>
                    </ImageBackground>
                    {/* source={item.image1}> */}
                </TouchableOpacity>

            </View>


            {/* right panel */}
            <View style={styles.infoContainer}>

                <View style={{ height: 30, flexDirection: "row", justifyContent: 'space-between' }}>

                    <View >
                        <Text style={{ ...FONTS.title }}> {item.service_name} </Text>
                    </View>

                    <TouchableOpacity style={{
                        width: 28,
                        height: 28,
                        marginTop: 3,
                        marginRight: 5
                    }} onPress={() => favorite()}
                    >

                        <View style={{
                            width: 28,
                            height: 28,
                            flexDirection: "row",
                            borderRadius: 50,
                            backgroundColor: addedToFavorite ? COLORS.green : COLORS.gray,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        >
                            <Image
                                style={{ tintColor: "#fff", position: 'relative', height: "70%", width: "70%", alignSelf: 'center' }}
                                source={icons.heart}>
                            </Image>
                        </View>
                    </TouchableOpacity>



                </View>
                <View >
                    <Text style={{ ...FONTS.desc2, paddingLeft: 10 }}> {services[parseInt(item.service_parent) - 1].title.replace("\n", " ")} </Text>
                </View>

                {/* descreption */}
                <View style={{ flex: 1, paddingLeft: 10 }}>
                    <Text style={{ ...FONTS.desc3, color: COLORS.textGray }}>
                        {item.description}
                    </Text>
                </View>
                <View style={{ height: 30, width: 80, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ ...FONTS.title, color: COLORS.textBlue }}>
                        {item.prix} DH
                    </Text>
                </View>


            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        borderRadius: 20,
        alignSelf: 'center',
        width: "90%",
        height: 120,
        flexDirection: "row",
    },
    imageContainer: {
        width: 120,

    },
    infoContainer: {
        backgroundColor: "#fff",
        flex: 1,

    }
})
export default ServiceOfferFavorite;