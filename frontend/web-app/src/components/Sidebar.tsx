"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, History, LogIn, AlertTriangle } from "lucide-react";

const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "History", href: "/history", icon: History },
    { name: "Login", href: "/login", icon: LogIn },
    { name: "Report Problem", href: "/report", icon: AlertTriangle },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside
            style={{
                width: "250px",
                height: "calc(100vh - 72px)", // Adjust based on header height (~72px)
                backgroundColor: "#ffffff",
                borderRight: "1px solid #e0e0e0",
                padding: "2rem 1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                position: "sticky",
                top: "72px",
                overflowY: "auto",
            }}
        >
            {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "12px 16px",
                            borderRadius: "8px",
                            color: isActive ? "#0066cc" : "#64748b",
                            backgroundColor: isActive ? "#eff6ff" : "transparent",
                            fontWeight: isActive ? "600" : "500",
                            marginBottom: "4px",
                            transition: "all 0.2s ease",
                            textDecoration: "none",
                        }}
                    // Add simple hover effect via inline styles is tricky with React, usually CSS modules are better.
                    // For now, relies on the conditional styling.
                    >
                        <Icon size={20} />
                        <span>{item.name}</span>
                    </Link>
                );
            })}
        </aside>
    );
}
