import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { authAPI } from '../services/api';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert('Error', 'Please enter username and password');
            return;
        }

        setLoading(true);

        try {
            const response = await authAPI.login({ username, password });
            Alert.alert('Success', 'Logged in successfully!');
            // TODO: Store auth token and navigate to home
        } catch (error) {
            console.log('Login failed:', error);
            Alert.alert('Error', 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="restaurant" size={64} color={theme.colors.primary} />
                <Text style={styles.title}>Baz3it el chef</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Username or Email</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={20} color={theme.colors.textSecondary} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your username"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textSecondary} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={styles.loginButtonText}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerLink}>
                    <Text style={styles.registerText}>
                        Don't have an account? <Text style={styles.registerTextBold}>Register</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#fff',
        padding: theme.spacing.xl,
        alignItems: 'center',
        paddingTop: theme.spacing.xl * 2,
    },
    title: {
        ...theme.typography.h1,
        color: theme.colors.primary,
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
    },
    form: {
        padding: theme.spacing.xl,
    },
    inputGroup: {
        marginBottom: theme.spacing.lg,
    },
    label: {
        ...theme.typography.body,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.sm,
        paddingHorizontal: theme.spacing.md,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        padding: theme.spacing.md,
        ...theme.typography.body,
    },
    loginButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        marginTop: theme.spacing.md,
    },
    loginButtonDisabled: {
        opacity: 0.6,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    registerLink: {
        marginTop: theme.spacing.lg,
        alignItems: 'center',
    },
    registerText: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
    },
    registerTextBold: {
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
});
