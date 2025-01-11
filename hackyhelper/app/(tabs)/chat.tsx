import Groq from 'groq-sdk';

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';

export default function App() {
    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);

    const client = new Groq({
        apiKey: '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', // This is the default and can be omitted
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

        return () => clearInterval(interval); // Clean up on component unmount
    }, []);


    return (
        <View style={styles.container} >
            <Text style={styles.title}> Chatbot </Text>
            < View style={styles.chat} >
                <TextInput
                    style={styles.input}
                    placeholder="Enter your text here"
                    value={inputText}
                    onChangeText={setInputText}
                />
                <Button title={loading ? "Processing..." : "Submit"} onPress={handleSubmit} disabled={loading} />
                {result !== '' && <Text style={styles.result}> {result} </Text>
                }
                <View style={styles.imageWrapper}>
                    <Image source={urls[currentFrame]} style={styles.image} />
                </View>
            </View>

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
        textAlign: 'center'
    },
    chat: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    imageWrapper: {
        position: 'absolute',
        top: 400,
        right: 725,
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
    }
});