import { StyleSheet, Image, Text, View, Button, Dimensions} from 'react-native';
import { useState, useEffect } from 'react'
import { getAllPhotos } from '../api';
import { ScrollView } from 'react-native-gesture-handler';
import PhotoCard from './PhotoCard';

export default function Timeline() {

const dimensions = Dimensions.get('window')
const idealWidth = (dimensions.width * 0.9);

    const [photos, setPhotos] = useState([])

    useEffect(() => {
        getAllPhotos().then((photos) => {
            setPhotos(photos)
        })
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                {photos.map((photo) => {
                    return(
                    <View key = {`${photo._id}`} style = {styles.singleCard}>
                        <PhotoCard
                        photo_url = {photo.photo_url}
                        taken_by = {photo.taken_by}
                        date_taken = {photo.date_taken}
                        flight_origin={photo.flight_origin}
                        flight_dest={photo.flight_dest}
                        remarks = {photo.remarks}></PhotoCard>
                    </View>
                    )
                })}
                </ScrollView>
            </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });