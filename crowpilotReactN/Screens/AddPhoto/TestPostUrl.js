import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import axios from "axios"
export default function TestPostUrl({ navigation }) {
    const data = {
        location: {
            lat:  45.009133,
            long: -1.7062073
            },
            photo_url: "https://velvetescape.com/wp-content/uploads/2015/05/IMG_0399_2-1280x920.jpeg",
            taken_by: "user123",
            photo_type: "land",
            date_taken: "2022-02-02",
            flight_code: "BA663",
            flight_origin: "LHR",
            flight_dest: "WMI",
            remarks: "This is a remark from react native"
    }
    const handlePost = () => {
        axios.post("https://crowpilot.onrender.com/api/photos", data)
            .then(response => {
                Alert.alert("", "Photo has been submitted successfully.", [
                    {
                        text: "Roger.",
                        onPress: navigation.goBack
                    }
                ])
          })
          .catch(error => {
              console.error("Error fetching data: ", error);
              Alert.alert("", `${error}`, [
                {
                    text: "Roger.",
                    onPress: navigation.goBack
                }
            ])
          });
        
    }
    return (
        <View style={styles.container}>
            <Text>Photo URL</Text>
            <TextInput 
            // onChangeText={text => data.photo_url = text}
            />
            <Text>Location</Text>
            <TextInput
            // onChangeText={text => data.location = text}
            />
            <Text>Taken by</Text>
            <TextInput 
            // onChangeText={text => data.taken_by = text}
            />
            <Text>Date taken</Text>
            <TextInput 
            // onChangeText={text => data.date_taken = text}
            />
            <Text>Photo type</Text>
            <TextInput 
            // onChangeText={text => data.photo_type = text}
            />
            <Text>Flight code</Text>
            <TextInput 
            // onChangeText={text => data.photo_type = text}
            />
            <Text>Flight origin</Text>
            <TextInput 
            // onChangeText={text => data.flight_origin = text}
            />
            <Text>flight destination</Text>
            <TextInput 
            // onChangeText={text => data.flight_dest = text}
            />
            <Text>remarks</Text>
            <TextInput 
            // onChangeText={text => data.remarks = text}
            />
            <Button 
                title="Test Post"
                onPress={handlePost}
            />
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
  });