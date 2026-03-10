import { UserProfile } from './storage';

// Admin account — seeded on every build
export const ADMIN_EMAIL = 'MrNorthbound@gmail.com';
export const ADMIN_PASSWORD = 'Jade@12!';

export const ADMIN_PROFILE: UserProfile = {
  id: 'admin_mrnorthbound',
  email: ADMIN_EMAIL,
  name: 'Jon',
  companyName: 'Northbound',
  companyPhone: '',
  companyEmail: ADMIN_EMAIL,
  companyAddress: '',
  trade: 'electrical',
  plan: 'admin',
};

export function isAdminCredentials(email: string, password: string): boolean {
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD;
}
