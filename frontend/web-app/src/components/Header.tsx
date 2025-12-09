"use client";

import Link from "next/link";
import { User, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Header() {
    const { getTotalItems } = useCart();
    const itemCount = getTotalItems();

    return (
        <header
            style={{
                backgroundColor: "#0066cc",
                color: "white",
                padding: "1rem 2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                position: "sticky",
                top: 0,
                zIndex: 50,
            }}
        >
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>baz3it chef</div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <span>Welcome, Chef</span>

                {/* Shopping Cart Icon */}
                <Link
                    href="/checkout"
                    style={{
                        position: "relative",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        padding: "8px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"}
                >
                    <ShoppingCart size={20} />
                    {itemCount > 0 && (
                        <span
                            style={{
                                position: "absolute",
                                top: "-4px",
                                right: "-4px",
                                backgroundColor: "#ef4444",
                                color: "white",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                            }}
                        >
                            {itemCount}
                        </span>
                    )}
                </Link>

                {/* User Icon */}
                <div
                    style={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        padding: "8px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <User size={20} />
                </div>
            </div>
        </header>
    );
}
