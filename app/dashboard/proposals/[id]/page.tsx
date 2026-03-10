"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProposal, saveProposal } from "@/lib/storage";
import { Proposal, ProposalStatus } from "@/types";
import { ArrowLeft, Send, CheckCircle, XCircle, Edit3, Printer } from "lucide-react";
import Link from "next/link";
import ProposalDocument from "@/components/ProposalDocument";

const STATUS_BADGE: Record<string, string> = {
  draft: 'badge-draft',
  sent: 'badge-sent',
  accepted: 'badge-accepted',
  declined: 'badge-declined',
};

export default function ProposalDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [proposal, setProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    if (id) {
      const p = getProposal(id as string);
      if (p) setProposal(p);
      else router.push('/dashboard/proposals');
    }
  }, [id, router]);

  const updateStatus = (status: ProposalStatus) => {
    if (!proposal) return;
    const updated = { ...proposal, status, ...(status === 'sent' ? { sentAt: new Date().toISOString() } : {}) };
    saveProposal(updated);
    setProposal(updated);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!proposal) return null;

  return (
    <DashboardLayout>
      <div className="p-8 no-print">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/proposals" className="text-zinc-500 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">{proposal.projectTitle}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`badge ${STATUS_BADGE[proposal.status]}`}>{proposal.status}</span>
                <span className="text-xs text-zinc-500">{proposal.clientName}</span>
                <span className="text-xs text-zinc-600">·</span>
                <span className="text-xs text-zinc-500">{new Date(proposal.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {proposal.status === 'draft' && (
              <button onClick={() => updateStatus('sent')} className="btn-primary text-sm">
                <Send size={14} /> Mark as Sent
              </button>
            )}
            {proposal.status === 'sent' && (
              <>
                <button onClick={() => updateStatus('accepted')} className="btn-primary text-sm" style={{ background: '#22c55e' }}>
                  <CheckCircle size={14} /> Accepted
                </button>
                <button onClick={() => updateStatus('declined')} className="btn-secondary text-sm" style={{ borderColor: '#ef4444', color: '#ef4444' }}>
                  <XCircle size={14} /> Declined
                </button>
              </>
            )}
            <Link href={`/dashboard/proposals/new?edit=${proposal.id}`} className="btn-secondary text-sm">
              <Edit3 size={14} /> Edit
            </Link>
            <button onClick={handlePrint} className="btn-secondary text-sm">
              <Printer size={14} /> Print / PDF
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card p-4">
            <div className="text-xs text-zinc-500 mb-1">Materials</div>
            <div className="text-lg font-bold text-white">${proposal.totalMaterials.toLocaleString()}</div>
          </div>
          <div className="card p-4">
            <div className="text-xs text-zinc-500 mb-1">Labor</div>
            <div className="text-lg font-bold text-white">${proposal.totalLabor.toLocaleString()}</div>
          </div>
          <div className="card p-4">
            <div className="text-xs text-zinc-500 mb-1">Total</div>
            <div className="text-2xl font-bold" style={{ color: '#f97316' }}>${proposal.totalAmount.toLocaleString()}</div>
          </div>
        </div>

        {/* Scope Items */}
        <div className="card overflow-hidden mb-6">
          <div className="px-6 py-4" style={{ borderBottom: '1px solid #27272a' }}>
            <h2 className="text-sm font-semibold text-white">Scope of Work</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-zinc-600 uppercase" style={{ borderBottom: '1px solid #27272a' }}>
                <th className="text-left px-6 py-3">Description</th>
                <th className="text-right px-4 py-3">Qty</th>
                <th className="text-left px-4 py-3">Unit</th>
                <th className="text-right px-4 py-3">Materials</th>
                <th className="text-right px-4 py-3">Labor</th>
                <th className="text-right px-6 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {proposal.scopeItems.map((item) => {
                const mat = item.quantity * item.unitCost;
                const lab = item.quantity * item.laborHours * item.laborRate;
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #1c1c1e' }}>
                    <td className="px-6 py-3 text-zinc-300">{item.description}</td>
                    <td className="px-4 py-3 text-right text-zinc-400">{item.quantity}</td>
                    <td className="px-4 py-3 text-zinc-500">{item.unit}</td>
                    <td className="px-4 py-3 text-right text-zinc-400">${mat.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-zinc-400">${lab.toFixed(2)}</td>
                    <td className="px-6 py-3 text-right font-medium text-white">${(mat + lab).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: '2px solid #27272a' }}>
                <td colSpan={5} className="px-6 py-3 text-right font-semibold text-zinc-400">Total</td>
                <td className="px-6 py-3 text-right font-bold text-white text-base">${proposal.totalAmount.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Proposal Document — shown on screen + printed */}
      <div className="mx-8 mb-8">
        <ProposalDocument proposal={proposal} />
      </div>
    </DashboardLayout>
  );
}
