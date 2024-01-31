import { StyleSheet, Image, Text, View, Button, Dimensions} from 'react-native';
import { useState, useEffect } from 'react'
import { getAllPhotos } from '../api';
import { ScrollView } from 'react-native-gesture-handler';

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
                        <Image style = {{"height": idealWidth, "width": idealWidth,"resizeMode": "cover","borderRadius": 20}} source={{uri: `${photo.photo_url}`}}></Image>
                    <View className = 'text-section' style = {styles.textSection}>
                    <Text style = {styles.header}>PASSENGER</Text>
                    <Text>{photo.taken_by}</Text>
                    <Text style = {styles.header}>DATE</Text>
                    <Text>{photo.date_taken}</Text>
                    <Text style = {styles.header}>ROUTE</Text>
                    <Text>{photo.flight_origin} - {photo.flight_dest}</Text>
                    {photo.remarks.length !== 0 && (
                        <View>
         <Text style = {styles.header}>REMARKS</Text>
         <Text>{photo.remarks}</Text>
         </View>
        )}
                    </View>
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
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
        fontWeight: 'bold'
    },
    textSection: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
        marginBottom: 10
    },
    singleCard: {
        backgroundColor: '#CECACE',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20,
        padding: 10
    }
  });