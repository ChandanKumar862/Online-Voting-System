import React, { useState, useEffect } from 'react';
import { stateService } from '../../services/stateService';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import SearchBar from '../../components/common/SearchBar';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';

export const AdminStates = () => {
  const { addToast } = useToast();
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({ name: '', code: '', totalConstituencies: 10 });

  const fetchStates = async () => {
    setLoading(true);
    try {
      const data = await stateService.getAll();
      setStates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: '', code: '', totalConstituencies: 10 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (st) => {
    setEditingId(st.id);
    setFormData({ name: st.name, code: st.code, totalConstituencies: st.totalConstituencies });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await stateService.update(editingId, formData);
        addToast('State details updated.', 'success');
      } else {
        await stateService.create(formData);
        addToast('New state added.', 'success');
      }
      setIsModalOpen(false);
      fetchStates();
    } catch (err) {
      addToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await stateService.delete(deleteTarget.id);
      addToast('State removed.', 'info');
      setIsConfirmOpen(false);
      fetchStates();
    } catch (err) {
      addToast(err.message || 'Delete failed', 'error');
    }
  };

  const filtered = states.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    {
      header: 'State Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-indigo-600" />
          <strong className="text-slate-900">{row.name}</strong>
        </div>
      )
    },
    {
      header: 'State Code',
      accessor: 'code',
      render: (row) => <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{row.code}</span>
    },
    {
      header: 'Constituency Count',
      accessor: 'totalConstituencies',
      render: (row) => <span className="text-xs font-semibold text-slate-700">{row.totalConstituencies} Seats</span>
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenEdit(row)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setDeleteTarget(row);
              setIsConfirmOpen(true);
            }}
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
          <h1 className="text-2xl font-extrabold text-slate-900">State Management</h1>
          <p className="text-slate-500 text-xs">Manage state territories and electoral seat counts</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Add State
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <SearchBar value={search} onChange={setSearch} placeholder="Search states..." />
      </div>

      <DataTable columns={columns} data={filtered} loading={loading} emptyMessage="No states found." />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit State' : 'Add New State'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">State Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g. Bihar"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">State Code (2-letter)</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                required
                maxLength={3}
                placeholder="BR"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm uppercase"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Total Constituencies</label>
              <input
                type="number"
                value={formData.totalConstituencies}
                onChange={(e) => setFormData({ ...formData, totalConstituencies: parseInt(e.target.value, 10) })}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs">
              {editingId ? 'Save Changes' : 'Add State'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Remove State?"
        message={`Are you sure you want to remove ${deleteTarget?.name}?`}
        confirmText="Remove"
        type="danger"
      />
    </div>
  );
};

export default AdminStates;
