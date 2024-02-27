import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react'
import { getAllPhotos } from '../api';
import { ScrollView } from 'react-native-gesture-handler';
import PhotoCard from './PhotoCard';
import Loader from './Loader';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from './UserProfile'

const Stack = createNativeStackNavigator();

export default function TimelineNav() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="TimelineNav" component={Timeline} options={{headerShown:false}}/>
            <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
};

function Timeline( {navigation} ) {

const [photos, setPhotos] = useState([])
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
    getAllPhotos().then((photos) => {
        setPhotos(photos);
        setIsLoading(false)
        })
 }, [photos])

    if (isLoading) {
        return (
           <Loader/>
        )
    }
    else {
        return (
        <View style={styles.container}>
            <ScrollView>
                 {photos.map((photo) => {
                    return(
                    <View key = {`${photo._id}`} style = {styles.singleCard}>
                        <PhotoCard
                        navigation = {navigation}
                        photo_url = {photo.photo_url}
                        taken_by = {photo.taken_by}
                        date_taken = {photo.date_taken}
                        flight_origin={photo.flight_origin}
                        flight_dest={photo.flight_dest}
                        remarks = {photo.remarks}
                        />
                    </View>
                    )
                })}
                </ScrollView>
            </View>
    )}
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });