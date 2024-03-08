import { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Dimensions, Image, Modal, Switch} from 'react-native';
import { AuthContext } from '../../Contexts/AuthContext';
import { getC, getFraction, intermediatePoint } from '../../Coordinates/Haversine'
import DatePicker from 'react-native-modern-datepicker';
import { getAirportInfo, getTimeZone, postPicture } from '../../api';
import moment from 'moment'
import { ScrollView } from 'react-native-gesture-handler';
const dimensions = Dimensions.get('window')
import Loader from '../Loader'

const todayDate = moment(new Date).format('yyyy-MM-DD')

export default function TestPostUrl({ route, navigation }) {
    const { userToken } = useContext(AuthContext)
    const { data } = route.params;

    const [postData] = useState({
        photo_url: "",
        location: {
            lat: 0,
            long: 0,
        },
        taken_by: userToken.username,
        photo_type: "air",
        date_taken: todayDate,
        flight_code: "",
        flight_origin: "",
        flight_dest: "",
        remarks: ""
    })

const [times] = useState({
    arrTime: "",
    depTime: "",
    photoTime: ""
})

const validatePost = () => {
        if (!postData.flight_code){
            Alert.alert("", "Please enter a flight code.", [
                {text: "Roger."}
            ])
        }
        else if (!postData.flight_origin){
            Alert.alert("", "Please enter the airport code for your flight origin.", [
                {text: "Roger."}
            ])
        }
        else if (!postData.flight_dest){
            Alert.alert("", "Please enter the airport code for your flight destination.", [
                {text: "Roger."}
            ])
        }
        else if (!times.arrTime){
            Alert.alert("", "Please enter an arrival time. This does not need to be exact.", [
                {text: "Roger."}
            ])
        }
        else if (!times.depTime){
            Alert.alert("", "Please enter a departure time. This does not need to be exact.", [
                {text: "Roger."}
            ])
        }
        else if (!times.photoTime){
            Alert.alert("", "Please enter the time the photo was taken.", [
                {text: "Roger."}
            ])
        }
        else {
            setIsLoading(true)
            handlePost().then(() => {
              setIsLoading(false)
            })
        }
    }

    const handlePost = async () => {

        //needs to be updated to reflect new variable names!!!

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
        await fetch(process.env.EXPO_PUBLIC_CLOUDINARY_URL, {
        method: 'post',
        body: data
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data.secure_url)
            postData.photo_url = data.secure_url
        })
        await postPicture(postData)
        navigation.goBack();
        navigation.navigate("Map", {
            screen: "MapScreen"
        })
    }

const [openDate, setOpenDate] = useState(false);
const [openTime, setOpenTime] = useState(false)
const [enabled, setIsEnabled] = useState(false);
const [isLoading, setIsLoading] = useState(false)

const handleOnPressDate = () => {
        setOpenDate(!openDate);
      };

const handleOnPressTime = () => {
        setOpenTime(!openTime);
      };

const toggleSwitch = () => {setIsEnabled(!enabled)
        if (enabled) {
            postData.photo_type = "air"
        }
        else {
            postData.photo_type = "land"
        }}      

if (isLoading){
    return (
        <Loader
        params = "Post"/>
    )
}

    return (
        <>
        <Modal visible = {openDate}
               animationType="slide"
               transparent={true}
               >
                <View style = {styles.modalContainer}>
            <DatePicker mode="calendar"
             maximumDate={todayDate}
             onSelectedChange={(date) => {postData.date_taken = date.replaceAll("/", "-")}}/>
            <Button title = "OK" onPress={handleOnPressDate}/>
            </View>
        </Modal>

        <Modal visible = {openTime}
               animationType="slide"
               transparent={true}
               >
                <View style = {styles.modalContainer}>
            <DatePicker mode="time"
             onSelectedChange={(time) => {times.depTime = time}}/>
            <Button title = "OK" onPress={handleOnPressTime}/>
            </View>
        </Modal>
      

        <ScrollView>
        <View style={styles.container}>
            <Image source = {{uri: data._parts[0][1].uri}} style = {{height: dimensions.height*0.3, width: dimensions.height*0.3}} resizeMode='contain'/>
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
            <Text>Flight date: {postData.date_taken ? moment(postData.date_taken).format('DD/MM/yyyy') : moment(todayDate).format('DD/MM/yyyy')}</Text>
                <Button title = "Select date" onPress={handleOnPressDate}/>
                </View>    
                <View style = {styles.category}>
            <Text>Time of departure: {times.depTime ? times.depTime : moment(Date.now()).format('HH:mm')}</Text>
            <TextInput style = {styles.textEntry}
                placeholder = 'e.g. 17:00'
                defaultValue= ''
                onChangeText={(value) => {times.depTime = value}}
                />
            {/* <Button title = "Select departure time" onPress={handleOnPressTime}/> */}
                </View>
                <View style = {styles.category}>
            <Text>Time of arrival:</Text>
                <TextInput style = {styles.textEntry}
                placeholder = 'e.g. 17:00'
                defaultValue= ''
                onChangeText={(value) => {times.arrTime = value}}
                />
                </View>
                <View style = {styles.category}>
            <Text>Time of photo:</Text>
                <TextInput style = {styles.textEntry}
                placeholder = 'e.g. 12:30'
                defaultValue= ''
                onChangeText={(value) => {times.photoTime = value}}
                />
                </View>
                <View style = {styles.category}>
                <Text>Type of photo:</Text>
                </View>

                <View style={styles.switchContainer}>
                <Text style = {styles.switchLabel}>Air</Text>
                <Switch
                style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
                value={enabled}
                onValueChange={toggleSwitch}
                thumbColor={enabled ? 'gray' : 'skyblue'}
                trackColor={enabled ? 'skyblue' : 'gray'}
                />
                <Text style = {styles.switchLabel}>Land</Text>
                </View>

                <View style = {styles.category}>
            <Text>Remarks:</Text>
                <TextInput style = {styles.textEntry}
                placeholder = 'e.g. Hello from above!'
                defaultValue= ''
                onChangeText={(value) => {postData.remarks = value}}
                />
                </View>

            <Button 
                style={styles.button}
                title="Test Post"
                onPress={validatePost}
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
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: "center",
    },
    switchContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
    },
    switchLabel:{
        marginHorizontal: '10%',
    }
  });