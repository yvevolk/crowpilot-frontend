import { StyleSheet, Text, View, Button, Image, Dimensions} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUp from './SignUp.js'
import LogIn from './LogIn.js'
function Welcome({ navigation }) {

const dimensions = Dimensions.get('window')
const idealHW = (dimensions.width * 0.8)

    return (
        <View style={styles.container}>
        <Image source = {require('../assets/Crowpilot_text.png')} alt = "Crowpilot logo" style = {{"width": idealHW, "height": idealHW, "resizeMode": "contain", "margin": 20}}></Image>
        <Text>Welcome!</Text>
        <Button
            title="Sign up"
            onPress={() =>
            navigation.navigate("SignUp")
            }
        />
        <View style = {styles.between}></View>
        <Button
            title="Log in"
            onPress={() =>
            navigation.navigate("LogIn")
            }
        />
        </View>
    );
}

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}/>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="LogIn" component={LogIn} />
        </Stack.Navigator>
    );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    between: {
        padding: 10
    }
  });