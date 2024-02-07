import { StyleSheet, Text, View, Button } from 'react-native';
import  MapView, { Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import { useState, useEffect } from 'react'
import { getAllPhotos } from '../api'
import SmallPhotoCard from './SmallPhotoCard';

export default function Map() {


const [photos, setPhotos] = useState([]);
useEffect(() => {
    getAllPhotos().then((photos) => {
        setPhotos(photos)
    }),
    [photos]
})

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
                    }}>
                        <Callout>
                            <Text>Photo by {photo.taken_by}</Text>
                        <SmallPhotoCard
                        photo_url = {photo.photo_url}
                        taken_by = {photo.taken_by}
                        date_taken = {photo.date_taken}
                        flight_origin={photo.flight_origin}
                        flight_dest={photo.flight_dest}
                        remarks = {photo.remarks}></SmallPhotoCard>
                        </Callout>
                    </Marker>)
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