import { StyleSheet, Image, Text, View, Dimensions, Button} from 'react-native';
'react-native-gesture-handler';
import moment from 'moment';

const PhotoCard = ({_id, photo_url, taken_by, date_taken, flight_origin, flight_dest, remarks, navigation }) => {

const dimensions = Dimensions.get('window')
const idealHW = (dimensions.width * 0.95);

    return (
        <>
        <Button 
        title="view profile" 
        onPress={()=>{
            navigation.navigate("Profile", {
                screen: 'ProfileScreen',
                params: { otherUser: taken_by },
            })
            
         }}
        />
        <View key = {`${_id}`} style = {styles.singleCard}>
        <View><Text style = {styles.postedWhen}>{moment(date_taken).fromNow()}</Text></View>
        <Image style = {{"height": idealHW, "width": idealHW,"resizeMode": "cover","borderRadius": 20}} source={{uri: `${photo_url}`}}></Image>
        <View className = 'text-section' style = {styles.textSection}>
        <Text style = {styles.header}>Passenger</Text>
        <Text>{taken_by}</Text>
        <Text style = {styles.header}>Date</Text>
        <Text>{moment(date_taken).format('DD/MM/yyyy')}</Text>
        <Text style = {styles.header}>Route</Text>
        <Text>{flight_origin} - {flight_dest}</Text>
        {remarks && (
            <View>
<Text style = {styles.header}>Remarks</Text>
<Text>{remarks}</Text>
</View>
)}
        </View>
        </View>
        </>
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
        fontWeight: 'bold',
        textTransform: 'uppercase'
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