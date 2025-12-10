import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useIngredientsStore } from '../store/ingredientsStore';
import { apiClient } from '../api/client';
import { Upload, Loader2 } from 'lucide-react';
import type { Ingredient } from '../types';

export const ScanPage: React.FC = () => {
    const navigate = useNavigate();
    const { addIngredient } = useIngredientsStore();
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [status, setStatus] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selected = e.target.files[0];
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleScan = async () => {
        if (!file) return;

        setIsScanning(true);
        setStatus('Uploading and Analyzing Image...');

        try {
            // 1. Upload to OCR Service
            const formData = new FormData();
            formData.append('image', file);

            // Note: apiClient baseURL is /api/v1. Path is /ocr/scan.
            const response = await apiClient.post<{ success: boolean; detected_items: Ingredient[] }>(
                '/ocr/scan',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            const items = response.data.detected_items;

            if (!items || items.length === 0) {
                setStatus('No ingredients detected.');
                setIsScanning(false);
                return;
            }

            // 2. Add to Pantry (Ingredients Service)
            setStatus(`Found ${items.length} items. Saving to Pantry...`);
            
            // Sequential add to avoid overwhelming the server or race conditions
            for (const item of items) {
                // Ensure quantity is a number (OCR might return string)
                if (typeof item.quantity === 'string') {
                    item.quantity = parseFloat(item.quantity) || 1; 
                }
                await addIngredient(item);
            }

            setStatus('Done! Redirecting...');
            setTimeout(() => navigate('/ingredients'), 1000);

        } catch (error: any) {
            console.error('Scan failed', error);
            setStatus(`Error: ${error.response?.data?.error || error.message}`);
            setIsScanning(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-center">Scan Receipt / Invoice</h1>

            <Card className="p-8">
                <div className="flex flex-col items-center space-y-6">
                    {/* Upload Area */}
                    <div className="w-full text-center">
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-10 hover:bg-gray-50 transition-colors"
                        >
                            {preview ? (
                                <img src={preview} alt="Preview" className="max-h-64 rounded shadow-md" />
                            ) : (
                                <>
                                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                                    <span className="text-gray-600 font-medium">Click to upload an image</span>
                                    <span className="text-gray-400 text-sm mt-1">JPG, PNG supported</span>
                                </>
                            )}
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                                disabled={isScanning}
                            />
                        </label>
                    </div>

                    {/* Actions */}
                    {file && !isScanning && (
                        <Button onClick={handleScan} className="w-full text-lg py-6">
                            Start Scan
                        </Button>
                    )}

                    {/* Status Feedback */}
                    {isScanning && (
                        <div className="flex flex-col items-center space-y-3 p-4 bg-blue-50 rounded-lg w-full">
                            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                            <p className="text-blue-700 font-medium">{status}</p>
                        </div>
                    )}
                    
                    {!isScanning && status && status.startsWith('Error') && (
                        <div className="text-red-500 font-medium">{status}</div>
                    )}
                </div>
            </Card>
        </div>
    );
};
