import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../components/ui/Button';

export const CartScreen = () => {
    const { items, formattedTotal, clearCart } = useCartStore();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Shopping Cart</Text>
            </View>

            {items.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>Your cart is empty.</Text>
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <View>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>
                                    ${item.price.toFixed(2)} x {item.cartQuantity}
                                </Text>
                            </View>
                            <Text style={styles.itemTotal}>
                                ${(item.price * item.cartQuantity).toFixed(2)}
                            </Text>
                        </View>
                    )}
                />
            )}

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>${formattedTotal()}</Text>
                </View>
                <Button
                    title="Checkout"
                    disabled={items.length === 0}
                    style={styles.checkoutButton}
                />
                {items.length > 0 && (
                    <Button
                        title="Clear Cart"
                        variant="secondary"
                        onPress={clearCart}
                        style={styles.clearButton}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    list: {
        padding: 16,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
    },
    itemPrice: {
        fontSize: 14,
        color: '#6b7280',
    },
    itemTotal: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#9ca3af',
    },
    footer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2563eb',
    },
    checkoutButton: {
        marginBottom: 8,
    },
    clearButton: {
        marginTop: 0,
    },
});
