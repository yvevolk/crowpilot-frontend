import 'react-native-gesture-handler';
import AuthenticationFlows from './Screens/AuthenticationFlows';
import { AuthProvider } from './Contexts/AuthContext';
import { StylesProvider } from './Contexts/ThemeContext'

export default function App() {
    return (
        <StylesProvider>
        <AuthProvider>
            <AuthenticationFlows />
        </AuthProvider>
        </StylesProvider>
    );
}