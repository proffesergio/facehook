// app/admin/users/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Users,
  ShieldCheck,
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  Edit3,
  X,
  Key,
} from 'lucide-react';

interface UserCredential {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'Super Admin' | 'Admin' | 'Moderator' | 'User';
  status: 'Active' | 'Suspended';
  createdAt: string;
  lastLogin: string;
}

export default function DedicatedUserManagementPage() {
  const defaultAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@facehook.com';
  const defaultAdminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

  // Initial State
  const [users, setUsers] = useState<UserCredential[]>([
    {
      id: 'usr_001',
      name: 'System Administrator',
      email: defaultAdminEmail,
      password: defaultAdminPassword,
      role: 'Super Admin',
      status: 'Active',
      createdAt: '2026-01-01',
      lastLogin: 'Just now',
    },
    {
      id: 'usr_002',
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      password: 'Password123!',
      role: 'Moderator',
      status: 'Active',
      createdAt: '2026-02-10',
      lastLogin: '2 hours ago',
    },
    {
      id: 'usr_003',
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
      password: 'AlexSecure2026#',
      role: 'User',
      status: 'Active',
      createdAt: '2026-03-15',
      lastLogin: 'Yesterday',
    },
    {
      id: 'usr_004',
      name: 'Student Demo User',
      email: 'student@demo.com',
      password: 'demoPass123',
      role: 'User',
      status: 'Suspended',
      createdAt: '2026-04-01',
      lastLogin: '5 days ago',
    },
  ]);

  // Controls & Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User' as UserCredential['role'],
  });

  // Toggle Password Masking
  const togglePasswordVisibility = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Status Toggle
  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
      )
    );
  };

  // Delete User
  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to remove this user credential?')) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  // Handle Form Submission (Create or Edit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return;

    if (editingUserId) {
      // Edit mode
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUserId
            ? { ...u, name: formData.name, email: formData.email, password: formData.password, role: formData.role }
            : u
        )
      );
    } else {
      // Create mode
      const newUser: UserCredential = {
        id: `usr_00${users.length + 1}`,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        status: 'Active',
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: 'Never',
      };
      setUsers([...users, newUser]);
    }

    closeModal();
  };

  const openCreateModal = () => {
    setEditingUserId(null);
    setFormData({ name: '', email: '', password: '', role: 'User' });
    setIsModalOpen(true);
  };

  const openEditModal = (user: UserCredential) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUserId(null);
  };

  // Export Users to CSV
  const handleExportCSV = () => {
    const headers = ['ID,Name,Email,Password,Role,Status,CreatedAt,LastLogin'];
    const rows = filteredUsers.map(
      (u) => `"${u.id}","${u.name}","${u.email}","${u.password}","${u.role}","${u.status}","${u.createdAt}","${u.lastLogin}"`
    );
    const blob = new Blob([[...headers, ...rows].join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `facehook_users_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Filter Pipeline
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
      const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">User Management Subsystem</h1>
            <p className="text-xs text-slate-400">Endpoint: /admin/users</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-xs font-semibold transition border border-slate-700"
          >
            <ArrowLeft className="h-4 w-4" /> Admin Dashboard
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-xs font-semibold transition"
          >
            <ShieldCheck className="h-4 w-4" /> App View
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Controls Header Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by ID, name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 outline-none focus:border-blue-500"
              />
            </div>

            {/* Filter Dropdowns & Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-xs">
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="bg-transparent text-slate-200 outline-none cursor-pointer"
                >
                  <option value="ALL" className="bg-slate-900">All Roles</option>
                  <option value="Super Admin" className="bg-slate-900">Super Admin</option>
                  <option value="Admin" className="bg-slate-900">Admin</option>
                  <option value="Moderator" className="bg-slate-900">Moderator</option>
                  <option value="User" className="bg-slate-900">User</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-xs">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent text-slate-200 outline-none cursor-pointer"
                >
                  <option value="ALL" className="bg-slate-900">All Statuses</option>
                  <option value="Active" className="bg-slate-900">Active</option>
                  <option value="Suspended" className="bg-slate-900">Suspended</option>
                </select>
              </div>

              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-2 rounded-lg text-xs font-semibold transition"
              >
                <Download className="h-4 w-4" /> Export CSV
              </button>

              <button
                onClick={openCreateModal}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow-md"
              >
                <Plus className="h-4 w-4" /> Add New User
              </button>
            </div>
          </div>
        </div>

        {/* User Directory Table */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-700">
                <tr>
                  <th className="p-4">User Details</th>
                  <th className="p-4">Encrypted / Plain Credentials</th>
                  <th className="p-4">System Role</th>
                  <th className="p-4">Account Status</th>
                  <th className="p-4">Last Activity</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No matching user records found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-700/40 transition">
                      {/* Name & Email */}
                      <td className="p-4">
                        <div className="font-bold text-slate-100 text-sm">{u.name}</div>
                        <div className="text-slate-400 font-mono text-[11px]">{u.email}</div>
                        <div className="text-slate-500 text-[10px]">ID: {u.id}</div>
                      </td>

                      {/* Password Inspector */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono bg-slate-900 px-2.5 py-1 rounded border border-slate-700 text-slate-200 tracking-wider">
                            {showPasswords[u.id] ? u.password : '••••••••••••'}
                          </span>
                          <button
                            onClick={() => togglePasswordVisibility(u.id)}
                            className="text-slate-400 hover:text-slate-200 p-1"
                            title={showPasswords[u.id] ? 'Hide Password' : 'Show Password'}
                          >
                            {showPasswords[u.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold inline-block ${
                            u.role === 'Super Admin'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : u.role === 'Admin'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : u.role === 'Moderator'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-slate-700 text-slate-300 border border-slate-600'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>

                      {/* Status Toggle Badge */}
                      <td className="p-4">
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border transition ${
                            u.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                              : 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20'
                          }`}
                        >
                          {u.status === 'Active' ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5" />
                          )}
                          {u.status}
                        </button>
                      </td>

                      {/* Metadata */}
                      <td className="p-4 text-slate-400 text-xs">
                        <div>{u.lastLogin}</div>
                        <div className="text-[10px] text-slate-500">Joined {u.createdAt}</div>
                      </td>

                      {/* Action Buttons */}
                      <td className="p-4 text-right space-x-1">
                        <button
                          onClick={() => openEditModal(u)}
                          className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded transition"
                          title="Edit User"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded transition"
                          title="Delete User"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal: Create or Edit User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-blue-400" />
              <h2 className="text-lg font-bold text-slate-100">
                {editingUserId ? 'Edit User Credentials' : 'Create User Credential'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-400">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500 mt-1"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400">Email Address</label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500 mt-1"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400">Password</label>
                <input
                  type="text"
                  placeholder="Password string"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500 mt-1"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400">System Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500 mt-1"
                >
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition"
                >
                  {editingUserId ? 'Save Changes' : 'Inject User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}