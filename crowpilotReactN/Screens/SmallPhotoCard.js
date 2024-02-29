import { StyleSheet, Image, Text, View, Dimensions, TouchableOpacity, Modal, Button } from 'react-native';
'react-native-gesture-handler';
import { useState } from 'react';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
const dimensions = Dimensions.get('window')
const idealHW = (dimensions.width * 0.95);

const SmallPhotoCard = ({_id, photo_url, taken_by, date_taken, flight_origin, flight_dest, remarks, onMap}) => {

const navigation = useNavigation()
const [showModal, setShowModal] = useState(false);
const toggleModal = () => {setShowModal(!showModal)};

    return(
    <>
        <View key = {`${_id}`} style = {styles.singleCard}>
            <View style = {styles.header}>
            <Text style = {styles.takenWhen}>{moment(date_taken).fromNow()}</Text>
            </View>
            <View style = {styles.container}>
            <View style = {styles.column}>
            <TouchableOpacity onPress={toggleModal}>
            <Image style = {styles.image} source={{uri: `${photo_url}`}}/>
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
            </View>
        <View style = {styles.column}>
        {taken_by && (
        <View>
            <Text style = {styles.heading}>Passenger</Text>
            <Text onPress = {() => {
                setVisible(false);
                navigation.navigate("Map", {
                    screen: 'MapProfileScreen',
                    params: { taken_by }
                })
            }}>{taken_by}</Text>
        </View>
        )}
        <Text style = {styles.heading}>Date</Text>
        <Text>{moment(date_taken).format('DD/MM/yyyy')}</Text>
        <Text style = {styles.heading}>Route</Text>
        <Text>{flight_origin} - {flight_dest}</Text>
        {remarks.length !== 0 && (
            <View>
<Text style = {styles.heading}>Remarks</Text>
<Text>{remarks}</Text>
</View>
)}</View>
        </View>
        </View>
        </>)
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
    },
     takenWhen: {
     fontStyle: 'italic',
     textAlign: 'right',
     paddingRight: 10,
    },
    heading: {
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    singleCard: {
        backgroundColor: '#FFFFFF',
        borderColor: '#CECACE',
        borderWidth: 2,
        borderStyle: 'solid',
        width: idealHW,
        margin: 10,
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
        height: (idealHW*0.6), 
        width: (idealHW*0.4),
        marginLeft: 10,
        marginRight: 10,
        resizeMode: "cover",
        borderRadius: 50,
        borderColor: '#CECACE',
        borderWidth: 3,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    modalContainer: {
        flex: 1
    }
  });

export default SmallPhotoCard;