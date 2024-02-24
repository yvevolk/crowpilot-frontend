import { useEffect, useState } from 'react'
import {airports} from '../../Coordinates/Airports'
import { Button, Text, TextInput, View } from 'react-native'
import {getC, getFraction, intermediatePoint} from '../../Coordinates/Haversine'
export default function MapData() {
    const [origCode, setOrigCode] = useState("none")
    const [destCode, setDestCode] = useState("none")
    const [depTime, setDepTime] = useState("none")
    const [arrTime, setArrTime] = useState("none")
    const [photoTime, setPhotoTime] = useState("none")
    const [coordinates, setCoordinates] = useState(null)

    function handleCalc() {
        const c =  getC(airports[origCode], airports[destCode])
        const fraction = getFraction(photoTime, depTime, arrTime)
        const coord = intermediatePoint(c, airports[origCode], airports[destCode], fraction)
        setCoordinates(coord)
    }
    return (
    <View>
        <Text>Origin code:</Text>
            <TextInput placeholder="ORIGIN ICAO" onChangeText={(e) => {
                console.log(e);
                setOrigCode(e)
            }} />
        <Text>Destination code:</Text>
            <TextInput placeholder="DESTINATION ICAO" onChangeText={(e) => {
                console.log(e);
                setDestCode(e)
            }} />
        <Text>Time of Departure: </Text>
            <TextInput placeholder="24-hour format" onChangeText={(e) => {
                console.log(e);
                setDepTime(e)
            }} />
        <Text>Time of Arrival:</Text>
            <TextInput placeholder="24-hour format" onChangeText={(e) => {
                console.log(e);
                setArrTime(e)
            }} />
        <Text>Time of Photo:</Text>
            <TextInput placeholder="24-hour format" onChangeText={(e) => {
                console.log(e);
                setPhotoTime(e)
            }} />
        <Button title="Calculate" onPress={handleCalc}/>
            {coordinates && <Text>{coordinates[0]}, {coordinates[1]}</Text>}
    </View>
    )
}