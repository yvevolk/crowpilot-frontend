import { View, Button } from "react-native";

export default function ChooseSource({ navigation }) {
    return (
        <View>
            <Button title="Gallery" onPress={() => navigation.navigate("Gallery")} />
            <Button title="Camera" onPress={() => navigation.navigate("Capture")} />
            <Button title="TestPost" onPress={() => navigation.navigate("TestPost")} />
            <Button title="MapDataTest" onPress={() => navigation.navigate("MapData")} />
        </View>
    )
}