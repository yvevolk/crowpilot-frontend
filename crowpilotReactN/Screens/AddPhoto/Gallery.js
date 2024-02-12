import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Gallery() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      let newFile = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split(".")[1]}`,
        name: `test.${result.assets[0].uri.split(".")[1]}`
      }
      handleUpLoad(newFile)
    }
  };
  const handleUpLoad = async (file) => {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'crowpilot')
    data.append('cloud_name', 'dproc2gse')

    fetch('https://api.cloudinary.com/v1_1/dproc2gse/image/upload', {
        method: 'post',
        body: data
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
    
}
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}