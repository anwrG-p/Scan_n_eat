import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dish } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../ui/Button';

interface DishCardProps {
    dish: Dish;
    onPress?: () => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish }) => {
    const { addItem } = useCartStore();
    const navigation = useNavigation<any>();

    const handlePress = () => {
        navigation.navigate('DishDetails', { dish });
    };

    const handleAdd = () => {
        addItem(dish);
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.9}>
            <Image
                source={{ uri: dish.image_url || 'https://via.placeholder.com/400x300' }}
                style={styles.image}
            />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={1}>{dish.name}</Text>
                    <Text style={styles.price}>${dish.price.toFixed(2)}</Text>
                </View>
                <Text style={styles.description} numberOfLines={2}>{dish.description}</Text>

                <View style={styles.footer}>
                    <Text style={styles.ingredients}>
                        {dish.ingredients.length} ingredients
                    </Text>
                    <Button
                        title="Add"
                        onPress={handleAdd}
                        style={styles.addButton}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 150,
    },
    content: {
        padding: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2563eb',
    },
    description: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ingredients: {
        fontSize: 12,
        color: '#9ca3af',
    },
    addButton: {
        minHeight: 32,
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
});
