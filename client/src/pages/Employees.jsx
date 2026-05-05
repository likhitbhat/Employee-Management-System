import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { employeeService } from '../services/employeeService';
import DataTable from '../components/common/DataTable';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Employees = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['employees', page, limit, search],
    queryFn: () => employeeService.getEmployees({ page, limit, search }).then(res => res.data),
    keepPreviousData: true,
  });

  if (isError) {
    toast.error(error?.response?.data?.message || 'Failed to load employees');
  }

  const columns = [
    {
      header: 'Employee',
      accessor: 'name',
      sortable: true,
      cell: (row) => (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            {row.avatar ? (
              <img className="h-10 w-10 rounded-full object-cover" src={row.avatar} alt="" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {row.firstName?.charAt(0)}{row.lastName?.charAt(0)}
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{row.firstName} {row.lastName}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Department',
      accessor: 'department',
      cell: (row) => (
        <div className="text-sm text-gray-900">{row.department?.name || 'N/A'}</div>
      ),
    },
    {
      header: 'Designation',
      accessor: 'designation',
      cell: (row) => (
        <div className="text-sm text-gray-900">{row.designation}</div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => {
        const statusColors = {
          Active: 'bg-green-100 text-green-800',
          Inactive: 'bg-gray-100 text-gray-800',
          OnLeave: 'bg-yellow-100 text-yellow-800',
          Terminated: 'bg-red-100 text-red-800'
        };
        return (
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[row.status] || statusColors.Inactive}`}>
            {row.status}
          </span>
        );
      },
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <button className="text-gray-400 hover:text-primary transition-colors" title="View Details">
            <Eye size={18} />
          </button>
          <button className="text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
            <Edit2 size={18} />
          </button>
          <button className="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees Directory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your team members and their information.</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        searchQuery={search}
        onSearchChange={setSearch}
        pagination={{
          page,
          limit,
          total: data?.pagination?.total || 0,
        }}
        onPageChange={setPage}
        actions={
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <Plus size={18} />
            <span className="hidden sm:inline">Add Employee</span>
          </button>
        }
      />
    </div>
  );
};

export default Employees;
