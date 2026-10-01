import React, { useState, useEffect } from 'react';
import { partyService } from '../../services/partyService';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import SearchBar from '../../components/common/SearchBar';
import { Plus, Edit, Trash2, Flag } from 'lucide-react';

export const AdminParties = () => {
  const { addToast } = useToast();
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    symbol: '',
    logo: '☀️',
    foundedYear: 2000,
    description: ''
  });

  const fetchParties = async () => {
    setLoading(true);
    try {
      const data = await partyService.getAll();
      setParties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      shortName: '',
      symbol: '',
      logo: '☀️',
      foundedYear: 2000,
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingId(p.id);
    setFormData({
      name: p.name,
      shortName: p.shortName,
      symbol: p.symbol,
      logo: p.logo,
      foundedYear: p.foundedYear,
      description: p.description
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await partyService.update(editingId, formData);
        addToast('Party updated.', 'success');
      } else {
        await partyService.create(formData);
        addToast('New party registered.', 'success');
      }
      setIsModalOpen(false);
      fetchParties();
    } catch (err) {
      addToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await partyService.delete(deleteTarget.id);
      addToast('Party deleted.', 'info');
      setIsConfirmOpen(false);
      fetchParties();
    } catch (err) {
      addToast(err.message || 'Delete failed', 'error');
    }
  };

  const filtered = parties.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    {
      header: 'Logo & Party Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <span className="text-2xl p-2 bg-slate-100 rounded-xl">{row.logo}</span>
          <div>
            <strong className="text-slate-900 block">{row.name}</strong>
            <span className="text-xs font-bold text-blue-600">{row.shortName}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Electoral Symbol',
      accessor: 'symbol',
      render: (row) => <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">{row.symbol}</span>
    },
    {
      header: 'Founded',
      accessor: 'foundedYear',
      render: (row) => <span className="text-xs text-slate-600">{row.foundedYear}</span>
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
          <h1 className="text-2xl font-extrabold text-slate-900">Political Party Management</h1>
          <p className="text-slate-500 text-xs">Manage recognized political entities and party symbols</p>
        </div>
        <button onClick={handleOpenAdd} className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          Add Political Party
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <SearchBar value={search} onChange={setSearch} placeholder="Search political parties..." />
      </div>

      <DataTable columns={columns} data={filtered} loading={loading} emptyMessage="No political parties registered." />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Party' : 'Add Party'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Party Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g. National Progress Alliance"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Abbreviation</label>
              <input
                type="text"
                value={formData.shortName}
                onChange={(e) => setFormData({ ...formData, shortName: e.target.value.toUpperCase() })}
                required
                placeholder="NPA"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm uppercase"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Party Symbol</label>
              <input
                type="text"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                required
                placeholder="Rising Sun"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Emoji Icon</label>
              <input
                type="text"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                required
                placeholder="☀️"
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
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs">
              {editingId ? 'Save Changes' : 'Add Party'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Remove Party?"
        message={`Are you sure you want to remove ${deleteTarget?.name}?`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default AdminParties;
