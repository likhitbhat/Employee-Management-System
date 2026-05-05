import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, Users, CalendarDays, DollarSign, 
  Target, UserPlus, FileText, BarChart2, Settings, 
  LogOut, Menu, X, Bell 
} from 'lucide-react';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard, roles: ['super_admin', 'hr_manager', 'manager', 'employee'] },
    { name: 'Employees', href: '/employees', icon: Users, roles: ['super_admin', 'hr_manager', 'manager'] },
    { name: 'Attendance', href: '/attendance', icon: CalendarDays, roles: ['super_admin', 'hr_manager', 'manager', 'employee'] },
    { name: 'Leaves', href: '/leaves', icon: CalendarDays, roles: ['super_admin', 'hr_manager', 'manager', 'employee'] },
    { name: 'Payroll', href: '/payroll', icon: DollarSign, roles: ['super_admin', 'hr_manager', 'employee'] },
    { name: 'Performance', href: '/performance', icon: Target, roles: ['super_admin', 'hr_manager', 'manager', 'employee'] },
    { name: 'Recruitment', href: '/recruitment', icon: UserPlus, roles: ['super_admin', 'hr_manager'] },
    { name: 'Documents', href: '/documents', icon: FileText, roles: ['super_admin', 'hr_manager', 'employee'] },
    { name: 'Reports', href: '/reports', icon: BarChart2, roles: ['super_admin', 'hr_manager'] },
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['super_admin', 'hr_manager'] },
  ].filter(item => item.roles.includes(user?.role || 'employee'));

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-surface flex overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-primary text-white">
          <span className="text-xl font-bold">EMS Pro</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>
        
        <div className="h-full overflow-y-auto p-4 pb-20">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`) && item.href !== '/';
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-10 h-16 flex-shrink-0 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar} 
              className="p-2 mr-4 text-gray-500 rounded-md hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
              {navigation.find(item => location.pathname === item.href || (location.pathname.startsWith(`${item.href}/`) && item.href !== '/'))?.name || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell size={20} />
            </button>
            <div className="relative flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium text-gray-700">{user?.firstName} {user?.lastName}</span>
                <span className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold cursor-pointer">
                {user?.firstName?.charAt(0) || 'U'}
              </div>
              <button onClick={logout} className="ml-2 text-gray-500 hover:text-red-600" title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-surface p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
