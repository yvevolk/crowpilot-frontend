import { StyleSheet, Image, Text, View, Button, Dimensions} from 'react-native';
'react-native-gesture-handler';
import {format, formatDistanceToNow } from 'date-fns'

const PhotoCard = ({_id, photo_url, taken_by, date_taken, flight_origin, flight_dest, remarks}) => {

const dimensions = Dimensions.get('window')
const idealHW = (dimensions.width * 0.95);

    return(
        <View key = {`${_id}`} style = {styles.singleCard}>
            <View><Text style = {styles.postedWhen}>{formatDistanceToNow(date_taken)} ago</Text></View>
            <Image style = {{"height": idealHW, "width": idealHW,"resizeMode": "cover","borderRadius": 20}} source={{uri: `${photo_url}`}}></Image>
        <View className = 'text-section' style = {styles.textSection}>
        <Text style = {styles.header}>PASSENGER</Text>
        <Text>{taken_by}</Text>
        <Text style = {styles.header}>DATE</Text>
        <Text>{format(date_taken, 'dd/MM/yyyy')}</Text>
        <Text style = {styles.header}>ROUTE</Text>
        <Text>{flight_origin} - {flight_dest}</Text>
        {remarks.length !== 0 && (
            <View>
<Text style = {styles.header}>REMARKS</Text>
<Text>{remarks}</Text>
</View>
)}
        </View>
        </View>
        )
}

const styles = StyleSheet.create({
    postedWhen: {
        textAlign: 'right',
        fontStyle: 'italic',
        paddingRight: 10,
        paddingBottom: 10
    },
    header: {
        fontWeight: 'bold'
    },
    textSection: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
        marginBottom: 10
    },
    singleCard: {
        backgroundColor: '#CECACE',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20,
        padding: 10
    },
    colContainer: {
        outlineColor: 'red',
        outlineStyle: 'solid',
        outlineWidth: 10,
        flex: 1,
        alignContent: 'space-around'
    },
    singleCol: {
        flex: 1
    },
  });

export default PhotoCard;