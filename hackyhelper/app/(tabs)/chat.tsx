import Groq from 'groq-sdk';

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function App() {
    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const client = new Groq({
        apiKey: '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', // This is the default and can be omitted
    });

    async function aiResponse(text: string) {
        const chatCompletion = await client.chat.completions.create({
            messages: [
                {role: 'system', content: 'You are a helpful assistant for a hackathon attendee. Limit your responses to three sentences unless otherwise specified.'},
                { role: 'user', content: text }
            ],
            model: 'llama3-8b-8192',
        });

        return (chatCompletion.choices[0].message.content);
    }

    const handleSubmit = async () => {
        if (!inputText.trim()) return;

        setLoading(true);
        setResult('');

        try {
            const response = await aiResponse(inputText);
            setResult(response || "No response generated.");
        } catch (error) {
            setResult('Error generating response.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter your text here"
                value={inputText}
                onChangeText={setInputText}
            />
            <Button title={loading ? "Processing..." : "Submit"} onPress={handleSubmit} disabled={loading} />
            {result !== '' && <Text style={styles.result}>{result}</Text>}
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
    input: {
        height: 40,
    }
});
