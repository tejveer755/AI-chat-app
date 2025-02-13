import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FeatureCard from '@/components/FeatureCard'

const IntroSection = () => {
    return (
        <View style={styles.heroSection}>

            <Text style={styles.heroTitle}>Welcome to AI Chat Assistant</Text>
            <Text style={styles.heroDescription}>
                This AI-powered assistant helps you get answers, brainstorm ideas, and engage in intelligent conversations.
                Start by typing your query or using the voice input.
            </Text>
            <View style={styles.featureSection}>
                <Text style={styles.featureTitle}>Features:</Text>
                <FeatureCard
                    icon="lightbulb-outline" // Ionicons icon
                    title="Instant Answers"
                    description="Instant answers to your queries lorem answers to your queriesInstant answers to your queries"
                />
                <FeatureCard
                    icon="send" // MaterialIcons icon
                    title="Quick Send"
                    description="Send messages instantly  Start by typing your query or using the voice input."
                />
                <FeatureCard
                    icon="mic" // MaterialIcons icon
                    title="Voice Input"
                    description="Use voice commands for easier interaction  Start by typing your query or using the voice input."
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    heroSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        // backgroundColor: '#1c1c1c',
        borderRadius: 12,
        marginHorizontal: 16,
    },
    heroTitle: {
        color: '#ffffff',
        fontSize: 26,
        fontWeight: '800',
        marginBottom: 8,
        textAlign:'center',
    },
    heroDescription: {
        color: '#cccccc',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 22,
    },
    featureSection: {
        marginTop: 16,
        // backgroundColor: '#292929',
        padding: 12,
        borderRadius: 8,
        width: '100%',
    },
    featureTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 6,
    },
    featureItem: {
        color: '#cccccc',
        fontSize: 14,
        marginVertical: 2,
    },
})

export default IntroSection