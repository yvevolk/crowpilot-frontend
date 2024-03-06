import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Dimensions, Image, Modal} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { getC, getFraction, intermediatePoint } from '../../Coordinates/Haversine'
import DatePicker from 'react-native-modern-datepicker';
import { getAirportInfo, getTimeZone, postPicture } from '../../api';
import moment from 'moment'
import { ScrollView } from 'react-native-gesture-handler';
const dimensions = Dimensions.get('window')

const todayDate = moment(new Date).format('yyyy-MM-DD')

export default function TestPostUrl({ route, navigation }) {
    const { userToken } = useContext(AuthContext)
    const { photo_url } = route.params
    const [dateTaken, setDateTaken] = useState("")
    const [postData] = useState({
        photo_url,
        location: {
            lat: 0,
            long: 0,
        },
        taken_by: userToken.username,
        photo_type: "",
        date_taken: dateTaken,
        flight_code: "",
        flight_origin: "",
        flight_dest: "",
        remarks: ""
    })

    let photoTime = "00:00"
    
    let data = {
        photo_url,
        location: {
            lat: 0,
            long: 0,
        },
        taken_by: userToken.username,
        photo_type: "",
        date_taken: "",
        flight_code: "",
        flight_origin: "",
        flight_dest: "",
        remarks: ""
    }

    console.log(postData)

    const handlePost = async () => {
        // const origin = await getAirportInfo(origCode.toUpperCase())
        // const destination = await getAirportInfo(destCode.toUpperCase())
        // const originTimeZone = await getTimeZone(+origin.data.results[0].coordinates.lat, +origin.data.results[0].coordinates.lon)
        // const destTimeZone = await getTimeZone(+destination.data.results[0].coordinates.lat, +destination.data.results[0].coordinates.lon)
        // console.log(originTimeZone, destTimeZone);
        // const c = getC([+origin.data.results[0].coordinates.lat, +origin.data.results[0].coordinates.lon], [+destination.data.results[0].coordinates.lat, +destination.data.results[0].coordinates.lon])
        // const fraction = getFraction(photoTime, depTime, arrTime)
        // const coord = intermediatePoint(c, [+origin.data.results[0].coordinates.lat, +origin.data.results[0].coordinates.lon], [+destination.data.results[0].coordinates.lat, +destination.data.results[0].coordinates.lon], fraction)
        // data.location.lat = coord[0]
        // data.location.long = coord[1]
        await postPicture(postData)
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
        <ScrollView>
        
        <Modal visible = {open}
               animationType="slide"
               >
            <DatePicker mode="calendar"
             maximumDate={todayDate}
             onSelectedChange={(date) => {postData.date_taken = date.replaceAll("/", "-")}}/>
            <Button title = "OK" onPress={handleOnPress}/>
        </Modal>

        <View style={styles.container}>
            <Image source = {{uri: photo_url}} style = {{height: dimensions.height*0.3, width: dimensions.height*0.3}} resizeMode='contain'/>
            <View style = {styles.category}>
            <Text>Flight code:</Text>
                <TextInput style = {styles.textEntry}
                placeholder = 'e.g. BA1234'
                defaultValue= ''
                onChangeText={(value) => {postData.flight_code = value}}
                />
                </View>
                <View style = {styles.category}>
            <Text>Flight origin:</Text>
                <TextInput style = {styles.textEntry}
                placeholder = 'e.g. LHR'
                defaultValue= ''
                onChangeText={(value) => {postData.flight_origin = value}}
                />
                </View>
                <View style = {styles.category}>
            <Text>Flight destination:</Text>
                <TextInput style = {styles.textEntry}
                placeholder = 'e.g. JFK'
                defaultValue= ''
                onChangeText={(value) => {postData.flight_dest = value}}
                />
                </View>
                <View style = {styles.category}>
            <Text>Flight date: {dateTaken ? dateTaken : todayDate}</Text>
                <Button title = "Select date" onPress={handleOnPress}/>
                </View>    
                <View style = {styles.category}>
            <Text>Time of departure:</Text>
                <TextInput style = {styles.textEntry}
                placeholder = 'e.g. 12:00'
                defaultValue= ''
                onChangeText={(value) => {depTime = value}}
                />
                </View>
                <View style = {styles.category}>
            <Text>Time of arrival:</Text>
                <TextInput style = {styles.textEntry}
                placeholder = 'e.g. 17:00'
                defaultValue= ''
                onChangeText={(value) => {arrTime = value}}
                />
                </View>
                <View style = {styles.category}>
            <Text>Time of photo:</Text>
                <TextInput style = {styles.textEntry}
                placeholder = 'e.g. 12:30'
                defaultValue= ''
                onChangeText={(value) => {photoTime = value}}
                />
                </View>
                <View style = {styles.category}>
            <Text>Type of photo:</Text>
                <TextInput style = {styles.textEntry}
                placeholder = 'e.g. air'
                defaultValue= ''
                onChangeText={(value) => {postData.photo_type = value}}
                />
                </View>
                <View style = {styles.category}>
            <Text>Remarks:</Text>
                <TextInput style = {styles.textEntry}
                placeholder = 'e.g. Hello from above!'
                defaultValue= ''
                multiline = {true}
                onChangeText={(value) => {postData.remarks = value}}
                />
                </View>

            <Button 
                style={styles.button}
                title="Test Post"
                onPress={handlePost}
            />
        </View>
        </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: '5%',
        marginBottom: '5%'
    },
    button: {
        width: 30
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
  });