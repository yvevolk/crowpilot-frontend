import { Text, View, ActivityIndicator } from "react-native";

export default function Loader () {
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
        </View>
        )
}

