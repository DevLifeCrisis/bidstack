"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, FileText, BookOpen, Settings, LogOut, 
  Wrench, Plus, ChevronDown, User
} from "lucide-react";
import { useState, useEffect } from "react";
import { getUser, clearUser, UserProfile } from "@/lib/storage";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/proposals", label: "Proposals", icon: FileText },
  { href: "/dashboard/scope-library", label: "Scope Library", icon: BookOpen },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) {
      router.push("/login");
    } else {
      setUser(u);
    }
  }, [router]);

  const handleLogout = () => {
    clearUser();
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0a0a0b' }}>
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 flex flex-col" style={{ borderRight: '1px solid #27272a', background: '#0d0d0f' }}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5" style={{ borderBottom: '1px solid #27272a' }}>
          <div style={{ background: '#f97316', borderRadius: 8, padding: '6px 8px' }}>
            <Wrench size={16} color="white" />
          </div>
          <span className="text-lg font-bold text-white">BidStack</span>
        </div>

        {/* New Proposal button */}
        <div className="px-4 py-4">
          <Link href="/dashboard/proposals/new" className="btn-primary w-full justify-center text-sm">
            <Plus size={15} />
            New Proposal
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} className={`sidebar-link ${isActive ? 'active' : ''}`}>
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-3 pb-4" style={{ borderTop: '1px solid #27272a', paddingTop: 12 }}>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="sidebar-link w-full justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#f97316', color: 'white' }}>
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="text-left">
                <div className="text-xs font-medium text-white">{user.name || 'User'}</div>
                <div className="text-xs text-zinc-500">{user.plan === 'annual' ? 'Annual Plan' : 'Pro Plan'}</div>
              </div>
            </div>
            <ChevronDown size={14} />
          </button>
          {menuOpen && (
            <div className="mt-1 card overflow-hidden">
              <Link href="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                <User size={12} /> Account Settings
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors w-full">
                <LogOut size={12} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
