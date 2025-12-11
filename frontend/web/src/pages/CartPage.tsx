import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const CartPage: React.FC = () => {
    const { items, formattedTotal, clearCart, checkout } = useCartStore();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!window.confirm("Proceed to checkout?")) return;
        
        setIsCheckingOut(true);
        try {
            await checkout();
            alert('Order placed successfully!');
            navigate('/orders'); // Redirect to order history
        } catch (error: any) {
            alert(error.message || 'Checkout failed. Please try again.');
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {items.length === 0 ? (
                        <Card className="p-8 text-center text-gray-500">
                            Your cart is empty.
                        </Card>
                    ) : (
                        items.map((item) => (
                            <Card key={item.id} className="p-4 flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <h3 className="font-bold">{item.name}</h3>
                                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.cartQuantity}</p>
                                    </div>
                                </div>
                                <div className="font-bold">
                                    ${(item.price * item.cartQuantity).toFixed(2)}
                                </div>
                            </Card>
                        ))
                    )}
                </div>
                <div className="lg:col-span-1">
                    <Card className="p-6 sticky top-24">
                        <h2 className="text-xl font-bold mb-4">Summary</h2>
                        <div className="flex justify-between mb-4 text-lg font-medium">
                            <span>Total</span>
                            <span>${formattedTotal()}</span>
                        </div>
                        <Button 
                            className="w-full mb-2" 
                            disabled={items.length === 0 || isCheckingOut}
                            onClick={handleCheckout}
                        >
                            {isCheckingOut ? 'Processing...' : 'Checkout'}
                        </Button>
                        {items.length > 0 && (
                            <Button variant="secondary" className="w-full" onClick={clearCart} disabled={isCheckingOut}>
                                Clear Cart
                            </Button>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};
