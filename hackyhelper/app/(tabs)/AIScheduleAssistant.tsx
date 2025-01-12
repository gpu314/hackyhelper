import Groq from 'groq-sdk';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import * as FileSystem from 'expo-file-system';

const VOICE = "com.apple.ttsbundle.Samantha-compact";

export default function App() {
    const hackathonName = "She Hacks";
    const hackathonDate = "January 10th to January 12th, 2024";
    const HackingStartTime = "10pm on January 10th";
    const HackingEndTime = "10am on January 12th";
    const activities = new Map();


    let content = "";
    content = `Hackathon Name: ${hackathonName}\n`;
    content += `Hackathon Date: ${hackathonDate}\n`;
    content += `Hacking start time: ${HackingStartTime}\n`;
    content += `Hacking submission deadline: ${HackingEndTime}\n`;


    const read = async () => {
        const path = FileSystem.documentDirectory + 'yourTextFile.txt';
        try {
            const content = await FileSystem.readAsStringAsync(path);
            console.log(content); // Handle the file content
        } catch (err) {
            console.error(err);
        }
    };

    content += read();



    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState([{ role: 'assistant', content: `Welcome to ${hackathonName}` }]);
    const [loading, setLoading] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);

    const client = new Groq({
        apiKey: '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',
        dangerouslyAllowBrowser: true,
    });

    const customTime = () => {
        const date = new Date();
        const estTimeZone = 'America/New_York'; // EST time zone
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            timeZone: estTimeZone,
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
        }).format(date);
        return formattedDate;
    };

    var CurrTime = customTime();

    async function aiResponse(text: string) {
        const chatCompletion = await client.chat.completions.create({
            messages: [
                { role: 'system', content: `You are a helpful personal assistant for a hackathon attendee at ${hackathonName}. Your job is to help the user keep track of activities, workshops, and submission deadlines for the hackathon. Here is some information about the hackathon\n ${content} It is currently ${CurrTime} only talk about upcoming events unless specified otherwise.` },
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


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chatbot</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your text here"
                value={inputText}
                onChangeText={setInputText}
            />
            <Button title={loading ? "Processing..." : "Submit"} onPress={handleSubmit} disabled={loading} />
            {result.map((message, index) => (
                <Text key={index}>{message.content}</Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
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
    chat: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
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
    }
});
