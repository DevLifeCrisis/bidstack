# BidStack 🔨

**Professional bid proposals for specialty subcontractors — built in minutes, not hours.**

BidStack helps electricians, plumbers, HVAC technicians, and painters write polished, client-ready proposals in under 10 minutes. Stop losing jobs because your bids look like they were written in a Word doc.

## Live Demo
🌐 [bidstack.vercel.app](https://bidstack.vercel.app)

## Features

- **AI Proposal Writer** — Enter project details, get a professional client-facing proposal instantly
- **Trade-Specific Scope Library** — Pre-built templates for electrical, plumbing, HVAC, and painting with 2024-2026 pricing benchmarks
- **Material Cost Estimator** — Line-item builder with material + labor cost breakdown
- **Win/Loss Tracker** — Dashboard analytics showing close rate and average deal size
- **Follow-Up Automation** — Auto check-in emails 3 days after proposal delivery
- **PDF Export** — Print-ready proposals with your company branding

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Backend/Auth | Supabase |
| AI | OpenAI GPT-4o |
| Deployment | Vercel |
| Payments | Stripe |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repo
git clone https://github.com/DevLifeCrisis/bidstack.git
cd bidstack

# Install dependencies
npm install

# Copy env vars
cp .env.example .env.local
# Edit .env.local with your Supabase and OpenAI keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `OPENAI_API_KEY` | OpenAI API key for proposal generation |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL |

## Project Structure

```
bidstack/
├── app/
│   ├── page.tsx              # Landing page
│   ├── login/page.tsx        # Login
│   ├── signup/page.tsx       # Signup
│   ├── demo/page.tsx         # Sample proposal demo
│   └── dashboard/
│       ├── page.tsx          # Main dashboard
│       ├── proposals/
│       │   ├── page.tsx      # Proposal list
│       │   ├── new/page.tsx  # Proposal builder (3-step)
│       │   └── [id]/page.tsx # Proposal detail
│       ├── scope-library/
│       │   └── page.tsx      # Template library
│       └── settings/
│           └── page.tsx      # Account settings
├── components/
│   └── DashboardLayout.tsx   # Sidebar layout
├── lib/
│   ├── scope-templates.ts    # 10 trade-specific templates
│   ├── ai-proposal.ts        # Proposal text generator
│   └── storage.ts            # LocalStorage persistence layer
└── types/
    └── index.ts              # TypeScript types
```

## Pricing

| Plan | Price | Features |
|------|-------|----------|
| Monthly | $49/mo | Unlimited proposals, all features |
| Annual | $39/mo ($470/yr) | Save 20%, priority support |
| White Label | $199/mo | Custom domain, resell to members |

## Roadmap

- [ ] Supabase cloud persistence (replace localStorage)
- [ ] Stripe payment integration
- [ ] OpenAI API integration for AI-enhanced proposals
- [ ] Follow-up email automation (SendGrid)
- [ ] Material pricing API sync
- [ ] Mobile app (React Native)
- [ ] QuickBooks export

## Target Market

Specialty subcontractors writing 10-50 bids/month:
- Electricians
- Plumbers
- HVAC technicians
- Painters
- General specialty trades

## Go-To-Market

- Facebook groups for trades
- YouTube trades creators
- Trade associations
- Reddit r/electricians, r/Plumbing, etc.

## License

MIT

---

Built with ❤️ for the trades.
