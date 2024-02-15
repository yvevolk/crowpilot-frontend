import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Dimensions } from 'react-native';
import axios from "axios"
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
const dimensions = Dimensions.get('window')
export default function TestPostUrl({ route, navigation }) {
    const [confirmInfo, setConfirmInfo] = useState({
        lat: {
            state: null,
            value: 45.009133
        },
        long: {
            state: null,
            value: -1.000050
        },
        type: {
            state: null,
            value: "air"
        },
        date: {
            state: null,
            value: "2022-02-02"
        },
        code: {
            state: null,
            value: "BA663"
        },
        origin: {
            state: null,
            value: "LHR"
        },
        dest: {
            state: null,
            value: "WMI"
        },
    })
    const { userToken } = useContext(AuthContext)
    const { photo_url } = route.params
    let data = {
            photo_url,
            taken_by: userToken.username,
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
            <Text
                style={{fontSize:20, fontWeight:100}}
            >
                Info about the picture
            </Text>
            <Text>Photo URL</Text>
            <Text>{photo_url}</Text>
            {/* Location */}
            <>
                <Text>Location</Text>
                <View style={{
                    width: dimensions.width*0.8,
                    flexDirection: 'row',
                }}>
                    {
                        confirmInfo.lat.state === null &&
                        <>
                            <Text>lat: {confirmInfo.lat.value}</Text>
                            <Button style={styles.button} title="ok" onPress={() => setConfirmInfo({...confirmInfo, lat:true})} />
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({ ...confirmInfo, lat: { state: false, value: confirmInfo.lat.value } })} />
                        </>
                    }
                    {
                        confirmInfo.lat.state === false &&
                        <>
                            <Text>lat:</Text>
                            <TextInput value={confirmInfo.lat.value} onChangeText={(e) => {
                                setConfirmInfo({...confirmInfo, lat: { state: false, value: e }})
                            }} />
                            <Button style={styles.button} title="ok" onPress={() => {
                                setConfirmInfo({ ...confirmInfo, lat: { state: true, value: confirmInfo.lat.value } })
                            }} />
                        </>
                    }
                    {
                        confirmInfo.lat.state === true &&
                        <>
                            <Text>lat: {confirmInfo.lat.value}</Text>
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({...confirmInfo, lat: { state: false, value: confirmInfo.lat.value }})}/>
                        </>
                    }
                </View>
            </>
            {/* Date */}
            <>
                <View style={{
                    width: dimensions.width,
                    flexDirection: 'row',
                    
                }}>
                    {
                        confirmInfo.date.state === null &&
                        <>
                            <Text>date: {confirmInfo.date.value}</Text>
                            <Button style={styles.button} title="ok" onPress={() => setConfirmInfo({...confirmInfo, date:true})} />
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({ ...confirmInfo, date: { state: false, value: confirmInfo.date.value } })} />
                        </>
                    }
                    {
                        confirmInfo.date.state === false &&
                        <>
                            <Text>date:</Text>
                            <TextInput value={confirmInfo.date.value} onChangeText={(e) => {
                                setConfirmInfo({...confirmInfo, date: { state: false, value: e }})
                            }} />
                            <Button style={styles.button} title="ok" onPress={() => {
                                setConfirmInfo({ ...confirmInfo, date: { state: true, value: confirmInfo.date.value } })
                            }} />
                        </>
                    }
                    {
                        confirmInfo.date.state === true &&
                        <>
                            <Text>date: {confirmInfo.date.value}</Text>
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({...confirmInfo, date: { state: false, value: confirmInfo.date.value }})}/>
                        </>
                    }
                </View>
            </>
            <Button 
                style={styles.button}
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
    button: {
        width: 30
    }
  });