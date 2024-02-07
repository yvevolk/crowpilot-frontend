import { Cloudinary } from "@cloudinary/url-gen";
import { View, Text, Button } from "react-native";
export default function () {
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dproc2gse'
        },
        url: {
            secure: true
        }
    });
    const handlePost = async () => {
    
        const options = {
            upload_preset: 'ml_default',
            tag: 'ml_default',
            unsigned: true
        }
    
        await upload(cld, {file: '../../assets/catView.jpeg' , options: options, callback: (error, response) => {
            console.log(response);
            console.log(error)
        }})
    }
    return (
        <View>
            <Text>TestCloudinary</Text>
            <Button
                title="upload a pic"
            onPress={handlePost}/>
        </View>
    )
}