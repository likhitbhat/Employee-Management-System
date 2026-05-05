import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { payrollService } from '../services/payrollService';
import DataTable from '../components/common/DataTable';
import { CardSkeleton } from '../components/common/Skeleton';
import { DollarSign, Download, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SummaryCard = ({ title, value, icon: Icon, loading }) => {
  if (loading) return <CardSkeleton />;
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className="p-3 bg-primary/10 text-primary rounded-lg">
        <Icon size={24} />
      </div>
    </div>
  );
};

const Payroll = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  
  // Example for an admin showing all payroll vs employee seeing their payslips
  const isAdmin = user?.role === 'super_admin' || user?.role === 'hr_manager' || user?.role === 'finance_manager';

  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['payrollSummary'],
    queryFn: () => payrollService.getSummary().then(res => res.data.data),
    enabled: isAdmin,
  });

  const { data: records, isLoading: recordsLoading } = useQuery({
    queryKey: isAdmin ? ['payrollRecords', page] : ['myPayslips', page],
    queryFn: () => isAdmin 
      ? payrollService.getPayrollRecords({ page, limit: 10 }).then(res => res.data)
      : payrollService.getMyPayslips({ page, limit: 10 }).then(res => res.data),
    keepPreviousData: true,
  });

  const handleDownload = async (id) => {
    try {
      const response = await payrollService.generatePayslip(id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `payslip-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to download payslip', error);
    }
  };

  const adminColumns = [
    {
      header: 'Employee',
      accessor: 'employee',
      cell: (row) => (
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{row.employee?.firstName} {row.employee?.lastName}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Month/Year',
      accessor: 'period',
      cell: (row) => <span className="text-sm text-gray-900">{row.month}/{row.year}</span>
    },
    {
      header: 'Net Pay',
      accessor: 'netPay',
      cell: (row) => <span className="text-sm font-medium text-gray-900">${row.netPay?.toLocaleString()}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => {
        const isPaid = row.paymentStatus === 'Paid';
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {isPaid ? <CheckCircle size={12} /> : <Clock size={12} />}
            {row.paymentStatus}
          </span>
        );
      }
    },
    {
      header: 'Actions',
      cell: (row) => (
        <button 
          onClick={() => handleDownload(row._id || row.id)}
          className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
        >
          <Download size={18} />
          <span className="text-xs">PDF</span>
        </button>
      )
    }
  ];

  const employeeColumns = [
    {
      header: 'Month/Year',
      accessor: 'period',
      cell: (row) => <span className="text-sm text-gray-900">{row.month}/{row.year}</span>
    },
    {
      header: 'Basic Salary',
      accessor: 'basicSalary',
      cell: (row) => <span className="text-sm text-gray-500">${row.basicSalary?.toLocaleString()}</span>
    },
    {
      header: 'Net Pay',
      accessor: 'netPay',
      cell: (row) => <span className="text-sm font-medium text-gray-900">${row.netPay?.toLocaleString()}</span>
    },
    {
      header: 'Actions',
      cell: (row) => (
        <button 
          onClick={() => handleDownload(row._id || row.id)}
          className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-lg"
        >
          <Download size={16} />
          <span className="text-sm font-medium">Download</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll</h1>
          <p className="text-sm text-gray-500 mt-1">
            {isAdmin ? 'Manage employee salaries and process payroll.' : 'View and download your payslips.'}
          </p>
        </div>
        {isAdmin && (
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <DollarSign size={18} />
            <span>Process Payroll</span>
          </button>
        )}
      </div>

      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Total Payroll" value={`$${summary?.totalPayroll?.toLocaleString() || 0}`} icon={DollarSign} loading={summaryLoading} />
          <SummaryCard title="Paid Amount" value={`$${summary?.paidAmount?.toLocaleString() || 0}`} icon={CheckCircle} loading={summaryLoading} />
          <SummaryCard title="Pending Amount" value={`$${summary?.pendingAmount?.toLocaleString() || 0}`} icon={Clock} loading={summaryLoading} />
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{isAdmin ? 'Recent Payrolls' : 'My Payslips'}</h3>
        <DataTable
          columns={isAdmin ? adminColumns : employeeColumns}
          data={records?.data || []}
          isLoading={recordsLoading}
          pagination={{ page, limit: 10, total: records?.pagination?.total || 0 }}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Payroll;
