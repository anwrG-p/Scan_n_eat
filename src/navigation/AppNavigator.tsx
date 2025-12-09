import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import CameraScreen from '../screens/CameraScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ReportScreen from '../screens/ReportScreen';
import LoginScreen from '../screens/LoginScreen';
import { useCart } from '../context/CartContext';

export type RootStackParamList = {
    Home: undefined;
    Catalog: undefined;
    Camera: undefined;
    Checkout: undefined;
    History: undefined;
    Report: undefined;
    Login: undefined;
    Tutorial: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function CartButton({ navigation }: any) {
    const { getItemCount } = useCart();
    const itemCount = getItemCount();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Checkout')}
            style={styles.cartButton}
        >
            <Ionicons name="cart-outline" size={24} color="#fff" />
            {itemCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{itemCount}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: '#FF6B35',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerRight: () => <CartButton navigation={navigation} />,
                })}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Baz3it el chef' }}
                />
                <Stack.Screen
                    name="Catalog"
                    component={CatalogScreen}
                    options={{ title: 'Our Menu' }}
                />
                <Stack.Screen
                    name="Camera"
                    component={CameraScreen}
                    options={{ title: 'Scan Ingredients' }}
                />
                <Stack.Screen
                    name="Checkout"
                    component={CheckoutScreen}
                    options={{ title: 'Checkout', headerRight: () => null }}
                />
                <Stack.Screen
                    name="History"
                    component={HistoryScreen}
                    options={{ title: 'Activity History' }}
                />
                <Stack.Screen
                    name="Report"
                    component={ReportScreen}
                    options={{ title: 'Report a Problem' }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ title: 'Login' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    cartButton: {
        marginRight: 15,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: '#F7931E',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FF6B35',
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
