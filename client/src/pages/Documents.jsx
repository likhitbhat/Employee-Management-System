import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { documentService } from '../services/systemServices';
import DataTable from '../components/common/DataTable';
import { FileText, Download, Trash2, Upload } from 'lucide-react';
import { format } from 'date-fns';

const Documents = () => {
  const { data: docs, isLoading } = useQuery({
    queryKey: ['myDocuments'],
    queryFn: () => documentService.getMyDocuments({ limit: 50 }).then(res => res.data),
  });

  const columns = [
    {
      header: 'Document Name',
      accessor: 'title',
      cell: (row) => (
        <div className="flex items-center">
          <FileText className="text-gray-400 mr-3" size={20} />
          <div>
            <div className="text-sm font-medium text-gray-900">{row.title}</div>
            <div className="text-xs text-gray-500">{row.type}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Uploaded On',
      accessor: 'createdAt',
      cell: (row) => <span className="text-sm text-gray-500">{format(new Date(row.createdAt), 'MMM dd, yyyy')}</span>
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <a href={row.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors" title="Download">
            <Download size={18} />
          </a>
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
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your professional documents and policies.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          <Upload size={18} />
          <span>Upload Document</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={docs?.data || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Documents;
