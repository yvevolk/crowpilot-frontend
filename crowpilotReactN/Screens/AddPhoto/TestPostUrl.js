import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Dimensions } from 'react-native';
import axios from "axios"
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
const dimensions = Dimensions.get('window')
const date = new Date()
const year = date.getFullYear()
const month = (date.getMonth() + 1).toString().length !== 2 ? `0${(date.getMonth() + 1).toString()}` : date.getMonth() + 1
const day = (date.getDate() + 1).toString().length !== 2 ? `0${(date.getDate() + 1).toString()}` : date.getDate() + 1

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
            value: `${year}-${month}-${day}`
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
        remarks: {
            state: null,
            value: ""
        }
    })
    const { userToken } = useContext(AuthContext)
    const { photo_url } = route.params
    let data = {
        location: {
            lat: confirmInfo.lat.value,
            long: confirmInfo.long.value
        },
        photo_url,
        taken_by: userToken.username,
        photo_type: confirmInfo.type.value,
        date_taken: confirmInfo.date.value,
        flight_code: confirmInfo.code.value,
        flight_origin: confirmInfo.origin.value,
        flight_dest: confirmInfo.dest.value,
        remarks: confirmInfo.remarks.value
    }
    const handlePost = () => {
        axios.post("https://crowpilot.onrender.com/api/photos", data)
            .then(response => {
                Alert.alert("", "Photo has been submitted successfully.", [
                    {
                        text: "Roger.",
                        onPress: navigation.navigate("Timeline")
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
                            <Button style={styles.button} title="ok" onPress={() => setConfirmInfo({...confirmInfo, lat: { state: true, value: confirmInfo.lat.value }})} />
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({ ...confirmInfo, lat: { state: false, value: confirmInfo.lat.value } })} />
                        </>
                    }
                    {
                        confirmInfo.lat.state === false &&
                        <>
                            <Text>lat:</Text>
                            <TextInput value={confirmInfo.lat.value.toString()} onChangeText={(e) => {
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
                <View style={{
                    width: dimensions.width*0.8,
                    flexDirection: 'row',
                }}>
                    {
                        confirmInfo.long.state === null &&
                        <>
                            <Text>long: {confirmInfo.long.value}</Text>
                            <Button style={styles.button} title="ok" onPress={() => setConfirmInfo({...confirmInfo, long: { state: true, value: confirmInfo.long.value }})} />
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({ ...confirmInfo, long: { state: false, value: confirmInfo.long.value } })} />
                        </>
                    }
                    {
                        confirmInfo.long.state === false &&
                        <>
                            <Text>long:</Text>
                            <TextInput value={confirmInfo.long.value.toString()} onChangeText={(e) => {
                                setConfirmInfo({...confirmInfo, long: { state: false, value: e }})
                            }} />
                            <Button style={styles.button} title="ok" onPress={() => {
                                setConfirmInfo({ ...confirmInfo, long: { state: true, value: confirmInfo.long.value } })
                            }} />
                        </>
                    }
                    {
                        confirmInfo.long.state === true &&
                        <>
                            <Text>long: {confirmInfo.long.value}</Text>
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({...confirmInfo, long: { state: false, value: confirmInfo.long.value }})}/>
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
                            <Button style={styles.button} title="ok" onPress={() => setConfirmInfo({...confirmInfo, date: { state: true, value: confirmInfo.date.value }})} />
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({ ...confirmInfo, date: { state: false, value: confirmInfo.date.value } })} />
                        </>
                    }
                    {
                        confirmInfo.date.state === false &&
                        <>
                            <Text>date:</Text>
                            <TextInput value={confirmInfo.date.value.toString()} onChangeText={(e) => {
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
            {/* Photo Type */}
            <>
                <View style={{
                    width: dimensions.width,
                    flexDirection: 'row',
                    
                }}>
                    {
                        confirmInfo.type.state === null &&
                        <>
                            <Text>type: {confirmInfo.type.value}</Text>
                            <Button style={styles.button} title="ok" onPress={() => setConfirmInfo({...confirmInfo, type: { state: true, value: confirmInfo.type.value }})} />
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({ ...confirmInfo, type: { state: false, value: confirmInfo.type.value } })} />
                        </>
                    }
                    {
                        confirmInfo.type.state === false &&
                        <>
                            <Text>type:</Text>
                            <TextInput value={confirmInfo.type.value.toString()} onChangeText={(e) => {
                                setConfirmInfo({...confirmInfo, type: { state: false, value: e }})
                            }} />
                            <Button style={styles.button} title="ok" onPress={() => {
                                setConfirmInfo({ ...confirmInfo, type: { state: true, value: confirmInfo.type.value } })
                            }} />
                        </>
                    }
                    {
                        confirmInfo.type.state === true &&
                        <>
                            <Text>type: {confirmInfo.type.value}</Text>
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({...confirmInfo, type: { state: false, value: confirmInfo.type.value }})}/>
                        </>
                    }
                </View>
            </>
            {/* Flight Code */}
            <>
                <View style={{
                    width: dimensions.width,
                    flexDirection: 'row',
                    
                }}>
                    {
                        confirmInfo.code.state === null &&
                        <>
                            <Text>code: {confirmInfo.code.value}</Text>
                            <Button style={styles.button} title="ok" onPress={() => setConfirmInfo({...confirmInfo, code: { state: true, value: confirmInfo.code.value }})} />
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({ ...confirmInfo, code: { state: false, value: confirmInfo.code.value } })} />
                        </>
                    }
                    {
                        confirmInfo.code.state === false &&
                        <>
                            <Text>code:</Text>
                            <TextInput value={confirmInfo.code.value.toString()} onChangeText={(e) => {
                                setConfirmInfo({...confirmInfo, code: { state: false, value: e }})
                            }} />
                            <Button style={styles.button} title="ok" onPress={() => {
                                setConfirmInfo({ ...confirmInfo, code: { state: true, value: confirmInfo.code.value } })
                            }} />
                        </>
                    }
                    {
                        confirmInfo.code.state === true &&
                        <>
                            <Text>code: {confirmInfo.code.value}</Text>
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({...confirmInfo, code: { state: false, value: confirmInfo.code.value }})}/>
                        </>
                    }
                </View>
            </>
            {/* Flight Origin */}
            <>
                <View style={{
                    width: dimensions.width,
                    flexDirection: 'row',
                    
                }}>
                    {
                        confirmInfo.origin.state === null &&
                        <>
                            <Text>origin: {confirmInfo.origin.value}</Text>
                            <Button style={styles.button} title="ok" onPress={() => setConfirmInfo({...confirmInfo, origin: { state: true, value: confirmInfo.origin.value }})} />
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({ ...confirmInfo, origin: { state: false, value: confirmInfo.origin.value } })} />
                        </>
                    }
                    {
                        confirmInfo.origin.state === false &&
                        <>
                            <Text>origin:</Text>
                            <TextInput value={confirmInfo.origin.value.toString()} onChangeText={(e) => {
                                setConfirmInfo({...confirmInfo, origin: { state: false, value: e }})
                            }} />
                            <Button style={styles.button} title="ok" onPress={() => {
                                setConfirmInfo({ ...confirmInfo, origin: { state: true, value: confirmInfo.origin.value } })
                            }} />
                        </>
                    }
                    {
                        confirmInfo.origin.state === true &&
                        <>
                            <Text>origin: {confirmInfo.origin.value}</Text>
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({...confirmInfo, origin: { state: false, value: confirmInfo.origin.value }})}/>
                        </>
                    }
                </View>
            </>
            {/* Flight Dest */}
            <>
                <View style={{
                    width: dimensions.width,
                    flexDirection: 'row',
                    
                }}>
                    {
                        confirmInfo.dest.state === null &&
                        <>
                            <Text>dest: {confirmInfo.dest.value}</Text>
                            <Button style={styles.button} title="ok" onPress={() => setConfirmInfo({...confirmInfo, dest: { state: true, value: confirmInfo.dest.value }})} />
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({ ...confirmInfo, dest: { state: false, value: confirmInfo.dest.value } })} />
                        </>
                    }
                    {
                        confirmInfo.dest.state === false &&
                        <>
                            <Text>dest:</Text>
                            <TextInput value={confirmInfo.dest.value.toString()} onChangeText={(e) => {
                                setConfirmInfo({...confirmInfo, dest: { state: false, value: e }})
                            }} />
                            <Button style={styles.button} title="ok" onPress={() => {
                                setConfirmInfo({ ...confirmInfo, dest: { state: true, value: confirmInfo.dest.value } })
                            }} />
                        </>
                    }
                    {
                        confirmInfo.dest.state === true &&
                        <>
                            <Text>dest: {confirmInfo.dest.value}</Text>
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({...confirmInfo, dest: { state: false, value: confirmInfo.dest.value }})}/>
                        </>
                    }
                </View>
            </>
            {/* Remarks */}
            <>
                <View style={{
                    width: dimensions.width,
                    flexDirection: 'row',
                    
                }}>
                    {
                        confirmInfo.remarks.state === null &&
                        <>
                            <Text>remarks: {confirmInfo.remarks.value}</Text>
                            <Button style={styles.button} title="ok" onPress={() => setConfirmInfo({...confirmInfo, remarks: { state: true, value: confirmInfo.remarks.value }})} />
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({ ...confirmInfo, remarks: { state: false, value: confirmInfo.remarks.value } })} />
                        </>
                    }
                    {
                        confirmInfo.remarks.state === false &&
                        <>
                            <Text>remarks:</Text>
                            <TextInput value={confirmInfo.remarks.value.toString()} onChangeText={(e) => {
                                setConfirmInfo({...confirmInfo, remarks: { state: false, value: e }})
                            }} />
                            <Button style={styles.button} title="ok" onPress={() => {
                                setConfirmInfo({ ...confirmInfo, remarks: { state: true, value: confirmInfo.remarks.value } })
                            }} />
                        </>
                    }
                    {
                        confirmInfo.remarks.state === true &&
                        <>
                            <Text>remarks: {confirmInfo.remarks.value}</Text>
                            <Button style={styles.button} title="edit" onPress={() => setConfirmInfo({...confirmInfo, remarks: { state: false, value: confirmInfo.remarks.value }})}/>
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