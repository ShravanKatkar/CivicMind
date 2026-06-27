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
        <div className="min-h-screen bg-sky-white relative flex flex-col justify-between overflow-hidden font-body">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 bg-white/80 hover:bg-white shadow-soft rounded-full flex items-center justify-center text-ink-navy transition-all duration-200 active:scale-90"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                {capturedImage && (
                    <button
                        onClick={handleRetake}
                        className="w-12 h-12 bg-white/80 hover:bg-white shadow-soft rounded-full flex items-center justify-center text-ink-navy transition-all duration-200 active:scale-90"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Viewfinder / Image Preview */}
            <div className="flex-1 flex items-center justify-center p-6 relative">
                {capturedImage ? (
                    <div className="w-full max-w-sm h-[50vh] rounded-3xl overflow-hidden shadow-soft border-4 border-white bg-white relative">
                        <img
                            src={capturedImage}
                            alt="Captured"
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6">
                        {/* Viewfinder with Brackets & Scan Line */}
                        <div className="relative w-80 h-80 bg-white/50 backdrop-blur-sm rounded-[32px] overflow-hidden flex items-center justify-center shadow-soft border-2 border-white">
                            {/* Illustrated Brackets */}
                            <div className="absolute top-6 left-6 w-10 h-10 border-t-8 border-l-8 border-electric-blue rounded-tl-2xl"></div>
                            <div className="absolute top-6 right-6 w-10 h-10 border-t-8 border-r-8 border-electric-blue rounded-tr-2xl"></div>
                            <div className="absolute bottom-6 left-6 w-10 h-10 border-b-8 border-l-8 border-electric-blue rounded-bl-2xl"></div>
                            <div className="absolute bottom-6 right-6 w-10 h-10 border-b-8 border-r-8 border-electric-blue rounded-br-2xl"></div>
                            
                            {/* Scanning beam */}
                            <div className="absolute left-6 right-6 h-1.5 bg-gradient-to-r from-transparent via-vivid-cyan to-transparent shadow-[0_0_12px_#06B6D4] animate-scan rounded-full"></div>

                            {/* Center illustrated target */}
                            <div className="text-center p-6 pointer-events-none select-none flex flex-col items-center">
                                <div className="w-20 h-20 bg-sky-white rounded-full flex items-center justify-center mb-3 shadow-inner">
                                    <Camera className="w-10 h-10 text-electric-blue" />
                                </div>
                                <span className="text-xs font-bold text-slate-gray tracking-wider uppercase">AI Hazard Scan</span>
                            </div>
                        </div>
                        <p className="text-slate-gray text-sm font-medium text-center max-w-xs leading-relaxed">
                            Position the safety hazard within the brackets. CivicMind AI will automatically assess risks.
                        </p>
                    </div>
                )}
            </div>

            {/* Bottom Controls Sheet */}
            <div className="bg-white/90 backdrop-blur-md rounded-t-[32px] border-t border-blue-50 shadow-[0_-8px_30px_rgba(37,99,235,0.06)] p-6 z-10 w-full max-w-md mx-auto">
                {!capturedImage ? (
                    <div className="space-y-4">
                        {/* Last scan peek summary */}
                        <div className="bg-sky-white rounded-2xl p-4 flex items-center justify-between border border-blue-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-electric-blue/10 rounded-xl flex items-center justify-center text-lg">
                                    🪖
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-gray font-bold uppercase tracking-wider block">Last Scan Result</span>
                                    <h4 className="font-bold text-ink-navy text-sm">Site B - Scaffolding</h4>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 bg-[#FEE2E2] px-3 py-1.5 rounded-xl border border-red-100">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alert-red opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-alert-red"></span>
                                </span>
                                <span className="font-data font-bold text-alert-red text-xs">8.2 HIGH</span>
                            </div>
                        </div>

                        {/* Capture CTA */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                fileInputRef.current?.click();
                            }}
                            className="w-full bg-gradient-to-r from-electric-blue to-vivid-cyan hover:opacity-95 text-white font-bold text-base py-4 rounded-full flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all duration-200 ease-spring"
                            style={{
                                boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.4)',
                            }}
                        >
                            <Camera className="w-5 h-5" />
                            Scan Hazard
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-electric-blue to-vivid-cyan text-white font-bold text-base py-4.5 rounded-full shadow-lg flex items-center justify-center gap-2 hover:opacity-95 transition-all active:scale-95 disabled:opacity-50"
                            style={{
                                boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.4)',
                            }}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Analyzing Risks...
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
                            className="w-full bg-sky-white border border-electric-blue/15 text-electric-blue hover:bg-blue-50 font-bold text-base py-4 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95"
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
