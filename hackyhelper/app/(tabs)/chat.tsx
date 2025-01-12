import Groq from 'groq-sdk';
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Image, FlatList, ScrollView, Pressable, SafeAreaView } from 'react-native';
import * as Speech from 'expo-speech';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const VOICE = "com.apple.ttsbundle.Samantha-compact";

export default function App() {
    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState<Message[]>([
        { role: 'assistant', content: "Welcome to the hackathon!" }
    ]);
    const [loading, setLoading] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [recognizing, setRecognizing] = useState(false);
    const [transcript, setTranscript] = useState('');
    const pauseTimer = useRef<null | ReturnType<typeof setTimeout>>(null);

    const client = new Groq({
        apiKey: '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',
        dangerouslyAllowBrowser: true,
    });

    async function aiResponse(text: string) {
        const chatCompletion = await client.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a helpful assistant for a hackathon attendee. Limit your responses to three sentences unless otherwise specified.' },
                { role: 'user', content: text }
            ],
            model: 'llama3-8b-8192',
        });

        return (chatCompletion.choices[0].message.content);
    }

    const handleSubmit = async () => {
        if (!inputText.trim()) return;

        setLoading(true);

        try {
            setResult((prev) => [...prev, { role: 'user', content: inputText }]);
            const response = await aiResponse(inputText);
            setResult((prev) => [...prev, { role: 'assistant', content: response || "No response generated." }]);
            Speech.speak(response || "No response generated.", {
                voice: VOICE,
                pitch: 1.2,
                rate: 0.9,
            });
        } catch (error) {
            setResult((prev) => [...prev, { role: 'assistant', content: "Error generating response." }]);
            console.error(error);
        } finally {
            setLoading(false);
            setInputText("");
        }
    };

    const renderResult = ({ item }: { item: Message }) => {
        return (
            <View style={[(item.role === 'user') ? styles.userMessage : styles.assistantMessage]}>
                <Text>{item.content}</Text>
            </View>
        );
    };

    const urls = [
        require("../images/1.png"), require("../images/2.png"), require("../images/3.png"),
        require("../images/4.png"), require("../images/5.png"), require("../images/6.png"),
        require("../images/7.png"), require("../images/8.png"), require("../images/9.png"),
        require("../images/10.png"), require("../images/11.png"), require("../images/12.png"),
        require("../images/13.png"), require("../images/14.png"), require("../images/15.png"),
        require("../images/16.png")
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame((prevFrame) => (prevFrame + 1) % 16);
        }, 60);
        return () => clearInterval(interval);
    }, []);

    useSpeechRecognitionEvent("start", () => setRecognizing(true));
    useSpeechRecognitionEvent("end", () => { setRecognizing(false); handleSubmit(); });
    useSpeechRecognitionEvent("result", (event) => { setTranscript(event.results[0]?.transcript); setInputText(event.results[0]?.transcript); });

    const handleStartStop = async () => {
        if (recognizing) {
            ExpoSpeechRecognitionModule.stop();
        }
        else {
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
            }
            else {
                console.warn("Permissions not granted", result);
            }
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerBar}>
                <Text style={styles.headerTitle}>Duck Bot</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <FlatList
                        data={result}
                        renderItem={renderResult}
                        keyExtractor={(_, index) => index.toString()}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your text here"
                        value={inputText}
                        onChangeText={setInputText}
                    />
                    <Pressable style={styles.button} onPress={handleSubmit} disabled={loading}>
                        <Text style={styles.buttonText}>{loading ? "Processing..." : "Submit"}</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={handleStartStop}>
                        <Text style={styles.buttonText}>{recognizing ? "Stop Listening" : "Start Listening"}</Text>
                    </Pressable>

                    <View style={styles.imageWrapper}>
                        <Image source={urls[currentFrame]} style={styles.image} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerBar: {
        height: 60,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 100,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 30,
        marginTop: 30,
        color: '#2C3E50',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    input: {
        padding: 10,
        borderRadius: 5,
        textAlign: 'center'
    },
    userMessage: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#D1E7DD',
        alignSelf: 'flex-end'
    },
    assistantMessage: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#F8D7DA',
        alignSelf: 'flex-start'
    },
    imageWrapper: {
        position: 'static',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
    result: {
        marginTop: 20,
        fontSize: 16,
        color: '#333',
        textAlign: 'justify'
    },
    scrollViewContent: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    }

});
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();