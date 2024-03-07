import { View, Button } from "react-native";

export default function ChooseSource({ navigation }) {
    return (
        <View>
            <Button title="Gallery" onPress={() => navigation.navigate("Gallery")} />
            <Button title="Camera" onPress={() => navigation.navigate("Capture")} />
            <Button title="TestPost" onPress={() => navigation.navigate("TestPost",
             {photo_url: 'https://res.cloudinary.com/dproc2gse/image/upload/v1709767768/q6sjsx95w3ogj3hdgvgg.jpg'}
            )} />
            <Button title="MapDataTest" onPress={() => navigation.navigate("MapData")} />
        </View>
    )
}