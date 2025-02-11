import { StyleSheet, Animated, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ChatLoadingSkeleton from '@/components/ChatLoadingSkeleton';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

type Message = {
    id: number;
    content: string;
    role: string;
};

interface ChatProps {
    messages: Message[];
    isLoading: boolean;
}

const Chat: React.FC<ChatProps> = ({ messages, isLoading }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false); // Whether the speech is playing
    const [playingMsgId, setPlayingMsgId] = useState<number | null>(null); // ID of the currently playing message
    const lastMessage = messages[messages.length - 1];
    // console.log("voice ye wali hai :", Speech.getAvailableVoicesAsync());

    // Handle speech start/stop
    const toggleVoice = (msgId: number, content: string) => {
        // If the same message is clicked again, stop the speech
        if (isPlaying && playingMsgId === msgId) {
            setIsPlaying(false);
            Speech.stop();
            return;
        }

        // Start speech for the new message
        setPlayingMsgId(msgId);
        setIsPlaying(true);
        Speech.speak(content, {
            onDone: () => {
                setIsPlaying(false); // Reset the button state when speech finishes
                setPlayingMsgId(null); // Reset the currently playing message
            },
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.chatArea} showsVerticalScrollIndicator={false}>
            {messages.map((msg) => (
                <View
                    key={msg.id}
                    style={[
                        styles.msgWrapper,
                        { alignItems: msg.role === 'ai' ? 'flex-start' : 'flex-end' },
                    ]}
                >
                    {msg.role === 'ai' ? (
                        <>
                            <Text style={styles.msgLabel}>AI</Text>
                            <Animated.View style={[styles.messageBubble]}>
                                <Text style={styles.messageText}>{msg.content}</Text>
                            </Animated.View>

                            <TouchableOpacity
                                style={styles.voiceButton}
                                onPress={() => toggleVoice(msg.id, msg.content)}
                                disabled={isLoading} // Disable button while loading
                            >
                                <FontAwesome5
                                    name={isPlaying && playingMsgId === msg.id ? 'volume-mute' : 'volume-up'}
                                    size={14}
                                    color="#ece7e7"
                                />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={[styles.msgLabel]}>You</Text>
                            <Animated.View style={[styles.messageBubble]}>
                                <Text style={styles.messageText}>{msg.content}</Text>
                            </Animated.View>
                        </>
                    )}

                    {/* Show the loading skeleton only for the last message if loading */}
                    {isLoading && msg.id === lastMessage.id && <ChatLoadingSkeleton />}
                </View>
            ))}
        </ScrollView>
    );
};

export default Chat;

const styles = StyleSheet.create({
    chatArea: {
        flexGrow: 1,
        padding: 16,
    },
    msgWrapper: {
        padding: 8,
        gap: 8,
    },
    messageBubble: {
        backgroundColor: '#2a2a2a',
        borderRadius: 20,
        maxWidth: '75%',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        padding: 14,
    },
    messageText: {
        color: '#ffffff',
        fontSize: 16,
    },
    msgLabel: {
        color: '#ece7e7',
        fontSize: 12,
    },
    voiceButton: {
        borderRadius: 8,
        paddingHorizontal: 16,
    },
});
