import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, Text, View } from 'react-native';
import { createContext, useState } from 'react';

import AuthNavigation from './Screens/AuthNavigation';
import { NavigationContainer } from '@react-navigation/native';

const AuthContext = createContext();
const Stack = createNativeStackNavigator();

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null)

    if (isLoading) {
        setTimeout(() => setIsLoading(false), 1000) //to mimic checking for token in SecureStore
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Getting token...</Text>
                <ActivityIndicator size="large" />
            </View>
        );
    } else {
        return (
            <AuthContext.Provider value={{ userToken, setUserToken }}>
                <NavigationContainer>
                    <Stack.Navigator>
                        {
                        userToken == null ? 
                        (<Stack.Screen name="AuthNavigation" component={AuthNavigation} /> ) : 
                        (<Stack.Screen name="AppNavigation" component={AppNavigation} />)
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthContext.Provider>
        )
    }
}