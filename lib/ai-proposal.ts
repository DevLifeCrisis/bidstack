import { Proposal } from '@/types';
import { TRADE_LABELS } from './scope-templates';

export function generateProposalText(proposal: Proposal): string {
  const trade = TRADE_LABELS[proposal.trade] || proposal.trade;
  const totalFormatted = `$${proposal.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  const materialsFormatted = `$${proposal.totalMaterials.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  const laborFormatted = `$${proposal.totalLabor.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const validUntil = new Date(Date.now() + proposal.validityDays * 86400000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const scopeList = proposal.scopeItems
    .map(item => {
      const mat = item.unitCost > 0 ? ` — Materials: $${(item.quantity * item.unitCost).toFixed(2)}` : '';
      const lab = item.laborHours > 0 ? ` — Labor: $${(item.quantity * item.laborHours * item.laborRate).toFixed(2)}` : '';
      return `• ${item.description} (${item.quantity} ${item.unit})${mat}${lab}`;
    })
    .join('\n');

  return `
PROPOSAL FOR ${trade.toUpperCase()} SERVICES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FROM:
${proposal.companyName}
${proposal.companyAddress}
${proposal.companyPhone} | ${proposal.companyEmail}

TO:
${proposal.clientName}
${proposal.clientEmail}
${proposal.clientPhone}

Project: ${proposal.projectTitle}
Address: ${proposal.projectAddress}
Date: ${today}
Proposal Valid Until: ${validUntil}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXECUTIVE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thank you for the opportunity to provide this proposal for ${proposal.projectTitle}. ${proposal.companyName} specializes in ${trade.toLowerCase()} services and is committed to delivering quality workmanship, on-time completion, and transparent pricing.

We have reviewed the project requirements at ${proposal.projectAddress} and are pleased to present this detailed scope of work and cost breakdown. Our team holds all required licenses and insurance to perform this work safely and in full compliance with local codes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCOPE OF WORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The following work is included in this proposal:

${scopeList}

${proposal.notes ? `Additional Notes:\n${proposal.notes}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVESTMENT SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Materials & Equipment:    ${materialsFormatted}
  Labor:                    ${laborFormatted}
  ─────────────────────────────────────
  Total Investment:         ${totalFormatted}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERMS & CONDITIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Payment Terms: 50% deposit upon contract signing, 50% upon project completion
• This proposal is valid for ${proposal.validityDays} days from the date above
• All work will be performed in accordance with applicable codes and standards
• Any changes to scope may affect pricing and schedule
• We carry full general liability and workers' compensation insurance
• All permits required for this work are included in the above pricing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHY ${proposal.companyName.toUpperCase()}?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Licensed & Insured — Full coverage for your protection
✓ On-time Completion — We respect your schedule
✓ Clean Jobsite — We clean up every day
✓ Transparent Pricing — No surprise charges
✓ Warranty — 1-year labor warranty on all work performed

We look forward to earning your business and delivering exceptional results on this project. If you have any questions or would like to discuss the scope in more detail, please don't hesitate to reach out.

Respectfully submitted,

${proposal.companyName}
${proposal.companyPhone}
${proposal.companyEmail}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACCEPTANCE

By signing below, you authorize ${proposal.companyName} to proceed with the work described above under the terms stated in this proposal.

Client Signature: _________________________________ Date: __________

Printed Name: _____________________________________

Project Address: ${proposal.projectAddress}
Total Amount: ${totalFormatted}
`.trim();
}
