import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../components/ui/Button';

export const ProfileScreen = () => {
    const { user, logout } = useAuthStore();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{user?.name[0].toUpperCase()}</Text>
                </View>
                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>

            <View style={styles.content}>
                <Button title="Edit Profile" variant="secondary" style={styles.button} />
                <Button title="Settings" variant="secondary" style={styles.button} />
                <Button title="Logout" variant="danger" onPress={logout} style={styles.button} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        padding: 32,
        backgroundColor: '#f9fafb',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#2563eb',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
    },
    email: {
        fontSize: 16,
        color: '#6b7280',
        marginTop: 4,
    },
    content: {
        padding: 24,
    },
    button: {
        marginBottom: 12,
    },
});
