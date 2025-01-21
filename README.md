# Hackyhelper -- SheHacks9

This app is designed to help hackers during their hackathon experience. 

Hackathons are very intense, for all hackers.

We are so overtaken by the stress of creating and debugging our project that we often neglect taking breaks. We either forget to attend the workshop or get lost on campus. We need help in improving our hackathon experience.

That’s where our HackyHelper app comes into play. HackyHelper is an AI companion to help hackers through all aspects of a hackathon. We created it as a react native app, meaning it should run smoothly on iOS and Android devices.

We made our scheduled chat using the Groq API. This allows us to input user messages and return an AI generated response in return, with given information about the event. For our demo, we provided the AI model with the SheHacks hacker package.

Our map location tracker uses the react native maps api to allow users to locate their surroundings. It also displays their current position, providing them with an intuitive numerical approach to find their peers.

Our debug “chat” feature works similar to our schedule chat, but the secret behind our methodology is the renowned Rubber duck debugging method. However, instead of just verbally explaining code to a motionless duck, hackers are able to receive auditory feedback to further utilize this methodology and speed up determination of the incongruity. We used natural language processing and speech synthesis to provide users with the convenience to speak directly and receive an instant response. This is like an upgraded version of the rubber duck debugging method!

Our break manager uses a somewhat pre-trained AI model to track user position. We further trained this model with over 500 test cases over adjusted epochs, batch size, and learning rate values. This resulted in a very accurate model that is able to detect if the user is working and will track time so that after 25 minutes, users are asked to take a short break.

Our app is the ultimate hackathon companion. With HackyHelper, hackers are able to focus on what truly matters—learning, connecting, and innovating— with a more comfortable experience, making the hackathon experience remarkable! Thank you!
