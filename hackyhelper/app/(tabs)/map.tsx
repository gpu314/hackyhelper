import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function Page() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('No permission');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
        })();
    }, []);

    let locationText = 'Loading location...';
    let initialRegion = {
        latitude: 43.64267098531035,
        longitude: -79.38706753217213,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0015,
    };

    if (errorMsg) {
        locationText = errorMsg;
    }
    else if (location) {
        const { latitude, longitude, altitude } = location.coords;
        locationText = `Latitude: ${latitude.toFixed(4)}\nLongitude: ${longitude.toFixed(4)}\nAltitude: ${altitude ? altitude.toFixed(1) : '0.0'} meters above sea level`;
        initialRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.0015,
            longitudeDelta: 0.0015,
        };
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Map</Text>
            <Text style={styles.locationText}>{locationText}</Text>
            <MapView
                style={styles.map}
                pitchEnabled={true}
                rotateEnabled={true}
                zoomEnabled={true}
                showsBuildings={true}
                initialRegion={initialRegion}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 100,
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    locationText: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
