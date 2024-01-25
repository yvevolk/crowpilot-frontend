import { useContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, Text, View } from 'react-native';
import { AuthContext } from '../Contexts/AuthContext';
import AuthNavigation from './AuthNavigation';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './AppNavigation';

const Stack = createNativeStackNavigator();

export default function AuthenticationFlows() {
    const [isLoading, setIsLoading] = useState(true);
    const { userToken } = useContext(AuthContext);
    if (isLoading) {
        setTimeout(() => setIsLoading(false) , 1000) //to mimic checking for token in SecureStore
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Getting token...</Text>
            <ActivityIndicator size="large" />
            </View>
        );
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    {
                    userToken == null ? 
                    (<Stack.Screen name="AuthNavigation" component={AuthNavigation} options={{headerShown:false}}/> ) : 
                    (<Stack.Screen name="AppNavigation" component={AppNavigation} options={{headerShown:false}}/>)
                    }
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}