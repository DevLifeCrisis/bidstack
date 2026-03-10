"use client";

import { Proposal } from "@/types";
import { TRADE_LABELS } from "@/lib/scope-templates";

interface ProposalDocumentProps {
  proposal: Proposal;
}

export default function ProposalDocument({ proposal }: ProposalDocumentProps) {
  const trade = TRADE_LABELS[proposal.trade] || proposal.trade;
  const today = new Date(proposal.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  const validUntil = new Date(
    new Date(proposal.createdAt).getTime() + proposal.validityDays * 86400000
  ).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const proposalNumber = `BSK-${new Date(proposal.createdAt).getFullYear()}-${proposal.id.slice(-6).toUpperCase()}`;
  const accent = "#e85d04";

  const cell = (opts: React.CSSProperties = {}): React.CSSProperties => ({
    padding: "11px 14px",
    fontSize: 13,
    color: "#374151",
    borderBottom: "1px solid #f3f4f6",
    verticalAlign: "middle" as const,
    ...opts,
  });

  return (
    <div
      id="proposal-document"
      style={{
        background: "#ffffff",
        color: "#111827",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        maxWidth: 820,
        margin: "0 auto",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.12)",
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      {/* ── TOP ACCENT BAR ── */}
      <div style={{ height: 5, background: `linear-gradient(90deg, ${accent}, #f97316)` }} />

      {/* ── HEADER ── */}
      <div style={{ padding: "36px 48px 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {/* Company */}
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.3px" }}>
            {proposal.companyName || "Your Company"}
          </div>
          <div style={{ marginTop: 6, fontSize: 12.5, color: "#6b7280", lineHeight: 1.8 }}>
            {proposal.companyAddress && <div>{proposal.companyAddress}</div>}
            {proposal.companyPhone && <div>{proposal.companyPhone}</div>}
            {proposal.companyEmail && <div>{proposal.companyEmail}</div>}
          </div>
        </div>

        {/* Proposal Label */}
        <div style={{ textAlign: "right" }}>
          <div style={{
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 2,
            color: "#e5e7eb",
            textTransform: "uppercase",
            lineHeight: 1,
            marginBottom: 12,
          }}>
            PROPOSAL
          </div>
          <table style={{ fontSize: 12.5, borderCollapse: "collapse", marginLeft: "auto" }}>
            <tbody>
              {[
                ["Proposal #", proposalNumber],
                ["Trade", trade],
                ["Date", today],
                ["Valid Until", validUntil],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td style={{ padding: "2px 12px 2px 0", color: "#9ca3af", textAlign: "right", whiteSpace: "nowrap" }}>{label}</td>
                  <td style={{ padding: "2px 0", color: "#111827", fontWeight: 600, whiteSpace: "nowrap" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: "#f3f4f6", margin: "0 48px" }} />

      {/* ── BILL TO / PROJECT ── */}
      <div style={{ padding: "24px 48px 28px", display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 10 }}>
            Prepared For
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{proposal.clientName}</div>
          {proposal.clientEmail && <div style={{ fontSize: 13, color: "#6b7280", marginTop: 3 }}>{proposal.clientEmail}</div>}
          {proposal.clientPhone && <div style={{ fontSize: 13, color: "#6b7280" }}>{proposal.clientPhone}</div>}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 10 }}>
            Project
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{proposal.projectTitle}</div>
          {proposal.projectAddress && <div style={{ fontSize: 13, color: "#6b7280", marginTop: 3 }}>{proposal.projectAddress}</div>}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 10 }}>
            Payment Terms
          </div>
          <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.7 }}>
            <div>50% due at signing</div>
            <div>50% due at completion</div>
          </div>
        </div>
      </div>

      {/* ── SCOPE OF WORK TABLE ── */}
      <div style={{ padding: "0 48px 0" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 12 }}>
          Scope of Work
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              <th style={{ ...cell({ background: "#f9fafb" }), textAlign: "left", fontSize: 11, fontWeight: 700, color: "#374151", letterSpacing: 0.3, borderBottom: "2px solid #e5e7eb", textTransform: "uppercase" }}>
                Description
              </th>
              <th style={{ ...cell({ background: "#f9fafb" }), textAlign: "center", fontSize: 11, fontWeight: 700, color: "#374151", letterSpacing: 0.3, borderBottom: "2px solid #e5e7eb", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                Qty
              </th>
              <th style={{ ...cell({ background: "#f9fafb" }), textAlign: "left", fontSize: 11, fontWeight: 700, color: "#374151", letterSpacing: 0.3, borderBottom: "2px solid #e5e7eb", textTransform: "uppercase" }}>
                Unit
              </th>
              <th style={{ ...cell({ background: "#f9fafb" }), textAlign: "right", fontSize: 11, fontWeight: 700, color: "#374151", letterSpacing: 0.3, borderBottom: "2px solid #e5e7eb", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                Materials
              </th>
              <th style={{ ...cell({ background: "#f9fafb" }), textAlign: "right", fontSize: 11, fontWeight: 700, color: "#374151", letterSpacing: 0.3, borderBottom: "2px solid #e5e7eb", textTransform: "uppercase" }}>
                Labor
              </th>
              <th style={{ ...cell({ background: "#f9fafb", paddingRight: 0 }), textAlign: "right", fontSize: 11, fontWeight: 700, color: "#374151", letterSpacing: 0.3, borderBottom: "2px solid #e5e7eb", textTransform: "uppercase" }}>
                Line Total
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
                  <td style={cell({ fontWeight: 500, color: "#111827", maxWidth: 260 })}>{item.description}</td>
                  <td style={cell({ textAlign: "center", color: "#6b7280" })}>{item.quantity}</td>
                  <td style={cell({ color: "#9ca3af", fontSize: 12 })}>{item.unit}</td>
                  <td style={cell({ textAlign: "right", color: "#6b7280", fontVariantNumeric: "tabular-nums" })}>
                    {mat > 0 ? `$${mat.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : <span style={{ color: "#d1d5db" }}>—</span>}
                  </td>
                  <td style={cell({ textAlign: "right", color: "#6b7280", fontVariantNumeric: "tabular-nums" })}>
                    {lab > 0 ? `$${lab.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : <span style={{ color: "#d1d5db" }}>—</span>}
                  </td>
                  <td style={cell({ textAlign: "right", fontWeight: 600, color: "#111827", fontVariantNumeric: "tabular-nums", paddingRight: 0 })}>
                    ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── TOTALS + NOTES ── */}
      <div style={{ padding: "0 48px 36px", display: "flex", gap: 32, marginTop: 0, alignItems: "flex-start" }}>
        {/* Notes / Summary */}
        <div style={{ flex: 1, paddingTop: 20 }}>
          {proposal.notes ? (
            <>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 8 }}>
                Project Notes
              </div>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{proposal.notes}</p>
            </>
          ) : (
            <div style={{ fontSize: 13, color: "#9ca3af", fontStyle: "italic" }}>
              Thank you for the opportunity to work with you on this project.
            </div>
          )}
        </div>

        {/* Totals Block */}
        <div style={{ minWidth: 260, marginTop: 0, paddingTop: 12 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <tbody>
              <tr>
                <td style={{ padding: "7px 0", color: "#6b7280" }}>Materials &amp; Equipment</td>
                <td style={{ padding: "7px 0", textAlign: "right", color: "#374151", fontVariantNumeric: "tabular-nums" }}>
                  ${proposal.totalMaterials.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "7px 0", color: "#6b7280", borderBottom: "1px solid #e5e7eb" }}>Labor</td>
                <td style={{ padding: "7px 0", textAlign: "right", color: "#374151", fontVariantNumeric: "tabular-nums", borderBottom: "1px solid #e5e7eb" }}>
                  ${proposal.totalLabor.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "14px 16px 14px 0", fontWeight: 800, fontSize: 15, color: "#111827", borderTop: "2px solid #111827" }}>
                  Total
                </td>
                <td style={{ padding: "14px 0 14px 16px", textAlign: "right", fontWeight: 800, fontSize: 20, color: accent, fontVariantNumeric: "tabular-nums", borderTop: "2px solid #111827" }}>
                  ${proposal.totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: 8, padding: "10px 12px", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 4, fontSize: 11.5, color: "#9a3412", lineHeight: 1.5 }}>
            <strong>Payment:</strong> 50% deposit (${(proposal.totalAmount / 2).toLocaleString("en-US", { minimumFractionDigits: 2 })}) due at signing
          </div>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: "#f3f4f6" }} />

      {/* ── WHY US + TERMS ── */}
      <div style={{ padding: "28px 48px", display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 12 }}>
            Why {proposal.companyName || "Us"}
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: 12.5, color: "#374151", lineHeight: 1 }}>
            {[
              "Licensed & Insured — Full coverage for your protection",
              "On-time Completion — We respect your schedule",
              "Clean Jobsite — We clean up every day",
              "Transparent Pricing — No surprise charges",
              "1-Year Labor Warranty on all work performed",
            ].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 9 }}>
                <span style={{ color: accent, fontWeight: 700, flexShrink: 0, marginTop: 1, fontSize: 11 }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 12 }}>
            Terms &amp; Conditions
          </div>
          <ul style={{ margin: 0, padding: "0 0 0 14px", fontSize: 12, color: "#6b7280", lineHeight: 1.9 }}>
            <li>50% deposit at signing, 50% on completion</li>
            <li>Proposal valid for {proposal.validityDays} days from date above</li>
            <li>All work performed per applicable codes and standards</li>
            <li>Scope changes may affect final price and schedule</li>
            <li>Full general liability &amp; workers&apos; comp insurance carried</li>
            <li>All required permits included in quoted price</li>
          </ul>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: "#f3f4f6" }} />

      {/* ── SIGNATURE BLOCK ── */}
      <div style={{ padding: "28px 48px 36px", display: "flex", gap: 48 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 28 }}>
            Authorized by {proposal.companyName || "Contractor"}
          </div>
          <div style={{ borderBottom: "1.5px solid #374151", marginBottom: 6 }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9ca3af" }}>
            <span>Signature</span><span>Date</span>
          </div>
          <div style={{ marginTop: 18, borderBottom: "1.5px solid #d1d5db", marginBottom: 6 }} />
          <div style={{ fontSize: 11, color: "#9ca3af" }}>Printed Name &amp; Title</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#9ca3af", textTransform: "uppercase", marginBottom: 28 }}>
            Accepted by Client
          </div>
          <div style={{ borderBottom: "1.5px solid #374151", marginBottom: 6 }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9ca3af" }}>
            <span>Signature</span><span>Date</span>
          </div>
          <div style={{ marginTop: 18, borderBottom: "1.5px solid #d1d5db", marginBottom: 6 }} />
          <div style={{ fontSize: 11, color: "#9ca3af" }}>Printed Name</div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ padding: "14px 48px", background: "#f9fafb", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 11, color: "#9ca3af" }}>
          {[proposal.companyName, proposal.companyPhone, proposal.companyEmail].filter(Boolean).join("  ·  ")}
        </div>
        <div style={{ fontSize: 11, color: "#d1d5db", fontVariantNumeric: "tabular-nums" }}>{proposalNumber}</div>
      </div>
    </div>
  );
}
