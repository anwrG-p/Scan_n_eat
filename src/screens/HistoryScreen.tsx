import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { historyAPI } from '../services/api';

interface HistoryItem {
    id: number;
    action_type: string;
    resource_type: string;
    resource_id: number;
    details: string;
    timestamp: string;
}

export default function HistoryScreen() {
    const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await historyAPI.getUserHistory(1); // TODO: Get user ID from auth
            setHistoryItems(response.data);
        } catch (error) {
            console.log('Failed to fetch history, using sample data');
            setHistoryItems(getSampleData());
        } finally {
            setLoading(false);
        }
    };

    const getSampleData = (): HistoryItem[] => [
        { id: 1, action_type: 'ORDER_PLACED', resource_type: 'order', resource_id: 1, details: 'Order #1 - Total: $25.50 - Status: COMPLETED', timestamp: '2 hours ago' },
        { id: 2, action_type: 'VIEWED_RECIPE', resource_type: 'recipe', resource_id: 1, details: 'Viewed Margherita Pizza recipe', timestamp: '5 hours ago' },
        { id: 3, action_type: 'SCANNED_INGREDIENT', resource_type: 'ingredient', resource_id: 1, details: 'Scanned Tomatoes', timestamp: '1 day ago' },
        { id: 4, action_type: 'ORDER_PLACED', resource_type: 'order', resource_id: 2, details: 'Order #2 - Total: $15.00 - Status: PENDING', timestamp: '2 days ago' },
    ];

    const getIcon = (actionType: string) => {
        switch (actionType) {
            case 'ORDER_PLACED': return 'cart';
            case 'VIEWED_RECIPE': return 'eye';
            case 'SCANNED_INGREDIENT': return 'camera';
            default: return 'checkmark-circle';
        }
    };

    const getIconColor = (actionType: string) => {
        switch (actionType) {
            case 'ORDER_PLACED': return theme.colors.success;
            case 'VIEWED_RECIPE': return theme.colors.primary;
            case 'SCANNED_INGREDIENT': return theme.colors.secondary;
            default: return theme.colors.textSecondary;
        }
    };

    const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
        <View style={styles.historyItem}>
            <View style={[styles.iconContainer, { backgroundColor: getIconColor(item.action_type) + '20' }]}>
                <Ionicons name={getIcon(item.action_type) as any} size={24} color={getIconColor(item.action_type)} />
            </View>
            <View style={styles.itemContent}>
                <Text style={styles.itemDetails}>{item.details}</Text>
                <View style={styles.timestampContainer}>
                    <Ionicons name="time-outline" size={14} color={theme.colors.textSecondary} />
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Loading history...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Activity History</Text>
                <Text style={styles.headerSubtitle}>Track your recent actions and activities</Text>
            </View>
            <FlatList
                data={historyItems}
                renderItem={renderHistoryItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: theme.spacing.md,
        ...theme.typography.body,
        color: theme.colors.textSecondary,
    },
    header: {
        padding: theme.spacing.lg,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    headerTitle: {
        ...theme.typography.h2,
        color: theme.colors.text,
        marginBottom: 4,
    },
    headerSubtitle: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
    },
    list: {
        padding: theme.spacing.md,
    },
    historyItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
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
    itemContent: {
        flex: 1,
    },
    itemDetails: {
        ...theme.typography.body,
        color: theme.colors.text,
        marginBottom: 4,
    },
    timestampContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timestamp: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        marginLeft: 4,
    },
});
