import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/authStore';
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen = () => {
    const { user } = useAuthStore();
    const navigation = useNavigation<any>();

    const ActionButton = ({ title, icon, color, screen }: any) => (
        <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: color + '10' }]}
            onPress={() => navigation.navigate(screen)}
        >
            <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                <Ionicons name={icon} size={24} color={color} />
            </View>
            <Text style={styles.actionTitle}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hello, {user?.name}</Text>
                <Text style={styles.subtitle}>What would you like to cook?</Text>
            </View>

            <View style={styles.actions}>
                <ActionButton
                    title="Scan Invoice"
                    icon="scan"
                    color="#2563eb"
                    screen="Scan"
                />
                <ActionButton
                    title="Catalog"
                    icon="restaurant"
                    color="#dc2626"
                    screen="Catalog"
                />
                <ActionButton
                    title="My Ingredients"
                    icon="basket"
                    color="#16a34a"
                    screen="Cart" // Placeholder
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No recent activity</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 24,
        paddingTop: 60,
        backgroundColor: '#fff',
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    actionButton: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    actionTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
        textAlign: 'center',
    },
    section: {
        padding: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    emptyState: {
        padding: 32,
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 12,
    },
    emptyText: {
        color: '#9ca3af',
    },
});
