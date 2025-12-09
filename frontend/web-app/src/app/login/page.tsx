"use client";

import { useState } from "react";
import styles from "./login.module.css";
import { LogIn, Mail, Lock } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login attempt:", { email, password });
    };

    return (
        <div className={styles.container}>
            <div className={styles.hero}></div>

            <div className={styles.contentWrapper}>
                <div className={styles.loginCard}>
                    <div className={styles.iconContainer}>
                        <LogIn size={32} />
                    </div>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Sign in to your account</p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <Mail className={styles.inputIcon} size={20} />
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <Lock className={styles.inputIcon} size={20} />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.input}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            Sign In
                        </button>
                    </form>

                    <p className={styles.footer}>
                        Don't have an account? <a href="/register">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
