import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Dimensions, Image, Modal} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { getC, getFraction, intermediatePoint } from '../../Coordinates/Haversine'
import DatePicker from 'react-native-modern-datepicker';
import { getAirportInfo, getTimeZone, postPicture } from '../../api';
const dimensions = Dimensions.get('window')
const date = new Date()
const year = date.getFullYear()
const month = (date.getMonth() + 1).toString().length !== 2 ? `0${(date.getMonth() + 1).toString()}` : date.getMonth() + 1
const day = (date.getDate() + 1).toString().length !== 2 ? `0${(date.getDate() + 1).toString()}` : date.getDate() + 1

export default function TestPostUrl({ route, navigation }) {
    const [origCode, setOrigCode] = useState("none")
    const [destCode, setDestCode] = useState("none")
    const [depTime, setDepTime] = useState("none")
    const [arrTime, setArrTime] = useState("none")
    const [photoTime, setPhotoTime] = useState("none")
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
        const originTimeZone = await getTimeZone(+origin.data.results[0].coordinates.lat, +origin.data.results[0].coordinates.lon)
        const destTimeZone = await getTimeZone(+destination.data.results[0].coordinates.lat, +destination.data.results[0].coordinates.lon)
        console.log(originTimeZone, destTimeZone);
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

const [open, setOpen] = useState(false);

const handleOnPress = () => {
        setOpen(!open);
      };

    return (
        <>
        
        <Modal visible = {open}>
            <DatePicker mode="calendar"/>
            <Button title = "OK" onPress={handleOnPress}/>
        </Modal>

<Button title = "MODAL" onPress={handleOnPress}></Button>

        <View style={styles.container}>
            <Image source = {{uri: photo_url}} style = {{height: dimensions.height*0.3, width: dimensions.height*0.3}} resizeMode='contain'/>
            <Text>Flight code:</Text>
                <TextInput value={confirmInfo.code.value.toString()} onChangeText={(e) => {
                    setConfirmInfo({...confirmInfo, code: { state: false, value: e }})
                }} />
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
            <Text>date:</Text>
                <TextInput value={confirmInfo.date.value.toString()} onChangeText={(e) => {
                    setConfirmInfo({...confirmInfo, date: { state: false, value: e }})
                }} />
            <Text>Type:</Text>
                <TextInput value={confirmInfo.type.value.toString()} onChangeText={(e) => {
                    setConfirmInfo({...confirmInfo, type: { state: false, value: e }})
                }} />
            <Text>remarks:</Text>
                <TextInput value={confirmInfo.remarks.value.toString()} onChangeText={(e) => {
                    setConfirmInfo({...confirmInfo, remarks: { state: false, value: e }})
                }} />
            <Button 
                style={styles.button}
                title="Test Post"
                onPress={handlePost}
            />
        </View>
        </>
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