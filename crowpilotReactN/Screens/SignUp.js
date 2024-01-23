import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function SignUp({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>First Name</Text>
            <TextInput />
            <Text>Surname</Text>
            <TextInput />
            <Text>Email address</Text>
            <TextInput />
            <Text>Password</Text>
            <TextInput/>
            <Text>Phone number</Text>
            <TextInput />
            <Text>Home airport code/city</Text>
            <TextInput />
            <Text>First Name</Text>
            <TextInput />
            <View>
                <Button
                    title='Yes'
                />
                <Text>I agree to the T&C's</Text>
            </View>
            <Button 
                title="sign up"
                onPress={navigation.goBack}
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