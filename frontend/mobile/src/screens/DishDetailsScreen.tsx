import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../../store/cartStore';
import { Dish } from '../../types';

export const DishDetailsScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { addItem } = useCartStore();
    const dish: Dish = route.params?.dish;

    if (!dish) {
        return <View style={styles.center}><Text>Dish not found</Text></View>;
    }

    const handleAddToCart = () => {
        addItem(dish);
        // Optional: show feedback or navigate
        alert('Added to cart');
    };

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: dish.image_url || 'https://via.placeholder.com/400x300' }}
                style={styles.image}
            />

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.category}>{dish.category || 'Main Course'}</Text>
                    <Text style={styles.price}>${dish.price.toFixed(2)}</Text>
                </View>

                <Text style={styles.title}>{dish.name}</Text>
                <Text style={styles.description}>{dish.description}</Text>

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>Ingredients</Text>
                <View style={styles.ingredientsList}>
                    {dish.ingredients.map((ing, i) => (
                        <View key={i} style={styles.ingredientBadge}>
                            <Text style={styles.ingredientText}>{ing}</Text>
                        </View>
                    ))}
                </View>

                <Button
                    title="Add to Cart"
                    onPress={handleAddToCart}
                    style={styles.addButton}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 300,
    },
    content: {
        padding: 24,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -24,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    category: {
        fontSize: 14,
        color: '#2563eb',
        fontWeight: '600',
        backgroundColor: '#eff6ff',
        paddingVertical: 4,
        paddingHorizontal: 12,
        overflow: 'hidden',
        borderRadius: 16,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#6b7280',
        lineHeight: 24,
        marginBottom: 24,
    },
    divider: {
        height: 1,
        backgroundColor: '#f3f4f6',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#111827',
    },
    ingredientsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 32,
    },
    ingredientBadge: {
        backgroundColor: '#f3f4f6',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    ingredientText: {
        color: '#4b5563',
        fontSize: 14,
    },
    addButton: {
        marginBottom: 24,
    },
});
