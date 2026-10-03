import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Shield, AlertTriangle, CheckCircle, XCircle, FileText, Download, User, Clock, Bell, LogOut, ChevronRight, X, ZoomIn, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { getSubmissions, getOfficerSession, logoutOfficer, updateOfficerStatus } from '../services/api';

export default function OfficerDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedSub, setSelectedSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [officerNotes, setOfficerNotes] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const s = getOfficerSession();
    if (!s) { navigate('/officer/login'); return; }
    setSession(s);
    loadData();
    // Simulate auto-refresh
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, [navigate]);

  const loadData = async () => {
    const data = await getSubmissions();
    setSubmissions(data);
    setLoading(false);
  };

  useEffect(() => {
    let result = submissions;
    if (activeTab === 'PENDING REVIEW') result = result.filter(s => s.officer_status === 'pending');
    if (activeTab === 'FLAGGED') result = result.filter(s => s.flagged);
    if (activeTab === 'VERIFIED') result = result.filter(s => s.system_status === 'REAL');
    
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(s => s.submission_id.toLowerCase().includes(q) || s.user_name.toLowerCase().includes(q));
    }
    
    // Sort flagged and pending to top
    result.sort((a, b) => {
      if (a.flagged && !b.flagged) return -1;
      if (!a.flagged && b.flagged) return 1;
      return new Date(b.submitted_at) - new Date(a.submitted_at);
    });
    
    setFiltered(result);
  }, [submissions, activeTab, search]);

  const handleLogout = () => {
    logoutOfficer();
    navigate('/officer/login');
  };

  const handleAction = async (action, issueType = '') => {
    if (!selectedSub) return;
    try {
      let status = 'approved';
      if (action === 'REJECT') status = 'rejected';
      if (action === 'ISSUE') status = 'issue_raised';
      if (action === 'REUPLOAD') status = 'reupload_requested';

      const updated = await updateOfficerStatus(selectedSub.submission_id, {
        officer_status: status,
        officer_remarks: officerNotes + (issueType ? ` [Issue: ${issueType}]` : ''),
        flagged: action === 'ISSUE' ? true : selectedSub.flagged
      });
      
      setSubmissions(subs => subs.map(s => s.submission_id === updated.submission_id ? updated : s));
      setSelectedSub(updated);
      setOfficerNotes('');
      if(action !== 'ISSUE') setSelectedSub(null); // Close modal on definitive action
    } catch (e) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div></div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* TOP BAR */}
      <header className="bg-slate-900 text-white shadow-md z-10 relative">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-teal-400" />
            <h1 className="font-bold text-lg tracking-tight">DocVerify <span className="font-normal text-slate-400">| Officer Portal</span></h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell className="w-5 h-5 text-slate-300 hover:text-white cursor-pointer" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">{submissions.filter(s=>s.flagged && s.officer_status==='pending').length}</span>
            </div>
            <div className="flex items-center gap-3 border-l border-slate-700 pl-6">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-sm font-bold">{session?.email[0].toUpperCase()}</div>
              <div className="text-sm">
                <p className="font-medium">{session?.email}</p>
                <p className="text-[10px] text-teal-400 uppercase tracking-wider">{session?.role}</p>
              </div>
              <button onClick={handleLogout} className="ml-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"><LogOut className="w-4 h-4"/></button>
            </div>
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 cursor-pointer hover:border-slate-300" onClick={()=>setActiveTab('ALL')}>
            <p className="text-sm font-semibold text-slate-500 uppercase">Total Submissions</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{submissions.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 cursor-pointer border-l-4 border-l-blue-500" onClick={()=>setActiveTab('PENDING REVIEW')}>
            <p className="text-sm font-semibold text-slate-500 uppercase">Pending Review</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{submissions.filter(s=>s.officer_status==='pending').length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 border-l-4 border-l-green-500">
            <p className="text-sm font-semibold text-slate-500 uppercase">Verified Genuine</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{submissions.filter(s=>s.system_status==='REAL').length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 border-l-4 border-l-yellow-500">
            <p className="text-sm font-semibold text-slate-500 uppercase">AI-Edited / Fake</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{submissions.filter(s=>s.system_status==='EDITED').length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 cursor-pointer border-l-4 border-l-red-500 bg-red-50" onClick={()=>setActiveTab('FLAGGED')}>
            <p className="text-sm font-semibold text-red-600 uppercase">Flagged / Issues</p>
            <p className="text-3xl font-bold text-red-700 mt-2">{submissions.filter(s=>s.flagged).length}</p>
          </div>
        </div>

        {/* TABLE CONTROLS */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            {['ALL', 'PENDING REVIEW', 'FLAGGED', 'VERIFIED'].map((tab) => (
              <button 
                key={tab} onClick={() => setActiveTab(tab)}
                className={clsx("px-4 py-2 rounded-lg text-sm font-bold transition-colors", activeTab === tab ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50")}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search ID or Name..." value={search} onChange={e=>setSearch(e.target.value)} className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-1 focus:ring-teal-500 w-64" />
            </div>
            {session?.role === 'admin' && (
               <button 
                 onClick={() => { if(confirm('Erase all database records?')) { localStorage.setItem('docverify_submissions', '[]'); loadData(); } }} 
                 className="flex items-center gap-2 border border-red-200 text-red-600 bg-red-50 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors"
               >
                 <Trash2 className="w-4 h-4" /> Reset DB
               </button>
            )}
            <button className="flex items-center gap-2 border border-slate-300 bg-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50"><Filter className="w-4 h-4" /> Filters</button>
            <button className="flex items-center gap-2 border border-slate-300 bg-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50"><Download className="w-4 h-4" /> Export</button>
          </div>
        </div>

        {/* MAIN TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="p-4 pl-6">Submission ID</th>
                <th className="p-4">User & Document</th>
                <th className="p-4">Submitted Time</th>
                <th className="p-4">System Status</th>
                <th className="p-4">Officer Status</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map(sub => (
                <tr key={sub.submission_id} className={clsx("hover:bg-slate-50 transition-colors cursor-pointer", sub.flagged && sub.officer_status === 'pending' && "bg-red-50/50")} onClick={() => setSelectedSub(sub)}>
                  <td className="p-4 pl-6 font-mono font-medium text-slate-700">
                    {sub.submission_id}
                    {sub.flagged && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">FLAGGED</span>}
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{sub.user_name}</p>
                    <p className="text-xs text-slate-500">{sub.document_name} • {sub.upload_source}</p>
                  </td>
                  <td className="p-4 text-slate-600">
                    {new Date(sub.submitted_at).toLocaleString(undefined, { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'})}
                  </td>
                  <td className="p-4">
                    <span className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border", 
                      sub.system_status === 'REAL' ? "bg-green-50 text-green-700 border-green-200" : 
                      sub.system_status === 'EDITED' ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-red-50 text-red-700 border-red-200"
                    )}>
                      {sub.system_status === 'REAL' && <CheckCircle className="w-3.5 h-3.5"/>}
                      {sub.system_status === 'EDITED' && <AlertTriangle className="w-3.5 h-3.5"/>}
                      {sub.system_status === 'FALSE' && <XCircle className="w-3.5 h-3.5"/>}
                      {sub.system_status === 'REAL' ? 'Verified' : sub.system_status === 'EDITED' ? 'AI Edited' : 'Invalid'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={clsx("text-xs font-bold uppercase tracking-wider",
                      sub.officer_status === 'pending' ? "text-slate-400" :
                      sub.officer_status === 'approved' ? "text-green-600" :
                      sub.officer_status === 'rejected' ? "text-red-600" : "text-orange-500"
                    )}>
                      {sub.officer_status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button className="text-teal-600 hover:text-teal-800 font-semibold text-sm flex items-center justify-end gap-1 ml-auto">
                      Review <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && submissions.length === 0 && (
                <tr><td colSpan="6" className="p-12 text-center text-slate-500 text-lg font-medium">No submissions yet. Documents uploaded by users will appear here.</td></tr>
              )}
              {filtered.length === 0 && submissions.length > 0 && (
                <tr><td colSpan="6" className="p-8 text-center text-slate-500">No submissions found matching filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* REVIEW OVERLAY MODAL */}
      {selectedSub && (
        <div className="fixed inset-0 bg-slate-900/80 z-50 flex overflow-hidden">
          <div className="w-full max-w-7xl h-[90vh] m-auto bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-slate-50 shrink-0">
              <div>
                <h2 className="font-bold text-lg text-slate-900 flex items-center gap-3">
                  Review Submission: <span className="font-mono text-teal-700">{selectedSub.submission_id}</span>
                  {selectedSub.flagged && <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded border border-red-200 uppercase tracking-wider">Flagged</span>}
                </h2>
              </div>
              <button onClick={() => setSelectedSub(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><X className="w-6 h-6" /></button>
            </div>
            
            {/* Modal Body 2-Cols */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* LEFT: Document Viewer */}
              <div className="w-1/2 bg-slate-100 border-r border-slate-200 flex flex-col relative overflow-hidden p-6 items-center justify-center">
                {selectedSub.uploaded_file ? (
                  <img src={selectedSub.uploaded_file} className="max-w-full max-h-full object-contain drop-shadow-xl" alt="Document" />
                ) : (
                  <div className="text-slate-400 text-center">
                    <ZoomIn className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p>No preview available for mocked data.</p>
                  </div>
                )}
              </div>

              {/* RIGHT: Details & Actions */}
              <div className="w-1/2 flex flex-col overflow-y-auto bg-white">
                <div className="p-6 space-y-6 flex-1">
                  
                  {/* System Verdict Box */}
                  <div className={clsx("p-4 rounded-xl border", 
                    selectedSub.system_status === 'REAL' ? "bg-green-50 border-green-200" :
                    selectedSub.system_status === 'EDITED' ? "bg-yellow-50 border-yellow-300" : "bg-red-50 border-red-200"
                  )}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">System Verdict</p>
                        <h3 className={clsx("text-lg font-bold flex items-center gap-2", 
                          selectedSub.system_status === 'REAL' ? "text-green-800" :
                          selectedSub.system_status === 'EDITED' ? "text-yellow-800" : "text-red-800"
                        )}>
                           {selectedSub.system_status === 'REAL' ? 'Verified Genuine' : selectedSub.system_status === 'EDITED' ? 'AI Edited / Fake' : 'Invalid Document'}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Confidence</p>
                        <p className="text-xl font-bold font-mono text-slate-800">{selectedSub.confidence}%</p>
                      </div>
                    </div>
                    <div className="mt-3 bg-white/60 p-3 rounded-lg text-sm text-slate-800 border border-black/5">
                      <p className="font-semibold mb-1">Why this result:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        {selectedSub.reasons.map((r,i)=><li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 font-semibold uppercase">User</p>
                      <p className="font-bold text-slate-900">{selectedSub.user_name}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 font-semibold uppercase">Upload Source</p>
                      <p className="font-bold text-slate-900">{selectedSub.upload_source}</p>
                    </div>
                  </div>

                  {/* Extracted Fields */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider flex items-center gap-2">Extracted Details <span className={clsx("text-[10px] px-2 py-0.5 rounded-full border", selectedSub.key_match==='matched'?'bg-green-100 text-green-700 border-green-200': selectedSub.key_match==='partial'?'bg-yellow-100 text-yellow-700 border-yellow-200':'bg-red-100 text-red-700 border-red-200')}>DB: {selectedSub.key_match}</span></h4>
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <table className="w-full text-sm text-left">
                        <tbody className="divide-y divide-slate-100">
                          {Object.entries(selectedSub.extracted_fields || {}).map(([k,v]) => (
                             <tr key={k}>
                               <td className="p-3 bg-slate-50 font-medium text-slate-600 w-1/3">{k}</td>
                               <td className="p-3 font-mono font-bold text-slate-900">{v}</td>
                             </tr>
                          ))}
                          {Object.keys(selectedSub.extracted_fields || {}).length === 0 && (
                            <tr><td className="p-4 text-slate-400 italic">No details extracted by OCR.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Audit Trail */}
                  {selectedSub.officer_status !== 'pending' && (
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider">Officer Audit Log</h4>
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm">
                        <p><span className="font-bold">Status:</span> <span className="uppercase">{selectedSub.officer_status.replace('_',' ')}</span></p>
                        <p><span className="font-bold">Officer:</span> {selectedSub.assigned_officer}</p>
                        {selectedSub.officer_remarks && <p><span className="font-bold">Remarks:</span> {selectedSub.officer_remarks}</p>}
                      </div>
                    </div>
                  )}

                </div>

                {/* ACTION BAR */}
                <div className="border-t border-slate-200 p-6 bg-slate-50 shrink-0">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Officer Actions</h4>
                  
                  <textarea 
                    placeholder="Add internal notes or remarks..." 
                    value={officerNotes} onChange={e=>setOfficerNotes(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm mb-4 focus:ring-1 focus:ring-slate-500 outline-none" rows="2"
                  ></textarea>
                  
                  <div className="flex gap-3">
                    <button onClick={() => handleAction('APPROVE')} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                      Approve Genuine
                    </button>
                    <button onClick={() => handleAction('REJECT')} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                      Reject Fraud
                    </button>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <button onClick={() => handleAction('REUPLOAD')} className="flex-1 bg-white border border-slate-300 text-slate-700 font-bold py-2.5 px-4 rounded-xl hover:bg-slate-100 transition-colors">
                      Request Re-Upload
                    </button>
                    <button onClick={() => handleAction('ISSUE', 'Suspicious')} className="flex-1 bg-white border border-slate-300 text-slate-700 font-bold py-2.5 px-4 rounded-xl hover:bg-slate-100 transition-colors">
                      Flag / Escalate
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
