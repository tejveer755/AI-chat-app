import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // We are only using MaterialIcons here

// FeatureCard Component
type FeatureCardProps = {
    icon: React.ComponentProps<typeof MaterialIcons>['name']; // Icon name
    title: string;
    description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <View style={styles.card}>
            <View style={styles.iconTitleContainer}>
                <MaterialIcons name={icon} size={32} color="#ffffff" style={styles.icon} />
                <Text style={styles.cardTitle}>{title}</Text>
            </View>
            <Text style={styles.cardDescription}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#292929',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 20,
        // width: 160,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        // alignItems: 'center', // Centers content horizontally within the card
    },
    iconTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Aligns the icon and title vertically centered
        marginBottom: 10, // Adds space between icon + title and the description
    },
    icon: {
        marginRight: 8, // Space between the icon and title
    },
    cardTitle: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    cardDescription: {
        color: '#cccccc',
        fontSize: 14,
        // textAlign: 'center', // Centers description text
    },
});

export default FeatureCard;
