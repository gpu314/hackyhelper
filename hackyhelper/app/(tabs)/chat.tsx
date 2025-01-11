import Groq from 'groq-sdk';

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, FlatList } from 'react-native';
import * as Speech from 'expo-speech';

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

    const client = new Groq({
        apiKey: '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',
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
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chatbot</Text>
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
            <Button title={loading ? "Processing..." : "Submit"} onPress={handleSubmit} disabled={loading} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 100,
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
});
