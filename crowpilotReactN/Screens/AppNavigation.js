import Map from "./Map";
import { useContext } from "react";
import PhotoNavigation from "./AddPhoto/PhotoNavigation"
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileNav from "./Profile";
import Timeline from "./Timeline";
import { AuthContext } from '../Contexts/AuthContext';

const Drawer = createDrawerNavigator();

export default AppNavigation = () => {
    const { userToken } = useContext(AuthContext)
    console.log(userToken)
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Timeline" component={Timeline} />
            <Drawer.Screen name="Map" component={Map} />
            <Drawer.Screen name="Profile" component={ProfileNav}/>
            <Drawer.Screen name="PhotoNavigation" component={PhotoNavigation} />
        </Drawer.Navigator>
    );
}