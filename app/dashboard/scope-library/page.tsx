"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useState } from "react";
import { SCOPE_TEMPLATES, TRADE_LABELS, TRADE_COLORS } from "@/lib/scope-templates";
import { TradeType } from "@/types";
import { BookOpen, ExternalLink, ChevronDown, ChevronRight } from "lucide-react";

const TRADE_ICONS: Record<string, string> = {
  electrical: '⚡',
  plumbing: '💧',
  hvac: '🌀',
  painting: '🎨',
};

const trades: TradeType[] = ['electrical', 'plumbing', 'hvac', 'painting'];

export default function ScopeLibraryPage() {
  const [activeTrade, setActiveTrade] = useState<TradeType>('electrical');
  const [expanded, setExpanded] = useState<string | null>(null);

  const templates = SCOPE_TEMPLATES.filter(t => t.trade === activeTrade);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Scope Library</h1>
            <p className="text-zinc-500 text-sm mt-1">Pre-built scope templates with industry pricing benchmarks.</p>
          </div>
          <Link href="/dashboard/proposals/new" className="btn-primary text-sm">
            <ExternalLink size={14} /> Use in Proposal
          </Link>
        </div>

        {/* Trade Tabs */}
        <div className="flex gap-2 mb-6">
          {trades.map(t => (
            <button
              key={t}
              onClick={() => setActiveTrade(t)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all`}
              style={{
                background: activeTrade === t ? TRADE_COLORS[t] + '20' : '#18181b',
                border: `1px solid ${activeTrade === t ? TRADE_COLORS[t] + '60' : '#27272a'}`,
                color: activeTrade === t ? TRADE_COLORS[t] : '#71717a',
              }}
            >
              <span>{TRADE_ICONS[t]}</span>
              {TRADE_LABELS[t]}
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div className="card p-4 mb-6 flex items-center gap-6">
          <BookOpen size={18} style={{ color: TRADE_COLORS[activeTrade] }} />
          <div className="text-sm text-zinc-400">
            <span className="text-white font-medium">{templates.length} templates</span> for {TRADE_LABELS[activeTrade]}
          </div>
          <div className="text-sm text-zinc-600">—</div>
          <div className="text-sm text-zinc-400">
            All pricing based on <span className="text-white">2024-2026 national benchmarks</span>
          </div>
        </div>

        {/* Templates */}
        <div className="space-y-3">
          {templates.map(template => {
            const isOpen = expanded === template.id;
            const totalMat = template.items.reduce((s, i) => s + i.quantity * i.unitCost, 0);
            const totalLab = template.items.reduce((s, i) => s + i.quantity * i.laborHours * i.laborRate, 0);
            const total = totalMat + totalLab;

            return (
              <div key={template.id} className="card overflow-hidden">
                <button
                  onClick={() => setExpanded(isOpen ? null : template.id)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                      style={{ background: TRADE_COLORS[activeTrade] + '20', border: `1px solid ${TRADE_COLORS[activeTrade]}40` }}>
                      {TRADE_ICONS[activeTrade]}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{template.name}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{template.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-white">${total.toLocaleString()}</div>
                      <div className="text-xs text-zinc-600">est. total</div>
                    </div>
                    <div className="text-xs text-zinc-500">{template.items.length} items</div>
                    {isOpen ? <ChevronDown size={16} className="text-zinc-500" /> : <ChevronRight size={16} className="text-zinc-500" />}
                  </div>
                </button>
                {isOpen && (
                  <div style={{ borderTop: '1px solid #27272a' }}>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-xs text-zinc-600 uppercase" style={{ background: '#0d0d0f', borderBottom: '1px solid #1c1c1e' }}>
                          <th className="text-left px-6 py-2">Item</th>
                          <th className="text-right px-4 py-2">Qty</th>
                          <th className="text-left px-4 py-2">Unit</th>
                          <th className="text-right px-4 py-2">Unit Cost</th>
                          <th className="text-right px-4 py-2">Labor Hrs</th>
                          <th className="text-right px-4 py-2">Labor Rate</th>
                          <th className="text-right px-6 py-2">Line Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {template.items.map((item, i) => {
                          const mat = item.quantity * item.unitCost;
                          const lab = item.quantity * item.laborHours * item.laborRate;
                          return (
                            <tr key={i} style={{ borderBottom: '1px solid #1c1c1e' }}>
                              <td className="px-6 py-2.5 text-zinc-300">{item.description}</td>
                              <td className="px-4 py-2.5 text-right text-zinc-500">{item.quantity}</td>
                              <td className="px-4 py-2.5 text-zinc-600">{item.unit}</td>
                              <td className="px-4 py-2.5 text-right text-zinc-400">{item.unitCost > 0 ? `$${item.unitCost}` : '—'}</td>
                              <td className="px-4 py-2.5 text-right text-zinc-400">{item.laborHours > 0 ? item.laborHours : '—'}</td>
                              <td className="px-4 py-2.5 text-right text-zinc-400">{item.laborRate > 0 ? `$${item.laborRate}/hr` : '—'}</td>
                              <td className="px-6 py-2.5 text-right font-medium text-white">${(mat + lab).toFixed(0)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr style={{ background: '#0d0d0f', borderTop: '2px solid #27272a' }}>
                          <td colSpan={6} className="px-6 py-3 text-right text-sm font-medium text-zinc-500">Estimated Total</td>
                          <td className="px-6 py-3 text-right font-bold text-white">${total.toLocaleString()}</td>
                        </tr>
                      </tfoot>
                    </table>
                    <div className="px-6 py-4 flex items-center justify-between" style={{ background: '#0d0d0f' }}>
                      <p className="text-xs text-zinc-600">Prices are national benchmarks. Adjust for your market and overhead.</p>
                      <Link
                        href={`/dashboard/proposals/new`}
                        className="btn-primary text-sm"
                      >
                        Use This Template
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
