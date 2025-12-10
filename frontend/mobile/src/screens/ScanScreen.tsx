import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ScanScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scan Invoice</Text>
            <Text style={styles.subtitle}>Camera functionality coming soon.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
    },
});
