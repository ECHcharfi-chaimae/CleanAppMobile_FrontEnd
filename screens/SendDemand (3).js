import React, { Component, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import Input from '../Components/Input'
import { icons, FONTS, COLORS } from '../constants'

//import { icons, FONTS, COLORS } from '../constants'
import Button2 from '../Components/Button2'
import Button from '../Components/Button'
import Img from '../Components/Img'
import { Rating } from 'react-native-ratings'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';


function SendDemand() {

  const [data, setData] = useState({
    "employee": { "phone": "0777972026" },
    "service": { "id_ser": "2" },
    "client_name": "",
    "phone": "",
    "adress": "",
    "position_gps": "25654",
    "description": "",
    "date": "",
    "time": "",
    "statut": "acc"

  });

  const [upload, setUpload] = useState();
  const [Add, setAdd] = useState();

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const date = selectedDate || date;
    setShow(Platform.OS === 'ios');
    const newData = { ...data };
    newData.date = date.getUTCFullYear() + "-" + date.getUTCMonth() + 1 + "-" + date.getUTCDate();
    newData.time = date.getHours() + ":" + date.getMinutes() + ":00";
    //setData({date});
    setData(newData);


  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);

  };



  function AddDemand(e) {
    e.preventDefault();
    console.log("hola111");

    axios.post('http://192.168.1.7:8080/api/demandes/add', data).then(res => {
      console.log(res);
      alert("Demand sent successfully");
      console.log("yaaaaa rbi");
    }).catch((error)=>{
      console.log("error"+error);
      console.log(data);
      alert(error.message);
   });

   let time = date.getHours() + " Heures et " + date.getMinutes() + " Minutes";

   let url =
     'whatsapp://send?text=Bonjour! je m\'appelle : ' + data.client_name + ' j\'habite à : ' + data.adress + ' je souhaite réserver ce service pour le jour :' + data.date + ' à ' + time + '&phone=212' + data.employee.phone;
   Linking.openURL(url)
     .then((data) => {
       console.log('WhatsApp Opened');
     })
     .catch(() => {
       alert('Erreur de transmission du message');
     });


  }


 /* const initiateWhatsApp = () => {
  };
*/
  return (

    <ScrollView>
      <View style={styles.container1}>
        <View style={{ flexDirection: "row", marginTop: 50 }} >
          <Img />
          <View>
            <Text style={{ ...FONTS.title, marginTop: 10 }}>Chaimae ECH-CHARFI</Text>
            <Rating imageSize={15} />
            <Text style={{ marginLeft: 20, ...FONTS.title, color: COLORS.skyBlue }}>50 DHs</Text>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: COLORS.background, alignItems: 'center', borderRadius: 20, marginTop: 20, height: '100%' }}>
          <Text style={{ ...FONTS.title, padding: 10 }}> Please fill this form</Text>
        
          <View style={{ marginTop: 30, height: 500 }}>
            <Input label="Full name" name="client_name" data={data} setData={setData} />
            <Input label="Phone number" name="phone" data={data} setData={setData} />

          
              <View style={{ flex: 1 }}>
                <Input style={styles.adresse} label="Adresse" name="adress" data={data} setData={setData} />
              </View>
              
            <Input label="Description" name="description" data={data} setData={setData} multiline />

            <Text style={{ ...FONTS.inputLabel, color: COLORS.gray }}>Appointment</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <TextInput style={styles.test} editable={false}>DATE</TextInput>
              </View>
              <View style={{ flex: 2 }}>
                <Button2 onPress={showDatepicker} value={data.date} />
              </View>
              {show && (
                <RNDateTimePicker
                  value={date}
                  mode={mode}

                  isVisible={data}

                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  style={{ width: 320, backgroundColor: "white" }}
                />
              )}
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <TextInput style={styles.test} editable={false}>TIME</TextInput>
              </View>
              <View style={{ flex: 2 }}>
                <Button2 onPress={showTimepicker} title="hh:ss" value={data.time} />
              </View>
            </View>
            <View style={{ alignItems: "flex-end", marginTop: 30 }}>

              <TouchableOpacity style={styles.wtsp} onPress={AddDemand}>
                <Image style={{ marginLeft: 6, marginTop: 5, width: 20, height: 20, tintColor: "white", }}
                  source={icons.wtsp} />
                <Text style={{ color: COLORS.white, padding: 6, fontWeight: 'bold' }}>
                  Send WhatsApp
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container1: {
    backgroundColor: 'white',
    paddingBottom: 50,
  },
  container2: {
    marginTop: 20,
  },

  adresse: {
    height: 35,
    width: 240,
    color: "black",
    borderColor: 'white',
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 4.65,
    elevation: 6
  },
  localisation: {
    marginTop: 14,
    marginLeft: 120,
    height: 29,
    width: 29,
    color: "black",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 6

  },
  wtsp: {

    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 1,
    width: 160,
    backgroundColor: "#2bb55f",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 4.65,
    elevation: 6

  },
  test: {
    justifyContent: 'flex-start',
    paddingLeft: 28,
    color: "#D8D8D8",
    marginTop: 4,
    height: 35,
    width: 100,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: 'white',
    backgroundColor: "white",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 4.65,
    elevation: 6
  },
});

export default SendDemand;