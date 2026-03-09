"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProposals, deleteProposal } from "@/lib/storage";
import { Proposal, ProposalStatus } from "@/types";
import { Plus, Search, Trash2, Eye, FileText } from "lucide-react";

const STATUS_BADGE: Record<string, string> = {
  draft: 'badge-draft',
  sent: 'badge-sent',
  accepted: 'badge-accepted',
  declined: 'badge-declined',
};

const TRADE_ICONS: Record<string, string> = {
  electrical: '⚡',
  plumbing: '💧',
  hvac: '🌀',
  painting: '🎨',
};

type FilterTab = 'all' | ProposalStatus;

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [filter, setFilter] = useState<FilterTab>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setProposals(getProposals());
  }, []);

  const filtered = proposals.filter(p => {
    const matchesFilter = filter === 'all' || p.status === filter;
    const matchesSearch = search === '' || 
      p.clientName.toLowerCase().includes(search.toLowerCase()) ||
      p.projectTitle.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('Delete this proposal?')) {
      deleteProposal(id);
      setProposals(getProposals());
    }
  };

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'draft', label: 'Draft' },
    { key: 'sent', label: 'Sent' },
    { key: 'accepted', label: 'Accepted' },
    { key: 'declined', label: 'Declined' },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Proposals</h1>
          <Link href="/dashboard/proposals/new" className="btn-primary">
            <Plus size={16} /> New Proposal
          </Link>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              className="input pl-9"
              placeholder="Search by client or project..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1 p-1 rounded-lg" style={{ background: '#18181b', border: '1px solid #27272a' }}>
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${filter === tab.key ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                style={filter === tab.key ? { background: '#27272a' } : {}}
              >
                {tab.label}
                <span className="ml-1.5 text-xs text-zinc-600">
                  {tab.key === 'all' ? proposals.length : proposals.filter(p => p.status === tab.key).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <FileText size={32} className="mx-auto mb-3 text-zinc-700" />
              <p className="text-zinc-500 text-sm mb-4">
                {search || filter !== 'all' ? 'No proposals match your filters.' : 'No proposals yet.'}
              </p>
              {!search && filter === 'all' && (
                <Link href="/dashboard/proposals/new" className="btn-primary text-sm">Create First Proposal</Link>
              )}
            </div>
          ) : (
            <>
              {/* Header row */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-zinc-600 uppercase tracking-wider" style={{ borderBottom: '1px solid #27272a' }}>
                <div className="col-span-4">Project</div>
                <div className="col-span-2">Client</div>
                <div className="col-span-2">Trade</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1"></div>
              </div>
              {filtered.map((p) => (
                <Link
                  key={p.id}
                  href={`/dashboard/proposals/${p.id}`}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-zinc-900 transition-colors items-center"
                  style={{ borderBottom: '1px solid #1c1c1e' }}
                >
                  <div className="col-span-4">
                    <div className="font-medium text-white text-sm truncate">{p.projectTitle}</div>
                    <div className="text-xs text-zinc-600 mt-0.5">{new Date(p.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="col-span-2 text-sm text-zinc-400 truncate">{p.clientName}</div>
                  <div className="col-span-2 text-sm text-zinc-400">
                    {TRADE_ICONS[p.trade]} <span className="capitalize">{p.trade}</span>
                  </div>
                  <div className="col-span-2 text-sm font-semibold text-white">${p.totalAmount.toLocaleString()}</div>
                  <div className="col-span-1">
                    <span className={`badge ${STATUS_BADGE[p.status]}`}>{p.status}</span>
                  </div>
                  <div className="col-span-1 flex items-center gap-2 justify-end">
                    <button
                      onClick={(e) => { e.preventDefault(); window.location.href = `/dashboard/proposals/${p.id}`; }}
                      className="text-zinc-600 hover:text-zinc-300 transition-colors"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(p.id, e)}
                      className="text-zinc-600 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
