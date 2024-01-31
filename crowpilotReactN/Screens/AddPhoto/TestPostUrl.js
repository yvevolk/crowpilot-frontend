import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default function TestPostUrl({ navigation }) {
    const data = {
        location: "",
        photo_url: "",
        taken_by: "",
        photo_type: "",
        date_taken: "",
        flight_code: "",
        flight_origin: "",
        flight_dest: "",
        remarks: ""
    }
    const [location, setLocation] = useState("")
    const handlePost = () => {
        Alert.alert(`${Object.values(data)}`)
    }
    return (
        <View style={styles.container}>
            <Text>Photo URL</Text>
            <TextInput 
            onChangeText={text => data.photo_url = text}/>
            <Text>Location</Text>
            <TextInput
            onChangeText={text => data.location = text}/>
            <Text>Taken by</Text>
            <TextInput 
            onChangeText={text => data.taken_by = text}/>
            <Text>Date taken</Text>
            <TextInput 
            onChangeText={text => data.date_taken = text}/>
            <Text>Photo type</Text>
            <TextInput 
            onChangeText={text => data.photo_type = text}/>
            <Text>Flight code</Text>
            <TextInput 
            onChangeText={text => data.photo_type = text}/>
            <Text>Flight origin</Text>
            <TextInput 
            onChangeText={text => data.flight_origin = text}/>
            <Text>flight destination</Text>
            <TextInput 
            onChangeText={text => data.flight_dest = text}/>
            <Text>remarks</Text>
            <TextInput 
            onChangeText={text => data.remarks = text}/>
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