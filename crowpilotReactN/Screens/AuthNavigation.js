import { StyleSheet, Text, View, Button, Image, Dimensions, Animated } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './SignUp.js'
import LogIn from './LogIn.js';
import { Video } from 'expo-av';

const dimensions = Dimensions.get('screen')
const idealHW = (dimensions.width * 0.8)

function Welcome({ navigation }) {
        return (
        <View style={styles.container}>
        <Video
        style = {styles.video}
        rate = {1}
        source={require('../assets/flightvideo.mp4')}
        useNativeControls={false}
        resizeMode="cover"
        isLooping
        isMuted
        shouldPlay
      />
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
    },
    video: {
        height: dimensions.height,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
  });