import React from "react";
import { StyleSheet } from "react-native";
import Video from "react-native-video";

export default VideoBg = ({source})  => {
    return (
        <Video
        resizeMode="cover"
        muted = {"true"}
        repeat
        styles = {styles.backgroundVideo}
        source = {(require('../assets/flightvideo.mp4'))}/>
    )
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
    }
})