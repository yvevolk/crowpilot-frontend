import { Text, View, ActivityIndicator } from "react-native";

export default function Loader ( {params} ) {

    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      {!params && (
        <Text>Loading...</Text>
      )}
      {params && (
        <Text>{params}ing...</Text>
      )}
   
        <ActivityIndicator size="large" />
        </View>
        )
}

