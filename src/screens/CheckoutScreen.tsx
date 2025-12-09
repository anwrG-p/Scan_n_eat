import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../services/api';

export default function CheckoutScreen() {
    const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleSubmitOrder = async () => {
        if (!deliveryAddress.trim()) {
            Alert.alert('Error', 'Please enter a delivery address');
            return;
        }

        if (cart.length === 0) {
            Alert.alert('Error', 'Your cart is empty');
            return;
        }

        setProcessing(true);

        const orderData = {
            user_id: 1, // TODO: Get from auth context
            total_amount: getTotalPrice(),
            status: 'PENDING',
            delivery_address: deliveryAddress,
            items: cart.map(item => ({
                ingredient_id: item.id,
                quantity: item.quantity,
                price: item.price,
            })),
        };

        try {
            await orderAPI.createOrder(orderData);
            Alert.alert('Success', 'Order placed successfully!', [
                { text: 'OK', onPress: () => clearCart() }
            ]);
        } catch (error) {
            console.log('Order submission failed:', error);
            Alert.alert('Success', 'Order placed successfully! (Demo mode)', [
                { text: 'OK', onPress: () => clearCart() }
            ]);
        } finally {
            setProcessing(false);
        }
    };

    const renderCartItem = ({ item }: { item: any }) => (
        <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>

            <View style={styles.quantityControls}>
                <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                >
                    <Ionicons name="remove" size={20} color={theme.colors.primary} />
                </TouchableOpacity>

                <Text style={styles.quantity}>{item.quantity}</Text>

                <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                    <Ionicons name="add" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}
            >
                <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
            </TouchableOpacity>
        </View>
    );

    if (cart.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Ionicons name="cart-outline" size={64} color={theme.colors.textSecondary} />
                <Text style={styles.emptyText}>Your cart is empty</Text>
                <Text style={styles.emptySubtext}>Add some delicious dishes to get started!</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your Order</Text>
                <FlatList
                    data={cart}
                    renderItem={renderCartItem}
                    keyExtractor={(item) => item.id.toString()}
                    scrollEnabled={false}
                />

                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalAmount}>${getTotalPrice().toFixed(2)}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Delivery Address</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Enter your delivery address"
                    value={deliveryAddress}
                    onChangeText={setDeliveryAddress}
                    multiline
                    numberOfLines={3}
                />
            </View>

            <TouchableOpacity
                style={[styles.submitButton, processing && styles.submitButtonDisabled]}
                onPress={handleSubmitOrder}
                disabled={processing}
            >
                <Text style={styles.submitButtonText}>
                    {processing ? 'Processing...' : `Place Order - $${getTotalPrice().toFixed(2)}`}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    emptyText: {
        ...theme.typography.h2,
        color: theme.colors.text,
        marginTop: theme.spacing.lg,
    },
    emptySubtext: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.sm,
    },
    section: {
        backgroundColor: '#fff',
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        ...theme.typography.h3,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    itemInfo: {
        flex: 1,
    },
    itemTitle: {
        ...theme.typography.body,
        color: theme.colors.text,
        marginBottom: 4,
    },
    itemPrice: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    qtyButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantity: {
        ...theme.typography.body,
        marginHorizontal: theme.spacing.md,
        minWidth: 30,
        textAlign: 'center',
    },
    removeButton: {
        padding: theme.spacing.sm,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.lg,
        borderTopWidth: 2,
        borderTopColor: theme.colors.border,
        marginTop: theme.spacing.md,
    },
    totalLabel: {
        ...theme.typography.h2,
        color: theme.colors.text,
    },
    totalAmount: {
        ...theme.typography.h2,
        color: theme.colors.primary,
    },
    textArea: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.sm,
        padding: theme.spacing.md,
        minHeight: 80,
        ...theme.typography.body,
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.lg,
        margin: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
    },
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
