import { ScopeTemplate } from '@/types';

export const SCOPE_TEMPLATES: ScopeTemplate[] = [
  // ELECTRICAL
  {
    id: 'elec-panel-upgrade',
    trade: 'electrical',
    name: '200A Panel Upgrade',
    description: 'Residential electrical panel upgrade to 200A service',
    items: [
      { description: '200A Main Breaker Panel', quantity: 1, unit: 'ea', unitCost: 650, laborHours: 8, laborRate: 95 },
      { description: '200A Meter Base', quantity: 1, unit: 'ea', unitCost: 120, laborHours: 2, laborRate: 95 },
      { description: '2/0 Aluminum Service Wire (per 10ft)', quantity: 3, unit: 'lot', unitCost: 85, laborHours: 1, laborRate: 95 },
      { description: 'Permit & Inspection Fee', quantity: 1, unit: 'ea', unitCost: 250, laborHours: 2, laborRate: 95 },
      { description: 'Misc. hardware & connectors', quantity: 1, unit: 'lot', unitCost: 75, laborHours: 0, laborRate: 0 },
    ],
  },
  {
    id: 'elec-rough-in',
    trade: 'electrical',
    name: 'Residential Rough-In (New Construction)',
    description: 'New construction electrical rough-in wiring',
    items: [
      { description: '14/2 NM Wire (per 100ft)', quantity: 5, unit: 'roll', unitCost: 55, laborHours: 3, laborRate: 85 },
      { description: '12/2 NM Wire (per 100ft)', quantity: 3, unit: 'roll', unitCost: 75, laborHours: 2, laborRate: 85 },
      { description: 'Single Pole Breakers', quantity: 20, unit: 'ea', unitCost: 8, laborHours: 0.25, laborRate: 85 },
      { description: 'Double Pole Breakers', quantity: 4, unit: 'ea', unitCost: 18, laborHours: 0.25, laborRate: 85 },
      { description: 'Outlet/Switch Boxes', quantity: 40, unit: 'ea', unitCost: 3, laborHours: 0.15, laborRate: 85 },
    ],
  },
  {
    id: 'elec-ev-charger',
    trade: 'electrical',
    name: 'EV Charger Installation',
    description: 'Level 2 EV charger installation (48A / 240V)',
    items: [
      { description: 'Level 2 EV Charger (hardwired)', quantity: 1, unit: 'ea', unitCost: 450, laborHours: 4, laborRate: 95 },
      { description: '6/3 NM Cable (per 50ft run)', quantity: 1, unit: 'lot', unitCost: 120, laborHours: 1, laborRate: 95 },
      { description: '50A Double Pole Breaker', quantity: 1, unit: 'ea', unitCost: 25, laborHours: 0.5, laborRate: 95 },
      { description: 'Permit & Inspection', quantity: 1, unit: 'ea', unitCost: 150, laborHours: 1.5, laborRate: 95 },
    ],
  },
  // PLUMBING
  {
    id: 'plumb-water-heater',
    trade: 'plumbing',
    name: 'Water Heater Replacement',
    description: 'Standard 50-gallon gas water heater swap',
    items: [
      { description: '50-Gal Natural Gas Water Heater', quantity: 1, unit: 'ea', unitCost: 780, laborHours: 3, laborRate: 95 },
      { description: 'Gas Flex Connector', quantity: 1, unit: 'ea', unitCost: 25, laborHours: 0.25, laborRate: 95 },
      { description: 'T&P Relief Valve', quantity: 1, unit: 'ea', unitCost: 35, laborHours: 0.25, laborRate: 95 },
      { description: 'Supply/Return Connections (flex)', quantity: 1, unit: 'set', unitCost: 45, laborHours: 0.5, laborRate: 95 },
      { description: 'Haul away & disposal', quantity: 1, unit: 'ea', unitCost: 50, laborHours: 0.5, laborRate: 0 },
    ],
  },
  {
    id: 'plumb-rough-in',
    trade: 'plumbing',
    name: 'Bathroom Rough-In (New)',
    description: 'New bathroom rough-in including DWV and supply',
    items: [
      { description: '3" PVC Drain Line (per 10ft)', quantity: 5, unit: 'section', unitCost: 28, laborHours: 1, laborRate: 90 },
      { description: '1.5" Vent Pipe (per 10ft)', quantity: 3, unit: 'section', unitCost: 18, laborHours: 0.75, laborRate: 90 },
      { description: '1/2" PEX Hot/Cold Supply', quantity: 1, unit: 'lot', unitCost: 120, laborHours: 4, laborRate: 90 },
      { description: 'Wax ring, flange, closet bolts', quantity: 1, unit: 'set', unitCost: 45, laborHours: 0.5, laborRate: 90 },
      { description: 'Misc. fittings & hangers', quantity: 1, unit: 'lot', unitCost: 85, laborHours: 0, laborRate: 0 },
    ],
  },
  // HVAC
  {
    id: 'hvac-system-replace',
    trade: 'hvac',
    name: 'Central AC System Replacement (3-ton)',
    description: 'Full residential central A/C system replacement',
    items: [
      { description: '3-Ton Condenser Unit', quantity: 1, unit: 'ea', unitCost: 2800, laborHours: 6, laborRate: 95 },
      { description: 'Air Handler / Coil', quantity: 1, unit: 'ea', unitCost: 1200, laborHours: 4, laborRate: 95 },
      { description: 'Refrigerant (R-410A per lb)', quantity: 10, unit: 'lb', unitCost: 35, laborHours: 0, laborRate: 0 },
      { description: 'Line Set (per 25ft)', quantity: 1, unit: 'set', unitCost: 180, laborHours: 2, laborRate: 95 },
      { description: 'Disconnect Box & Whip', quantity: 1, unit: 'ea', unitCost: 95, laborHours: 1, laborRate: 95 },
      { description: 'Thermostat (programmable)', quantity: 1, unit: 'ea', unitCost: 150, laborHours: 0.5, laborRate: 95 },
      { description: 'Permit & Start-up', quantity: 1, unit: 'ea', unitCost: 200, laborHours: 1, laborRate: 95 },
    ],
  },
  {
    id: 'hvac-mini-split',
    trade: 'hvac',
    name: 'Mini-Split Installation (1-zone)',
    description: 'Single-zone ductless mini-split install',
    items: [
      { description: '12,000 BTU Mini-Split System', quantity: 1, unit: 'ea', unitCost: 1400, laborHours: 6, laborRate: 90 },
      { description: 'Line Set Kit (25ft)', quantity: 1, unit: 'ea', unitCost: 120, laborHours: 1, laborRate: 90 },
      { description: 'Wall sleeve / through-wall kit', quantity: 1, unit: 'ea', unitCost: 65, laborHours: 0.5, laborRate: 90 },
      { description: 'Concrete pad / wall mount', quantity: 1, unit: 'ea', unitCost: 55, laborHours: 0.5, laborRate: 90 },
    ],
  },
  // PAINTING
  {
    id: 'paint-interior',
    trade: 'painting',
    name: 'Interior Repaint (2,000 sqft)',
    description: 'Full interior repaint — walls and ceilings',
    items: [
      { description: 'Premium Interior Paint (per gallon)', quantity: 12, unit: 'gal', unitCost: 55, laborHours: 0, laborRate: 0 },
      { description: 'Primer (per gallon)', quantity: 4, unit: 'gal', unitCost: 38, laborHours: 0, laborRate: 0 },
      { description: 'Labor — Wall prep & painting', quantity: 2000, unit: 'sqft', unitCost: 0, laborHours: 0.025, laborRate: 55 },
      { description: 'Labor — Ceiling painting', quantity: 2000, unit: 'sqft', unitCost: 0, laborHours: 0.015, laborRate: 55 },
      { description: 'Supplies (tape, drop cloths, brushes)', quantity: 1, unit: 'lot', unitCost: 85, laborHours: 0, laborRate: 0 },
    ],
  },
  {
    id: 'paint-exterior',
    trade: 'painting',
    name: 'Exterior Full Paint',
    description: 'Complete exterior house repaint (1,500 sqft)',
    items: [
      { description: 'Exterior Paint (per gallon)', quantity: 10, unit: 'gal', unitCost: 65, laborHours: 0, laborRate: 0 },
      { description: 'Primer (per gallon)', quantity: 4, unit: 'gal', unitCost: 42, laborHours: 0, laborRate: 0 },
      { description: 'Power wash & surface prep', quantity: 1, unit: 'lot', unitCost: 0, laborHours: 8, laborRate: 60 },
      { description: 'Labor — Exterior painting', quantity: 1500, unit: 'sqft', unitCost: 0, laborHours: 0.035, laborRate: 60 },
      { description: 'Caulk, putty, repair materials', quantity: 1, unit: 'lot', unitCost: 95, laborHours: 2, laborRate: 60 },
    ],
  },
  {
    id: 'paint-cabinets',
    trade: 'painting',
    name: 'Cabinet Refinishing (Kitchen)',
    description: 'Kitchen cabinet doors and boxes refinish',
    items: [
      { description: 'Cabinet Paint (per quart)', quantity: 4, unit: 'qt', unitCost: 55, laborHours: 0, laborRate: 0 },
      { description: 'Cabinet Primer', quantity: 2, unit: 'qt', unitCost: 40, laborHours: 0, laborRate: 0 },
      { description: 'Labor — Remove, sand, prime', quantity: 30, unit: 'doors', unitCost: 0, laborHours: 0.75, laborRate: 65 },
      { description: 'Labor — Paint & reinstall', quantity: 30, unit: 'doors', unitCost: 0, laborHours: 0.5, laborRate: 65 },
      { description: 'Sandpaper, tack cloth, supplies', quantity: 1, unit: 'lot', unitCost: 65, laborHours: 0, laborRate: 0 },
    ],
  },
];

export const TRADE_LABELS: Record<string, string> = {
  electrical: 'Electrical',
  plumbing: 'Plumbing',
  hvac: 'HVAC',
  painting: 'Painting',
};

export const TRADE_COLORS: Record<string, string> = {
  electrical: '#f59e0b',
  plumbing: '#3b82f6',
  hvac: '#06b6d4',
  painting: '#8b5cf6',
};
