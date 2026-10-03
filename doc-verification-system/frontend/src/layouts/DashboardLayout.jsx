import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Files, 
  FilePlus, 
  History, 
  PieChart, 
  Settings,
  Bell,
  Search,
  UserCircle
} from 'lucide-react';
import clsx from 'clsx';

export default function DashboardLayout() {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Files, label: 'Documents', path: '#' },
    { icon: FilePlus, label: 'New Verification', path: '/upload' },
    { icon: History, label: 'Verification History', path: '#' },
    { icon: PieChart, label: 'Reports', path: '/report' },
    { icon: Settings, label: 'Settings', path: '#' },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800">
        <div className="p-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-teal-400">Doc</span>Verify<span className="text-blue-400">AI</span>
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 w-fit">
              DEMO PROTOTYPE
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path) && item.path !== '#';
            return (
              <Link
                key={item.label}
                to={item.path}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-teal-500/10 text-teal-400" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <span className="text-sm font-medium text-white">OP</span>
            </div>
            <div>
              <p className="font-medium text-white">Officer Portal</p>
              <p className="text-xs text-slate-400">Gov Dept ID: 8932</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
          <div className="flex items-center w-96 relative">
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search documents, IDs..." 
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

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
