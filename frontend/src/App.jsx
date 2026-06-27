import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SafetyProvider } from './context/SafetyContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import MobileLayout from './components/layout/MobileLayout';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import DangerAlertScreen from './screens/DangerAlertScreen';
import LiveSafetyScreen from './screens/LiveSafetyScreen';
import SupervisorDashboard from './screens/admin/SupervisorDashboard';
import VoiceReportingScreen from './screens/VoiceReportingScreen';
import LoginScreen from './screens/LoginScreen';
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LanguageSelectionScreen from './screens/LanguageSelectionScreen';
import ReportsScreen from './screens/ReportsScreen';
import IncidentDetailScreen from './screens/IncidentDetailScreen';
import IncidentReportScreen from './screens/IncidentReportScreen';
import CalendarScreen from './screens/CalendarScreen';
import SupervisorUpdatesScreen from './screens/SupervisorUpdatesScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <SafetyProvider>
            <BrowserRouter>
              <Routes>
                {/* Entry Flow - Splash → Welcome → Language → Role Selection → Auth */}
                <Route path="/" element={<SplashScreen />} />
                <Route path="/welcome" element={<WelcomeScreen />} />
                <Route path="/language" element={<LanguageSelectionScreen />} />
                <Route path="/roles" element={<RoleSelectionScreen />} />
                <Route path="/register" element={<RegistrationScreen />} />
                <Route path="/login/:role" element={<LoginScreen />} />

                {/* Main App - Home Dashboard with Bottom Nav */}
                <Route path="/home" element={<MobileLayout />}>
                  <Route index element={<HomeScreen />} />
                  <Route path="calendar" element={<CalendarScreen />} />
                  <Route path="updates" element={<SupervisorUpdatesScreen />} />
                  <Route path="profile" element={<ProfileScreen />} />
                </Route>

                {/* Full Screen Routes (No Bottom Nav) */}
                <Route path="/assess" element={<CameraScreen />} />
                <Route path="/voice" element={<VoiceReportingScreen />} />
                <Route path="/danger-detail" element={<DangerAlertScreen />} />
                <Route path="/live-safety" element={<LiveSafetyScreen />} />
                <Route path="/reports" element={<ReportsScreen />} />
                <Route path="/incident/:id" element={<IncidentDetailScreen />} />
                <Route path="/report-incident" element={<IncidentReportScreen />} />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<SupervisorDashboard />} />

                {/* Catch all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </SafetyProvider>
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
