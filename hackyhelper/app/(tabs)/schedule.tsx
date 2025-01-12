import Groq from 'groq-sdk';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import * as FileSystem from 'expo-file-system';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';


interface Message {
    role: 'user' | 'assistant';
    content: string;
}

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


    // const read = async () => {
    //     const path = 'info.txt';
    //     try {
    //         const content = await FileSystem.readAsStringAsync(path);
    //         console.log(content); // Handle the file content
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    content += `# SheHacks+ 9 Hacker Package

# 👋🏼 **Welcome Hackers!**

This handbook is where you can find all the information and resources related to SheHacks+ 9. As we prepare for an epic weekend on **January 10-12th, 2025** we will continue to update this site, so stay tuned!

---


# 🔭 About SheHacks+ 9

The Women in Technology Society (WITS+) is so excited to have you! We are a community of supportive, innovative women* with a mission for amplifying diverse leadership in technology. At WITS+, we provide a supportive community for developing the skills, experiences, and industry connections necessary to harness the power of technology. Our team at WITS+ is here to support you in your journey through the tech world. We’ve designed SheHacks+ 9 to accommodate a variety of backgrounds, regardless of experience level. 

SheHacks+ will be in-person. To get started, review this entire package, ask questions, and most importantly, have fun!


### 🔗 **Quick Links**

💬 Slack: https://join.slack.com/t/shehacks9/shared_invite/zt-2xam9lsgx-KXoszgjkyYATLeAvQb6VtQ

🖱 Website: https://shehacks.ca/

💫 DoraHacks Submission: https://dorahacks.io/hackathon/shehacks-9/

### 📞 Contact Us

If at any time you face any questions or concerns, please contact us via Slack **#questions** or e-mail us at:   

✉️ wits.uwo@gmail.com

In the event no organizer is reachable and there is an emergency, contact campus police at 

519-661-3300,

For emergencies you can also contactt:

343-453 -4532, or email at: incident@mlh.io

---


📋 **Table of Contents**

### 💼 What to Bring

**Bring your enthusiasm and the items below and we’ll take care of the rest.**

- Personal ID (Student ID/Driver’s License)
- Tech (laptop, phone, chargers, etc.)
- Toiletries (soap, toothpaste, toothbrush, deodorant, etc.)
- Reusable Water Bottle (water bottles will not be provided)
- Comfortable Clothing
- Sleeping Bag
- Pillows

**Free breakfast, lunch, snacks, and dinner** throughout the hackathon. A more detailed schedule will be sent out closer to the date, so keep an eye on your email for that!

### ✨ Wellness at SheHacks+

Our goal at SheHacks+ is to provide an educative and fun experience for all our hackers. You are NOT expected to hack for 36 hours straight. Please set aside time to take necessary breaks and to sleep! This is very important and will help keep you energized and productive throughout the weekend. 

We'll also be hosting a variety of fun activities for you to participate in whenever you need a break. Join us regularly throughout the weekend to not only refuel but also win fun challenges and prizes! 

### 🛡️ Safety

SheHacks+ is designed to be a safe and inclusive space for all our hackers. Reach out to any WITS+ executive in-person or on Slack if you feel unsafe at any time.

Members of WITS+ and volunteers will be in blue shirts and mentors will be in red shirts. All hackers will be in lighter green shirts and will receive a badge that must be worn at every SheHacks+ event.

### 📡 Wi-Fi

If you are attending from outside Western, the wifi login details are as follows:

Network Name: Shehacks

Network Key: Sh3H@cks2025

If there are any issues connecting, please reach out to an Organizer on Slack!

---


# 💬 Using Slack for Communications (Regular)

<aside>
🍎 All announcements, live updates, mentorship sign-ups, and team-forming opportunities will be communicated through this channel! 
Learn how to use Slack with this link: https://slack.com/help/articles/360059928654-How-to-use-Slack--your-quick-start-guide

Learn how we use Slack in organizations video link: https://www.youtube.com/watch?v=SxoE7ehQc-8

</aside>

Join our official SheHacks+ 9 Slack link here: https://join.slack.com/t/shehacks8/shared_invite/zt-29vqiqxw7-2NkqB4hEpB69WXQasH3diw

**#announcements** 

All important information regarding workshops, opening and closing ceremonies, and surprise announcements will be made here!

**#team-formation**

If you’re an almost-filled team looking for 1-2 additional team members, or if you’re an individual hacker looking for a team.

**#intros** 

Introduce yourself to the other hackers. We’d all love to get to know you! Get to know our organizing SheHacks+ team and the mentors you’ll be learning from and consulting all weekend.

**#mentorship-help**

If you’re stuck or need some advice, give any of our mentors a shout here! Create a ticket and a mentor will connect with you.

**#hardware-requests**

Have a hardware question? Not sure when the hardware desk is open? Ask here! An organizer will connect with you.

**#random**

Questions? See something cool in the news? Feel free to drop messages here!

**#sponsors**

Network and meet with sponsors here, check out what fun events they may be having at their booth as well.

**#questions**

If you have general questions around the event, ask them here!

**#workshop-resources**

Here you’ll find the latest pre-workshop resources, and post-workshop resources. You can also ask questions or follow-up on the workshops you attended.

---


# 📅 Schedule (January 10-12th, 2025)

Friday:

Check-in 6 to 8 PM: Upper Atrium + PAB 159
Dinner Served 6 to 8 PM: Lower Atrium
Networking Booths Open 6 to 7 PM: Upper Atrium (sponsors may open/close booths anytime)

Opening Ceremonies
8 to 9:30 PM

Orientation & Team Formation 9:30 to 10 PM: Lower Atrium
Hacking Begins! 10 PM

WCS Workshop: PAB 106
10 PM to 10:30 AM

Movie Night + Snacks: NSC 145
10-11 PM

Hardware Lab 11PM-1AM: PAB 48
Snacks Served 11PM-1AM: Lower Atrium
Networking Booths Open 8PM-1AM: Upper Atrium

Saturday:

Hardware Lab 8AM-10AM: PAB 48
Breakfast Served 8AM-9AM: Lower Atrium
Networking Booths Open 8AM-12AM: Upper Atrium

PointClickCare Workshop 10 to 10:30 AM: PAB 148
Morning Tea Tasting 10AM-11AM: PAB 100

TD Interviews 10:30 AM to 12 PM: PAB 101, 103, 105

OTPP Workshop 11 to 11:30 AM: PAB 148


Lunch Served 12 to 1 PM: Lower Atrium
Bracelet Making, Sunglasses Making, Tarot Card Reading 12-4PM: PAB 103, 105 (until supplies last)


Voiceflow Workshop 1 to 1:30 PM: PAB 148


MLH Workshop 2 to 2:30 PM: PAB 148


WiE Workshop 3 to 3:30 PM: PAB 106


Scotiabank Workshop 4 to 4:30 PM: PAB 148


Sponsor Speed Networking 5 to 6 PM: PAB 100


MLH TechTogether Meetup 5 to 6 PM: PAB 150


PointClickCare Dinner 6 to 7 PM: PAB 27


WCS Workshop 7 to 7:30 PM: PAB 106


MLH Workshop 8 to 8:30 PM: PAB 148


WITS+ / WARP Workshop 9 to 9:30 PM: PAB 106


Red Bull Pong, Fire Noodle Challenge, Karaoke, Snacks 10:30 PM to 12:30 AM: PAB 103, 105, 101 (until supplies last)
Sunday


Submission Drop-in Booth 8 to 10 AM: PAB 159
Breakfast Served 10 AM: Lower Atrium


Live Judging 10 AM to 12 PM: Upper and Lower Atrium


Lunch Served 11 AM to 12 PM: Lower Atrium


Therapy Dogs 12 to 1 PM: Upper Atrium


Closing Ceremonies 1 to 2 PM


---

## 🛠️Hardware Available

Please find the available hardware in the following:
Item Name Quantity Available
Raspberry Pi 3 Model B 10 + 10 Akuru Chargers
Touch LED Displays 3
HDMI Cables 5
Intel Edison Breakout Board 3 + 6 Canakit chargers
Arduino Leonardo 2
Arduino Uno 10
Arduino USB-A Male to USB-B Male 10
DC Motors with Gear box 10 + no wires attached
Small Stepper motors 11
Stepper Drivers 15
Servo Testers 9
Sparkfun Inventor's Kits 12
Sparkfun Servo Trigger 5
Shock Sensors 3
Small Breadboard 22
Microservos Kits 14
Microservos (No Kit) 15
Female to Female Jumper Wire 30
Male to Female Jumper Wire 30
Male to Male Jumper Wire 30
Big Breadboard 1 + a lot included with starter kits for arduino
Push Buttons 4
Potentiometer 9
RGB LED 5
Photoresistors 5
LED + IR LED 30-40
IR Photodiode Sensor 3
IR Sensor for Line Following 3
IR Sensor Obstacle Avoidance & detection 3
IR transmitters 5
Ultrasonic Range Sensor 29
Tap Sensor 3
Temp Sensor w/ Digital and Analog Output 2
AA Battery Holders 3
Bluetooth controllers 6
Bluetooth Mate 6
Touch Sensors 1
Lilypad SimpleSnap Protoboard 6
Power Bars 5
Breadboard Power Modules 15
Protoboard 7
Starter Kits w/ Arduinos 15
USB- A Male to MicroUSB Male 2
Lilypad Arduino 1

---

## 🚗 Arrival

Please aim to arrive at Western University between 6 PM and 7 PM on January 10, 2025.

When you first arrive at the venue, please enter the **Physics and Astronomy building** from the main entrance which faces the **Natural Sciences Centre**. Once you walk in, continue straight down the hallway to **PAB 159** where a volunteer will sign you in. 

Once you’ve registered, grab some dinner, then head across the street to the **Natural Sciences Centre**, **Room 145**, introduce yourself to other participants, and get amped for the Opening Ceremonies, which start at 8 PM!

After the Opening Ceremonies, a team formation networking event will take place back in Physics and Astronomy in the lower atrium. This is your opportunity to meet other hackers and sponsors! If you haven’t found a team yet, this event is perfect for you.

Hacking will begin at 10 PM.

If you’re ever unsure about anything, please ask an organizer for help. SheHacks+ organizers will be in **red** sweaters. 

## 📍Time and Location

SheHacks, including registration, will be held at Western University, 1151 Richmond St, London, ON N6A 3K7, in the Physics and Astronomy Building. However, Opening Ceremonies and Closing Ceremonies will be across the street in the Natural Sciences Building, Room 145.


**PARKING**

For those who are driving over to Western and require PARKING: the lots labeled with ‘fP’ have free parking from 5pm on Friday to Monday morning.


Map can be viewed on slack
## ✈️ **Travel Reimbursements**

If you’re making a trip from outside of the London area, we are happy to provide travel reimbursements for a portion of your costs. 

NOTE: The amount reimbursed will be determined on a case-by-case basis, so it’s important to keep all your receipts.

| **Travelling from** | ***Maximum* Reimbursement** |
| --- | --- |
| Waterloo, Guelph | $30 |
| GTA, Hamilton, Barrie | $40 |
| Kingston, Ottawa | $70 |
| Montreal and farther | Case by case |

*To qualify for a reimbursement hackers must:*

- *Provide us with receipts for the reimbursements Link: https://forms.gle/Ns9WzMphBPXAzxUM7
- *Have indicated in their RSVP a reimbursement need, travelling from outside of the Greater London Area*
- *Send in reimbursement requests by **January 29th, 2025***
- *Attend SheHacks+*

---


# ✅ Submission Guidelines

## ⬣ DoraHacks

We will be using DoraHacks to host all submissions. 

Submit your hack 👉 https://dorahacks.io/hackathon/shehacks-9/

- Teams MUST submit their hack on DoraHacks, all be listed on the DoraHacks, and all be physically present during pitching to be eligible to win prizes

## ⏰ Live Judging

- Teams MUST pitch live to be eligible to win a **prize**
    - No requirements on how many people in your team should present, but ideally all have a speaking role!
- DoraHacks submissions are due at 10 AM EST and cannot be changed or added after this time
    - 👉 Please allocate time to submit and make sure everything is filled in correctly
- Live judging schedule will be published around **11:15 AM EST** in the **#announcements** Slack channel, and **live judging will start as early as 11:30 AM EST**
- Pitching will be in person - Total Time: 5 minutes
    - Presentation: 3 minutes
    - Q&A: 2 minutes
    - Teams will be given a table number and judges will come to you to begin your pitch
- Top 5 Finalists will be contacted to pitch during closing ceremonies for 3 minutes, without Q&A

---


## 🥇 Best SheHacks+ Overall


- 🥇 **First Place Prize**: Asus Laptops!
- 🥈 **Second Place Prize**: Marshall Major Headphones!
- 🥉 **Third Place Prize**: Projectors!

## Best Hardware Hack

- 🥇 **Prize**: Soldering kits

## Best Beginner Hack

- 🥇 **Prize**: $25 Amazon gift card per member

## Passport Prize

Interested in expanding your skills during SheHacks+? Visit our workshops and get them checked off your SheHacks+ passport! Two individuals who complete their passports this weekend will win:

- 🥇 **Prize**: NutriBullet blender

---


# 🏆 Sponsor Prizes

## OTPP

Most innovative hack using AI by a first-timer hacker, Prize: connect with a senior leader from our Enterprise Operations/Product Engineering teams.

*“The **Ontario Teachers' Pension Plan Board** is an independent organization responsible for administering defined-benefit pensions for school teachers of the Canadian province of Ontario. Ontario Teachers' also invests the plan's pension fund and it is one of the world's largest institutional investors, acting as a partner organization of the World Economic Forum. The plan is a multi-employer pension plan, jointly sponsored by the Government of Ontario and the Ontario Teachers' Federation.”*

**Prize**: Coffee Chat!

## **WARP –  Best Developer Tool by Warp**

Build a hack that focuses on improving the developer experience in some meaningful way - this could be tackling any part of the development lifecycle (creating, modifying or testing software)!

No API requirements for this prize! You do not need to use Warp.

*“The command line is both incredibly powerful and annoyingly hard to use. Master it and gain super-powers: from controlling your cloud systems, to manipulating local files and programs, writing quick workflows and more...it's a developer's swiss-army knife. Despite its power, it's a very hard tool to master. It has a notoriously steep learning curve - it doesn't work like other tools, nothing in it helps you learn how to use it well, it's very easy to make destructive mistakes, and so on. Many developers avoid it for these reasons. But for those who do learn how to use it well, they become much better at development and devops. Mastering the CLI lets you work faster with your existing tools, and increases their power because a keyboard driven, repl-style interface has many advantages over GUIs.*

*At Warp, our goal is to re-create the command line as a modern app, making a more usable, humane and, ultimately, more powerful CLI for everyone.”*

**Prize**: Keychron keyboards for each member of the team.

---


# 🤝 Team Formation

**How do teams work?**

- Hackers are in teams of **max 4** members. This applies to both the regular stream and Hacker Olympics.
- Don't have a team yet? No worries, you can form teams through the Slack channel OR during our team formation event!
    - Join the **#team-formation** channel on Slack
    - Post an introduction of yourself, meet other participants beforehand, pitch ideas, and create teams on your own!
    - Finger food will be provided at the team formation event so feel free to grab some food as you mingle and meet your dream team!

**Can I hack solo or in a partial team?**

- Yes! Teams are a max of 4, but feel free to participate individually or in smaller groups.

---


# 🔍 Hacker Olympics


Hacker Olympics is the beginner 
stream of SheHacks+ that allows 
hackers with no technical experience
to engage in challenges from 
different subsets of the technology 
industry. 


In teams of 3-4 you’ll participate in workshops that will help you complete a final project that incorporates parts from each workshop:

- 🖥️ Intro to HTML/CSS
- 👾 Intro to JavaScript
- 🎨 Figma
- 👩🏻‍💻 Github

On demo day, you will then pitch your project to workshop leaders and battle for the treasure!


- One member of your team must submit the final product by the deadline as outlined in the challenge schedule below
- Top 3 teams will win prizes (outlined below)
- Projects will be pitched to mentors and workshop leaders in the following manner:
    - Presentation: 2 minutes
    - Q&A: 1 minutes
- Pitching will be in-person, and all team members must be present to be eligible for prizes
- Hackers from the Hacker Olympics stream may also attend regular stream workshops and activities

---


## 💬 Slack (HO)

Join our official SheHacks+ 9 Slack link: https://join.slack.com/t/shehacks8/shared_invite/zt-29vqiqxw7-2NkqB4hEpB69WXQasH3diw

**Your private team channel**

A workspace accessible to just you and your team members! The SheHacks+ team and mentors can also enter if you request help. Happy collaborating!

**#announcements**

All important information regarding workshops, opening and closing ceremonies, and surprise announcements will be made here!

**#intros**

Introduce yourself to the other hackers. We’d all love to get to know you!

**#mentorship-help**

If you’re stuck or need some advice, give any of our mentors a shout here!

**#rideshare**

Looking for buddies to travel with?

---


## 📅 Hacker Olympics Schedule

Friday


Check-in 6 to 8 PM: Upper Atrium & PAB 159


Opening Ceremonies 7 to 8 PM: NSC 145


Orientation & Team Formation 8 to 10 PM: Lower Atrium
Networking Booths Open: Upper Atrium 8PM-1AM (sponsors may open/close booths anytime)


Hackathon Introduction & Intro to Figma 10 PM to 12 AM: PAB 117
Saturday
8 AM to 12 PM

Networking Booths Open 8AM-1PM: Upper Atrium


Intro to GitHub 9 to 10 AM: PAB 117


Intro to HTML & CSS 11 AM to 12 PM: PAB 117


Intro to JavaScript 2 to 3 PM: PAB 117


Sponsor Speed Networking 5 to 6 PM: PAB 100

Sunday


Project Due 10 AM!


Closing Ceremonies 1 to 2 PM: NSC 145

---


# 🤝 Team Formation

**How do teams work?**

- Hackers are in teams of **max 4** members.
- Right after the opening ceremonies, we’ll be hosting a team formation session where you can meet fellow hackers and find your perfect squad.
- All Hacker Olympics participants are expected to gather in **Room 117 at PAB** after the **opening ceremonies**. This is where we’ll kick off the event and guide you through the next steps (and help form teams💜)
- . Get ready to connect, collaborate, and dive into the excitement of Hacker Olympics!

---


# ✅ Submission Guidelines

# ⬣ DoraHacks

We will be using DoraHacks to host all submissions. 

Submit your hack link here: https://dorahacks.io/hackathon/shehacks-9/

- Teams MUST submit their hack on DoraHacks, all be listed on the DoraHacks, and all be physically present during pitching to be eligible to win prizes

## ⏰ Live Judging

- Teams MUST pitch live to be eligible to win a **prize**
    - No requirements on how many people in your team should present, but ideally all have a speaking role!
- DoraHacks submissions are due at 10 AM EST and cannot be changed or added after this time
    - 👉 Please allocate time to submit and make sure everything is filled in correctly
- Live judging schedule will be published around **11:15 AM EST** in the **#announcements** Slack channel, and **live judging will start as early as 11:30 AM EST**

- More details will be released during Hacker Olympics

---


## 💪Prizes


### 🏆 Grand Prize

- 🥇  FujiFilm Instax Cameras
- 🥈  JBL Speakers
- 🥉  Lululemon Fanny Pack

---




### 🤖 SH+ Exclusive APIs and Resources

Check the Sponsor Challenges for details!

**MLH | Day-of Hacker Information**

https://hackp.ac/shehacksplus

### 🍭 Git Guide

**What is Github?**

https://www.youtube.com/watch?v=w3jLJU7DT5E

**Git Guide 101**

http://rogerdudler.github.io/git-guide/

---
`



    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState<Message[]>([
        { role: 'assistant', content: `Welcome to SheHacks!` }
    ]); const [loading, setLoading] = useState(false);
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

    const [CurrTime, setCurrTime] = useState(customTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrTime(customTime());
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, []);


    async function aiResponse(text: string) {
        const chatCompletion = await client.chat.completions.create({
            messages: [
                { role: 'system', content: `You are a helpful personal assistant for a hackathon attendee at ${hackathonName}. Your job is to help the user keep track of activities, workshops, and submission deadlines for the hackathon. Here is some information about the hackathon\n Closing ceremony is at 1pm to 2pm on Sunday\n${content} It is currently ${CurrTime} only talk about upcoming events unless specified otherwise. Feel free to inform users that if they need help with debuging or code related questions, they can click on the Chat tab for a more relevent AI model for information. A maximum of 3 sentences unless otherwise specified` },
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
            setResult((prev) => [...(prev || []), { role: 'user', content: inputText }]);
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
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.headerBar}>
                <Text style={styles.headerTitle}>AI Schedule Assistant</Text>
            </View>



            <View style={styles.container}>
                <Text style={styles.title}>AI Schedule Assistant</Text>
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

                <View style={styles.imageWrapper}>
                    <Image source={urls[currentFrame]} style={styles.image} />
                </View>

            </View>
        </ScrollView>
    )
};
const styles = StyleSheet.create({
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
    headerImage: {
        color: '#FFFFFF',
        bottom: -190,
        left: -35,
        position: 'absolute',
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
    }, scrollViewContent: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});
