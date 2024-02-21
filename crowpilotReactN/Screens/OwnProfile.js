import { ActivityIndicator, View, Text, Image, StyleSheet, Button, Alert, Share } from "react-native";
import { useState, useEffect, useContext } from 'react'
import { getUser, getUserPhotos } from "../api";
import moment from 'moment';
import  RankCalc  from './RankCalc.js';
import EditProfile from "./EditProfile.js";
import SmallPhotoCard from "./SmallPhotoCard";
import { AuthContext } from '../Contexts/AuthContext';
import { ScrollView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loader from "./Loader";

export default function OwnProfile({ navigation }) {

const [isLoading, setIsLoading] = useState(true)
const { userToken } = useContext(AuthContext)
const [user, setUser] = useState({})
const [userPhotos, setUserPhotos] = useState([])
    
useEffect(() => {
        getUser(userToken.username).then((userData) => {
            setUser(userData);
            getUserPhotos(userData.username)
            .then((userPhotos) => {
                setUserPhotos(userPhotos);
                setIsLoading(false)
            })
        })
}, [userToken])
    
const shareUser = async () => {
    try {
        await Share.share({
        message:
            `Check out ${user.username} on Crowpilot, the app that changes your perspective!`
        });
    } catch (err) {
        Alert.alert(err.message);
    }
}   

if (isLoading) {
    return (
        <Loader/>
    )}
    else {
        return (
            <>
    <ScrollView>
    <View style = {styles.card}>
        <Text>THIS IS OWN PROFILE!</Text>
        <Text style = {styles.name}>{user.firstname} {user.surname}</Text>
        <Text style = {styles.subtitle}>{user.username}</Text>
        <View style = {styles.container}>
        <View style = {styles.column}>
        <Image style = {styles.profilePic} source={{uri: `${user.avatar_url}`}}></Image>
        </View>
        <View style = {styles.column}>
            <View style = {styles.category}>
        <Text style = {styles.header}>Member since</Text>
        <Text>{moment(user.acc_created).format('MMM yyyy')}</Text></View>
        <View style = {styles.category}>
        <Text style = {styles.header}>Photos taken</Text>
        <Text>{userPhotos.length}</Text></View>
        <View style = {styles.category}><Text style = {styles.header}>Crowpilot Rank</Text>
        <RankCalc length = {userPhotos.length}></RankCalc>
        </View></View>
        </View>
    </View>
    {userToken.username === user.username && (
 <Button title = 'Edit' onPress = {() => {navigation.navigate("EditProfile")}}></Button>
    )}
    <Button title = 'Share' onPress = {shareUser}></Button>
    <Text style = {styles.userPhotoTitle} >{user.username}'s photos</Text>
        {userPhotos.map((photo) => {
            return (
                <View key = {`${photo._id}`} style = {styles.singleCard}>
                    <SmallPhotoCard
                    photo_url = {photo.photo_url}
                    taken_by = ""
                    date_taken = {photo.date_taken}
                    flight_origin={photo.flight_origin}
                    flight_dest={photo.flight_dest}
                    remarks = {photo.remarks}></SmallPhotoCard>
                </View>
            )
        })}
    </ScrollView>
    </>
        )
    }
}

//const Stack = createNativeStackNavigator();

// export default function ProfileNav() {
//     return (
//       <Stack.Navigator>
//         <Stack.Screen
//           name="ProfileScreen"
//           component={Profile}
//           options= {{headerShown: false}}
//         />
//         <Stack.Screen
//           name="EditProfile"
//           component={EditProfile}
//           options= {{headerShown: false}}
//         />
//       </Stack.Navigator>
//     );
//   }

const styles = StyleSheet.create({
    card: {
        margin: 5, 
        padding: 10,
        borderColor: '#CECACE',
        borderWidth: 3,
        borderStyle: 'solid',
        backgroundColor: 'white',
        borderRadius: 10
    },
    name: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold'
    },
    header: {
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center'
    },
    container: {
        flexDirection: 'row',
        alignContent: 'stretch',
        width: '50%',
            },
    column: {
        padding: '10%',
        alignSelf: 'center'
    },
    category: {
      paddingTop: '5%',
      paddingBottom: '5%'
    },
    profilePic: {
        height: 150,
        width: 150,
        borderRadius: 20,
        borderColor: '#CECACE',
        borderWidth: 3
        },
    userPhotoTitle: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        fontWeight: 'bold'
    }
})