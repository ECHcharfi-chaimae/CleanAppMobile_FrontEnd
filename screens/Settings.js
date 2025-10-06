import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { images, COLORS } from '../constants';
import Input from '../components/Input';
import TimePicker from '../components/TimePicker';
import { Switch } from 'react-native';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useAuth } from '../context/authContext';

const Settings = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState({ "full_name": "", "image": "", "phone": "", "mail": "", "description": "" });
  const [imagep, setImagep] = useState({});
  const [yesornot, setYesornot] = useState("not");
  const auth = useAuth();

  const [workflow, setWorkflow] = useState([{
    "id_wf": "",
    "day": "",
    "wf_from": "",
    "wf_to": "",
    "statut": ""
  }]);

  useEffect(() => {
    axios.get(`http://192.168.1.108:8080/api/Employees/${auth.phone}`)
      .then(response => {
        setData(response.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    axios.get(`http://192.168.1.108:8080/api/Employees/${auth.phone}`)
      .then(response => {
        setWorkflow(response.data.workflow)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const UpdateToBD = (data) => {
    let objectToDataBase = new FormData();
    let objectToDataBase1;
    objectToDataBase.append("full_name", data.full_name);
    objectToDataBase.append("mail", data.mail);
    objectToDataBase.append("description", data.description);

    axios.put(`http://192.168.1.108:8080/api/Employees/${auth.phone}/update`, objectToDataBase).then(res => {
      console.log("updatedEmployee")
      if (yesornot == "yes") {
        let imageToU = new FormData();
        imageToU.append('image', {
          uri: imagep.uri,
          name: imagep.uri.split("/").pop(),
          type: 'image/jpg',
        });
        console.log(data.image)
        axios.put(`http://192.168.1.108:8080/api/Employees/${auth.phone}/update/image`, imageToU).then(resp => {
          if (Object.keys(resp.data).length > 0) {
            console.log("resdara : ", resp.data.image)
            setTimeout(() =>
              setData({
                ...data,
                ["image"]: resp.data.image,
              }), 1000
            );
          }
          console.log("updatedImage")
        });
      }

      console.log(data.image)
      workflow.map((val, key) => {
        objectToDataBase1 = new FormData();
        objectToDataBase1.append("wf_from", val.wf_from != null ? val.wf_from : "00:00:00");
        objectToDataBase1.append("wf_to", val.wf_to != null ? val.wf_to : "00:00:00");
        objectToDataBase1.append("statut", val.statut);
        axios.put(`http://192.168.1.108:8080/api/Workflow/${val.id_wf}/update`, objectToDataBase1).then(res => {
          console.log("updatedWorkflow")
        }).catch(function (error) {
            console.log(error.message);
          })
      });

    }).catch(function (error) {
        console.log(error.message);
      });
  }

  const testfunction = (data, texts, index = -1, setData) => {
    if (index >= 0) {
      const newData = [...data];
      const newData1 = [...data];
      if (data[index][texts] == "on") {

        newData[index][texts] = "off";
        newData[index]["wf_from"] = "00:00:00";
        newData[index]["wf_to"] = "00:00:00";
        setData(newData);
      }
      else {
        newData1[index][texts] = "on";
        setData(newData1);
      }
    }
  };

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });

    setImagep(pickerResult)
    setYesornot("yes")

  };

  if (selectedImage !== null) {

    return (

      <View style={[styles.container, { flexDirection: "column" }]}>
        <View style={styles.containerSup} >

          <View style={{ flexDirection: 'row' }} >

            <View style={styles.containerMenu}>
              <Image
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
                source={require('../assets/retour.png')}
              />
            </View>
            <View style={styles.containerLogo1}>
              <Image
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
                source={require('../assets/logo_droit.png')}
              />
            </View>
          </View>


        </View>
        <View style={styles.containerList} >
          <View style={styles.containerLogoList}>
            <Image
              style={{ width: 200, height: 110 }}
              resizeMode="contain"
              source={require('../assets/logo_centre2.png')}
            />
          </View>
          <View style={styles.containerLogo}>

            <Image
              style={{ height: 60, width: 60, borderRadius: 40 }}
              resizeMode="cover"
              source={{ uri: selectedImage.localUri }}
            />

          </View>
          <View style={{ marginTop: -20, marginLeft: 45 }}>
            <TouchableOpacity onPress={openImagePickerAsync}>
              <Image
                style={{ height: 20, width: 20, borderRadius: 40 }}
                resizeMode="cover"
                source={images.plus}

              />
              <Text>Choose an image</Text>
            </TouchableOpacity >
          </View>
          <ScrollView>
            <View style={styles.containerForm}>
              <Input label="Full name" name="full_name" data={data} setData={setData} />
              <Input label="Phone" name="phone" data={data} setData={setData} />
              <Input label="Email" name="mail" data={data} setData={setData} />
              <Input label="Description" name="description" data={data} setData={setData} multiline />
              <Text style={styles.containerTitre}>WorkFlow</Text>
              {workflow.map((val, key) => {
                return (
                  <View key={key}>
                    <View style={styles.containerJour} >
                      <View style={{ justifyContent: 'center' }}>
                        <Switch
                          trackColor={{ false: "#767577", true: COLORS.darkBlue }}
                          thumbColor={val.statut == "on" ? "white" : "white"}
                          ios_backgroundColor="#3e3e3e"
                          value={val.statut == "on" ? true : false}
                          style={{ transform: [{ scaleX: .75 }, { scaleY: .5 }] }}
                          onChange={() => { testfunction(workflow, "statut", key, setWorkflow) }}
                        />
                      </View>
                      <View style={{ justifyContent: 'center', width: "25%" }}>
                        <Text style={{ color: COLORS.gray }} >{val.day}</Text>
                      </View>
                      <TimePicker data={workflow} texts="wf_from" index={key} setData={setWorkflow} />
                      <TimePicker data={workflow} texts="wf_to" index={key} setData={setWorkflow} />
                    </View>
                  </View>
                );
              })}

            </View>
            <View style={{ marginTop: 50, width: 100, height: 110, marginLeft: "30%" }}>
              <Button onPress={() => UpdateToBD(data)} text="Save" bgColor={COLORS.darkBlue} colors={COLORS.white} />
            </View>


          </ScrollView>
        </View>

      </View>

    );
  }

  return (
    <View style={[styles.container, { flexDirection: "column" }]}>
      <View style={styles.containerSup} >

        <View style={{ flexDirection: 'row' }} >

          <View style={styles.containerMenu}>
            <Image
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
              source={require('../assets/retour.png')}
            />
          </View>


          <View style={styles.containerLogo1}>
            <Image
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
              source={require('../assets/logo_droit.png')}
            />
          </View>
        </View>


      </View>
      <View style={styles.containerList} >
        <View style={styles.containerLogoList}>
          <Image
            style={{ width: 200, height: 110 }}
            resizeMode="contain"
            source={require('../assets/logo_centre2.png')}
          />
        </View>
        <View style={styles.containerLogo}>

          <Image
            style={{ height: 60, width: 60, borderRadius: 40 }}
            resizeMode="cover"
            source={{ uri: `http://192.168.1.108:8080/uploads/${data.image}` }}
          />

        </View>
        <View style={{ marginTop: -20, marginLeft: 45 }}>
          <TouchableOpacity onPress={openImagePickerAsync}>
            <Image
              style={{ height: 20, width: 20, borderRadius: 40 }}
              resizeMode="cover"
              source={images.plus}

            />
            <Text>Choose an image</Text>
          </TouchableOpacity >
        </View>
        <ScrollView>
          <View style={styles.containerForm}>
            <Input label="Full name" name="full_name" data={data} setData={setData} />
            <Input label="Email" name="mail" data={data} setData={setData} />
            <Input label="Description" name="description" data={data} setData={setData} multiline />

            <Text style={styles.containerTitre}>WorkFlow</Text>

            {workflow.map((val, key) => (
              <View key={key}>
                <View style={styles.containerJour} >
                  <View style={{ justifyContent: 'center' }}>
                    <Switch
                      trackColor={{ false: "#767577", true: COLORS.darkBlue }}
                      thumbColor={val.statut == "on" ? "white" : "white"}
                      ios_backgroundColor="#3e3e3e"
                      value={val.statut == "on" ? true : false}
                      style={{ transform: [{ scaleX: .75 }, { scaleY: .5 }] }}
                      onChange={() => { testfunction(workflow, "statut", key, setWorkflow) }}
                    />
                  </View>
                  <View style={{ justifyContent: 'center', width: "25%" }}>
                    <Text style={{ color: COLORS.gray }} >{val.day}</Text>
                  </View>
                  <TimePicker data={workflow} texts="wf_from" index={key} setData={setWorkflow} />
                  <TimePicker data={workflow} texts="wf_to" index={key} setData={setWorkflow} />
                </View>
              </View>
            )
            )}
          </View>
          <View style={{ marginTop: 50, width: 100, height: 110, marginLeft: "30%" }}>
            <Button onPress={() => UpdateToBD(data)} text="Save" bgColor={COLORS.darkBlue} colors={COLORS.white} />
          </View>
        </ScrollView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerJour: {
    flexDirection: 'row',
    height: 30,
    width: '90%',

  },
  containerTitre: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  containerMenu: {
    flex: 1,
    marginTop: 50,
    marginLeft: 20,
  },
  containerLogo1: {
    marginTop: 50,
    marginRight: 10,
  },
  containerForm: {
    marginTop: 10,
  },
  containerLogoList: {
    alignItems: 'center',
    position: 'absolute',
    top: -55,
    left: "28%",
  },
  containerList: {
    flex: 5,
    position: 'relative',
    backgroundColor: "#EBF6FF",
    paddingLeft: 30,
    paddingTop: 15,
    borderRadius: 40,
  },
  containerLogo: {
    width: 300,
    height: 50,
    alignItems: 'center',
    flexDirection: "row",
  },
  containerSup: {
    flex: 1,
    zIndex: 2,
    elevation: 2,
  },
});

export default Settings;
