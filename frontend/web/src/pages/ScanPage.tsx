import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Upload, Camera, Image as ImageIcon } from 'lucide-react';

export const ScanPage: React.FC = () => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCamera = () => {
        alert("Camera functionality requires HTTPS and device permission. (Mocking camera open)");
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Scan or Upload Your Receipt</h1>
                <p className="text-lg text-gray-600">Instantly add ingredients to your digital pantry.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Upload Option */}
                <input
                    type="file"
                    accept="image/*"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                />
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer group relative bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all p-8 flex flex-col items-center justify-center text-center h-64"
                >
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Photo</h3>
                    <p className="text-gray-500 text-sm">Select an image from your gallery</p>
                </label>

                {/* Camera Option */}
                <button
                    onClick={handleCamera}
                    className="cursor-pointer group relative bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all p-8 flex flex-col items-center justify-center text-center h-64"
                >
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Camera className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Open Camera</h3>
                    <p className="text-gray-500 text-sm">Take a photo of your receipt</p>
                </button>
            </div>

            {/* Preview Section */}
            {preview ? (
                <Card className="p-4 overflow-hidden bg-white">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                        <ImageIcon className="w-5 h-5 mr-2 text-gray-500" />
                        Image Preview
                    </h3>
                    <div className="rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <img src={preview} alt="Preview" className="w-full h-auto object-contain max-h-96" />
                    </div>
                    <div className="mt-4 flex justify-end gap-3">
                        <Button variant="secondary" onClick={() => setPreview(null)}>Retake/Cancel</Button>
                        <Button onClick={() => alert("Processing invoice... (Mock)")}>Process Receipt</Button>
                    </div>
                </Card>
            ) : (
                <div className="text-center p-8 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-gray-400 italic">No image selected yet.</p>
                </div>
            )}
        </div>
    );
};
