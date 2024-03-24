import { StyleSheet, Text, Pressable, View, Image, Dimensions, Animated } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './SignUp.js'
import LogIn from './LogIn.js';
import { Video } from 'expo-av';
import { useContext } from 'react';
import { StylesContext } from '../Contexts/ThemeContext.js';
import Tagline from './Tagline.js';

const dimensions = Dimensions.get('screen')
const idealHW = (dimensions.width * 0.8)

function Welcome({ navigation }) {

    const {styles} = useContext(StylesContext)

        return (
            <>
            <Video
            style = {stylesheet.video}
            rate = {1}
            source={require('../assets/airportview.mp4')}
            useNativeControls={false}
            resizeMode="cover"
            isLooping
            isMuted
            shouldPlay
            />
            <View styles = {{'flex': 1, 'justify-content': 'flex-end'}}>
            <Image source = {require('../assets/Crowpilot_text.png')} alt = "Crowpilot logo" style = {{"height": 50, "resizeMode": "contain", "margin": 80,  'padding': 50}}/></View>

            <Tagline/>
            
            <View className={styles.container}>
                <Pressable
                    // style = {{
                    //     height: 100, width: 200, backgroundColor: 'black', padding: 20, margin: 10}}
                    className={styles.button}
                    onPress={() => navigation.navigate("SignUp")}
                >
                        <Text className={styles.textButtonLight}>Sign up</Text>
                </Pressable>
            
                <Pressable
                    className={styles.button}
                    onPress={() =>navigation.navigate("LogIn")}
                >
                    <Text className={styles.textButtonLight}>Log in</Text>
                </Pressable>
            </View>
        </>
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
  const stylesheet = StyleSheet.create({
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