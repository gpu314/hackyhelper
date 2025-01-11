import { View, Text, Pressable, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Link } from 'expo-router';

export default function Page() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Map</Text>
            <MapView
                style={styles.map}
                pitchEnabled={true}
                rotateEnabled={true}
                zoomEnabled={true}
                showsBuildings={true}
                initialRegion={{
                    latitude: 43.64267098531035, 
                    longitude: -79.38706753217213,
                    latitudeDelta: 0.0015,
                    longitudeDelta: 0.0015,
                }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    map: {
        width: '100%',
        height: '75%',
    }
});
