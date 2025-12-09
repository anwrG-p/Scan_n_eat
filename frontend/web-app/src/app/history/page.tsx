"use client";

import { useState, useEffect } from "react";
import styles from "./history.module.css";
import { History, Clock, CheckCircle, XCircle, ShoppingCart, Eye, Camera } from "lucide-react";

interface HistoryItem {
    id: number;
    action_type: string;
    resource_type: string;
    resource_id: number;
    details: string;
    timestamp: string;
}

export default function HistoryPage() {
    const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch history from backend
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            // Replace with your actual backend URL
            // Assuming you have a history endpoint that returns user's history
            const response = await fetch('http://localhost:8080/api/history/user/1'); // Replace with actual user ID
            const data = await response.json();
            setHistoryItems(data);
        } catch (error) {
            console.error('Failed to fetch history:', error);
            // Fallback to sample data if backend is not ready
            setHistoryItems(getSampleData());
        } finally {
            setLoading(false);
        }
    };

    const getSampleData = () => [
        { id: 1, action_type: "ORDER_PLACED", resource_type: "order", resource_id: 1, details: "Order #1 - Total: $25.50 - Status: COMPLETED", timestamp: "2 hours ago" },
        { id: 2, action_type: "VIEWED_RECIPE", resource_type: "recipe", resource_id: 1, details: "Viewed Margherita Pizza recipe", timestamp: "5 hours ago" },
        { id: 3, action_type: "SCANNED_INGREDIENT", resource_type: "ingredient", resource_id: 1, details: "Scanned Tomatoes", timestamp: "1 day ago" },
        { id: 4, action_type: "ORDER_PLACED", resource_type: "order", resource_id: 2, details: "Order #2 - Total: $15.00 - Status: PENDING", timestamp: "2 days ago" },
        { id: 5, action_type: "VIEWED_RECIPE", resource_type: "recipe", resource_id: 2, details: "Viewed Chicken Pasta recipe", timestamp: "3 days ago" },
    ];

    const getIcon = (actionType: string) => {
        switch (actionType) {
            case "ORDER_PLACED":
                return <ShoppingCart size={24} className={styles.successIcon} />;
            case "VIEWED_RECIPE":
                return <Eye size={24} className={styles.successIcon} />;
            case "SCANNED_INGREDIENT":
                return <Camera size={24} className={styles.successIcon} />;
            default:
                return <CheckCircle size={24} className={styles.successIcon} />;
        }
    };

    const getStatus = (actionType: string) => {
        return actionType.includes("FAILED") ? "error" : "success";
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.hero}></div>
                <div className={styles.contentWrapper}>
                    <p>Loading history...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.hero}></div>

            <div className={styles.contentWrapper}>
                <div className={styles.header}>
                    <div className={styles.iconContainer}>
                        <History size={32} />
                    </div>
                    <h1 className={styles.title}>Activity History</h1>
                    <p className={styles.subtitle}>Track your recent actions and activities</p>
                </div>

                <div className={styles.historyList}>
                    {historyItems.map((item) => (
                        <div key={item.id} className={styles.historyItem}>
                            <div className={styles.statusIcon}>
                                {getIcon(item.action_type)}
                            </div>
                            <div className={styles.itemContent}>
                                <p className={styles.itemAction}>{item.details}</p>
                                <div className={styles.itemTime}>
                                    <Clock size={14} />
                                    <span>{item.timestamp}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
