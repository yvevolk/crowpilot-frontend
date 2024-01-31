import { Camera } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Capture() {

  const cameraRef = useRef();
  const [startCamera, setStartCamera] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [isPreview, setIsPreview] = useState(false)

  const accessCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  
  const onCameraReady = () => {
    setCameraReady(true)
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options)
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(false);
      }
    }
  }

  if (startCamera) {
    return (
      <View>
        <Button title="open camera" onPress={accessCamera} />
      </View>
    )
  } else {
    return (
      <View style={{flex: 1}}>
        <Camera
          ref={cameraRef}
          type="back"
          style={{flex:1}}
          onCameraReady={onCameraReady}
        >
          {cameraReady && <Button title="take" onPress={takePicture}/>}
        </Camera>
      </View>
    )
  }
}