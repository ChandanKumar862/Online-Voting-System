import React, { useState, useEffect } from 'react';
import { positionService } from '../../services/positionService';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import SearchBar from '../../components/common/SearchBar';
import { Plus, Edit, Trash2, Award } from 'lucide-react';

export const AdminPositions = () => {
  const { addToast } = useToast();
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({ name: '', electionType: 'Central', description: '' });

  const fetchPositions = async () => {
    setLoading(true);
    try {
      const data = await positionService.getAll();
      setPositions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: '', electionType: 'Central', description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingId(p.id);
    setFormData({ name: p.name, electionType: p.electionType, description: p.description });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await positionService.update(editingId, formData);
        addToast('Position updated.', 'success');
      } else {
        await positionService.create(formData);
        addToast('New position added.', 'success');
      }
      setIsModalOpen(false);
      fetchPositions();
    } catch (err) {
      addToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await positionService.delete(deleteTarget.id);
      addToast('Position removed.', 'info');
      setIsConfirmOpen(false);
      fetchPositions();
    } catch (err) {
      addToast(err.message || 'Delete failed', 'error');
    }
  };

  const filtered = positions.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    {
      header: 'Position Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-600" />
          <strong className="text-slate-900">{row.name}</strong>
        </div>
      )
    },
    {
      header: 'Scope',
      accessor: 'electionType',
      render: (row) => <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 rounded">{row.electionType}</span>
    },
    {
      header: 'Description',
      accessor: 'description',
      render: (row) => <span className="text-xs text-slate-500">{row.description || 'N/A'}</span>
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => handleOpenEdit(row)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => { setDeleteTarget(row); setIsConfirmOpen(true); }} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100">
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
          <h1 className="text-2xl font-extrabold text-slate-900">Election Position Management</h1>
          <p className="text-slate-500 text-xs">Define official elected roles (e.g. MP, MLA, Municipal Councillor)</p>
        </div>
        <button onClick={handleOpenAdd} className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          Add Position
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <SearchBar value={search} onChange={setSearch} placeholder="Search positions..." />
      </div>

      <DataTable columns={columns} data={filtered} loading={loading} emptyMessage="No positions registered." />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Position' : 'Add Position'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Position Title</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g. Member of Parliament (MP)"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Election Scope</label>
            <select
              value={formData.electionType}
              onChange={(e) => setFormData({ ...formData, electionType: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
            >
              <option value="Central">Central</option>
              <option value="State">State</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs">
              {editingId ? 'Save Changes' : 'Add Position'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Remove Position?"
        message={`Are you sure you want to remove ${deleteTarget?.name}?`}
        confirmText="Remove"
        type="danger"
      />
    </div>
  );
};

export default AdminPositions;
