"use client";

import { Proposal } from "@/types";
import { TRADE_LABELS } from "@/lib/scope-templates";

interface ProposalDocumentProps {
  proposal: Proposal;
}

export default function ProposalDocument({ proposal }: ProposalDocumentProps) {
  const trade = TRADE_LABELS[proposal.trade] || proposal.trade;
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const validUntil = new Date(Date.now() + proposal.validityDays * 86400000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const proposalNumber = `BSK-${new Date(proposal.createdAt).getFullYear()}-${proposal.id.slice(-5).toUpperCase()}`;

  return (
    <div
      id="proposal-document"
      style={{
        background: "#ffffff",
        color: "#111827",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        maxWidth: 800,
        margin: "0 auto",
        boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
        borderRadius: 4,
      }}
    >
      {/* Header / Letterhead */}
      <div
        style={{
          background: "linear-gradient(135deg, #1c1917 0%, #292524 100%)",
          padding: "36px 48px",
          borderRadius: "4px 4px 0 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.5px" }}>
            {proposal.companyName || "Your Company"}
          </div>
          <div style={{ fontSize: 12, color: "#a8a29e", marginTop: 4, lineHeight: 1.6 }}>
            {proposal.companyAddress && <div>{proposal.companyAddress}</div>}
            {proposal.companyPhone && <div>{proposal.companyPhone}</div>}
            {proposal.companyEmail && <div>{proposal.companyEmail}</div>}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              background: "#f97316",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
              padding: "4px 12px",
              borderRadius: 2,
              textTransform: "uppercase",
              marginBottom: 8,
              display: "inline-block",
            }}
          >
            {trade} Proposal
          </div>
          <div style={{ fontSize: 11, color: "#a8a29e", lineHeight: 1.8 }}>
            <div><span style={{ color: "#78716c" }}>Proposal #:</span> {proposalNumber}</div>
            <div><span style={{ color: "#78716c" }}>Date:</span> {today}</div>
            <div><span style={{ color: "#78716c" }}>Valid Until:</span> {validUntil}</div>
          </div>
        </div>
      </div>

      {/* Orange accent bar */}
      <div style={{ height: 4, background: "linear-gradient(90deg, #f97316, #ea580c)" }} />

      <div style={{ padding: "40px 48px" }}>
        {/* Prepared For */}
        <div style={{ display: "flex", gap: 40, marginBottom: 36 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 10 }}>
              Prepared For
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{proposal.clientName}</div>
            {proposal.clientEmail && (
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{proposal.clientEmail}</div>
            )}
            {proposal.clientPhone && (
              <div style={{ fontSize: 13, color: "#6b7280" }}>{proposal.clientPhone}</div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 10 }}>
              Project
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{proposal.projectTitle}</div>
            {proposal.projectAddress && (
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{proposal.projectAddress}</div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#f3f4f6", marginBottom: 32 }} />

        {/* Executive Summary */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 12 }}>
            Executive Summary
          </div>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.75, margin: 0 }}>
            Thank you for the opportunity to provide this proposal for{" "}
            <strong>{proposal.projectTitle}</strong>. {proposal.companyName || "We"}{" "}
            specialize in {trade.toLowerCase()} services and are committed to delivering quality
            workmanship, on-time completion, and transparent pricing. We have reviewed the project
            requirements at {proposal.projectAddress || "your location"} and are pleased to present
            this detailed scope of work and cost breakdown. Our team holds all required licenses and
            insurance to perform this work safely and in full compliance with local codes.
          </p>
        </div>

        {/* Scope of Work */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 16 }}>
            Scope of Work
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, fontWeight: 600, color: "#6b7280", letterSpacing: 0.5, borderBottom: "2px solid #e5e7eb" }}>
                  Description
                </th>
                <th style={{ textAlign: "center", padding: "10px 10px", fontSize: 11, fontWeight: 600, color: "#6b7280", letterSpacing: 0.5, borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>
                  Qty
                </th>
                <th style={{ textAlign: "left", padding: "10px 10px", fontSize: 11, fontWeight: 600, color: "#6b7280", letterSpacing: 0.5, borderBottom: "2px solid #e5e7eb" }}>
                  Unit
                </th>
                <th style={{ textAlign: "right", padding: "10px 10px", fontSize: 11, fontWeight: 600, color: "#6b7280", letterSpacing: 0.5, borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>
                  Materials
                </th>
                <th style={{ textAlign: "right", padding: "10px 10px", fontSize: 11, fontWeight: 600, color: "#6b7280", letterSpacing: 0.5, borderBottom: "2px solid #e5e7eb" }}>
                  Labor
                </th>
                <th style={{ textAlign: "right", padding: "10px 14px", fontSize: 11, fontWeight: 600, color: "#6b7280", letterSpacing: 0.5, borderBottom: "2px solid #e5e7eb" }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {proposal.scopeItems.map((item, i) => {
                const mat = item.quantity * item.unitCost;
                const lab = item.quantity * item.laborHours * item.laborRate;
                const total = mat + lab;
                return (
                  <tr key={item.id} style={{ background: i % 2 === 0 ? "#ffffff" : "#fafafa" }}>
                    <td style={{ padding: "11px 14px", color: "#111827", borderBottom: "1px solid #f3f4f6", fontWeight: 500 }}>
                      {item.description}
                    </td>
                    <td style={{ padding: "11px 10px", color: "#6b7280", borderBottom: "1px solid #f3f4f6", textAlign: "center" }}>
                      {item.quantity}
                    </td>
                    <td style={{ padding: "11px 10px", color: "#9ca3af", borderBottom: "1px solid #f3f4f6", fontSize: 12 }}>
                      {item.unit}
                    </td>
                    <td style={{ padding: "11px 10px", color: "#6b7280", borderBottom: "1px solid #f3f4f6", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                      {mat > 0 ? `$${mat.toFixed(2)}` : "—"}
                    </td>
                    <td style={{ padding: "11px 10px", color: "#6b7280", borderBottom: "1px solid #f3f4f6", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                      {lab > 0 ? `$${lab.toFixed(2)}` : "—"}
                    </td>
                    <td style={{ padding: "11px 14px", color: "#111827", borderBottom: "1px solid #f3f4f6", textAlign: "right", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                      ${total.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Totals */}
          <div
            style={{
              marginTop: 0,
              border: "1px solid #e5e7eb",
              borderTop: "none",
              borderRadius: "0 0 6px 6px",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ minWidth: 280 }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 16px", background: "#f9fafb", fontSize: 13 }}>
                  <span style={{ color: "#6b7280" }}>Materials & Equipment</span>
                  <span style={{ color: "#374151", fontVariantNumeric: "tabular-nums" }}>${proposal.totalMaterials.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 16px", background: "#f9fafb", fontSize: 13, borderTop: "1px solid #e5e7eb" }}>
                  <span style={{ color: "#6b7280" }}>Labor</span>
                  <span style={{ color: "#374151", fontVariantNumeric: "tabular-nums" }}>${proposal.totalLabor.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "#1c1917", fontSize: 15, borderTop: "1px solid #e5e7eb" }}>
                  <span style={{ color: "#e7e5e4", fontWeight: 700 }}>Total Investment</span>
                  <span style={{ color: "#f97316", fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>${proposal.totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {proposal.notes && (
          <div style={{ marginBottom: 32, padding: "16px 20px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
              Project Notes
            </div>
            <p style={{ fontSize: 13, color: "#78350f", margin: 0, lineHeight: 1.65 }}>{proposal.notes}</p>
          </div>
        )}

        {/* Why Us */}
        <div style={{ marginBottom: 36, padding: "20px 24px", background: "#f9fafb", borderRadius: 6, border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 14 }}>
            Why {proposal.companyName || "Us"}?
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
            {[
              "Licensed & Insured — Full coverage for your protection",
              "On-time Completion — We respect your schedule",
              "Clean Jobsite — We clean up every day",

              "Transparent Pricing — No surprise charges",
              "1-Year Labor Warranty on all work performed",
              "Code Compliant — All permits included",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#374151" }}>
                <span style={{ color: "#f97316", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 12 }}>
            Terms & Conditions
          </div>
          <ul style={{ margin: 0, padding: "0 0 0 16px", fontSize: 12, color: "#6b7280", lineHeight: 2 }}>
            <li>Payment Terms: 50% deposit upon contract signing, 50% upon project completion</li>
            <li>This proposal is valid for {proposal.validityDays} days from the date above</li>
            <li>All work performed in accordance with applicable local codes and standards</li>
            <li>Any changes to scope of work may affect final pricing and schedule</li>
            <li>We carry full general liability and workers&apos; compensation insurance</li>
          </ul>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#e5e7eb", marginBottom: 36 }} />

        {/* Signature Block */}
        <div style={{ display: "flex", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 32 }}>
              Authorized Signature ({proposal.companyName || "Contractor"})
            </div>
            <div style={{ borderBottom: "1.5px solid #9ca3af", marginBottom: 6 }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9ca3af" }}>
              <span>Signature</span>
              <span>Date</span>
            </div>
            <div style={{ marginTop: 20, borderBottom: "1.5px solid #d1d5db", marginBottom: 6 }} />
            <div style={{ fontSize: 11, color: "#9ca3af" }}>Printed Name &amp; Title</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 32 }}>
              Client Acceptance
            </div>
            <div style={{ borderBottom: "1.5px solid #9ca3af", marginBottom: 6 }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9ca3af" }}>
              <span>Signature</span>
              <span>Date</span>
            </div>
            <div style={{ marginTop: 20, borderBottom: "1.5px solid #d1d5db", marginBottom: 6 }} />
            <div style={{ fontSize: 11, color: "#9ca3af" }}>Printed Name</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 36, paddingTop: 20, borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>
            {proposal.companyName} · {proposal.companyPhone} · {proposal.companyEmail}
          </div>
          <div style={{ fontSize: 11, color: "#d1d5db" }}>
            {proposalNumber}
          </div>
        </div>
      </div>
    </div>
  );
}
