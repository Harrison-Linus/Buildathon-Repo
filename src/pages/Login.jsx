import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  User,
  Users,
  Shield,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { useAcademic } from '../context/AcademicContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAcademic();
  
  const [selectedRole, setSelectedRole] = useState(null); // 'student', 'teacher', 'admin'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIdentifier('');
    setPassword('');
    setError(null);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setIdentifier('');
    setPassword('');
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError(`Please enter your ${selectedRole === 'student' ? 'register number' : selectedRole === 'teacher' ? 'staff ID' : 'admin ID'}.`);
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    const result = await login(selectedRole, identifier, password);

    if (result.success) {
      if (result.role === 'student') navigate('/dashboard');
      else if (result.role === 'teacher') navigate('/teacher/dashboard');
      else if (result.role === 'admin') navigate('/admin');
    } else {
      setIsLoading(false);
      setError(result.message || `Invalid ${selectedRole === 'teacher' ? 'Staff' : selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} credentials.`);
    }
  };

  // UI mapping config based on user requirements
  const roleConfig = {
    student: {
      title: 'STUDENT',
      uiTitle: 'Student Portal',
      icon: User,
      desc: 'Access your courses, attendance, assignments and performance',
      idLabel: 'Register Number',
      idPlaceholder: 'Enter your register number (e.g. 23CSE001)',
      color: 'slate',
    },
    teacher: {
      title: 'STAFF',
      uiTitle: 'Staff Portal',
      icon: Users,
      desc: 'Manage students, attendance, assignments and grades',
      idLabel: 'Staff ID',
      idPlaceholder: 'Enter your staff ID (e.g. STF001)',
      color: 'indigo',
    },
    admin: {
      title: 'ADMIN',
      uiTitle: 'Administration',
      icon: Shield,
      desc: 'Manage the entire academic system',
      idLabel: 'Admin ID',
      idPlaceholder: 'Enter your admin ID (e.g. ADM001)',
      color: 'rose',
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-800/50 min-h-[600px]">
        {/* Left Brand Showcase Column */}
        <div className="lg:col-span-6 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="font-extrabold text-2xl tracking-tight text-white">
                  EduPulse{' '}
                  <span className="text-xs uppercase font-bold tracking-widest px-2 py-0.5 bg-white/20 rounded-full ml-1">
                    AI
                  </span>
                </h1>
                <p className="text-xs text-indigo-200">
                  Smart Academic Management System
                </p>
              </div>
            </div>

            <div className="mt-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-100 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Education Portal
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 leading-tight font-heading">
                Transforming academic management for students & faculty.
              </h2>
              <p className="text-sm text-indigo-100/90 mt-3 leading-relaxed">
                Real-time performance tracking, attendance management, internal score editing, and automated risk detection.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 space-y-2.5 text-xs text-indigo-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Student Portal: Attendance & Weak Subject Diagnostics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Staff Dashboard: Class Roster, Score & Attendance Editor</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Admin Control: Manage the entire academic system</span>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-6 p-8 sm:p-12 bg-white flex flex-col justify-center relative transition-all duration-500">
          
          {!selectedRole ? (
            // ROLE SELECTION STATE
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900 font-heading">Welcome</h3>
                <p className="text-sm text-slate-500 mt-1">Select your role to continue</p>
              </div>

              <div className="space-y-4">
                {Object.entries(roleConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => handleRoleSelect(key)}
                      className={`w-full p-4 rounded-2xl border-2 border-slate-100 hover:border-${config.color}-500 hover:shadow-md hover:shadow-${config.color}-500/10 transition-all flex items-center justify-between group bg-white text-left cursor-pointer`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-${config.color}-50 text-${config.color}-600 flex items-center justify-center group-hover:bg-${config.color}-600 group-hover:text-white transition-colors`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-lg group-hover:text-slate-800">{config.title}</h4>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 pr-2">{config.desc}</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            // LOGIN FORM STATE
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 w-full max-w-sm mx-auto">
              <button 
                onClick={handleBack}
                disabled={isLoading}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-8 cursor-pointer w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change Role</span>
              </button>

              <div className="mb-8 text-center flex flex-col items-center">
                <div className={`w-16 h-16 rounded-2xl bg-${roleConfig[selectedRole].color}-100 text-${roleConfig[selectedRole].color}-600 flex items-center justify-center mb-4`}>
                  {React.createElement(roleConfig[selectedRole].icon, { className: "w-8 h-8" })}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-heading">{roleConfig[selectedRole].uiTitle} Login</h3>
                <p className="text-sm text-slate-500 mt-1">Please enter your credentials to continue</p>
              </div>

              {error && (
                <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800 font-medium leading-tight">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {roleConfig[selectedRole].idLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={roleConfig[selectedRole].idPlaceholder}
                    disabled={isLoading}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      className="w-full px-4 py-3 pr-12 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition text-slate-900 placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex="-1"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button type="button" className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer">
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white text-sm font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <span>LOGIN</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
