import React, { Component } from 'react';
import { View, Image } from 'react-native'

const Img = ({image}) => {

  return (
    <View>
      <Image
        style={{ width: 60, height: 60, marginLeft: 40, borderRadius: 50, borderColor: '#E8F6FF', borderWidth: 3, }}
        source={{ uri: `http://192.168.1.108:8080/uploads//${image}` }}
      />
    </View>
  );

};
export default Img