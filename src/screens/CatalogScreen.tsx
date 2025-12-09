import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useCart } from '../context/CartContext';
import { recipeAPI } from '../services/api';

interface Recipe {
    id: number;
    title: string;
    description: string;
    price: number;
    image_url?: string;
    difficulty_level?: string;
}

export default function CatalogScreen() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await recipeAPI.getAllRecipes();
            setRecipes(response.data);
        } catch (error) {
            console.log('Failed to fetch recipes, using sample data');
            setRecipes(getSampleRecipes());
        } finally {
            setLoading(false);
        }
    };

    const getSampleRecipes = (): Recipe[] => [
        { id: 1, title: 'Margherita Pizza', description: 'Classic Italian pizza with tomato and mozzarella', price: 12.99, difficulty_level: 'EASY' },
        { id: 2, title: 'Kousksi', description: 'Traditional Tunisian couscous dish', price: 8.99, difficulty_level: 'MEDIUM' },
        { id: 3, title: 'Lablebi', description: 'Tunisian chickpea soup', price: 11.99, difficulty_level: 'EASY' },
        { id: 4, title: 'Ma9rouna', description: 'Tunisian pasta dish', price: 13.99, difficulty_level: 'MEDIUM' },
        { id: 5, title: 'Nwasir', description: 'Tunisian sweet pastry', price: 18.99, difficulty_level: 'HARD' },
    ];

    const handleAddToCart = (recipe: Recipe) => {
        addToCart({
            id: recipe.id,
            title: recipe.title,
            price: recipe.price,
            image_url: recipe.image_url,
        });
    };

    const renderRecipe = ({ item }: { item: Recipe }) => (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                {item.difficulty_level && (
                    <View style={[styles.badge, getDifficultyColor(item.difficulty_level)]}>
                        <Text style={styles.badgeText}>{item.difficulty_level}</Text>
                    </View>
                )}
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>
                <View style={styles.cardFooter}>
                    <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => handleAddToCart(item)}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="add" size={18} color="#fff" />
                        <Text style={styles.addButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const getDifficultyColor = (level: string) => {
        switch (level) {
            case 'EASY': return { backgroundColor: '#4CAF50' };
            case 'MEDIUM': return { backgroundColor: '#FFC107' };
            case 'HARD': return { backgroundColor: '#F44336' };
            default: return { backgroundColor: '#999' };
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Loading dishes...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Our Menu</Text>
                <Text style={styles.headerSubtitle}>Discover delicious dishes crafted by our chefs</Text>
            </View>
            <FlatList
                data={recipes}
                renderItem={renderRecipe}
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
    card: {
        backgroundColor: '#fff',
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
        overflow: 'hidden',
        ...theme.shadows.small,
    },
    imageContainer: {
        height: 150,
        backgroundColor: '#E0E0E0',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: theme.spacing.sm,
    },
    badge: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.sm,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    cardContent: {
        padding: theme.spacing.md,
    },
    cardTitle: {
        ...theme.typography.h3,
        color: theme.colors.text,
        marginBottom: 4,
    },
    cardDescription: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.md,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        ...theme.typography.h3,
        color: theme.colors.primary,
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 4,
    },
});
