import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import SearchBar from '../../components/common/SearchBar';
import { formatDate } from '../../utils/formatters';
import { Users, Edit, Trash2, ShieldCheck, User } from 'lucide-react';

export const AdminUsers = () => {
  const { addToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'voter',
    status: 'active'
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status || 'active'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      await userService.update(editingUser.id, formData);
      addToast('User account updated.', 'success');
      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      addToast(err.message || 'Failed to update user', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await userService.delete(deleteTarget.id);
      addToast('User account deleted.', 'info');
      setIsConfirmOpen(false);
      fetchUsers();
    } catch (err) {
      addToast(err.message || 'Delete failed', 'error');
    }
  };

  const filtered = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: 'Full Name & Email',
      accessor: 'fullName',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
            {row.fullName ? row.fullName[0].toUpperCase() : 'U'}
          </div>
          <div>
            <strong className="text-slate-900 block">{row.fullName}</strong>
            <span className="text-xs text-slate-500">{row.email}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Voter ID',
      accessor: 'voterId',
      render: (row) => <span className="font-mono text-xs text-slate-700">{row.voterId || 'IND-VOT-882'}</span>
    },
    {
      header: 'Assigned Role',
      accessor: 'role',
      render: (row) => (
        <span
          className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded border ${
            row.role === 'admin'
              ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
              : row.role === 'candidate'
              ? 'bg-amber-100 text-amber-800 border-amber-200'
              : 'bg-blue-100 text-blue-800 border-blue-200'
          }`}
        >
          {row.role}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status || 'active'} size="sm" />
    },
    {
      header: 'Registered Date',
      accessor: 'createdAt',
      render: (row) => <span className="text-xs text-slate-600">{formatDate(row.createdAt)}</span>
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenEdit(row)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100"
            title="Edit Role / Status"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setDeleteTarget(row);
              setIsConfirmOpen(true);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100"
            title="Delete User"
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
          <h1 className="text-2xl font-extrabold text-slate-900">User Account Management</h1>
          <p className="text-slate-500 text-xs">Manage voter permissions, candidate accounts, and administrator roles</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <SearchBar value={search} onChange={setSearch} placeholder="Search users by name or email..." />
      </div>

      <DataTable columns={columns} data={filtered} loading={loading} emptyMessage="No registered users found." />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Modify User Account">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full px-3 py-2 bg-slate-100 text-slate-500 border border-slate-200 rounded-xl text-sm cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">System Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              >
                <option value="voter">Voter</option>
                <option value="candidate">Candidate</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Account Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs">
              Save User Settings
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete User Account?"
        message={`Are you sure you want to permanently delete account ${deleteTarget?.email}?`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default AdminUsers;
