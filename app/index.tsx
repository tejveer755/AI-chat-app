import React, { useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, Alert, Text } from 'react-native';
import Header from '@/components/Header';
import IntroSection from '@/components/IntroSection';
import Chat from '@/components/Chat';
import { generateAIResponse } from '@/api/index';
import InputSection from '@/components/InputSection';

type Message = {
  id: number;
  content: string;
  role: 'user' | 'ai';
};

const ChatBotApp: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const fetchResponse = async (userMessage: string) => {
    try {
      setIsLoading(true);
      const response = await generateAIResponse(userMessage);
      return response;
    } catch (error) {
      Alert.alert("Error", "Failed to get a response from the AI. Please try again.");
      console.error("AI Response Error:", error);
      return "Sorry, I encountered an issue.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage: Message = { id: chat.length + 1, content: message.trim(), role: 'user' };
    setChat((prev) => [...prev, userMessage]);
    setMessage('');

    // Fetch and append AI response
    const aiResponseContent = await fetchResponse(message.trim());
    if (aiResponseContent) {
      const aiMessage: Message = { id: chat.length + 2, content: aiResponseContent, role: 'ai' };
      setChat((prev) => [...prev, aiMessage]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Header />
      {chat.length === 0 ? (
        <ScrollView contentContainerStyle={styles.introContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <IntroSection />
        </ScrollView>
      ) : (
        <Chat messages={chat} isLoading={isLoading} />
      )}

      <InputSection
        message={message}
        setMessage={setMessage}
        handleGetResponse={handleSend}
        recording={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 22,
  },
  introContainer: {
    alignItems: 'center',
  },
});

export default ChatBotApp;


// import { useState, useEffect } from "react";
// import { View, Text, Button } from "react-native";
// import * as Speech from "expo-speech";

// export default function App() {
//   const [voices, setVoices] = useState([]);
//   const [selectedVoice, setSelectedVoice] = useState(null);

//   useEffect(() => {
//     // Fetch available voices
//     Speech.getAvailableVoicesAsync().then((voiceData) => {
//       console.log("Raw Voices Data:", voiceData);
  
//       let voiceList = Array.isArray(voiceData) ? voiceData : Object.values(voiceData);
  
//       if (voiceList.length > 0) {
//         setVoices(voiceList);
//         setSelectedVoice(voiceList[0].identifier); // Set first available voice as default
//       }
//     });
//   }, []);

//   const speak = () => {
//     const options = {
//       voice: selectedVoice, // Set the selected voice
//       rate: 1.0, // Adjust speed (0.1 - 2.0)
//       pitch: 1.0, // Adjust pitch (0.5 - 2.0)
//     };
//     Speech.speak("Hello! This is a test speech.", options);
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>Selected Voice: {selectedVoice || "Default"}</Text>
//       <Button title="Speak" onPress={speak} />
//       {voices.length > 0 && (
//         <Button
//           title="Change Voice"
//           onPress={() => {
//             const nextVoice =
//               voices[(voices.findIndex((v) => v.identifier === selectedVoice) + 1) % voices.length].identifier;
//             setSelectedVoice(nextVoice);
//           }}
//         />
//       )}
//     </View>
//   );
// }
