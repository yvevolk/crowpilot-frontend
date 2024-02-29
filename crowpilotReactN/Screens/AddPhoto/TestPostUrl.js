import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Dimensions, Image} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { getC, getFraction, intermediatePoint } from '../../Coordinates/Haversine'
import { getAirportInfo, postPicture } from '../../api';
const dimensions = Dimensions.get('window')
const date = new Date()
const year = date.getFullYear()
const month = (date.getMonth() + 1).toString().length !== 2 ? `0${(date.getMonth() + 1).toString()}` : date.getMonth() + 1
const day = (date.getDate() + 1).toString().length !== 2 ? `0${(date.getDate() + 1).toString()}` : date.getDate() + 1

export default function TestPostUrl({ route, navigation }) {
    // const dimensions = Dimensions.get('screen')
    const [origCode, setOrigCode] = useState("none")
    const [destCode, setDestCode] = useState("none")
    const [depTime, setDepTime] = useState("none")
    const [arrTime, setArrTime] = useState("none")
    const [photoTime, setPhotoTime] = useState("none")
    // const [coordinates, setCoordinates] = useState([-30,0])
    const [confirmInfo, setConfirmInfo] = useState({
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
        remarks: {
            state: null,
            value: ""
        }
    })
    const { userToken } = useContext(AuthContext)
    const { photo_url } = route.params
    let data = {
        photo_url,
        location: {
            lat: 0,
            long: 0,
        },
        taken_by: userToken.username,
        photo_type: confirmInfo.type.value,
        date_taken: confirmInfo.date.value,
        flight_code: confirmInfo.code.value,
        flight_origin: origCode,
        flight_dest: destCode,
        remarks: confirmInfo.remarks.value
    }
    const handlePost = async () => {
        const origin = await getAirportInfo(origCode.toUpperCase())
        const destination = await getAirportInfo(destCode.toUpperCase())
        const c = getC([+origin.data.results[0].coordinates.lat, +origin.data.results[0].coordinates.lon], [+destination.data.results[0].coordinates.lat, +destination.data.results[0].coordinates.lon])
        const fraction = getFraction(photoTime, depTime, arrTime)
        const coord = intermediatePoint(c, [+origin.data.results[0].coordinates.lat, +origin.data.results[0].coordinates.lon], [+destination.data.results[0].coordinates.lat, +destination.data.results[0].coordinates.lon], fraction)
        data.location.lat = coord[0]
        data.location.long = coord[1]
        await postPicture(data)
        navigation.goBack();
        navigation.navigate("Map", {
            screen: "MapScreen"
        })
    }
    return (
        <View style={styles.container}>
            <Image source = {{uri: photo_url}} style = {{height: dimensions.height*0.3, width: dimensions.height*0.3}} resizeMode='contain'/>
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
            <Text>Origin code:</Text>
            <TextInput placeholder="ORIGIN ICAO" onChangeText={(e) => {
                setOrigCode(e)
            }} />
        <Text>Destination code:</Text>
            <TextInput placeholder="DESTINATION ICAO" onChangeText={(e) => {
                setDestCode(e)
            }} />
        <Text>Time of Departure: </Text>
            <TextInput placeholder="24-hour format" onChangeText={(e) => {
                setDepTime(e)
            }} />
        <Text>Time of Arrival:</Text>
            <TextInput placeholder="24-hour format" onChangeText={(e) => {
                setArrTime(e)
            }} />
        <Text>Time of Photo:</Text>
            <TextInput placeholder="24-hour format" onChangeText={(e) => {
                setPhotoTime(e)
            }} />
            
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