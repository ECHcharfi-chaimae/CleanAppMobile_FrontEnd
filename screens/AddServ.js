import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Img from '../components/Img'
import axios from 'axios';
import { icons, FONTS, COLORS } from '../constants';
import Input from '../components/Input'
import Button from '../components/Button'
import { useAuth } from '../context/authContext';


function AddService({ route, navigation }) {

    const [listImages, setListImages] = useState([])
    const auth = useAuth();
    const [employee,setEmployee] = useState(route.params.employee);

    useEffect(() => {
        if (route["params"] !== undefined)
            setListImages(route.params.data)
    }, [route]);

    useEffect(() => {
        setListImages(listImages)
    }, [listImages]);

    const ImagesList = () => (
        <View
            style={{
                width: 230,
                flexDirection: "row",
                justifyContent: "flex-start",
                flexWrap: "wrap"
            }}
        >
            {listImages.map((image) => (
                <Image
                    key={image.id}
                    source={{ uri: image.uri }}
                    resizeMode="cover"
                    style={{
                        marginTop: 20,
                        width: 60,
                        height: 60,
                        borderRadius: 10,
                        margin: 5
                    }}
                />
            ))}
        </View>
    );

    const [data, setData] = useState({
        "employee": auth.phone,
        "service_name": "",
        "service_parent": "1",
        "prix": "",
        "description": "",
        "statut": "on",
        "image1": "",
        "image2": "",
        "image3": "",
        "image4": "",
        "image5": ""
    });

    const AddServiceToDb = () => {

        let formdata = new FormData();
        formdata.append("employee", data.employee);
        formdata.append("service_name", data.service_name);
        formdata.append("service_parent", data.service_parent);
        formdata.append("prix", data.prix);
        formdata.append("description", data.description);
        formdata.append("city", data.city);
        formdata.append("statut", data.statut);
        formdata.append("image1",
            listImages[0] !== undefined ? {
                uri: listImages[0].uri,
                name: listImages[0].uri.split("/").pop(),
                type: 'image/jpg',
            } : null);

        listImages[1] !== undefined &&
            formdata.append("image2",
                {
                    uri: listImages[1].uri,
                    name: listImages[1].uri.split("/").pop(),
                    type: 'image/jpg',
                }
            );

        listImages[2] !== undefined &&
            formdata.append("image3",
                {
                    uri: listImages[2].uri,
                    name: listImages[2].uri.split("/").pop(),
                    type: 'image/jpg',
                }
            );

        listImages[3] !== undefined &&
            formdata.append("image4",
                {
                    uri: listImages[3].uri,
                    name: listImages[3].uri.split("/").pop(),
                    type: 'image/jpg',
                }
            );

        listImages[4] !== undefined &&
            formdata.append("image5",
                {
                    uri: listImages[4].uri,
                    name: listImages[4].uri.split("/").pop(),
                    type: 'image/jpg',
                }
            );

        axios.post('http://192.168.1.108:8080/api/Services/addService', formdata).then(res => {
            if (res.data === "ok"){
                console.log(res.data);
                navigation.push("Profile")
            }
        }).catch((error) => {
            console.log("error : " + error);
        });
    }


    return (
        <ScrollView>
            <View style={styles.container} >

                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginTop: 50, marginBottom: 20 }}>
                    <Img image={employee.image}/>
                    <Text style={{ ...FONTS.title, paddingLeft: 5 }}>{employee.full_name}</Text>
                </View>

                <View
                    style={{
                        flex: 1,
                        backgroundColor: COLORS.background,
                        alignItems: 'center',
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                        paddingBottom: 30
                    }}
                >

                    <View style={{ marginTop: 20 }}>
                        <Input label="Title" name="service_name" setData={setData} data={data} />
                        <Input label="Price" name="prix" setData={setData} data={data} />
                        <Input label="City" name="city" setData={setData} data={data} />
                        <Input label="Description" name="description" setData={setData} data={data} multiline />

                        <Text>Images</Text>
                        <Text style={{ ...FONTS.desc1, color: COLORS.gray, paddingVertical: 10 }}>P.S : The first picture you choose will be {'\n'}the main one</Text>
                        <Button text="Add images" bgColor={COLORS.skyBlue} onPress={() => navigation.push('imagePicker')} />

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ position: "relative" }}>
                                    <TouchableOpacity style={styles.bout}>
                                        <Image style={{ tintColor: 'gray', marginTop: 15, marginLeft: 16, width: 30, height: 30 }} source={icons.image} />
                                    </TouchableOpacity>
                                </View>
                                <ImagesList />
                            </View>
                        </ScrollView>

                        <View style={{ alignItems: "center", marginTop: 10 }}>
                            <Button text="Send" bgColor={COLORS.skyBlue} onPress={() => { AddServiceToDb() }} width={300} />
                        </View>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        paddingBottom: 50
    },

    bout: {
        marginTop: 20,
        marginLeft: 10,
        width: 60,
        height: 60,
        color: "black",
        backgroundColor: "white",
        borderRadius: 10,
    },

});
export default AddService;