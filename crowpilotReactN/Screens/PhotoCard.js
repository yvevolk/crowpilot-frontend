import { StyleSheet, Image, Text, View, Dimensions, TouchableOpacity, Modal, Button } from 'react-native';
'react-native-gesture-handler';
import { useState } from 'react';
import moment from 'moment';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';

const PhotoCard = ({_id, photo_url, taken_by, date_taken, flight_origin, flight_dest, remarks, coordinates, navigation }) => {

const [showModal, setShowModal] = useState(false);
const toggleModal = () => {setShowModal(!showModal)};
    

const dimensions = Dimensions.get('screen')
const idealHW = (dimensions.width * 0.95);

    return (
        <>
        <View key = {`${_id}`} style = {styles.singleCard}>
        <View>
            <Text style = {styles.postedWhen}>{moment(date_taken).fromNow()}</Text></View>
            <TouchableOpacity onPress={toggleModal}>
                <Image style = {{height: idealHW, width: idealHW,resizeMode: "cover", borderRadius: 20}} source={{uri: `${photo_url}`}}/>
            </TouchableOpacity>
            <Modal transparent = {true} visible = {showModal} animationType='fade' >
                <View style = {styles.modalContainer}>
                <ReactNativeZoomableView
                minZoom = {0.5}
                maxZoom = {5}
                >
            <Image source = {{uri: photo_url}} style = {{height: dimensions.height, width: dimensions.height}} resizeMode='contain'/>
            </ReactNativeZoomableView>
            <Button title = "Close" onPress={toggleModal}/>
            </View>
            </Modal>
       <View className = 'text-section' style = {styles.textSection}>
        <Text style = {styles.header}>Passenger</Text>
        <Text onPress={()=>{
            navigation.navigate("Timeline", {
                screen: 'UserProfile',
                params: { taken_by }
            }) 
         }}>{taken_by}</Text>
        <Text style = {styles.header}>Date</Text>
        <Text>{moment(date_taken).format('DD/MM/yyyy')}</Text>
        <Text style = {styles.header}>Route</Text>
        <Text style = {{textTransform: 'uppercase'}}>{flight_origin} - {flight_dest}</Text>
        <Text>{coordinates.lat},{coordinates.long}</Text>
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
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    }
  });

export default PhotoCard;