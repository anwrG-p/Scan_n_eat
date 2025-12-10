import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useCatalogStore } from '../../store/catalogStore';
import { DishCard } from '../components/catalog/DishCard';
import { Input } from '../components/ui/Input';

export const CatalogScreen = () => {
    const { dishes, fetchDishes, isLoading, error } = useCatalogStore();
    const [searchQuery, setSearchQuery] = React.useState('');

    useEffect(() => {
        if (dishes.length === 0) {
            // Manually seeding for demo
            useCatalogStore.setState({
                dishes: [
                    { id: '1', name: 'Spaghetti Carbonara', description: 'Classic Italian pasta with egg, cheese, pancetta, and black pepper.', price: 12.99, image_url: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=400&q=80', ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan'], category: 'Pasta' },
                    { id: '2', name: 'Margherita Pizza', description: 'Simple and delicious pizza with tomato, mozzarella, and basil.', price: 10.50, image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80', ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Basil'], category: 'Pizza' },
                    { id: '3', name: 'Caesar Salad', description: 'Crisp romaine lettuce with croutons, parmesan, and caesar dressing.', price: 8.99, image_url: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=400&q=80', ingredients: ['Romaine', 'Croutons', 'Parmesan', 'Caesar Dressing'], category: 'Salad' },
                ],
                isLoading: false
            });
        }
    }, []);

    const filteredDishes = dishes.filter(dish =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#2563eb" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Input
                    placeholder="Search dishes..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <FlatList
                data={filteredDishes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <DishCard dish={item} />}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    searchContainer: {
        padding: 16,
        backgroundColor: 'white',
    },
    list: {
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
