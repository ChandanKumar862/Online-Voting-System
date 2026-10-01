import React, { useState, useEffect } from 'react';
import { votingService } from '../../services/votingService';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchBar from '../../components/common/SearchBar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatDateTime } from '../../utils/formatters';
import { History, ShieldCheck, Copy } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const MyVotes = () => {
  const { addToast } = useToast();
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchVotes = async () => {
      setLoading(true);
      try {
        const data = await votingService.getVoteHistory();
        setVotes(data);
      } catch (err) {
        console.error('Failed to load vote history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVotes();
  }, []);

  const handleCopyHash = (hash) => {
    navigator.clipboard.writeText(hash);
    addToast('Audit hash copied!', 'success');
  };

  const filteredVotes = votes.filter(
    (v) =>
      v.electionName.toLowerCase().includes(search.toLowerCase()) ||
      v.receiptHash.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: 'Election Name',
      accessor: 'electionName',
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 block">{row.electionName}</span>
          <span className="text-[11px] text-slate-500">{row.constituencyName || 'Patna Sahib'}</span>
        </div>
      )
    },
    {
      header: 'Election Type',
      accessor: 'electionType',
      render: (row) => (
        <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded uppercase">
          {row.electionType}
        </span>
      )
    },
    {
      header: 'Date & Time Cast',
      accessor: 'votedAt',
      render: (row) => <span className="text-xs text-slate-600">{formatDateTime(row.votedAt)}</span>
    },
    {
      header: 'Audit Receipt Hash',
      accessor: 'receiptHash',
      render: (row) => (
        <div className="flex items-center gap-1 font-mono text-xs text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-200 w-fit">
          <span>{row.receiptHash}</span>
          <button
            onClick={() => handleCopyHash(row.receiptHash)}
            className="text-slate-400 hover:text-slate-700"
            title="Copy Hash"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    },
    {
      header: 'Verification Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status || 'Verified'} size="sm" />
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-semibold border border-blue-400/20">
            <History className="w-3.5 h-3.5" />
            <span>Audit Trail Log</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Vote History</h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Verified record of all elections you have participated in. Transaction hashes serve as cryptographic proof of vote submission.
          </p>
        </div>
      </div>

      {/* Control bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by election title or hash..." />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredVotes}
        loading={loading}
        emptyMessage="No voting history records found for your account."
      />
    </div>
  );
};

export default MyVotes;
