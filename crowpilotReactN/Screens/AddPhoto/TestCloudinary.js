import { View, Text, Button } from "react-native";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
export default function () {
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets);
            setImage(result.assets[0].uri);
        }
    };
    
    const handleupLoad = async (e) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_present', 'crowpilot')
        data.append('cloud_name', 'dproc2gse')

        fetch('https://api.cloudinary.com/v1_1/dproc2gse/image/upload', {
            method: 'post',
            body: data
        })
        .then(res => res.json())
        .then(res => console.log(res))
        
    }
    return (
        <View>
            <Text>TestCloudinary</Text>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button
                title="upload a pic"
                onPress={handlePost}
            />
        </View>
    )
}