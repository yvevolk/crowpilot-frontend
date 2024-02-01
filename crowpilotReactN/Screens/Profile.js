import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { useState, useEffect } from 'react'
import { getUser, getUserPhotos } from "../api";
import moment from 'moment';
import  RankCalc  from './RankCalc.js'
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
    )
}

const styles = StyleSheet.create({
    name: {
        textAlign: 'center',
        fontSize: 40
    },
    header: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: 30,
        textAlign: 'center'
    },
    container: {
        flexDirection: 'row',
        alignContent: 'stretch',
        width: '50%',
            },
    column: {
        padding: '5%',
        alignSelf: 'center'
    },
    category: {
      paddingTop: '10%',
      paddingBottom: '10%'
    },
    profilePic: {
        height: 200,
        width: 200,
        borderRadius: 20
    }
})