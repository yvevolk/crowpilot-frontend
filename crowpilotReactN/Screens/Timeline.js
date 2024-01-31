import { StyleSheet, Image, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react'
import { getAllPhotos } from '../api';

export default function Timeline() {

    const [photos, setPhotos] = useState([])

    useEffect(() => {
        getAllPhotos().then((photos) => {
            setPhotos(photos)
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text>Timeline</Text>
                {photos.map((photo) => {
                    return(
                    <View key = {`${photo._id}`} style = {styles.singleCard}>
                    <Text style = {styles.header}>PASSENGER</Text>
                    <Text>{photo.taken_by}</Text>
                    <Text style = {styles.header}>DATE</Text>
                    <Text>{photo.date_taken}</Text>
                    <Text style = {styles.header}>ROUTE</Text>
                    <Text>{photo.flight_origin} - {photo.flight_dest}</Text>
                    <Text style = {styles.header}>REMARKS</Text>
                    <Text>{photo.remarks}</Text>
                    </View>
                    )
                })}
            </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    singleCard: {
        height: 300,
        width: 300,
    },
    header: {
        fontWeight: 'bold'
    }
  });