import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, X, RotateCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { assessImage } from '../services/api';

const CameraScreen = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null); // This will hold the URL
    const [capturedFile, setCapturedFile] = useState(null); // This will hold the raw File
    const [loading, setLoading] = useState(false);

    // No automatic cleanup effect to avoid React Strict Mode double-invoke issues
    // and to ensure the URL persists for the next screen.

    const handleCapture = (e) => {
        try {
            const file = e.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setCapturedImage(imageUrl);
                setCapturedFile(file);
            }
        } catch (error) {
            console.error("Error handling camera capture:", error);
            alert("Unable to process the image. Please try again.");
        }
    };

    const handleRetake = () => {
        if (capturedImage) {
            URL.revokeObjectURL(capturedImage);
        }
        setCapturedImage(null);
        setCapturedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async () => {
        if (!capturedFile) return;

        setLoading(true);
        try {
            // Call API directly with the stored file
            const result = await assessImage(capturedFile, "General Field Site");

            // Navigate with results
            navigate('/danger-detail', {
                state: {
                    imageSrc: capturedImage, // Pass the URL for preview in next screen
                    assessmentResult: result
                }
            });
        } catch (error) {
            console.error("Assessment Failed:", error);
            alert("Failed to analyze image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 relative flex flex-col">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                {capturedImage && (
                    <button
                        onClick={handleRetake}
                        className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Camera View / Image Preview */}
            <div className="flex-1 relative bg-black flex items-center justify-center">
                {capturedImage ? (
                    <img
                        src={capturedImage}
                        alt="Captured"
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 border-4 border-white/30 border-dashed rounded-full flex items-center justify-center">
                            <Camera className="w-16 h-16 text-white/50" />
                        </div>
                        <p className="text-white/70 text-sm font-medium">
                            Tap button below to capture
                        </p>
                    </div>
                )}

                {/* Grid Overlay for camera */}
                {!capturedImage && (
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-x-0 top-1/3 h-px bg-white/10"></div>
                        <div className="absolute inset-x-0 top-2/3 h-px bg-white/10"></div>
                        <div className="absolute inset-y-0 left-1/3 w-px bg-white/10"></div>
                        <div className="absolute inset-y-0 left-2/3 w-px bg-white/10"></div>
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div
                className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-8 pt-6 rounded-t-[32px]"
                style={{
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)',
                }}
            >
                {!capturedImage ? (
                    <div className="flex items-center justify-center gap-8">
                        {/* Capture Button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                fileInputRef.current?.click();
                            }}
                            className="relative"
                        >
                            <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white"></div>
                            </div>
                        </button>

                        {/* Hidden Gallery Button */}
                        <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                                <path d="m21 15-5-5L5 21" strokeWidth="2" />

                            </svg>
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all active:scale-95 disabled:opacity-50"
                            style={{
                                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
                            }}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Camera className="w-5 h-5" />
                                    Analyze Photo
                                </>
                            )}
                        </button>

                        {/* Retake Button */}
                        <button
                            onClick={handleRetake}
                            className="w-full bg-white/20 backdrop-blur-md text-white font-semibold text-base py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/30 transition-all"
                        >
                            <RotateCw className="w-5 h-5" />
                            Retake Photo
                        </button>
                    </div>
                )}
            </div>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleCapture}
                className="hidden"
            />
        </div>
    );
};

export default CameraScreen;
