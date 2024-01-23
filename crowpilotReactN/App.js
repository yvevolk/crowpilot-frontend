import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUp from './Screens/SignUp';
import LogInNav from './Screens/LogIn';
import Menu from './Screens/Menu';

function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>CrowPilot</Text>
      <Text>Welcome!</Text>
      <Button
        title="Sign up"
        onPress={() =>
          navigation.navigate("Sign up")
        }
      />
      <Button
        title="Log in"
        onPress={() =>
          navigation.navigate("Log in nav")
        }
      />
    </View>
  );
}
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Sign up" component={SignUp} />
        <Stack.Screen name="Log in nav" component={LogInNav} />
        <Stack.Screen name="Menu" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
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