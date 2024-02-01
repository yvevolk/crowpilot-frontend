import { StyleSheet, Image, Text, View, Dimensions} from 'react-native';
'react-native-gesture-handler';
import moment from 'moment';

const SmallPhotoCard = ({_id, photo_url, taken_by, date_taken, flight_origin, flight_dest, remarks}) => {

const dimensions = Dimensions.get('window')
const idealHW = (dimensions.width * 0.95);

    return(<>
        <View key = {`${_id}`} style = {styles.singleCard}>
            <View><Text style = {styles.postedWhen}>{moment(date_taken).fromNow()}</Text></View>
            <View style = {styles.container}>
            <View style = {styles.column}>
            <Image style = {styles.image} source={{uri: `${photo_url}`}}></Image>
            </View>
        <View style = {styles.column}>
        <Text style = {styles.header}>Date</Text>
        <Text>{moment(date_taken).format('DD/MM/yyyy')}</Text>
        <Text style = {styles.header}>Route</Text>
        <Text>{flight_origin} - {flight_dest}</Text>
        {remarks.length !== 0 && (
            <View>
<Text style = {styles.header}>Remarks</Text>
<Text>{remarks}</Text>
</View>
)}</View>
        </View>
        </View>
        </>)
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
    singleCard: {
        backgroundColor: '#FFFFFF',
        borderColor: '#CECACE',
        borderWidth: 2,
        borderStyle: 'solid',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20,
        padding: 10,
        paddingBottom: 20,
    },
    container: {
        flexDirection: 'row',
        alignContent: 'space-between',
        width: '50%'
    },
    column: {
        padding: 10,
        alignSelf: 'center'
    },
    image: {
        height: 200, 
        width: 150,
        marginLeft: 10,
        marginRight: 10,
        resizeMode: "cover",
        borderRadius: 50,
        borderColor: '#CECACE',
        borderWidth: 3,
        borderStyle: 'solid'
    }
  });

export default SmallPhotoCard;