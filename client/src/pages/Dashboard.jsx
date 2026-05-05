import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { reportService } from '../services/reportService';
import { employeeService } from '../services/employeeService';
import { CardSkeleton } from '../components/common/Skeleton';
import { Users, TrendingUp, CheckCircle, Clock } from 'lucide-react';

const StatCard = ({ title, value, subtitle, icon: Icon, colorClass, loading }) => {
  if (loading) return <CardSkeleton />;
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
        {subtitle && <p className="text-sm mt-2 text-gray-600">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === 'super_admin' || user?.role === 'hr_manager';

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['employeeStats'],
    queryFn: () => employeeService.getStats().then(res => res.data.data),
    enabled: isAdmin
  });

  const { data: attendanceData, isLoading: attLoading } = useQuery({
    queryKey: ['attendanceSummary'],
    queryFn: () => reportService.getAttendanceSummary({ date: new Date().toISOString().split('T')[0] }).then(res => res.data.data),
    enabled: isAdmin
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {user?.firstName || user?.email}</p>
        </div>
        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {isAdmin ? (
        <>
          {/* Admin KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Employees" 
              value={statsData?.total || 0} 
              subtitle={<span className="text-green-600 font-medium">{statsData?.active || 0} active</span>}
              icon={Users}
              colorClass="bg-blue-50 text-blue-600"
              loading={statsLoading}
            />
            <StatCard 
              title="Present Today" 
              value={attendanceData?.presentCount || 0} 
              subtitle="Checked in"
              icon={CheckCircle}
              colorClass="bg-green-50 text-green-600"
              loading={attLoading}
            />
            <StatCard 
              title="On Leave" 
              value={attendanceData?.leaveCount || 0} 
              subtitle="Approved leaves"
              icon={Clock}
              colorClass="bg-yellow-50 text-yellow-600"
              loading={attLoading}
            />
            <StatCard 
              title="Late Arrivals" 
              value={attendanceData?.lateCount || 0} 
              subtitle="After 9:00 AM"
              icon={TrendingUp}
              colorClass="bg-red-50 text-red-600"
              loading={attLoading}
            />
          </div>

          {/* Admin Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Company Headcount Trend</h2>
              <div className="flex items-center justify-center h-64 text-gray-400">
                Chart integration placeholder
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Announcements</h2>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <p className="font-medium text-sm text-gray-800">System Maintenance scheduled</p>
                    <p className="text-xs text-gray-500 mt-1">Tomorrow at 2:00 AM</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Employee KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="My Attendance" 
              value="98%" 
              subtitle="This month"
              icon={CheckCircle}
              colorClass="bg-green-50 text-green-600"
              loading={false}
            />
            <StatCard 
              title="Leaves Available" 
              value="12" 
              subtitle="Annual leave balance"
              icon={Clock}
              colorClass="bg-blue-50 text-blue-600"
              loading={false}
            />
            <StatCard 
              title="Upcoming Holidays" 
              value="2" 
              subtitle="Next 30 days"
              icon={Users}
              colorClass="bg-purple-50 text-purple-600"
              loading={false}
            />
            <StatCard 
              title="Performance Score" 
              value="4.8/5" 
              subtitle="Last review"
              icon={TrendingUp}
              colorClass="bg-yellow-50 text-yellow-600"
              loading={false}
            />
          </div>

          {/* Employee Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">My Recent Activity</h2>
              <div className="flex items-center justify-center h-64 text-gray-400">
                Activity timeline placeholder
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Announcements</h2>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <p className="font-medium text-sm text-gray-800">Company Townhall Meeting</p>
                    <p className="text-xs text-gray-500 mt-1">Next Friday at 10:00 AM</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
