import { useContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AuthenticationFlows() {
    const [isLoading, setIsLoading] = useState(true);
    const { userToken } = useContext(AuthContext);
    if (isLoading) {
        setTimeout(() => setIsLoading(false) , 20000) //to mimic checking for token in SecureStore
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Getting token...</Text>
            <ActivityIndicator size="large" />
            </View>
        );
    } else {
        return (
            <Stack.Navigator>
                {
                userToken == null ? 
                (<Stack.Screen name="AuthNavigation" component={AuthNavigation} /> ) : 
                (<Stack.Screen name="AppNavigation" component={AppNavigation} />)
                }
            </Stack.Navigator>
        );
    }
}