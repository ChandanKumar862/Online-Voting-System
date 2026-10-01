import React, { useState, useEffect } from 'react';
import { candidateService } from '../../services/candidateService';
import { electionService } from '../../services/electionService';
import { partyService } from '../../services/partyService';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import SearchBar from '../../components/common/SearchBar';
import { Plus, Edit, Trash2, UserCheck } from 'lucide-react';

export const AdminCandidates = () => {
  const { addToast } = useToast();
  const [candidates, setCandidates] = useState([]);
  const [elections, setElections] = useState([]);
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    electionId: '',
    partyId: '',
    constituencyName: 'Patna Sahib',
    positionName: 'Member of Parliament (MP)',
    photo: '',
    description: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cData, eData, pData] = await Promise.all([
        candidateService.getAll(),
        electionService.getAll(),
        partyService.getAll()
      ]);
      setCandidates(cData);
      setElections(eData);
      setParties(pData);
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
      electionId: elections[0]?.id || '',
      partyId: parties[0]?.id || '',
      constituencyName: 'Patna Sahib',
      positionName: 'Member of Parliament (MP)',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cand) => {
    setEditingId(cand.id);
    setFormData({
      name: cand.name,
      electionId: cand.electionId,
      partyId: cand.partyId,
      constituencyName: cand.constituencyName,
      positionName: cand.positionName,
      photo: cand.photo,
      description: cand.description
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await candidateService.update(editingId, formData);
        addToast('Candidate updated.', 'success');
      } else {
        await candidateService.create(formData);
        addToast('New candidate approved and registered.', 'success');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await candidateService.delete(deleteTarget.id);
      addToast('Candidate removed.', 'info');
      setIsConfirmOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || 'Delete failed', 'error');
    }
  };

  const filtered = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.partyName?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: 'Candidate',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.photo} alt={row.name} className="w-9 h-9 rounded-xl object-cover border" />
          <div>
            <strong className="text-slate-900 block">{row.name}</strong>
            <span className="text-xs text-slate-500">{row.positionName}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Political Party',
      accessor: 'partyName',
      render: (row) => (
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
          {row.partyLogo} {row.partyName}
        </span>
      )
    },
    {
      header: 'Election',
      accessor: 'electionName',
      render: (row) => <span className="text-xs text-slate-700 font-medium">{row.electionName}</span>
    },
    {
      header: 'Constituency',
      accessor: 'constituencyName',
      render: (row) => <span className="text-xs text-slate-600">{row.constituencyName}</span>
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
          <h1 className="text-2xl font-extrabold text-slate-900">Candidate Nomination Management</h1>
          <p className="text-slate-500 text-xs">Approve and edit candidate nominations for open election races</p>
        </div>
        <button onClick={handleOpenAdd} className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          Add Candidate
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <SearchBar value={search} onChange={setSearch} placeholder="Search candidates..." />
      </div>

      <DataTable columns={columns} data={filtered} loading={loading} emptyMessage="No candidates registered." />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Candidate' : 'Register Candidate'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Candidate Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Election</label>
              <select
                value={formData.electionId}
                onChange={(e) => setFormData({ ...formData, electionId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              >
                {elections.map((el) => (
                  <option key={el.id} value={el.id}>{el.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Political Party</label>
              <select
                value={formData.partyId}
                onChange={(e) => setFormData({ ...formData, partyId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              >
                {parties.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Constituency</label>
              <input
                type="text"
                value={formData.constituencyName}
                onChange={(e) => setFormData({ ...formData, constituencyName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Photo Image URL</label>
              <input
                type="text"
                value={formData.photo}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Manifesto / Description</label>
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
              {editingId ? 'Save Changes' : 'Register Candidate'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Remove Candidate?"
        message={`Are you sure you want to remove candidate ${deleteTarget?.name}?`}
        confirmText="Remove"
        type="danger"
      />
    </div>
  );
};

export default AdminCandidates;
