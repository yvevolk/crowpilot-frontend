import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Map() {
    return (
        <View style={styles.container}>
            <Text>Map</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });