import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Send, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="bg-[#0F172A] text-gray-400 py-16 border-t border-slate-800">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-12">
                
                {/* Column 1 - Brand info */}
                <div className="md:col-span-4 flex flex-col items-start gap-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-electric-blue to-vivid-cyan flex items-center justify-center">
                            <Shield className="w-4.5 h-4.5 text-white" />
                        </div>
                        <span className="font-extrabold text-base text-white font-display tracking-tight">
                            CivicMind <span className="text-electric-blue">AI</span>
                        </span>
                    </div>
                    <p className="text-xs leading-relaxed max-w-sm text-gray-400">
                        Autonomous Safety Intelligence for frontline sanitation workers and public works departments. Built on YOLOv8 computer vision and structured LLM explanation layers.
                    </p>
                    
                    {/* Social links */}
                    <div className="flex items-center gap-3 pt-2">
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white transition-colors">
                            <Github className="w-4 h-4" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white transition-colors">
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white transition-colors">
                            <Linkedin className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Column 2 - Links */}
                <div className="md:col-span-2 flex flex-col gap-3.5">
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest">Platform</h4>
                    <button onClick={() => navigate('/language')} className="text-xs font-semibold text-left hover:text-white transition-colors">Launch Platform</button>
                    <a href="#features" className="text-xs font-semibold text-left hover:text-white transition-colors">AI Features</a>
                    <a href="#dashboard" className="text-xs font-semibold text-left hover:text-white transition-colors">Control Center</a>
                    <a href="#deployment" className="text-xs font-semibold text-left hover:text-white transition-colors">Deployment Models</a>
                </div>

                {/* Column 3 - Links */}
                <div className="md:col-span-2 flex flex-col gap-3.5">
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest">Resources</h4>
                    <a href="/docs/Mobile_Access.md" className="text-xs font-semibold text-left hover:text-white transition-colors">Mobile Setup</a>
                    <a href="#faq" className="text-xs font-semibold text-left hover:text-white transition-colors">FAQ Portal</a>
                    <span className="text-xs font-semibold text-left hover:text-white transition-colors cursor-not-allowed">API Reference</span>
                    <span className="text-xs font-semibold text-left hover:text-white transition-colors cursor-not-allowed">Safety Guidelines</span>
                </div>

                {/* Column 4 - Newsletter */}
                <div className="md:col-span-4 flex flex-col items-start gap-3.5">
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest">Municipal Updates</h4>
                    <p className="text-xs leading-relaxed text-gray-400">
                        Subscribe to get updates on state compliance requirements and new safety models.
                    </p>
                    <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-sm rounded-xl overflow-hidden bg-slate-800 border border-slate-700 p-1">
                        <input 
                            type="email" 
                            placeholder="officer@municipality.gov"
                            className="bg-transparent border-none text-xs text-white px-3 flex-1 focus:ring-0 focus:outline-none placeholder-gray-500"
                        />
                        <button type="submit" className="w-8 h-8 rounded-lg bg-electric-blue hover:bg-blue-600 text-white flex items-center justify-center shrink-0 transition-colors">
                            <Send className="w-3.5 h-3.5" />
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full pt-12 mt-12 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
                <span>© {new Date().getFullYear()} CivicMind AI Inc. All municipal rights reserved.</span>
                <div className="flex gap-6">
                    <span className="hover:text-white cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-white cursor-pointer">Terms of Service</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
