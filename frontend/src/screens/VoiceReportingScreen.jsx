import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, Square, Loader2, Send } from 'lucide-react';
import { sendVoiceCommand } from '../services/api';

const VoiceReportingScreen = () => {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcription, setTranscription] = useState('');
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = handleStop;
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert('Could not access microphone. Please enable permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsProcessing(true);
        }
    };

    const handleStop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });

        // Simulate transcription
        setTimeout(() => {
            setTranscription('Sharp objects and possible gas leak detected near drainage area');
            setIsProcessing(false);
        }, 1500);
    };

    const handleSubmit = async () => {
        if (!transcription) return;

        setIsProcessing(true);

        try {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const result = await sendVoiceCommand(audioBlob);
            navigate('/danger-detail', { state: { assessment: result } });
        } catch (err) {
            console.error('Voice processing failed', err);
            // Mock navigation for demo
            navigate('/danger-detail', {
                state: {
                    assessment: {
                        transcription,
                        vision_analysis: { dangers_detected: ['Sharp Objects', 'Gas Risk'] },
                        risk_assessment: {
                            risk_level: 'High',
                            explanation: transcription,
                            recommended_actions: ['Secure area', 'Alert supervisor', 'Evacuate workers']
                        }
                    }
                }
            });
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col relative overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #1F2937 0%, #111827 100%)',
            }}
        >
            {/* Header */}
            <div className="p-6 pt-10 flex items-center justify-between relative z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-bold text-white">
                    Voice-Based<br className="sm:hidden" /> Danger Reporting
                </h1>
                <div className="w-12"></div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
                {/* Background glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    {isRecording && (
                        <>
                            <div className="w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                            <div className="w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-ping absolute"></div>
                        </>
                    )}
                </div>

                {/* Microphone Icon */}
                <div className="relative z-10 mb-8">
                    <div
                        className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording
                            ? 'bg-red-500 shadow-[0_0_60px_rgba(239,68,68,0.6)]'
                            : 'bg-gradient-to-br from-indigo-600 to-purple-600 shadow-[0_0_40px_rgba(99,102,241,0.4)]'
                            }`}
                        style={{
                            transform: isRecording ? 'scale(1.1)' : 'scale(1)',
                        }}
                    >
                        {isProcessing ? (
                            <Loader2 className="w-12 h-12 text-white animate-spin" />
                        ) : (
                            <Mic className="w-12 h-12 text-white" />
                        )}
                    </div>

                    {/* Pulse rings when recording */}
                    {isRecording && (
                        <>
                            <div className="absolute inset-0 w-32 h-32 border-4 border-red-400/50 rounded-full animate-ping"></div>
                            <div className="absolute inset-0 w-32 h-32 border-2 border-red-400/30 rounded-full animate-pulse"></div>
                        </>
                    )}
                </div>

                {/* Status Text */}
                <h2 className="text-2xl font-bold text-white mb-3 text-center">
                    {isProcessing
                        ? 'Processing...'
                        : isRecording
                            ? 'Listening...'
                            : transcription
                                ? 'Review & Send'
                                : 'Tap to Record'}
                </h2>
                <p className="text-gray-400 text-center max-w-sm mb-8">
                    {isProcessing
                        ? 'Converting speech to text'
                        : isRecording
                            ? 'Speak clearly about the dangers you see'
                            : transcription
                                ? 'Edit if needed, then submit'
                                : 'Hold the button and describe the danger'}
                </p>

                {/* Transcription Preview */}
                {transcription && !isProcessing && (
                    <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-5 mb-6">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center shrink-0">
                                <Mic className="w-4 h-4 text-purple-300" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-sm mb-1">Transcription</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {transcription}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div className="p-6 pb-8 relative z-20">
                {!transcription ? (
                    <button
                        onClick={isRecording ? stopRecording : startRecording}
                        disabled={isProcessing}
                        className={`w-full py-5 rounded-2xl text-lg font-bold shadow-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 ${isRecording
                            ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-2xl text-white'
                            }`}
                        style={{
                            boxShadow: isRecording
                                ? '0 10px 40px rgba(239, 68, 68, 0.4)'
                                : '0 10px 40px rgba(99, 102, 241, 0.4)',
                        }}
                    >
                        {isRecording ? (
                            <>
                                <Square className="w-5 h-5" fill="currentColor" />
                                Stop & Process
                            </>
                        ) : (
                            <>
                                <Mic className="w-5 h-5" />
                                Start Recording
                            </>
                        )}
                    </button>
                ) : (
                    <div className="space-y-3">
                        <button
                            onClick={handleSubmit}
                            disabled={isProcessing}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base py-5 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all active:scale-95 disabled:opacity-50"
                            style={{
                                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
                            }}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Submit Report
                                </>
                            )}
                        </button>

                        <button
                            onClick={() => {
                                setTranscription('');
                                setIsRecording(false);
                            }}
                            className="w-full bg-white/10 backdrop-blur-md text-white font-semibold py-4 rounded-2xl hover:bg-white/20 transition-colors"
                        >
                            Record Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VoiceReportingScreen;
