import { StyleSheet, Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUp from './SignUp.js'
import LogIn from './LogIn.js'
import Menu from './Menu.js'
function Welcome({ navigation }) {
    return (
        <View style={styles.container}>
        <Text>CrowPilot</Text>
        <Text>Welcome!</Text>
        <Button
            title="Sign up"
            onPress={() =>
            navigation.navigate("Signup")
            }
        />
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
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="Menu" component={Menu} />
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
  });