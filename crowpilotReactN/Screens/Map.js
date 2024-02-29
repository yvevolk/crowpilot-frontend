import { StyleSheet, View } from 'react-native';
import  MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { useState, useEffect } from 'react'
import { getAllPhotos } from '../api'
import { Overlay } from '@rneui/themed';
import SmallPhotoCard from './SmallPhotoCard';
import Loader from './Loader'
import UserProfile from './UserProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function MapNav () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name = "MapScreen"
                component = {Map}
                options = {{headerShown: false}}/>
            <Stack.Screen
                name = "MapProfileScreen"
                component = {UserProfile}
                options = {{headerShown: false}}/>
        </Stack.Navigator>
    )
}

function Map() {

const [isLoading, setIsLoading] = useState(true)
const [visible, setVisible] = useState(false);
const [overlayData, setOverlayData] = useState({})
const toggleOverlay = () => {setVisible(!visible)};

const [photos, setPhotos] = useState([]);

useEffect(() => {
    getAllPhotos().then((photos) => {
        setPhotos(photos)
        setIsLoading(false)
    }),
    []
})

if (isLoading) {
       return (
        <Loader/>
    );
}
    return (
    <View>
    <MapView
      provider = {PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: 50,
        longitude: -5,
        latitudeDelta: 10,
        longitudeDelta: 10}}>
            {photos.map((photo) => {
                return (
                    <Marker
                    key={photo._id}
                    coordinate={{
                        latitude: photo.location.lat,
                        longitude: photo.location.long,
                    }}
                    onPress={() => {setOverlayData(photo);
                    toggleOverlay()}}/>
                    )
            })}
    </MapView>
    <Overlay isVisible = {visible}
                onBackdropPress={toggleOverlay}
                backdropStyle = {{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
                 <SmallPhotoCard
                        photo_url = {overlayData.photo_url}
                        taken_by = {overlayData.taken_by}
                        date_taken = {overlayData.date_taken}
                        flight_origin={overlayData.flight_origin}
                        flight_dest={overlayData.flight_dest}
                        remarks = {overlayData.remarks}
                        />
                </Overlay>
  </View>
    )}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
  });