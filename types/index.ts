export type TradeType = 'electrical' | 'plumbing' | 'hvac' | 'painting';

export type ProposalStatus = 'draft' | 'sent' | 'accepted' | 'declined';

export interface ScopeItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitCost: number;
  laborHours: number;
  laborRate: number;
}

export interface Proposal {
  id: string;
  userId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  projectAddress: string;
  projectTitle: string;
  trade: TradeType;
  status: ProposalStatus;
  scopeItems: ScopeItem[];
  notes: string;
  validityDays: number;
  totalMaterials: number;
  totalLabor: number;
  totalAmount: number;
  createdAt: string;
  sentAt?: string;
  followUpSent?: boolean;
  companyName: string;
  companyLogo?: string;
  companyPhone: string;
  companyEmail: string;
  companyAddress: string;
  aiProposalText?: string;
}

export interface ScopeTemplate {
  id: string;
  trade: TradeType;
  name: string;
  description: string;
  items: Omit<ScopeItem, 'id'>[];
}

export interface WinStats {
  total: number;
  accepted: number;
  declined: number;
  draft: number;
  sent: number;
  winRate: number;
  avgDealSize: number;
}
