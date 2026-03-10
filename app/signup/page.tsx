"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Wrench, CheckCircle } from "lucide-react";
import { saveUser } from "@/lib/storage";
import { Suspense } from "react";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "monthly";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    trade: "electrical",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await new Promise(r => setTimeout(r, 1000));

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    saveUser({
      id: `user_${Date.now()}`,
      email: formData.email,
      name: formData.name,
      companyName: formData.companyName,
      companyPhone: '',
      companyEmail: formData.email,
      companyAddress: '',
      trade: formData.trade,
      plan,
    });

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#0a0a0b' }}>
      {/* Left */}
      <div className="hidden lg:flex flex-col justify-center px-16 w-1/2" style={{ background: '#0d0d0f', borderRight: '1px solid #27272a' }}>
        <Link href="/" className="inline-flex items-center gap-2 mb-12">
          <div style={{ background: '#f97316', borderRadius: 8, padding: '6px 8px' }}>
            <Wrench size={18} color="white" />
          </div>
          <span className="text-xl font-bold text-white">BidStack</span>
        </Link>
        <h2 className="text-3xl font-bold text-white mb-4">Start winning more bids today</h2>
        <p className="text-zinc-400 mb-10 leading-relaxed">Join 2,400+ specialty subs who use BidStack to write professional proposals in minutes.</p>
        <ul className="space-y-4">
          {[
            "14-day free trial",
            "Professional AI-written proposals",
            "Trade-specific scope templates",
            "Win/loss tracking & analytics",
            "Cancel anytime",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-zinc-300">
              <CheckCircle size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-12 p-5 rounded-xl" style={{ background: '#18181b', border: '1px solid #27272a' }}>
          <p className="text-zinc-300 text-sm italic mb-3">&ldquo;I closed a $47k job last month with a BidStack proposal. The client said it was the most professional bid they&apos;d seen.&rdquo;</p>
          <div className="text-xs text-zinc-500">— Mike T., Master Electrician, TX</div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2">
              <div style={{ background: '#f97316', borderRadius: 8, padding: '6px 8px' }}>
                <Wrench size={18} color="white" />
              </div>
              <span className="text-xl font-bold text-white">BidStack</span>
            </Link>
          </div>

          <div className="mb-6">
            <div className="inline-flex rounded-lg p-1 gap-1" style={{ background: '#18181b' }}>
              <Link href="/signup?plan=monthly" className={`px-4 py-2 rounded text-sm font-medium transition-all ${plan === 'monthly' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'}`}>
                Monthly $49/mo
              </Link>
              <Link href="/signup?plan=annual" className={`px-4 py-2 rounded text-sm font-medium transition-all ${plan === 'annual' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'}`}>
                Annual $39/mo
              </Link>
            </div>
          </div>

          <div className="card p-6">
            <h1 className="text-xl font-bold text-white mb-1">Create your account</h1>
            <p className="text-zinc-500 text-sm mb-5">14 days free, then {plan === 'annual' ? '$470/yr (save 20%)' : '$49/mo'}</p>
            
            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <div className="text-sm text-red-400 px-3 py-2 rounded-lg" style={{ background: '#ef444420', border: '1px solid #ef444440' }}>
                  {error}
                </div>
              )}
              <div>
                <label className="label">Full name</label>
                <input className="input" type="text" name="name" placeholder="Mike Thompson" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <label className="label">Company name</label>
                <input className="input" type="text" name="companyName" placeholder="Apex Electrical Services" value={formData.companyName} onChange={handleChange} required />
              </div>
              <div>
                <label className="label">Your trade</label>
                <select className="input" name="trade" value={formData.trade} onChange={handleChange}>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="hvac">HVAC</option>
                  <option value="painting">Painting</option>
                </select>
              </div>
              <div>
                <label className="label">Work email</label>
                <input className="input" type="email" name="email" placeholder="mike@apexelectrical.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <label className="label">Password</label>
                <input className="input" type="password" name="password" placeholder="8+ characters" value={formData.password} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-3" disabled={loading}>
                {loading ? "Creating account..." : "Start Free Trial"}
              </button>
            </form>
            <p className="text-center text-xs text-zinc-600 mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-400 hover:text-orange-300">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
