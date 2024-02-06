import { View, Text, Image, StyleSheet, Button, Alert, TextInput} from "react-native";
import { useState, useEffect } from 'react'
import { patchUserProfile } from "../api";

export default function EditProfile({navigation}) {

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

    return (
        <View>
        <Text>First name:</Text>
      <TextInput
        placeholder={username.firstname}
        defaultValue={username.firstname}>
      </TextInput>
      <Text>Surname:</Text>
      <TextInput>
      </TextInput>
      <Text>Email:</Text>
      <TextInput>
      </TextInput>
      <Text>Phone number:</Text>
      <TextInput>
      </TextInput>
      <Text>Home airport code:</Text>
      <TextInput>
      </TextInput>
      <Button title = "Submit" onPress = {handleUpdate}></Button>
        </View>
    )
}