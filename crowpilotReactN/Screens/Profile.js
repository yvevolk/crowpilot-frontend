import { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from '../Contexts/AuthContext';

export default function Profile() {
    const { setUserToken } = useContext(AuthContext);
    return (
        <View>
            <Text>This is Profile</Text>
            <Button title="log out" onPress={() => setUserToken(null)}/>
        </View>
    )
}