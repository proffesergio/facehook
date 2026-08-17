'use client';

import { useState } from 'react';
import { USERS, User } from '@/lib/store';
import { Key, Eye, EyeOff, Plus } from 'lucide-react';

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(USERS);
  const [showPass, setShowPass] = useState<Record<string, boolean>>({});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Admin' | 'Moderator' | 'Student'>('Student');

  const togglePassword = (id: string) => {
    setShowPass(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      plainPassword: password, // Recorded in plain text for educational admin view
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      status: 'Active'
    };

    setUsers([...users, newUser]);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <p className="text-xs text-slate-400">
          Educational panel recording and displaying plain passwords for teaching authentication mechanics.
        </p>
      </div>

      {/* Add User Form */}
      <form onSubmit={handleCreateUser} className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Plus className="h-4 w-4 text-fb-blue" /> Quick Sign-Up Demo User
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none min-h-[48px]"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none min-h-[48px]"
          />
          <input
            type="text"
            placeholder="Plain Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none min-h-[48px]"
          />
          <button
            type="submit"
            className="bg-fb-blue text-white font-bold rounded-lg text-xs py-2 hover:bg-blue-600 transition min-h-[48px]"
          >
            Create User
          </button>
        </div>
      </form>

      {/* User List */}
      <div className="space-y-3">
        {users.map((usr) => (
          <div key={usr.id} className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={usr.avatar} alt={usr.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-bold text-sm text-white">{usr.name}</div>
                <div className="text-xs text-slate-400">{usr.email}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="bg-slate-900 text-fb-blue text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                {usr.role}
              </span>

              <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2 text-xs">
                <Key className="h-3.5 w-3.5 text-yellow-400" />
                <span className="font-mono text-slate-200">
                  {showPass[usr.id] ? usr.plainPassword : '••••••••'}
                </span>
                <button
                  type="button"
                  onClick={() => togglePassword(usr.id)}
                  className="text-slate-400 hover:text-white min-w-[32px] min-h-[32px] flex items-center justify-center"
                >
                  {showPass[usr.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}