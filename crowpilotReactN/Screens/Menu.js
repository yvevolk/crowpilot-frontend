import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer"
import Map from "./Map";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Screens() {
    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator>
                <Drawer.Screen name="Map" component={Map}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default function Menu() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="Screens" component={Screens} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}