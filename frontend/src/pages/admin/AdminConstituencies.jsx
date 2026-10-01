import React, { useState, useEffect } from 'react';
import { constituencyService } from '../../services/constituencyService';
import { stateService } from '../../services/stateService';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import SearchBar from '../../components/common/SearchBar';
import { Plus, Edit, Trash2, Building } from 'lucide-react';

export const AdminConstituencies = () => {
  const { addToast } = useToast();
  const [constituencies, setConstituencies] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    stateId: '',
    type: 'Parliamentary',
    number: 1
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cData, sData] = await Promise.all([
        constituencyService.getAll(),
        stateService.getAll()
      ]);
      setConstituencies(cData);
      setStates(sData);
      if (sData.length > 0 && !formData.stateId) {
        setFormData(prev => ({ ...prev, stateId: sData[0].id }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      stateId: states[0]?.id || '',
      type: 'Parliamentary',
      number: 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      stateId: item.stateId,
      type: item.type,
      number: item.number
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await constituencyService.update(editingId, formData);
        addToast('Constituency updated.', 'success');
      } else {
        await constituencyService.create(formData);
        addToast('New constituency created.', 'success');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || 'Action failed', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await constituencyService.delete(deleteTarget.id);
      addToast('Constituency removed.', 'info');
      setIsConfirmOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || 'Delete failed', 'error');
    }
  };

  const filtered = constituencies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.stateName?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: 'Constituency Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-indigo-600" />
          <strong className="text-slate-900">{row.name}</strong>
        </div>
      )
    },
    {
      header: 'State',
      accessor: 'stateName',
      render: (row) => <span className="text-xs font-semibold text-slate-700">{row.stateName}</span>
    },
    {
      header: 'Type',
      accessor: 'type',
      render: (row) => <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 rounded">{row.type}</span>
    },
    {
      header: 'Seat No.',
      accessor: 'number',
      render: (row) => <span className="font-mono text-xs text-slate-600">#{row.number}</span>
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
          <h1 className="text-2xl font-extrabold text-slate-900">Constituency Management</h1>
          <p className="text-slate-500 text-xs">Configure electoral parliamentary and assembly seats</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Add Constituency
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <SearchBar value={search} onChange={setSearch} placeholder="Search constituency or state..." />
      </div>

      <DataTable columns={columns} data={filtered} loading={loading} emptyMessage="No constituency entries found." />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Constituency' : 'Add Constituency'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Constituency Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g. Patna Sahib"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
              <select
                value={formData.stateId}
                onChange={(e) => setFormData({ ...formData, stateId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              >
                {states.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              >
                <option value="Parliamentary">Parliamentary</option>
                <option value="Assembly">Assembly</option>
                <option value="Municipal">Municipal</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Constituency Number</label>
            <input
              type="number"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: parseInt(e.target.value, 10) })}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs">
              {editingId ? 'Save Changes' : 'Add Constituency'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Constituency?"
        message={`Are you sure you want to delete ${deleteTarget?.name}?`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default AdminConstituencies;
