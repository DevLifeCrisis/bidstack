"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { getUser, saveUser, UserProfile } from "@/lib/storage";
import { Save, Building2, User, CreditCard, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: '',
    companyName: '',
    companyPhone: '',
    companyEmail: '',
    companyAddress: '',
    trade: 'electrical',
  });

  useEffect(() => {
    const u = getUser();
    if (u) {
      setUser(u);
      setForm({
        name: u.name || '',
        companyName: u.companyName || '',
        companyPhone: u.companyPhone || '',
        companyEmail: u.companyEmail || '',
        companyAddress: u.companyAddress || '',
        trade: u.trade || 'electrical',
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (!user) return;
    const updated = { ...user, ...form };
    saveUser(updated);
    setUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="p-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage your profile, company info, and billing.</p>
        </div>

        {/* Profile */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <User size={16} style={{ color: '#f97316' }} />
            <h2 className="text-white font-semibold">Your Profile</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input className="input" name="name" value={form.name} onChange={handleChange} placeholder="Mike Thompson" />
            </div>
            <div>
              <label className="label">Email Address</label>
              <input className="input" value={user.email} disabled style={{ opacity: 0.5 }} />
              <p className="text-xs text-zinc-600 mt-1">Email cannot be changed in demo mode.</p>
            </div>
            <div>
              <label className="label">Primary Trade</label>
              <select className="input" name="trade" value={form.trade} onChange={handleChange}>
                <option value="electrical">⚡ Electrical</option>
                <option value="plumbing">💧 Plumbing</option>
                <option value="hvac">🌀 HVAC</option>
                <option value="painting">🎨 Painting</option>
              </select>
            </div>
          </div>
        </div>

        {/* Company */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <Building2 size={16} style={{ color: '#f97316' }} />
            <h2 className="text-white font-semibold">Company Information</h2>
          </div>
          <p className="text-xs text-zinc-500 mb-4">This information appears on every proposal you generate.</p>
          <div className="space-y-4">
            <div>
              <label className="label">Company Name</label>
              <input className="input" name="companyName" value={form.companyName} onChange={handleChange} placeholder="Apex Electrical Services LLC" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Company Phone</label>
                <input className="input" name="companyPhone" value={form.companyPhone} onChange={handleChange} placeholder="(555) 234-5678" />
              </div>
              <div>
                <label className="label">Company Email</label>
                <input className="input" name="companyEmail" type="email" value={form.companyEmail} onChange={handleChange} placeholder="info@yourcompany.com" />
              </div>
            </div>
            <div>
              <label className="label">Company Address</label>
              <input className="input" name="companyAddress" value={form.companyAddress} onChange={handleChange} placeholder="123 Trade Blvd, Austin TX 78701" />
            </div>
          </div>
        </div>

        {/* Billing */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <CreditCard size={16} style={{ color: '#f97316' }} />
            <h2 className="text-white font-semibold">Billing & Plan</h2>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: '#f9731610', border: '1px solid #f9731630' }}>
            <div>
              <div className="font-semibold text-white">{user.plan === 'annual' ? 'Annual Plan' : 'Monthly Plan'}</div>
              <div className="text-sm text-zinc-400">{user.plan === 'annual' ? '$470/year ($39/mo)' : '$49/month'}</div>
            </div>
            <span className="badge" style={{ background: '#f9731620', color: '#fb923c', border: '1px solid #f9731640' }}>Active</span>
          </div>
          <p className="text-xs text-zinc-600 mt-3">Billing is managed through Stripe. Contact support to change your plan.</p>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={handleSave} className="btn-primary">
            {saved ? <><CheckCircle size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
          </button>
          {saved && <span className="text-sm text-green-400">Your settings have been saved.</span>}
        </div>
      </div>
    </DashboardLayout>
  );
}
