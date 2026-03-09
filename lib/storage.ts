import { Proposal, ScopeItem } from '@/types';

const PROPOSALS_KEY = 'bidstack_proposals';
const USER_KEY = 'bidstack_user';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  companyName: string;
  companyPhone: string;
  companyEmail: string;
  companyAddress: string;
  trade: string;
  plan: string;
}

export function getUser(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function saveUser(user: UserProfile): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearUser(): void {
  localStorage.removeItem(USER_KEY);
}

export function getProposals(): Proposal[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(PROPOSALS_KEY);
  return data ? JSON.parse(data) : getSampleProposals();
}

export function saveProposal(proposal: Proposal): void {
  const proposals = getProposals();
  const existing = proposals.findIndex(p => p.id === proposal.id);
  if (existing >= 0) {
    proposals[existing] = proposal;
  } else {
    proposals.unshift(proposal);
  }
  localStorage.setItem(PROPOSALS_KEY, JSON.stringify(proposals));
}

export function deleteProposal(id: string): void {
  const proposals = getProposals().filter(p => p.id !== id);
  localStorage.setItem(PROPOSALS_KEY, JSON.stringify(proposals));
}

export function getProposal(id: string): Proposal | null {
  return getProposals().find(p => p.id === id) || null;
}

export function generateId(): string {
  return `prop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function calcTotals(scopeItems: ScopeItem[]): { totalMaterials: number; totalLabor: number; totalAmount: number } {
  const totalMaterials = scopeItems.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);
  const totalLabor = scopeItems.reduce((sum, item) => sum + item.quantity * item.laborHours * item.laborRate, 0);
  return { totalMaterials, totalLabor, totalAmount: totalMaterials + totalLabor };
}

function getSampleProposals(): Proposal[] {
  const base = {
    userId: 'demo',
    companyName: 'Apex Electrical Services',
    companyPhone: '(555) 234-5678',
    companyEmail: 'info@apexelectrical.com',
    companyAddress: '123 Tradesman Blvd, Austin, TX 78701',
    validityDays: 30,
    notes: '',
    followUpSent: false,
  };

  return [
    {
      ...base,
      id: 'sample_1',
      clientName: 'Riverside Commercial LLC',
      clientEmail: 'pm@riverside.com',
      clientPhone: '(555) 987-6543',
      projectAddress: '4500 Commerce Dr, Austin TX',
      projectTitle: '200A Panel Upgrade + EV Charger Install',
      trade: 'electrical',
      status: 'accepted',
      scopeItems: [
        { id: '1', description: '200A Main Breaker Panel', quantity: 1, unit: 'ea', unitCost: 650, laborHours: 8, laborRate: 95 },
        { id: '2', description: 'Level 2 EV Charger', quantity: 2, unit: 'ea', unitCost: 450, laborHours: 4, laborRate: 95 },
      ],
      totalMaterials: 1550,
      totalLabor: 1520,
      totalAmount: 3070,
      createdAt: new Date(Date.now() - 7 * 24 * 3600000).toISOString(),
      sentAt: new Date(Date.now() - 6 * 24 * 3600000).toISOString(),
    },
    {
      ...base,
      id: 'sample_2',
      clientName: 'Summit Heights HOA',
      clientEmail: 'manager@summitheights.com',
      clientPhone: '(555) 111-2222',
      projectAddress: '77 Summit Ridge, Cedar Park TX',
      projectTitle: 'Outdoor Lighting Circuit — 12 Units',
      trade: 'electrical',
      status: 'sent',
      scopeItems: [
        { id: '1', description: 'Outdoor GFCI Outlets', quantity: 12, unit: 'ea', unitCost: 45, laborHours: 1.5, laborRate: 85 },
        { id: '2', description: '12/2 NM Wire (100ft)', quantity: 4, unit: 'roll', unitCost: 75, laborHours: 1, laborRate: 85 },
      ],
      totalMaterials: 840,
      totalLabor: 1870,
      totalAmount: 2710,
      createdAt: new Date(Date.now() - 3 * 24 * 3600000).toISOString(),
      sentAt: new Date(Date.now() - 2 * 24 * 3600000).toISOString(),
    },
    {
      ...base,
      id: 'sample_3',
      clientName: 'Johnson Residence',
      clientEmail: 'bjohnson@email.com',
      clientPhone: '(555) 333-4444',
      projectAddress: '212 Oak Creek Ln, Round Rock TX',
      projectTitle: 'Whole Home Surge Protection + Smart Panel',
      trade: 'electrical',
      status: 'draft',
      scopeItems: [
        { id: '1', description: 'Whole-Home Surge Protector', quantity: 1, unit: 'ea', unitCost: 350, laborHours: 2, laborRate: 85 },
      ],
      totalMaterials: 350,
      totalLabor: 170,
      totalAmount: 520,
      createdAt: new Date(Date.now() - 1 * 24 * 3600000).toISOString(),
    },
    {
      ...base,
      id: 'sample_4',
      clientName: 'Blue Sky Apartments',
      clientEmail: 'ops@bluesky.com',
      clientPhone: '(555) 555-6666',
      projectAddress: '900 Main St, Austin TX',
      projectTitle: 'Common Area Panel & Meter Upgrade',
      trade: 'electrical',
      status: 'declined',
      scopeItems: [
        { id: '1', description: '400A Commercial Panel', quantity: 1, unit: 'ea', unitCost: 1800, laborHours: 16, laborRate: 105 },
      ],
      totalMaterials: 1800,
      totalLabor: 1680,
      totalAmount: 3480,
      createdAt: new Date(Date.now() - 14 * 24 * 3600000).toISOString(),
      sentAt: new Date(Date.now() - 12 * 24 * 3600000).toISOString(),
    },
  ];
}
