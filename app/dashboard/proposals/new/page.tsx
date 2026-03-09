"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ScopeItem, TradeType } from "@/types";
import { SCOPE_TEMPLATES, TRADE_LABELS } from "@/lib/scope-templates";
import { getUser, saveProposal, generateId, calcTotals, getProposal } from "@/lib/storage";
import { Plus, Trash2, BookOpen, Wand2, ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const STEPS = ['Project Info', 'Scope of Work', 'Review & Generate'];

function newItem(): ScopeItem {
  return { id: generateId(), description: '', quantity: 1, unit: 'ea', unitCost: 0, laborHours: 0, laborRate: 0 };
}

function ProposalBuilderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');

  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const [user] = useState(getUser());

  // Form state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectAddress, setProjectAddress] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [trade, setTrade] = useState<TradeType>('electrical');
  const [validityDays, setValidityDays] = useState(30);
  const [notes, setNotes] = useState('');
  const [scopeItems, setScopeItems] = useState<ScopeItem[]>([newItem()]);

  useEffect(() => {
    if (editId) {
      const p = getProposal(editId);
      if (p) {
        setClientName(p.clientName);
        setClientEmail(p.clientEmail);
        setClientPhone(p.clientPhone);
        setProjectAddress(p.projectAddress);
        setProjectTitle(p.projectTitle);
        setTrade(p.trade);
        setValidityDays(p.validityDays);
        setNotes(p.notes);
        setScopeItems(p.scopeItems.length > 0 ? p.scopeItems : [newItem()]);
      }
    }
  }, [editId]);

  const addItem = () => setScopeItems(prev => [...prev, newItem()]);
  const removeItem = (id: string) => setScopeItems(prev => prev.filter(i => i.id !== id));
  const updateItem = (id: string, field: keyof ScopeItem, value: string | number) => {
    setScopeItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const applyTemplate = (templateId: string) => {
    const tpl = SCOPE_TEMPLATES.find(t => t.id === templateId);
    if (!tpl) return;
    setScopeItems(tpl.items.map(item => ({ ...item, id: generateId() })));
    setTrade(tpl.trade);
    if (!projectTitle) setProjectTitle(tpl.name);
    setShowTemplates(false);
  };

  const tradeTmplates = SCOPE_TEMPLATES.filter(t => t.trade === trade);
  const totals = calcTotals(scopeItems);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1200)); // Simulate AI generation
    
    const proposal = {
      id: editId || generateId(),
      userId: user?.id || 'demo',
      clientName,
      clientEmail,
      clientPhone,
      projectAddress,
      projectTitle,
      trade,
      status: 'draft' as const,
      scopeItems,
      notes,
      validityDays,
      ...totals,
      createdAt: new Date().toISOString(),
      companyName: user?.companyName || 'My Contracting Company',
      companyPhone: user?.companyPhone || '',
      companyEmail: user?.companyEmail || '',
      companyAddress: user?.companyAddress || '',
    };

    saveProposal(proposal);
    setGenerating(false);
    router.push(`/dashboard/proposals/${proposal.id}`);
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/proposals" className="text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{editId ? 'Edit Proposal' : 'New Proposal'}</h1>
            <p className="text-zinc-500 text-sm">Fill in the details to generate a professional proposal.</p>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <button
                onClick={() => i <= step && setStep(i)}
                className="flex items-center gap-2 text-sm"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step ? 'text-white' : i === step ? 'text-white' : 'text-zinc-600'
                }`} style={{ background: i < step ? '#22c55e' : i === step ? '#f97316' : '#27272a' }}>
                  {i < step ? <Check size={12} /> : i + 1}
                </div>
                <span className={`${i === step ? 'text-white' : i < step ? 'text-zinc-400' : 'text-zinc-600'}`}>{label}</span>
              </button>
              {i < STEPS.length - 1 && <div className="w-8 h-px" style={{ background: i < step ? '#22c55e' : '#27272a' }} />}
            </div>
          ))}
        </div>

        {/* Step 1: Project Info */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-white font-semibold mb-5">Client Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="label">Client / Company Name *</label>
                  <input className="input" placeholder="Riverside Commercial LLC" value={clientName} onChange={e => setClientName(e.target.value)} />
                </div>
                <div>
                  <label className="label">Client Email</label>
                  <input className="input" type="email" placeholder="pm@client.com" value={clientEmail} onChange={e => setClientEmail(e.target.value)} />
                </div>
                <div>
                  <label className="label">Client Phone</label>
                  <input className="input" placeholder="(555) 000-0000" value={clientPhone} onChange={e => setClientPhone(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-white font-semibold mb-5">Project Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="label">Project Title *</label>
                  <input className="input" placeholder="200A Panel Upgrade + EV Charger Install" value={projectTitle} onChange={e => setProjectTitle(e.target.value)} />
                </div>
                <div className="col-span-2">
                  <label className="label">Project Address</label>
                  <input className="input" placeholder="4500 Commerce Dr, Austin TX 78701" value={projectAddress} onChange={e => setProjectAddress(e.target.value)} />
                </div>
                <div>
                  <label className="label">Trade Type</label>
                  <select className="input" value={trade} onChange={e => setTrade(e.target.value as TradeType)}>
                    <option value="electrical">⚡ Electrical</option>
                    <option value="plumbing">💧 Plumbing</option>
                    <option value="hvac">🌀 HVAC</option>
                    <option value="painting">🎨 Painting</option>
                  </select>
                </div>
                <div>
                  <label className="label">Proposal Valid For (days)</label>
                  <input className="input" type="number" value={validityDays} onChange={e => setValidityDays(Number(e.target.value))} min={1} max={90} />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(1)}
                disabled={!clientName || !projectTitle}
                className="btn-primary"
              >
                Next: Scope of Work <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Scope */}
        {step === 1 && (
          <div className="space-y-4">
            {/* Template picker */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white font-semibold">Scope of Work</h2>
                <button onClick={() => setShowTemplates(!showTemplates)} className="btn-secondary text-sm">
                  <BookOpen size={14} /> Load Template
                </button>
              </div>
              {showTemplates && (
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3" style={{ borderTop: '1px solid #27272a' }}>
                  {tradeTmplates.map(t => (
                    <button
                      key={t.id}
                      onClick={() => applyTemplate(t.id)}
                      className="text-left p-3 rounded-lg transition-colors hover:border-orange-500"
                      style={{ background: '#18181b', border: '1px solid #27272a' }}
                    >
                      <div className="font-medium text-white text-sm">{t.name}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{t.description}</div>
                      <div className="text-xs text-orange-400 mt-1">{t.items.length} line items</div>
                    </button>
                  ))}
                  {tradeTmplates.length === 0 && (
                    <p className="text-zinc-500 text-sm col-span-2">No templates for {TRADE_LABELS[trade]}. Switch trade type above.</p>
                  )}
                </div>
              )}
            </div>

            {/* Line items */}
            <div className="card overflow-hidden">
              <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs text-zinc-600 uppercase" style={{ borderBottom: '1px solid #27272a' }}>
                <div className="col-span-4">Description</div>
                <div className="col-span-1">Qty</div>
                <div className="col-span-1">Unit</div>
                <div className="col-span-2">Unit Cost ($)</div>
                <div className="col-span-1">Labor Hrs</div>
                <div className="col-span-2">Labor Rate ($/hr)</div>
                <div className="col-span-1"></div>
              </div>
              {scopeItems.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 px-4 py-2 items-center" style={{ borderBottom: '1px solid #1c1c1e' }}>
                  <div className="col-span-4">
                    <input className="input text-xs py-1.5" placeholder="Description" value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} />
                  </div>
                  <div className="col-span-1">
                    <input className="input text-xs py-1.5" type="number" value={item.quantity} onChange={e => updateItem(item.id, 'quantity', Number(e.target.value))} min={0} />
                  </div>
                  <div className="col-span-1">
                    <input className="input text-xs py-1.5" placeholder="ea" value={item.unit} onChange={e => updateItem(item.id, 'unit', e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <input className="input text-xs py-1.5" type="number" value={item.unitCost} onChange={e => updateItem(item.id, 'unitCost', Number(e.target.value))} min={0} />
                  </div>
                  <div className="col-span-1">
                    <input className="input text-xs py-1.5" type="number" value={item.laborHours} onChange={e => updateItem(item.id, 'laborHours', Number(e.target.value))} min={0} step={0.5} />
                  </div>
                  <div className="col-span-2">
                    <input className="input text-xs py-1.5" type="number" value={item.laborRate} onChange={e => updateItem(item.id, 'laborRate', Number(e.target.value))} min={0} />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button onClick={() => removeItem(item.id)} className="text-zinc-600 hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="px-4 py-3" style={{ borderTop: '1px solid #27272a' }}>
                <button onClick={addItem} className="text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors">
                  <Plus size={14} /> Add Line Item
                </button>
              </div>
            </div>

            {/* Totals */}
            <div className="card p-5">
              <div className="flex flex-col items-end gap-1">
                <div className="text-sm text-zinc-500">Materials: <span className="text-white">${totals.totalMaterials.toLocaleString()}</span></div>
                <div className="text-sm text-zinc-500">Labor: <span className="text-white">${totals.totalLabor.toLocaleString()}</span></div>
                <div className="text-base font-bold" style={{ color: '#f97316' }}>Total: ${totals.totalAmount.toLocaleString()}</div>
              </div>
            </div>

            {/* Notes */}
            <div className="card p-5">
              <label className="label">Additional Notes (optional)</label>
              <textarea
                className="input"
                rows={3}
                placeholder="Any special conditions, exclusions, or notes to include in the proposal..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(0)} className="btn-secondary">
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={() => setStep(2)} className="btn-primary">
                Review & Generate <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-white font-semibold mb-5">Review Your Proposal</h2>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="text-zinc-500">Client</div><div className="text-white">{clientName}</div>
                {clientEmail && <><div className="text-zinc-500">Email</div><div className="text-white">{clientEmail}</div></>}
                <div className="text-zinc-500">Project</div><div className="text-white">{projectTitle}</div>
                {projectAddress && <><div className="text-zinc-500">Address</div><div className="text-white">{projectAddress}</div></>}
                <div className="text-zinc-500">Trade</div><div className="text-white capitalize">{trade}</div>
                <div className="text-zinc-500">Line Items</div><div className="text-white">{scopeItems.filter(i => i.description).length} items</div>
                <div className="text-zinc-500">Materials</div><div className="text-white">${totals.totalMaterials.toLocaleString()}</div>
                <div className="text-zinc-500">Labor</div><div className="text-white">${totals.totalLabor.toLocaleString()}</div>
                <div className="text-zinc-500 font-semibold">Total</div><div className="font-bold text-base" style={{ color: '#f97316' }}>${totals.totalAmount.toLocaleString()}</div>
              </div>
            </div>

            <div className="card p-6" style={{ border: '1px solid #f9731630', background: '#f9731608' }}>
              <div className="flex items-center gap-2 mb-3">
                <Wand2 size={16} style={{ color: '#f97316' }} />
                <h3 className="text-white font-semibold">AI Proposal Generation</h3>
              </div>
              <p className="text-zinc-400 text-sm">Clicking &quot;Generate Proposal&quot; will create a professional, client-facing proposal document with:</p>
              <ul className="mt-3 space-y-1">
                {['Executive summary with your company branding', 'Full itemized scope of work', 'Investment summary with payment terms', 'Terms & conditions and acceptance block'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                    <Check size={13} style={{ color: '#22c55e' }} /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="btn-secondary">
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={handleGenerate} disabled={generating} className="btn-primary px-8">
                <Wand2 size={16} />
                {generating ? 'Generating...' : 'Generate Proposal'}
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function NewProposalPage() {
  return (
    <Suspense>
      <ProposalBuilderForm />
    </Suspense>
  );
}
