import { useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { AuthContext } from '../Contexts/AuthContext';

export default function LogIn({ navigation }) {
    const { userToken, setUserToken } = useContext(AuthContext)
    const handleLogin = () => {
        setUserToken({token: true, username: userToken.username})
    }
    return (
        <View style={styles.container}>
            <Text>Username</Text>
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