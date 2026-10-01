import React, { useState, useEffect } from 'react';
import { electionService } from '../../services/electionService';
import { resultService } from '../../services/resultService';
import DataTable from '../../components/common/DataTable';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { BarChart3, Trophy, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AdminResults = () => {
  const [elections, setElections] = useState([]);
  const [selectedElectionId, setSelectedElectionId] = useState('');
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        const elList = await electionService.getAll();
        setElections(elList);
        if (elList.length > 0) {
          const firstId = elList[0].id;
          setSelectedElectionId(firstId);
          const res = await resultService.getElectionResults(firstId);
          setResultData(res);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  const handleSelectElection = async (eId) => {
    setSelectedElectionId(eId);
    setLoading(true);
    try {
      const res = await resultService.getElectionResults(eId);
      setResultData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      header: 'Rank & Candidate',
      accessor: 'candidateName',
      render: (row, idx) => (
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
            #{idx + 1}
          </span>
          <img src={row.photo} alt={row.candidateName} className="w-8 h-8 rounded-lg object-cover" />
          <strong className="text-slate-900">{row.candidateName}</strong>
        </div>
      )
    },
    {
      header: 'Party',
      accessor: 'partyName',
      render: (row) => (
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
          {row.partyLogo} {row.partyName} ({row.symbol})
        </span>
      )
    },
    {
      header: 'Vote Count',
      accessor: 'voteCount',
      render: (row) => <strong className="text-slate-900 font-bold">{row.voteCount.toLocaleString()}</strong>
    },
    {
      header: 'Vote Percentage',
      accessor: 'percentage',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600" style={{ width: `${row.percentage}%` }}></div>
          </div>
          <span className="text-xs font-semibold text-slate-700">{row.percentage}%</span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Election Results & Participation Analytics</h1>
          <p className="text-slate-500 text-xs">Certified vote tallies, turnout percentages, and declared winners</p>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200">
          <label className="text-xs font-bold text-slate-700">Select Election:</label>
          <select
            value={selectedElectionId}
            onChange={(e) => handleSelectElection(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none"
          >
            {elections.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name} ({el.type})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner label="Compiling certified vote counts..." />
      ) : resultData ? (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-400 block font-semibold">Total Voters</span>
              <strong className="text-2xl font-extrabold text-slate-900">{resultData.totalVoters.toLocaleString()}</strong>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-400 block font-semibold">Votes Recorded</span>
              <strong className="text-2xl font-extrabold text-blue-600">{resultData.votesCast.toLocaleString()}</strong>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-400 block font-semibold">Turnout Rate</span>
              <strong className="text-2xl font-extrabold text-emerald-600">{resultData.turnoutPercentage}%</strong>
            </div>
          </div>

          {/* Winner Banner */}
          {resultData.winner && (
            <div className="bg-emerald-950 text-white rounded-2xl p-6 border border-emerald-800 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-4">
                <img src={resultData.winner.photo} alt="Winner" className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-400" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-900 px-2 py-0.5 rounded border border-emerald-700 inline-block mb-1">
                    Certified Winner
                  </span>
                  <h3 className="text-xl font-extrabold">{resultData.winner.candidateName}</h3>
                  <p className="text-xs text-emerald-300">
                    {resultData.winner.partyLogo} {resultData.winner.partyName} ({resultData.winner.voteCount.toLocaleString()} votes &bull; {resultData.winner.percentage}%)
                  </p>
                </div>
              </div>
              <Trophy className="w-10 h-10 text-amber-400 hidden sm:block" />
            </div>
          )}

          {/* Breakdown Table */}
          <DataTable
            columns={columns}
            data={resultData.results}
            loading={false}
            emptyMessage="No vote results available."
          />
        </div>
      ) : (
        <p className="text-slate-500 text-sm text-center py-8">Select an election to view detailed results.</p>
      )}
    </div>
  );
};

export default AdminResults;
