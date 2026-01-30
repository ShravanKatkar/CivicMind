import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Shield, ArrowRight } from 'lucide-react';
import Logo from '../components/common/Logo';

const RoleSelectionScreen = () => {
    const navigate = useNavigate();

    const roles = [
        {
            id: 'worker',
            title: 'Worker',
            titleMr: 'कामगार',
            subtitle: 'Field Safety Officer',
            subtitleMr: 'स्वच्छता कर्मचारी',
            icon: Users,
            gradient: 'var(--gov-header-gradient)',
            description: 'Report dangers, get AI safety guidance',
            descriptionMr: 'धोके नोंदवा, AI सुरक्षा मार्गदर्शन मिळवा',
        },
        {
            id: 'supervisor',
            title: 'Supervisor',
            titleMr: 'पर्यवेक्षक',
            subtitle: 'Municipal Supervisor',
            subtitleMr: 'महानगरपालिका पर्यवेक्षक',
            icon: Shield,
            gradient: 'var(--gov-warning-gradient)',
            description: 'Monitor teams, manage district safety',
            descriptionMr: 'कर्मचारी पहा, जिल्हा सुरक्षा व्यवस्थापित करा',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-6">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <Logo size={90} />
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                    CivicMind
                </h1>
                <p className="text-gray-600 text-sm">
                    महाराष्ट्र महानगरपालिका सुरक्षा प्रणाली
                </p>
                <p className="text-gray-500 text-xs mt-1">
                    Maharashtra Municipal Safety System
                </p>
            </div>

            {/* Role Cards */}
            <div className="w-full max-w-md space-y-4">
                {roles.map((role) => (
                    <button
                        key={role.id}
                        onClick={() => navigate(`/register?role=${role.id}`)}
                        className="w-full group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] border-2 border-transparent hover:border-gray-100"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: role.gradient }}>
                                    <role.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {role.title}
                                    </h3>
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        {role.titleMr}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {role.subtitle}
                                    </p>
                                </div>
                            </div>
                            <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-600">{role.description}</p>
                            <p className="text-xs text-gray-500 mt-1">{role.descriptionMr}</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Already have account */}
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 mb-2">
                    Already have an account? | आधीपासून खाते आहे?
                </p>
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => navigate('/login/worker')}
                        className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-gray-700 transition-colors"
                    >
                        Worker Login
                    </button>
                    <button
                        onClick={() => navigate('/login/supervisor')}
                        className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-full text-sm font-semibold shadow-lg transition-all"
                    >
                        Supervisor Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoleSelectionScreen;
