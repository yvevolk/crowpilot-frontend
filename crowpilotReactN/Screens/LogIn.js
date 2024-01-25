import { useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { AuthContext } from '../Contexts/AuthContext';

export default function LogIn({ navigation }) {
    const { setUserToken } = useContext(AuthContext)
    const handleLogin = () => {
        setUserToken(true)
    }
    return (
        <View style={styles.container}>
            <Text>Email address</Text>
            <TextInput />
            <Text>Password</Text>
            <TextInput/>
            <Button 
                title="Log in"
                onPress={handleLogin}
            />
        </View>
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