import React, { useState } from 'react';
import {  ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Header from '@/components/Header';
import IntroSection from '@/components/IntroSection';
import Chat from '@/components/Chat';
import { generateAIResponse } from '@/api/index';
import InputSection from '@/components/InputSection';
import ChatLoadingSkeleton from '@/components/ChatLoadingSkeleton';

// Define types for clarity and type safety
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
        <ScrollView contentContainerStyle={styles.introContainer}>
          <IntroSection />
        </ScrollView>
      ) : (
        <Chat messages={chat} isLoading={isLoading} />
      )}
      {/* <ChatLoadingSkeleton/> */}
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
