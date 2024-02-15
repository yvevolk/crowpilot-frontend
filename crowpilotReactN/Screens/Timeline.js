import { ActivityIndicator, StyleSheet, Image, Text, View, Button, Dimensions} from 'react-native';
import { useState, useEffect } from 'react'
import { getAllPhotos } from '../api';
import { ScrollView } from 'react-native-gesture-handler';
import PhotoCard from './PhotoCard';
import Loader from './Loader';

export default function Timeline() {

const [photos, setPhotos] = useState([])
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
    getAllPhotos().then((photos) => {
        setPhotos(photos)
        })
 }, [photos])

    if (isLoading) {
        setTimeout(() => setIsLoading(false) , 1000)
        return (
           <Loader/>
        );
    }

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