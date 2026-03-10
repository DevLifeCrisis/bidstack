"use client";

import Link from "next/link";
import { 
  Zap, FileText, TrendingUp, Clock, CheckCircle, Star, 
  ArrowRight, ChevronRight, Wrench, Droplets, Wind, Paintbrush,
  BarChart3, Shield, Mail
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0a0a0b' }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid #27272a' }} className="sticky top-0 z-50" suppressHydrationWarning>
        <div style={{ background: 'rgba(10,10,11,0.95)', backdropFilter: 'blur(12px)' }}>
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div style={{ background: '#f97316', borderRadius: 8, padding: '6px 8px' }}>
                <Wrench size={18} color="white" />
              </div>
              <span className="text-xl font-bold text-white">BidStack</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
              <a href="#trades" className="text-sm text-zinc-400 hover:text-white transition-colors">Trades</a>
              <a href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors">Sign in</Link>
              <Link href="/signup" className="btn-primary text-sm">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="pt-24 pb-20 px-6 relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,11,0.82) 0%, rgba(10,10,11,0.75) 60%, rgba(10,10,11,0.97) 100%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm" style={{ background: '#f9731620', border: '1px solid #f9731640', color: '#fb923c' }}>
            <Zap size={14} />
            AI-Powered Bid Writing for Specialty Trades
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Win More Jobs.<br />
            <span className="gradient-text">Stop Wasting Hours on Bids.</span>
          </h1>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            BidStack turns your project details into professional, client-ready proposals in minutes — not hours. Built specifically for electricians, plumbers, HVAC, and painters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="btn-primary text-base px-8 py-3">
              Start Free — No Card Required
              <ArrowRight size={18} />
            </Link>
            <Link href="/demo" className="btn-secondary text-base px-8 py-3">
              See a Sample Proposal
              <ChevronRight size={18} />
            </Link>
          </div>
          <p className="text-sm text-zinc-500 mt-4">14-day free trial • $49/mo after • Cancel anytime</p>
        </div>
      </section>


      {/* Social Proof */}
      <section className="py-12 px-6" style={{ borderTop: '1px solid #27272a', borderBottom: '1px solid #27272a' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "2.3hrs", label: "Saved per bid" },
              { stat: "34%", label: "Higher close rate" },
              { stat: "10min", label: "Avg proposal time" },
              { stat: "2,400+", label: "Subs using BidStack" },
            ].map((item) => (
              <div key={item.stat}>
                <div className="text-3xl font-bold text-white mb-1">{item.stat}</div>
                <div className="text-sm text-zinc-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need to Win Bids</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">No generic software. BidStack is built from the ground up for specialty trades.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <FileText size={24} />,
                title: "AI Proposal Writer",
                desc: "Enter your project details and get a polished, professional proposal in seconds. Branded with your logo and contact info.",
              },
              {
                icon: <BarChart3 size={24} />,
                title: "Scope Library",
                desc: "Pre-built scope-of-work templates for electrical, plumbing, HVAC, and painting — with industry pricing benchmarks built in.",
              },
              {
                icon: <TrendingUp size={24} />,
                title: "Win/Loss Tracker",
                desc: "See which bid structures win and which lose. Identify your highest close-rate proposals and replicate them.",
              },
              {
                icon: <Mail size={24} />,
                title: "Follow-Up Automation",
                desc: "Auto-sends a check-in email 3 days after proposal delivery. Never let a hot lead go cold.",
              },
              {
                icon: <Clock size={24} />,
                title: "Material Cost Estimator",
                desc: "Built-in material cost library with current pricing. Add line items fast without looking anything up.",
              },
              {
                icon: <Shield size={24} />,
                title: "Professional Branding",
                desc: "Your logo, colors, and contact info on every proposal. Look bigger than the competition from day one.",
              },
            ].map((f) => (
              <div key={f.title} className="card p-6 hover:border-zinc-600 transition-colors">
                <div className="mb-4" style={{ color: '#f97316' }}>{f.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trades */}
      <section id="trades" className="py-20 px-6" style={{ background: '#0d0d0f' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Built for Your Trade</h2>
            <p className="text-zinc-400 text-lg">Scope templates, pricing benchmarks, and terminology — specific to your work.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: <Zap size={28} />, trade: "Electrical", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80", items: ["Panel upgrades", "Rough-in wiring", "Service entrance", "EV charger install", "Generator hookup"] },
              { icon: <Droplets size={28} />, trade: "Plumbing", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", items: ["Water heater swap", "Remodel rough-in", "Drain/waste/vent", "Fixture install", "Sewer line work"] },
              { icon: <Wind size={28} />, trade: "HVAC", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80", items: ["System replacement", "Duct install", "Mini-split install", "Commercial rooftop", "Preventive maint."] },
              { icon: <Paintbrush size={28} />, trade: "Painting", img: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&q=80", items: ["Interior repaint", "Exterior full", "Cabinet refinish", "Epoxy floor coat", "Commercial spaces"] },
            ].map((t) => (
              <div key={t.trade} className="card overflow-hidden">
                {/* Trade photo */}
                <div
                  style={{
                    height: 140,
                    backgroundImage: `url(${t.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.55))' }} />
                  <div style={{ position: 'absolute', bottom: 12, left: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#f97316' }}>{t.icon}</span>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}>{t.trade}</span>
                  </div>
                </div>
                <div className="p-5">
                  <ul className="space-y-2">
                    {t.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-zinc-400">
                        <CheckCircle size={13} style={{ color: '#22c55e', flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">From Job Details to Sent Proposal in 10 Minutes</h2>
          </div>
          <div className="space-y-6">
            {[
              { step: "01", title: "Enter Project Details", desc: "Client name, job address, scope of work, materials, and labor. We have pre-built templates for every common job type." },
              { step: "02", title: "AI Generates Your Proposal", desc: "AI writes a professional, client-facing proposal with your branding, itemized costs, and a clear value summary." },
              { step: "03", title: "Review, Edit & Send", desc: "Preview the PDF, make any tweaks, and send directly from BidStack. The client gets a professional proposal link." },
              { step: "04", title: "Track & Follow Up", desc: "See when the client opens it. Auto-follow-up goes out at day 3. Mark accepted or declined and track your win rate." },
            ].map((s) => (
              <div key={s.step} className="flex gap-6 items-start">
                <div className="text-4xl font-bold flex-shrink-0" style={{ color: '#f97316', opacity: 0.4 }}>{s.step}</div>
                <div className="card p-6 flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6" style={{ background: '#0d0d0f' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Trades Are Winning More with BidStack</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Mike T.", trade: "Master Electrician, TX", quote: "I used to spend Sunday nights writing bids. Now I do it in 10 minutes on my phone between jobs. Closed a $47k commercial job last month with a BidStack proposal.", stars: 5 },
              { name: "Carlos R.", trade: "Plumbing Contractor, FL", quote: "My close rate went from 30% to 52% in 3 months. The proposals look so professional clients stop shopping around after they see mine.", stars: 5 },
              { name: "Dana W.", trade: "HVAC Owner, OH", quote: "The follow-up emails alone paid for the subscription. I landed two jobs from clients I forgot to follow up with. Total game changer.", stars: 5 },
            ].map((t) => (
              <div key={t.name} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={16} fill="#f97316" color="#f97316" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-zinc-500 text-xs">{t.trade}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple Pricing. No Surprises.</h2>
            <p className="text-zinc-400 text-lg">One job won covers your subscription for months.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="card p-8">
              <h3 className="text-zinc-400 font-medium mb-2">Monthly</h3>
              <div className="text-4xl font-bold text-white mb-1">$49<span className="text-lg text-zinc-500">/mo</span></div>
              <p className="text-zinc-500 text-sm mb-6">Per user. Cancel anytime.</p>
              <ul className="space-y-3 mb-8">
                {["Unlimited proposals", "AI proposal writer", "Scope library (all trades)", "Win/loss tracking", "Follow-up automation", "PDF export", "Email support"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle size={14} style={{ color: '#22c55e', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn-primary w-full justify-center">Get Started</Link>
            </div>
            {/* Annual */}
            <div className="p-8 rounded-xl relative" style={{ background: '#f97316', border: '1px solid #f97316' }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</div>
              <h3 className="text-orange-100 font-medium mb-2">Annual</h3>
              <div className="text-4xl font-bold text-white mb-1">$39<span className="text-lg text-orange-200">/mo</span></div>
              <p className="text-orange-200 text-sm mb-6">$470/yr · Save 20%</p>
              <ul className="space-y-3 mb-8">
                {["Everything in Monthly", "Priority support", "Early access to new features", "2 team seats included", "Custom branding"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle size={14} style={{ color: 'white', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=annual" style={{ background: 'white', color: '#f97316', padding: '10px 20px', borderRadius: 8, fontWeight: 700, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Get Annual Plan</Link>
            </div>
            {/* White Label */}
            <div className="card p-8">
              <h3 className="text-zinc-400 font-medium mb-2">White Label</h3>
              <div className="text-4xl font-bold text-white mb-1">$199<span className="text-lg text-zinc-500">/mo</span></div>
              <p className="text-zinc-500 text-sm mb-6">For trade associations & coaches</p>
              <ul className="space-y-3 mb-8">
                {["Everything in Annual", "Your domain & branding", "Resell to your members", "Admin dashboard", "Dedicated onboarding", "API access"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle size={14} style={{ color: '#22c55e', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="mailto:hello@bidstack.io" className="btn-secondary w-full justify-center">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 60%',
          borderTop: '1px solid #27272a',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'rgba(10,10,11,0.88)' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Win More Bids?</h2>
          <p className="text-zinc-400 text-lg mb-10">Join 2,400+ specialty subs using BidStack to write professional proposals in minutes.</p>
          <Link href="/signup" className="btn-primary text-base px-10 py-4">
            Start Your Free Trial
            <ArrowRight size={20} />
          </Link>
          <p className="text-zinc-400 text-sm mt-4">14 days free · No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6" style={{ borderTop: '1px solid #27272a' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div style={{ background: '#f97316', borderRadius: 6, padding: '4px 6px' }}>
              <Wrench size={14} color="white" />
            </div>
            <span className="text-white font-bold">BidStack</span>
          </div>
          <p className="text-zinc-600 text-sm">© 2026 BidStack. Built for the trades.</p>
          <div className="flex gap-6">
            <a href="#" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors">Privacy</a>
            <a href="#" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors">Terms</a>
            <a href="mailto:hello@bidstack.io" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
