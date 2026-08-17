// app/admin/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  Settings,
  Key,
  Trash2,
  Plus,
  Search,
  ArrowLeft,
  Lock,
  Activity,
  FileText,
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight,
  Database,
} from 'lucide-react';

interface UserCredential {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'Super Admin' | 'Admin' | 'Moderator' | 'User';
  status: 'Active' | 'Suspended';
  createdAt: string;
}

export default function AdminDashboard() {
  // Read default admin credentials injected from environment variables
  const defaultAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@facehook.com';
  const defaultAdminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

  const [activeTab, setActiveTab] = useState<'users' | 'settings' | 'metrics'>('users');
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Platform Feature Toggles
  const [settings, setSettings] = useState({
    marketplaceEnabled: true,
    commentsEnabled: true,
    maintenanceMode: false,
    userRegistrations: true,
  });

  // User Management State with default admin injected
  const [users, setUsers] = useState<UserCredential[]>([
    {
      id: 'usr_001',
      name: 'System Administrator',
      email: defaultAdminEmail,
      password: defaultAdminPassword,
      role: 'Super Admin',
      status: 'Active',
      createdAt: '2026-01-01',
    },
    {
      id: 'usr_002',
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      password: 'Password123!',
      role: 'Moderator',
      status: 'Active',
      createdAt: '2026-02-10',
    },
    {
      id: 'usr_003',
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
      password: 'AlexSecure2026#',
      role: 'User',
      status: 'Active',
      createdAt: '2026-03-15',
    },
    {
      id: 'usr_004',
      name: 'Demo Account',
      email: 'student@demo.com',
      password: 'demoPass123',
      role: 'User',
      status: 'Suspended',
      createdAt: '2026-04-01',
    },
  ]);

  // Form State for Adding New User
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User' as UserCredential['role'],
  });

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) return;

    const userObj: UserCredential = {
      id: `usr_00${users.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUsers([...users, userObj]);
    setNewUser({ name: '', email: '', password: '', role: 'User' });
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const toggleUserStatus = (id: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === id) {
          return {
            ...u,
            status: u.status === 'Active' ? 'Suspended' : 'Active',
          };
        }
        return u;
      })
    );
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Admin Top Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Facehook Admin Panel</h1>
            <p className="text-xs text-slate-400">System Controls &amp; Credentials Inspection</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-xs font-semibold transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to App
          </Link>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{users.length}</div>
              <div className="text-xs text-slate-400">Total Registered Users</div>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <Key className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{defaultAdminEmail.split('@')[0]}</div>
              <div className="text-xs text-slate-400">Default ENV Admin</div>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">99.98%</div>
              <div className="text-xs text-slate-400">Server Health</div>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">14.2 MB</div>
              <div className="text-xs text-slate-400">Database Size</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 gap-4">
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'users'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="h-4 w-4" /> User Management &amp; Credentials
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="h-4 w-4" /> System Controls
          </button>
        </div>

        {/* TAB 1: USER MANAGEMENT & CREDENTIALS */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Add User Form & Search Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add User Card */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-4">
                <h2 className="text-base font-bold flex items-center gap-2 text-slate-100">
                  <Plus className="h-5 w-5 text-blue-400" /> Create User Credential
                </h2>
                <form onSubmit={handleAddUser} className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-400">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500 mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-400">Email Address</label>
                    <input
                      type="email"
                      placeholder="user@example.com"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500 mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-400">Plain Password</label>
                    <input
                      type="text"
                      placeholder="Enter password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500 mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-400">System Role</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500 mt-1"
                    >
                      <option value="User">User</option>
                      <option value="Moderator">Moderator</option>
                      <option value="Admin">Admin</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg text-sm transition"
                  >
                    Inject User
                  </button>
                </form>
              </div>

              {/* Credentials Table */}
              <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-base font-bold text-slate-100">User Credentials Directory</h2>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search name, email, or role..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider border-b border-slate-700">
                      <tr>
                        <th className="p-3">User / Email</th>
                        <th className="p-3">Credentials</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-700/50">
                          <td className="p-3">
                            <div className="font-bold text-slate-100">{u.name}</div>
                            <div className="text-slate-400 font-mono text-[11px]">{u.email}</div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className="font-mono bg-slate-900 px-2 py-1 rounded border border-slate-700 text-slate-200">
                                {showPasswords[u.id] ? u.password : '••••••••••••'}
                              </span>
                              <button
                                onClick={() => togglePasswordVisibility(u.id)}
                                className="text-slate-400 hover:text-slate-200 p-1"
                                title="Toggle Password"
                              >
                                {showPasswords[u.id] ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                u.role === 'Super Admin'
                                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                  : u.role === 'Admin'
                                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                  : 'bg-slate-700 text-slate-300'
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => toggleUserStatus(u.id)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                u.status === 'Active'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
                              }`}
                            >
                              {u.status}
                            </button>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded transition"
                              title="Delete User"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SYSTEM CONTROLS & PLATFORM TOGGLES */}
        {activeTab === 'settings' && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-6 max-w-2xl">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-400" /> Platform Feature Toggles
            </h2>

            <div className="space-y-4 divide-y divide-slate-700">
              <div className="pt-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-200">Marketplace Subsystem</div>
                  <div className="text-xs text-slate-400">Enable or disable buy/sell features globally</div>
                </div>
                <button
                  onClick={() =>
                    setSettings({ ...settings, marketplaceEnabled: !settings.marketplaceEnabled })
                  }
                  className="text-blue-400"
                >
                  {settings.marketplaceEnabled ? (
                    <ToggleRight className="h-8 w-8 text-blue-500" />
                  ) : (
                    <ToggleLeft className="h-8 w-8 text-slate-600" />
                  )}
                </button>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-200">User Registrations</div>
                  <div className="text-xs text-slate-400">Allow new users to register via frontend</div>
                </div>
                <button
                  onClick={() =>
                    setSettings({ ...settings, userRegistrations: !settings.userRegistrations })
                  }
                  className="text-blue-400"
                >
                  {settings.userRegistrations ? (
                    <ToggleRight className="h-8 w-8 text-blue-500" />
                  ) : (
                    <ToggleLeft className="h-8 w-8 text-slate-600" />
                  )}
                </button>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-200">Maintenance Mode</div>
                  <div className="text-xs text-slate-400">Lock application interface for users</div>
                </div>
                <button
                  onClick={() =>
                    setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })
                  }
                >
                  {settings.maintenanceMode ? (
                    <ToggleRight className="h-8 w-8 text-red-500" />
                  ) : (
                    <ToggleLeft className="h-8 w-8 text-slate-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}