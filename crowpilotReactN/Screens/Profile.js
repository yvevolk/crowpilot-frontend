import { View, Text, Image, StyleSheet } from "react-native";
import { useState, useEffect } from 'react'
import { getUser, getUserPhotos } from "../api";
import moment from 'moment';
import { AuthContext } from '../Contexts/AuthContext';

export default function Profile() {
const [user, setUser] = useState({})
const [userPhotos, setUserPhotos] = useState([])
//const { setUserToken } = useContext(AuthContext);


//user is currently hard coded in
useEffect(() => {
    getUser("hharr").then((user) => {
        setUser(user);
        getUserPhotos(user.username).then((photos) => {
            setUserPhotos(photos)
        })
    })
}, [])

    return (
        <View>
            <Text style = {styles.name}>{user.firstname} {user.surname}</Text>
            <Text style = {styles.subtitle}>{user.username}</Text>
            <Image style = {{"height": 100, "width": 100}} source={{uri: `${user.avatar_url}`}}></Image>
            <Text>Member since: {moment(user.acc_created).format('MMM yyyy')}</Text>
            <Text>Photos taken: {userPhotos.length}</Text>
            <View></View>
        </View>
    )
}

const styles = StyleSheet.create({
    name: {
        textAlign: 'center',
        fontSize: 40
    },
    subtitle: {
        fontSize: 30,
        textAlign: 'center'
    }
})