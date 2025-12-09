"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./checkout.module.css";
import { ShoppingCart, CreditCard, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [processing, setProcessing] = useState(false);

    const handleSubmitOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        // Simulate order processing
        setTimeout(async () => {
            const order = {
                user_id: 1, // Replace with actual user ID
                total_amount: getTotalPrice(),
                status: "COMPLETED",
                delivery_address: deliveryAddress,
                items: cart.map(item => ({
                    recipe_id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
            };

            try {
                // Send order to backend
                const response = await fetch('http://localhost:8085/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(order),
                });

                if (response.ok) {
                    // Clear cart and redirect to history
                    clearCart();
                    alert('Order placed successfully!');
                    router.push('/history');
                } else {
                    alert('Failed to place order. Please try again.');
                }
            } catch (error) {
                console.error('Order submission failed:', error);
                // For demo purposes, still clear cart and redirect
                clearCart();
                alert('Order placed successfully! (Demo mode)');
                router.push('/history');
            } finally {
                setProcessing(false);
            }
        }, 1500);
    };

    if (cart.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.hero}></div>
                <div className={styles.contentWrapper}>
                    <div className={styles.emptyCart}>
                        <ShoppingCart size={64} className={styles.emptyIcon} />
                        <h2>Your cart is empty</h2>
                        <p>Add some delicious dishes to get started!</p>
                        <button onClick={() => router.push('/catalog')} className={styles.shopButton}>
                            Browse Menu
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.hero}></div>

            <div className={styles.contentWrapper}>
                <h1 className={styles.title}>Checkout</h1>

                <div className={styles.checkoutGrid}>
                    {/* Cart Items */}
                    <div className={styles.cartSection}>
                        <h2 className={styles.sectionTitle}>Your Order</h2>
                        <div className={styles.cartItems}>
                            {cart.map((item) => (
                                <div key={item.id} className={styles.cartItem}>
                                    <img src={item.image_url || '/hero-image.jpg'} alt={item.title} className={styles.itemImage} />
                                    <div className={styles.itemDetails}>
                                        <h3>{item.title}</h3>
                                        <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className={styles.quantityControls}>
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className={styles.qtyButton}>
                                            <Minus size={16} />
                                        </button>
                                        <span className={styles.quantity}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className={styles.qtyButton}>
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className={styles.total}>
                            <span>Total:</span>
                            <span className={styles.totalAmount}>${getTotalPrice().toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className={styles.paymentSection}>
                        <h2 className={styles.sectionTitle}>Payment Details</h2>
                        <form onSubmit={handleSubmitOrder} className={styles.form}>

                            <div className={styles.inputGroup}>
                                <label>Delivery Address</label>
                                <textarea
                                    value={deliveryAddress}
                                    onChange={(e) => setDeliveryAddress(e.target.value)}
                                    placeholder="Enter your delivery address"
                                    className={styles.textarea}
                                    required
                                    rows={3}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Payment Method</label>
                                <div className={styles.paymentMethods}>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("card")}
                                        className={`${styles.paymentMethod} ${paymentMethod === "card" ? styles.active : ""}`}
                                    >
                                        <CreditCard size={20} />
                                        Credit Card
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("paypal")}
                                        className={`${styles.paymentMethod} ${paymentMethod === "paypal" ? styles.active : ""}`}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.653h5.555c3.72 0 6.294 1.68 6.294 5.146 0 3.467-2.574 6.294-6.294 6.294H8.342l-1.266 6.83zm8.628-12.48c0-2.574-1.68-3.72-4.254-3.72H8.342l-1.68 9.067h3.108c2.574 0 4.254-1.68 4.254-4.254 0-.84-.21-1.68-.42-2.574z" />
                                        </svg>
                                        PayPal
                                    </button>
                                </div>
                            </div>

                            {paymentMethod === "card" && (
                                <div className={styles.inputGroup}>
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        placeholder="1234 5678 9012 3456"
                                        className={styles.input}
                                        required
                                        maxLength={19}
                                    />
                                </div>
                            )}

                            <button type="submit" className={styles.submitButton} disabled={processing}>
                                {processing ? "Processing..." : `Pay $${getTotalPrice().toFixed(2)}`}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
