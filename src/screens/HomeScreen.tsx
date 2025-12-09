import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
    const navigationCards = [
        {
            title: 'Catalog',
            description: 'Browse our extensive collection of recipes and ingredients.',
            icon: 'book-outline' as const,
            route: 'Catalog' as const,
            color: '#FF6B35',
        },
        {
            title: 'Camera',
            description: 'Scan ingredients to instantly find matching recipes.',
            icon: 'camera-outline' as const,
            route: 'Camera' as const,
            color: '#F7931E',
        },
        {
            title: 'Tutorial',
            description: 'Learn how to become a master chef with our guides.',
            icon: 'school-outline' as const,
            route: 'Home' as const, // Placeholder
            color: '#4CAF50',
        },
        {
            title: 'History',
            description: 'View your activity and order history.',
            icon: 'time-outline' as const,
            route: 'History' as const,
            color: '#2196F3',
        },
        {
            title: 'Report',
            description: 'Report any technical issues you encounter.',
            icon: 'alert-circle-outline' as const,
            route: 'Report' as const,
            color: '#F44336',
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Baz3it el chef</Text>
                <Text style={styles.subtitle}>Your culinary companion</Text>
            </View>

            <View style={styles.grid}>
                {navigationCards.map((card, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.card, { borderLeftColor: card.color }]}
                        onPress={() => navigation.navigate(card.route)}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: card.color }]}>
                            <Ionicons name={card.icon} size={24} color="#fff" />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{card.title}</Text>
                            <Text style={styles.cardDescription}>{card.description}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        padding: theme.spacing.xl,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    title: {
        ...theme.typography.h1,
        color: theme.colors.primary,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
    },
    grid: {
        padding: theme.spacing.md,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        alignItems: 'center',
        borderLeftWidth: 4,
        ...theme.shadows.small,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        ...theme.typography.h3,
        color: theme.colors.text,
        marginBottom: 4,
    },
    cardDescription: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
    },
});
