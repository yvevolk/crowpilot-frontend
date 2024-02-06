import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseSource from "./ChooseSource";
import Capture from "./Capture";
import Gallery from "./Gallery";
import TestPostUrl from "./TestPostUrl"
import TestCloudinary from "./TestCloudinary";

const Stack = createNativeStackNavigator();

export default function PhotoNvigation() {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="ChooseSource" component={ChooseSource} />
            <Stack.Screen name="Capture" component={Capture} />
            <Stack.Screen name="Gallery" component={Gallery} />
            <Stack.Screen name="TestPost" component={TestPostUrl} />
            <Stack.Screen name="TestCloudinary" component={TestCloudinary} />
        </Stack.Navigator>
    )
}