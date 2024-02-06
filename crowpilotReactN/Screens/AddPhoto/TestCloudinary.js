import { Cloudinary } from "@cloudinary/url-gen";
import { View, Text, Button } from "react-native";
export default function () {
    const handlePost = async () => {
        const cld = new Cloudinary({
            cloud: {
              cloudName: 'dproc2gse'
            },
            url: {
                secure: true
            }
        });
    
        const options = {
            upload_preset: 'sample_preset',
            tag: 'sample',
            unsigned: true
        }
    
        await upload(cld, {file: '../../assets/catView.jpeg' , options: options, callback: (response) => {
            console.log(response);
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