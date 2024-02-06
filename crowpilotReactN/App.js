import 'react-native-gesture-handler';
import AuthenticationFlows from './Screens/AuthenticationFlows';
import { AuthProvider } from './Contexts/AuthContext';
// import { Cloudinary } from "@cloudinary/url-gen";

export default function App() {
    // const cld = new Cloudinary({
    //     cloud: {
    //       cloudName: 'dproc2gse'
    //     }
    // });
    return (
        <AuthProvider>
            <AuthenticationFlows />
        </AuthProvider>
    );
}