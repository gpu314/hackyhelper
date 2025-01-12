import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";
import { useState, useRef } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Page() {
    const [recognizing, setRecognizing] = useState(false);
    const [transcript, setTranscript] = useState("");
    const pauseTimer = useRef<null | ReturnType<typeof setTimeout>>(null);

    useSpeechRecognitionEvent("start", () => setRecognizing(true));
    useSpeechRecognitionEvent("end", () => setRecognizing(false));
    useSpeechRecognitionEvent("result", (event) => {
        setTranscript(event.results[0]?.transcript);
    });

    const handleStartStop = async () => {
        if (recognizing) {
            ExpoSpeechRecognitionModule.stop();
        } else {
            const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
            if (result.granted) {
                ExpoSpeechRecognitionModule.start({
                    lang: "en-US",
                    interimResults: true,
                    maxAlternatives: 1,
                    continuous: true,
                    requiresOnDeviceRecognition: false,
                    addsPunctuation: false,
                });

                if (pauseTimer.current) {
                    clearTimeout(pauseTimer.current);
                }

                pauseTimer.current = setTimeout(() => {
                    ExpoSpeechRecognitionModule.stop();
                }, 3000);
            } else {
                console.warn("Permissions not granted", result);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Speech Recognition</Text>
            <Pressable style={styles.button} onPress={handleStartStop}>
                <Text style={styles.buttonText}>{recognizing ? "Stop" : "Start"}</Text>
            </Pressable>
            <Text style={styles.transcript}>{transcript}</Text>
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
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    transcript: {
        marginTop: 20,
        fontSize: 18,
        color: '#333',
    },
});
