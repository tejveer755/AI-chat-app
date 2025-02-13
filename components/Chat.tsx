import { StyleSheet, Animated, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import ChatLoadingSkeleton from '@/components/ChatLoadingSkeleton';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import * as Clipboard from 'expo-clipboard';
import ConvertMarkdown from './ConvertMarkdown';

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
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playingMsgId, setPlayingMsgId] = useState<number | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false); // For custom alert visibility
    const scrollViewRef = useRef<ScrollView | null>(null);

    const lastMessage = messages[messages.length - 1];

    console.log(Speech.getAvailableVoicesAsync())
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    // Function to handle text-to-speech
    const toggleVoice = (msgId: number, content: string) => {
        if (isPlaying && playingMsgId === msgId) {
            setIsPlaying(false);
            Speech.stop();
            return;
        }
        setPlayingMsgId(msgId);
        setIsPlaying(true);
        Speech.speak(content, {
            onDone: () => {
                setIsPlaying(false);
                setPlayingMsgId(null);
            },
            voice: 'en-in-x-end-local' 
        });
    };

    // Function to remove Markdown formatting
    const stripMarkdown = (content: string): string => {
        return content.replace(/[^a-zA-Z0-9\s]/g, ''); // Removes all special characters except spaces
    };

    // Function to copy AI response to clipboard without Markdown
    const copyToClipboard = async (content: string) => {
        const cleanContent = stripMarkdown(content);  // Remove Markdown formatting
        await Clipboard.setStringAsync(cleanContent);
        setShowAlert(true);  // Show custom alert after copying
        setTimeout(() => setShowAlert(false), 2000); // Hide alert after 2 seconds
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.chatArea}
                showsVerticalScrollIndicator={false}
            >
                {messages.map((msg) => (
                    <View
                        key={msg.id}
                        style={[
                            styles.msgWrapper,
                            {
                                alignItems: msg.role === 'ai' ? 'flex-start' : 'flex-end',

                            },
                        ]}
                    >
                        {msg.role === 'ai' ? (
                            <>
                                <Text style={styles.msgLabel}>AI</Text>
                                <Animated.View
                                    style={[
                                        styles.messageBubble,
                                        { backgroundColor: 'transparent', paddingVertical: 0, maxWidth: '90%' }, // Remove background for AI
                                    ]}
                                >
                                    <ConvertMarkdown content={msg.content} />
                                </Animated.View>

                                <View style={styles.buttonContainer}>
                                    {/* Speak Button */}
                                    <TouchableOpacity
                                        onPress={() => toggleVoice(msg.id, msg.content)}
                                        style={styles.iconButton}
                                        disabled={isLoading}
                                    >
                                        <FontAwesome5
                                            name={isPlaying && playingMsgId === msg.id ? 'stop-circle' : 'volume-up'}
                                            size={16}
                                            color="#ece7e7"
                                        />
                                        <Text style={styles.buttonText}>{isPlaying && playingMsgId === msg.id ? 'Stop' : 'Speek'}</Text>
                                    </TouchableOpacity>

                                    {/* Copy Button */}
                                    <TouchableOpacity
                                        onPress={() => copyToClipboard(msg.content)}
                                        style={styles.iconButton}
                                    >
                                        <FontAwesome5 name="clipboard" size={16} color="#ece7e7" />
                                        <Text style={styles.buttonText}>Copy</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <>
                                <Text style={[styles.msgLabel]}>You</Text>
                                <Animated.View style={[styles.messageBubble]}>
                                    <Text style={styles.messageText}>{msg.content}</Text>
                                </Animated.View>
                            </>
                        )}

                        {isLoading && msg.id === lastMessage.id && <ChatLoadingSkeleton />}
                        {/* <ChatLoadingSkeleton /> */}
                    </View>
                ))}
            </ScrollView>

            {/* Custom Alert */}
            {showAlert && (
                <View style={styles.alertContainer}>
                    <Text style={styles.alertText}>Copied to clipboard!</Text>
                </View>
            )}
        </View>
    );
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#1f1f1f', // Dark background for the entire container
    },
    chatArea: {
        flexGrow: 1,
        padding: 16,
    },
    msgWrapper: {
        padding: 8,
        gap: 8,
    },
    messageBubble: {
        backgroundColor: '#2a2a2a', // Default background for user messages
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        padding: 14,
    },
    messageText: {
        color: '#ffffff',
        fontSize: 16,
        lineHeight: 22, // Added line height for better text readability
    },
    msgLabel: {
        color: '#ece7e7',
        fontSize: 12,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 4,
        marginHorizontal: 10,
    },
    iconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3b3b3b', // Dark background for the buttons
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        gap: 8,
    },
    buttonText: {
        color: '#ece7e7',
        fontSize: 14,
        fontWeight: '500',
    },
    alertContainer: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: '-50%' }],
        backgroundColor: '#2a2a2a',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ece7e7',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,

    },
    alertText: {
        color: '#ece7e7',
        fontSize: 14,
    },
});
