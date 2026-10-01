import React, { useState, useEffect } from 'react';
import { electionService } from '../../services/electionService';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import SearchBar from '../../components/common/SearchBar';
import { formatDate } from '../../utils/formatters';
import { Plus, Edit, Trash2, Eye, Vote } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminElections = () => {
  const { addToast } = useToast();
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    type: 'Central',
    description: '',
    startDate: '',
    endDate: '',
    status: 'upcoming'
  });

  const fetchElections = async () => {
    setLoading(true);
    try {
      const data = await electionService.getAll();
      setElections(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      type: 'Central',
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 864000000).toISOString().split('T')[0],
      status: 'upcoming'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (el) => {
    setEditingId(el.id);
    setFormData({
      name: el.name,
      type: el.type,
      description: el.description,
      startDate: el.startDate ? el.startDate.split('T')[0] : '',
      endDate: el.endDate ? el.endDate.split('T')[0] : '',
      status: el.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await electionService.update(editingId, formData);
        addToast('Election updated successfully!', 'success');
      } else {
        await electionService.create(formData);
        addToast('New election created successfully!', 'success');
      }
      setIsModalOpen(false);
      fetchElections();
    } catch (err) {
      addToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await electionService.delete(deleteTarget.id);
      addToast('Election deleted.', 'info');
      setIsConfirmOpen(false);
      fetchElections();
    } catch (err) {
      addToast(err.message || 'Failed to delete', 'error');
    }
  };

  const filtered = elections.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.type.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: 'Election Name',
      accessor: 'name',
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 block">{row.name}</span>
          <span className="text-[11px] text-slate-500 line-clamp-1">{row.description}</span>
        </div>
      )
    },
    {
      header: 'Type',
      accessor: 'type',
      render: (row) => (
        <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded uppercase">
          {row.type}
        </span>
      )
    },
    {
      header: 'Start Date',
      accessor: 'startDate',
      render: (row) => <span className="text-xs text-slate-600">{formatDate(row.startDate)}</span>
    },
    {
      header: 'End Date',
      accessor: 'endDate',
      render: (row) => <span className="text-xs text-slate-600">{formatDate(row.endDate)}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} size="sm" />
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/elections/${row.id}`}
            title="View Details"
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleOpenEdit(row)}
            title="Edit Election"
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setDeleteTarget(row);
              setIsConfirmOpen(true);
            }}
            title="Delete Election"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Election Management</h1>
          <p className="text-slate-500 text-xs">Create, schedule, edit, and monitor parliamentary and state elections</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Create New Election
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <SearchBar value={search} onChange={setSearch} placeholder="Search elections by name or type..." />
      </div>

      <DataTable columns={columns} data={filtered} loading={loading} emptyMessage="No election records found." />

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Election' : 'Create New Election'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Election Title</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g. Lok Sabha Election 2026"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Election Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              >
                <option value="Central">Central (National)</option>
                <option value="State">State Assembly</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing (Active)</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Election details and scope..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              {editingId ? 'Save Changes' : 'Create Election'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Election Record?"
        message={`Are you sure you want to delete ${deleteTarget?.name}? All associated candidate entries will be affected.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default AdminElections;
