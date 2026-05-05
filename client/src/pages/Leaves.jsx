import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { leaveService } from '../services/leaveService';
import DataTable from '../components/common/DataTable';
import { format } from 'date-fns';
import { CardSkeleton } from '../components/common/Skeleton';
import { Calendar, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';

const LeaveBalanceCard = ({ title, used, total, loading }) => {
  if (loading) return <CardSkeleton />;
  
  const percentage = Math.min((used / total) * 100, 100);
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <Calendar size={18} className="text-primary" />
      </div>
      <div className="flex items-end gap-2 mb-4">
        <span className="text-3xl font-bold text-gray-800">{total - used}</span>
        <span className="text-sm text-gray-500 mb-1">remaining of {total}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const Leaves = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  const { data: balance, isLoading: balanceLoading } = useQuery({
    queryKey: ['leaveBalance'],
    queryFn: () => leaveService.getLeaveBalance().then(res => res.data.data),
  });

  const { data: leaves, isLoading: leavesLoading } = useQuery({
    queryKey: ['myLeaves', page, statusFilter],
    queryFn: () => leaveService.getMyLeaves({ page, limit: 10, status: statusFilter }).then(res => res.data),
    keepPreviousData: true,
  });

  const columns = [
    {
      header: 'Type',
      accessor: 'type',
      cell: (row) => <span className="font-medium text-gray-900">{row.type}</span>
    },
    {
      header: 'Duration',
      accessor: 'duration',
      cell: (row) => (
        <div className="text-sm">
          <div>{format(new Date(row.startDate), 'MMM dd, yyyy')} - {format(new Date(row.endDate), 'MMM dd, yyyy')}</div>
          <div className="text-gray-500">{row.totalDays} day(s)</div>
        </div>
      )
    },
    {
      header: 'Reason',
      accessor: 'reason',
      cell: (row) => <span className="text-sm text-gray-600 line-clamp-1">{row.reason}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => {
        const styles = {
          Pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
          Approved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
          Rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
          Cancelled: { bg: 'bg-gray-100', text: 'text-gray-800', icon: XCircle }
        };
        const config = styles[row.status] || styles.Pending;
        const Icon = config.icon;
        
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
            <Icon size={12} />
            {row.status}
          </span>
        );
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leaves Management</h1>
          <p className="text-sm text-gray-500 mt-1">Track your leave balances and request time off.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          <Plus size={18} />
          <span>Apply Leave</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LeaveBalanceCard 
          title="Annual Leave" 
          used={balance?.Annual?.used || 0} 
          total={balance?.Annual?.total || 20} 
          loading={balanceLoading} 
        />
        <LeaveBalanceCard 
          title="Sick Leave" 
          used={balance?.Sick?.used || 0} 
          total={balance?.Sick?.total || 10} 
          loading={balanceLoading} 
        />
        <LeaveBalanceCard 
          title="Personal Leave" 
          used={balance?.Personal?.used || 0} 
          total={balance?.Personal?.total || 5} 
          loading={balanceLoading} 
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Leave History</h3>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <DataTable
          columns={columns}
          data={leaves?.data || []}
          isLoading={leavesLoading}
          pagination={{ page, limit: 10, total: leaves?.pagination?.total || 0 }}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Leaves;
