import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Files, 
  History, 
  PieChart, 
  Settings,
  Bell,
  Search,
  UserCircle,
  ShieldAlert,
  UserCog
} from 'lucide-react';
import clsx from 'clsx';

export default function OfficerLayout() {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/officer/dashboard' },
    { icon: Files, label: 'Tender Submissions', path: '#' },
    { icon: History, label: 'Verification History', path: '#' },
    { icon: PieChart, label: 'Reports', path: '/officer/report' },
    { icon: Settings, label: 'Settings', path: '#' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-teal-400">GeM</span>DocVerify
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 w-fit mt-1">
              ADMIN PORTAL
            </span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2">
          <Link to="/officer/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-white/10 text-white">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-white/5 hover:text-white transition-colors w-full text-left">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center">
              <UserCog className="w-4 h-4 text-slate-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">System Admin</p>
              <p className="text-xs text-slate-400">Security Team</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
          <div className="flex items-center w-96 relative">
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search bidders, IDs..." 
              className="w-full pl-10 pr-4 py-2 rounded-md bg-slate-100 border-transparent focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-sm transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <UserCircle className="w-6 h-6" />
              <span className="text-sm font-medium">Profile</span>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-slate-50 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
