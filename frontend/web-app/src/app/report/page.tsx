"use client";

import { useState } from "react";
import styles from "./report.module.css";
import { AlertTriangle, Send } from "lucide-react";

export default function ReportPage() {
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Report submitted:", { subject, description });
        // Handle report submission logic here
        alert("Thank you! Your report has been submitted.");
        setSubject("");
        setDescription("");
    };

    return (
        <div className={styles.container}>
            <div className={styles.hero}></div>

            <div className={styles.contentWrapper}>
                <div className={styles.reportCard}>
                    <div className={styles.iconContainer}>
                        <AlertTriangle size={32} />
                    </div>
                    <h1 className={styles.title}>Report a Problem</h1>
                    <p className={styles.subtitle}>Let us know about any technical issues you're experiencing</p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Subject</label>
                            <input
                                type="text"
                                placeholder="Brief description of the issue"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Description</label>
                            <textarea
                                placeholder="Please provide detailed information about the problem..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={styles.textarea}
                                rows={6}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            <Send size={20} />
                            Submit Report
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
