import 'react-native-gesture-handler';
import AuthenticationFlows from './Screens/AuthenticationFlows';
import { AuthProvider } from './Contexts/AuthContext';

export default function App() {
    
    return (
        <AuthProvider>
            <AuthenticationFlows />
        </AuthProvider>
    );
}