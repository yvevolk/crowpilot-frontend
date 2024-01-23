import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function LogIn({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Email address</Text>
            <TextInput />
            <Text>Password</Text>
            <TextInput/>
            <Button 
                title="Log in"
                onPress={() => navigation.reset("Menu")}
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