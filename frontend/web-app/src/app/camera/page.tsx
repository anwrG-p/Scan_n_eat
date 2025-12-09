"use client";

import { useState, useRef } from "react";
import styles from "./camera.module.css";
import { Camera as CameraIcon, Upload, X, Check } from "lucide-react";

export default function CameraPage() {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment",
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play().catch(err => {
                        console.error("Error playing video:", err);
                    });
                };
                setIsCameraOpen(true);
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
            alert("Could not access camera. Please check permissions.");
        }
    };

    const closeCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            setIsCameraOpen(false);
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0);
                const imageData = canvas.toDataURL('image/jpeg');
                setCapturedImage(imageData);
                closeCamera();
            }
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCapturedImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const savePhoto = async () => {
        if (!capturedImage) return;
        setIsSaving(true);

        setTimeout(async () => {
            try {
                const photoData = {
                    user_id: 1,
                    image_data: capturedImage,
                    timestamp: new Date().toISOString(),
                };
                console.log("Photo saved:", photoData);
                alert("Photo saved successfully!");
                setCapturedImage(null);
            } catch (error) {
                console.error("Error saving photo:", error);
                alert("Failed to save photo. Please try again.");
            } finally {
                setIsSaving(false);
            }
        }, 1000);
    };

    const retakePhoto = () => {
        setCapturedImage(null);
    };

    return (
        <>
            {/* Fullscreen Camera View */}
            {isCameraOpen && (
                <div className={styles.fullscreenCamera}>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className={styles.fullscreenVideo}
                    />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    <div className={styles.fullscreenControls}>
                        <button onClick={closeCamera} className={styles.fullscreenCancelButton}>
                            <X size={24} />
                            Close
                        </button>
                        <button onClick={capturePhoto} className={styles.fullscreenCaptureButton}>
                            <div className={styles.fullscreenCaptureCircle}></div>
                        </button>
                    </div>
                </div>
            )}

            {/* Regular Page View */}
            {!isCameraOpen && (
                <div className={styles.container}>
                    <div className={styles.hero}></div>

                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <div className={styles.iconContainer}>
                                <CameraIcon size={32} />
                            </div>
                            <h1 className={styles.title}>Camera</h1>
                            <p className={styles.subtitle}>Capture or upload photos of ingredients</p>
                        </div>

                        <div className={styles.cameraSection}>
                            {!capturedImage && (
                                <div className={styles.buttonGroup}>
                                    <button onClick={openCamera} className={styles.primaryButton}>
                                        <CameraIcon size={20} />
                                        Open Camera
                                    </button>
                                    <button onClick={() => fileInputRef.current?.click()} className={styles.secondaryButton}>
                                        <Upload size={20} />
                                        Upload Photo
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            )}

                            {capturedImage && (
                                <div className={styles.previewContainer}>
                                    <img src={capturedImage} alt="Captured" className={styles.preview} />
                                    <div className={styles.previewControls}>
                                        <button onClick={retakePhoto} className={styles.retakeButton}>
                                            <X size={20} />
                                            Retake
                                        </button>
                                        <button onClick={savePhoto} className={styles.saveButton} disabled={isSaving}>
                                            <Check size={20} />
                                            {isSaving ? "Saving..." : "Save Photo"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
