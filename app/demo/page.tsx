"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import ProposalDocument from "@/components/ProposalDocument";
import { Proposal } from "@/types";

const SAMPLE: Proposal = {
  id: "demo-001",
  userId: "demo",
  status: "sent",
  trade: "electrical",
  projectTitle: "200A Panel Upgrade + EV Charger Installation",
  projectAddress: "4500 Commerce Dr, Austin TX 78701",
  clientName: "Riverside Commercial LLC",
  clientEmail: "pm@riverside.com",
  clientPhone: "(555) 987-6543",
  companyName: "Apex Electrical Services LLC",
  companyAddress: "123 Tradesman Blvd, Austin, TX 78701",
  companyPhone: "(512) 234-5678",
  companyEmail: "info@apexelectrical.com",
  notes: "Customer has requested all work to be completed between 7AM–4PM weekdays. Site access via rear entrance — contact PM upon arrival.",
  validityDays: 30,
  totalMaterials: 2120,
  totalLabor: 2185,
  totalAmount: 4305,
  createdAt: "2026-03-09T00:00:00.000Z",
  scopeItems: [
    { id: "1", description: "200A Main Breaker Panel (Square D QO)", quantity: 1, unit: "ea", unitCost: 650, laborHours: 4, laborRate: 190 },
    { id: "2", description: "200A Meter Base (Ringless, EUSERC-compliant)", quantity: 1, unit: "ea", unitCost: 120, laborHours: 1, laborRate: 190 },
    { id: "3", description: "Level 2 EV Charger — Hardwired 48A (ChargePoint CPH50)", quantity: 2, unit: "ea", unitCost: 450, laborHours: 2, laborRate: 190 },
    { id: "4", description: "50A Double Pole Breaker (Square D QO250)", quantity: 2, unit: "ea", unitCost: 25, laborHours: 0.25, laborRate: 190 },
    { id: "5", description: "Permit & City Inspection Fee", quantity: 1, unit: "ea", unitCost: 400, laborHours: 2, laborRate: 190 },
  ],
};

export default function DemoPage() {
  return (
    <div className="min-h-screen" style={{ background: "#f3f4f6" }}>
      {/* Top bar */}
      <div style={{ background: "#111827", borderBottom: "1px solid #1f2937" }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
            <ArrowLeft size={15} /> Back to BidStack
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="btn-secondary text-sm"
            >
              <Printer size={14} /> Print / Save PDF
            </button>
            <Link href="/signup" className="btn-primary text-sm">
              Create Your Own →
            </Link>
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-4 no-print">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
            style={{ background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa" }}>
            Sample Proposal
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">This is what your clients receive</h1>
          <p className="text-gray-500 text-sm">Generated from BidStack in under 10 minutes. Professional, branded, and print-ready.</p>
        </div>
      </div>

      {/* Proposal */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <ProposalDocument proposal={SAMPLE} />
      </div>

      {/* CTA */}
      <div className="no-print max-w-4xl mx-auto px-6 pb-16 text-center">
        <p className="text-gray-500 text-sm mb-4">Ready to send proposals like this for your jobs?</p>
        <Link href="/signup" className="btn-primary text-base px-8 py-3">
          Start Your Free Trial
        </Link>
      </div>
    </div>
  );
}
