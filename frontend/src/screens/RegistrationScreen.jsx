import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User, Phone, Lock, MapPin, ArrowLeft, Check } from 'lucide-react';
import { getDistricts, registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

const RegistrationScreen = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role');
    const { login } = useAuth();

    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
        district: '',
    });
    useEffect(() => {
        // Fetch districts
        console.log('Fetching districts...');
        getDistricts()
            .then(data => {
                console.log('Districts received:', data);
                if (data && data.districts) {
                    setDistricts(data.districts);
                    console.log('Districts set:', data.districts.length, 'districts');
                } else {
                    console.error('Invalid districts data structure:', data);
                    setError('Failed to load districts');
                }
            })
            .catch(err => {
                console.error('Failed to load districts:', err);
                setError(`Failed to load districts: ${err.message || 'Network error'}`);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (!formData.district) {
            setError('Please select a district');
            return;
        }

        setLoading(true);

        try {
            // Try backend first
            const data = await registerUser({
                name: formData.name,
                phone: formData.phone,
                password: formData.password,
                role: role,
                district: formData.district,
            });

            await login(data.user, data.access_token);

            if (role === 'supervisor') {
                navigate('/admin/dashboard');
            } else {
                navigate('/home');
            }
        } catch (err) {
            // Backend unavailable — register locally so the demo works
            try {
                const localUsers = JSON.parse(localStorage.getItem('civicmind_local_users') || '[]');

                // Check if phone already registered locally
                if (localUsers.find(u => u.phone === formData.phone)) {
                    setError('Phone number already registered. Please login instead.');
                    setLoading(false);
                    return;
                }

                // Create local user
                const newUser = {
                    id: Date.now(),
                    name: formData.name,
                    phone: formData.phone,
                    password: formData.password, // stored locally only for demo
                    role: role,
                    district: formData.district,
                    created_at: new Date().toISOString(),
                };

                localUsers.push(newUser);
                localStorage.setItem('civicmind_local_users', JSON.stringify(localUsers));

                // Generate a local token
                const localToken = `local_${Date.now()}_${Math.random().toString(36).substr(2)}`;

                const userData = {
                    id: newUser.id,
                    name: newUser.name,
                    phone: newUser.phone,
                    role: newUser.role,
                    district: newUser.district,
                };

                await login(userData, localToken);

                if (role === 'supervisor') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/home');
                }
            } catch (localErr) {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col p-6 pt-24">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-8 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
            >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                    Register as {role === 'worker' ? 'Worker' : 'Supervisor'}
                </h1>
                <p className="text-sm text-gray-600">
                    {role === 'worker' ? 'कामगार नोंदणी' : 'पर्यवेक्षक नोंदणी'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Name */}
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Full Name / पूर्ण नाव"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none transition-colors text-gray-900"
                        style={{ borderColor: 'var(--signal-cyan)' }}
                    />
                </div>

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
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-cyan-500 transition-colors text-gray-900"
                    />
                </div>

                {/* District */}
                <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-cyan-500 transition-colors appearance-none text-gray-900"
                    >
                        <option value="">Select District / जिल्हा निवडा</option>
                        {districts.map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
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
                        minLength={6}
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-cyan-500 transition-colors text-gray-900"
                    />
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <Check className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="password"
                        placeholder="Confirm Password / पासवर्ड पुन्हा टाका"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                        minLength={6}
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-cyan-500 transition-colors text-gray-900"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all"
                    style={{
                        background: loading ? '#9CA3AF' : role === 'supervisor' ? 'linear-gradient(135deg, #FF6B35 0%, #FFB627 100%)' : 'linear-gradient(135deg, #00D9FF 0%, #FF6B35 100%)',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Registering...' : 'Register / नोंदणी करा'}
                </button>
            </form>

            {/* Already have account */}
            <div className="text-center mt-6">
                <button
                    onClick={() => navigate(`/login/${role}`)}
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                    Already have an account? Login / आधीपासून खाते आहे? लॉगिन करा
                </button>
            </div>
        </div>
    );
};

export default RegistrationScreen;
