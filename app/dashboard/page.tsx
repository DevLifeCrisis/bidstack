"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProposals, getUser } from "@/lib/storage";
import { Proposal, WinStats } from "@/types";
import { FileText, TrendingUp, DollarSign, Clock, ArrowRight, Plus } from "lucide-react";

function calcStats(proposals: Proposal[]): WinStats {
  const closed = proposals.filter(p => p.status === 'accepted' || p.status === 'declined');
  const accepted = proposals.filter(p => p.status === 'accepted');
  const avgDeal = accepted.length ? accepted.reduce((s, p) => s + p.totalAmount, 0) / accepted.length : 0;
  return {
    total: proposals.length,
    accepted: accepted.length,
    declined: proposals.filter(p => p.status === 'declined').length,
    draft: proposals.filter(p => p.status === 'draft').length,
    sent: proposals.filter(p => p.status === 'sent').length,
    winRate: closed.length ? Math.round((accepted.length / closed.length) * 100) : 0,
    avgDealSize: avgDeal,
  };
}

const STATUS_BADGE: Record<string, string> = {
  draft: 'badge-draft',
  sent: 'badge-sent',
  accepted: 'badge-accepted',
  declined: 'badge-declined',
};

export default function DashboardPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [user, setUser] = useState<ReturnType<typeof getUser>>(null);

  useEffect(() => {
    setProposals(getProposals());
    setUser(getUser());
  }, []);

  const stats = calcStats(proposals);
  const recent = proposals.slice(0, 5);
  const winValue = proposals
    .filter(p => p.status === 'accepted')
    .reduce((s, p) => s + p.totalAmount, 0);

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0] || 'there'} 👋
            </h1>
            <p className="text-zinc-500 text-sm mt-1">Here&apos;s your bid activity at a glance.</p>
          </div>
          <Link href="/dashboard/proposals/new" className="btn-primary">
            <Plus size={16} /> New Proposal
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Proposals", value: stats.total, icon: <FileText size={18} />, sub: `${stats.draft} drafts` },
            { label: "Win Rate", value: `${stats.winRate}%`, icon: <TrendingUp size={18} />, sub: `${stats.accepted} accepted` },
            { label: "Revenue Won", value: `$${winValue.toLocaleString()}`, icon: <DollarSign size={18} />, sub: "total accepted" },
            { label: "Avg. Deal Size", value: `$${Math.round(stats.avgDealSize).toLocaleString()}`, icon: <Clock size={18} />, sub: "per accepted bid" },
          ].map((s) => (
            <div key={s.label} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-zinc-500 font-medium">{s.label}</span>
                <span style={{ color: '#f97316' }}>{s.icon}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-xs text-zinc-600">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Win Rate Bar */}
        <div className="card p-6 mb-8">
          <h2 className="text-sm font-semibold text-zinc-400 mb-4">Proposal Pipeline</h2>
          <div className="flex items-center gap-2 h-3 rounded-full overflow-hidden mb-3" style={{ background: '#27272a' }}>
            {stats.accepted > 0 && (
              <div style={{ width: `${(stats.accepted / stats.total) * 100}%`, background: '#22c55e', height: '100%' }} />
            )}
            {stats.sent > 0 && (
              <div style={{ width: `${(stats.sent / stats.total) * 100}%`, background: '#3b82f6', height: '100%' }} />
            )}
            {stats.declined > 0 && (
              <div style={{ width: `${(stats.declined / stats.total) * 100}%`, background: '#ef4444', height: '100%' }} />
            )}
            {stats.draft > 0 && (
              <div style={{ width: `${(stats.draft / stats.total) * 100}%`, background: '#52525b', height: '100%' }} />
            )}
          </div>
          <div className="flex gap-6 text-xs text-zinc-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background: '#22c55e' }} /> Accepted ({stats.accepted})</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background: '#3b82f6' }} /> Sent ({stats.sent})</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background: '#ef4444' }} /> Declined ({stats.declined})</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background: '#52525b' }} /> Draft ({stats.draft})</span>
          </div>
        </div>

        {/* Recent Proposals */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #27272a' }}>
            <h2 className="text-sm font-semibold text-white">Recent Proposals</h2>
            <Link href="/dashboard/proposals" className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {recent.length === 0 ? (
            <div className="py-16 text-center">
              <FileText size={32} className="mx-auto mb-3 text-zinc-700" />
              <p className="text-zinc-500 text-sm mb-4">No proposals yet</p>
              <Link href="/dashboard/proposals/new" className="btn-primary text-sm">Create Your First Proposal</Link>
            </div>
          ) : (
            <div>
              {recent.map((p) => (
                <Link key={p.id} href={`/dashboard/proposals/${p.id}`} className="flex items-center justify-between px-6 py-4 hover:bg-zinc-900 transition-colors" style={{ borderBottom: '1px solid #1c1c1e' }}>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white text-sm truncate">{p.projectTitle}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{p.clientName} · {new Date(p.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    <div className="text-sm font-semibold text-white">${p.totalAmount.toLocaleString()}</div>
                    <span className={`badge ${STATUS_BADGE[p.status]}`}>{p.status}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
