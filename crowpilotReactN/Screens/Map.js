import { StyleSheet, Text, View, Image, Modal } from 'react-native';
import  MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { useState, useEffect } from 'react'
import { getAllPhotos } from '../api'
import { Overlay } from '@rneui/themed';
import SmallPhotoCard from './SmallPhotoCard';

export default function Map() {

const [visible, setVisible] = useState(false);
const toggleOverlay = () => {setVisible(!visible)};

const [photos, setPhotos] = useState([]);
useEffect(() => {
    getAllPhotos().then((photos) => {
        setPhotos(photos)
    }),
    [photos]
})

const [overlayData, setOverlayData] = useState({})

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
                    toggleOverlay()}}>
                <Overlay isVisible = {visible}
                onBackdropPress={toggleOverlay}
                backdropStyle = {{
                    backgroundColor: 'rgba(0, 0, 0, 0.05)'
                }}
                >
                 <SmallPhotoCard
                        photo_url = {overlayData.photo_url}
                        taken_by = {overlayData.taken_by}
                        date_taken = {overlayData.date_taken}
                        flight_origin={overlayData.flight_origin}
                        flight_dest={overlayData.flight_dest}
                        remarks = {overlayData.remarks}></SmallPhotoCard>
                </Overlay>
                </Marker>
                    )
            })}
    </MapView>
  </View>
    )}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
  });