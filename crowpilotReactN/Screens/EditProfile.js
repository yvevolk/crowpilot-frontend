import { View, Text, StyleSheet, Button, Alert, TextInput} from "react-native";
import { useState, useEffect } from 'react'
import { getUser, patchUserProfile } from "../api";

export default function EditProfile({navigation}) {

const [user, setUser] = useState({})
//later replace this with logged in user context, currently hard coded in
const username = "lovelyphotos"

const editObject = {};

const handleUpdate = (e) => {
    e.preventDefault();
    {patchUserProfile(editObject, username).then((res) => {
        Alert.alert("", "Profile updated.", [
            {
                text: "ok",
                onPress: navigation.goBack
            }
        ])
    })
    .catch((err) => {
        Alert.alert("Something went wrong.")
    })}
}

useEffect(() => {
    getUser(username).then((user) => {
        setUser(user)
    })
}, [username])
        
    return (
        <View style = {styles.container}>
        <View style = {styles.category}>
        <Text>First name:</Text>
      <TextInput
        style = {styles.textEntry}
        placeholder={user.firstname}
        defaultValue={user.firstname}
        onChangeText={(value) => {editObject.firstname = value}}>
      </TextInput></View>
      <View style = {styles.category}>
      <Text>Surname:</Text>
      <TextInput
      style = {styles.textEntry}
      placeholder={user.surname}
      defaultValue={user.surname}
      onChangeText={(value) => {editObject.surname = value}}>
      </TextInput></View>
      <View style = {styles.category}>
      <Text>Email:</Text>
      <TextInput
      style = {styles.textEntry}
      placeholder={user.email}
      defaultValue={user.email}
      onChangeText={(value) => {editObject.email = value}}>
      </TextInput></View>
      <View style = {styles.category}>
      <Text>Phone number:</Text>
      <TextInput
      style = {styles.textEntry}
      placeholder={user.phone}
      defaultValue={user.phone}
      onChangeText={(value) => {editObject.phone = value}}>
      </TextInput></View>
      <View style = {styles.category}>
      <Text>Home airport code:</Text>
      <TextInput
      style = {styles.textEntry}
      placeholder={user.home_airport}
      defaultValue={user.home_airport}
      onChangeText={(value) => {editObject.home_airport = value}}>
      </TextInput></View>
      <View style = {styles.category}>
      <Text>Profile image URL:</Text>
      <TextInput
      style = {styles.textEntry}
      placeholder={user.avatar_url}
      defaultValue={user.avatar_url}
      onChangeText={(value) => {editObject.avatar_url = value}}>
      </TextInput></View>
      <View style = {styles.submitContainer}>
      <Button title = "Submit" onPress = {handleUpdate}></Button></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: '5%',
        marginBottom: '5%'
    },
    category: {
        margin: '3%',
    },
    textEntry: {
        backgroundColor: '#FFFFFF',
        borderColor: '#CECACE',
        borderWidth: 3,
        borderStyle: 'solid',
        paddingLeft: 10,
        paddingRight: 10
    },
    submitContainer: {
        padding: '10%',
    }
})
