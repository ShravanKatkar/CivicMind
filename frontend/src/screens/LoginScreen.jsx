import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Phone, Lock, ArrowLeft, Shield, Users } from 'lucide-react';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
    const navigate = useNavigate();
    const { role } = useParams();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        phone: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const isWorker = role === 'worker';
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log('Attempting login for role:', role, 'phone:', formData.phone);
            const data = await loginUser(role, formData);
            console.log('Login successful:', data);

            await login(data.user, data.access_token);

            // Navigate based on role
            if (role === 'supervisor') {
                navigate('/admin/dashboard');
            } else {
                navigate('/home');
            }
        } catch (err) {
            console.error('Login error:', err);
            const errorMsg = err.response?.data?.detail || err.message || 'Login failed';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-6">
            {/* Back Button */}
            <button
                onClick={() => navigate('/roles')}
                className="absolute top-8 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
            >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center shadow-xl" style={{
                    background: isWorker ? 'var(--gov-header-gradient)' : 'var(--gov-warning-gradient)'
                }}>
                    {isWorker ? <Users className="w-10 h-10 text-white" /> : <Shield className="w-10 h-10 text-white" />}
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                    {isWorker ? 'Worker Login' : 'Supervisor Login'}
                </h1>
                <p className="text-sm text-gray-600">
                    {isWorker ? 'कामगार लॉगिन' : 'पर्यवेक्षक लॉगिन'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Phone */}
                <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="tel"
                        placeholder="Mobile Number / मोबाईल नंबर"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        pattern="[0-9]{10}"
                        maxLength={10}
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none transition-colors text-gray-900"
                        style={{ borderColor: 'var(--gov-navy)' }}
                    />
                </div>

                {/* Password */}
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="password"
                        placeholder="Password / पासवर्ड"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none transition-colors text-gray-900"
                        style={{ borderColor: 'var(--gov-navy)' }}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all"
                    style={{
                        background: loading ? '#9CA3AF' : isWorker ? 'var(--gov-header-gradient)' : 'var(--gov-warning-gradient)',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Logging in...' : 'Login / लॉगिन करा'}
                </button>
            </form>

            {/* Register Link */}
            <div className="text-center mt-6">
                <button
                    onClick={() => navigate(`/register?role=${role}`)}
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                    Don't have an account? Register / खाते नाही? नोंदणी करा
                </button>
            </div>
        </div>
    );
};

export default LoginScreen;
