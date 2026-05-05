import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { attendanceService } from '../services/attendanceService';
import DataTable from '../components/common/DataTable';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { Clock, MapPin, Search } from 'lucide-react';

const Attendance = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  // Fetch today's status
  const { data: todayStatus, isLoading: todayLoading } = useQuery({
    queryKey: ['attendanceToday'],
    queryFn: () => attendanceService.getToday().then(res => res.data.data),
  });

  // Fetch attendance history
  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ['attendanceHistory', page, search],
    queryFn: () => attendanceService.getMyAttendance({ page, limit: 10, search }).then(res => res.data),
    keepPreviousData: true,
  });

  const clockInMutation = useMutation({
    mutationFn: () => attendanceService.clockIn({ ipAddress: '192.168.1.1', device: 'Web Browser' }),
    onSuccess: () => {
      toast.success('Successfully clocked in');
      queryClient.invalidateQueries(['attendanceToday']);
      queryClient.invalidateQueries(['attendanceHistory']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to clock in'),
  });

  const clockOutMutation = useMutation({
    mutationFn: () => attendanceService.clockOut({ ipAddress: '192.168.1.1', device: 'Web Browser' }),
    onSuccess: () => {
      toast.success('Successfully clocked out');
      queryClient.invalidateQueries(['attendanceToday']);
      queryClient.invalidateQueries(['attendanceHistory']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to clock out'),
  });

  const isClockedIn = todayStatus && !todayStatus.clockOut;

  const columns = [
    {
      header: 'Date',
      accessor: 'date',
      cell: (row) => format(new Date(row.date), 'MMM dd, yyyy')
    },
    {
      header: 'Clock In',
      accessor: 'clockIn',
      cell: (row) => row.clockIn ? format(new Date(row.clockIn), 'hh:mm a') : '--:--'
    },
    {
      header: 'Clock Out',
      accessor: 'clockOut',
      cell: (row) => row.clockOut ? format(new Date(row.clockOut), 'hh:mm a') : '--:--'
    },
    {
      header: 'Work Hours',
      accessor: 'workHours',
      cell: (row) => row.workHours ? `${row.workHours.toFixed(2)} hrs` : '-'
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => {
        const colors = {
          Present: 'bg-green-100 text-green-800',
          Absent: 'bg-red-100 text-red-800',
          HalfDay: 'bg-yellow-100 text-yellow-800',
          Late: 'bg-orange-100 text-orange-800'
        };
        return (
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[row.status] || 'bg-gray-100 text-gray-800'}`}>
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
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="text-sm text-gray-500 mt-1">Track your daily work hours and status.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <Clock size={32} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Current Status</h2>
            {todayLoading ? (
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mt-2" />
            ) : (
              <p className="text-sm text-gray-500">
                {isClockedIn 
                  ? `Clocked in at ${format(new Date(todayStatus.clockIn), 'hh:mm a')}` 
                  : todayStatus?.clockOut 
                    ? `Clocked out at ${format(new Date(todayStatus.clockOut), 'hh:mm a')}`
                    : 'Not clocked in yet'}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex gap-4">
          {!isClockedIn ? (
            <button 
              onClick={() => clockInMutation.mutate()}
              disabled={clockInMutation.isPending || (todayStatus && todayStatus.clockOut)}
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Clock In
            </button>
          ) : (
            <button 
              onClick={() => clockOutMutation.mutate()}
              disabled={clockOutMutation.isPending}
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              Clock Out
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">My History</h3>
        <DataTable
          columns={columns}
          data={history?.data || []}
          isLoading={historyLoading}
          pagination={{ page, limit: 10, total: history?.pagination?.total || 0 }}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Attendance;
