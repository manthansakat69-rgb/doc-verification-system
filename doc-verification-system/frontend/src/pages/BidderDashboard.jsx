import { Link } from 'react-router-dom';
import { FileText, PlusCircle, History } from 'lucide-react';

export default function UserDashboard() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">User Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome to the GeM Aadhaar Verification Portal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-4">
            <PlusCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">New Verification</h2>
          <p className="text-slate-500 mb-6 max-w-xs mx-auto">Upload a new Aadhaar card image to instantly verify its authenticity using our AI engine.</p>
          <Link 
            to="/bidder/upload" 
            className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            Start Verification
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4">
            <History className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Past Verifications</h2>
          <p className="text-slate-500 mb-6 max-w-xs mx-auto">No past verification records found for this account.</p>
          <button disabled className="bg-slate-100 text-slate-400 px-6 py-2.5 rounded-lg font-medium cursor-not-allowed">
            View History
          </button>
        </div>
      </div>
    </div>
  );
}
