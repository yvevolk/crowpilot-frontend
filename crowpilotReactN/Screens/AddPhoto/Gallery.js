import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
export default function Gallery({navigation}) {
  const [image, setImage] = useState(null);
 
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
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
    console.log(file.uri);
    await MediaLibrary.requestPermissionsAsync()
    MediaLibrary.getAssetInfoAsync(file.uri)
    .then((result) => console.log(result))
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', process.env.EXPO_PUBLIC_UPLOAD_PRESET)
    data.append('cloud_name', process.env.EXPO_PUBLIC_CLOUD_NAME)

    fetch(process.env.EXPO_PUBLIC_CLOUDINARY_URL, {
        method: 'post',
        body: data
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data.secure_url)
      navigation.navigate("TestPost", {
        photo_url: data.secure_url
      })
    })
 }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}