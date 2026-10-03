import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCog, User } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-2">
          <ShieldCheck className="h-10 w-10 text-teal-600" />
          <span className="text-3xl font-bold tracking-tight text-slate-900">
            GeM<span className="text-teal-600">DocVerify</span>
          </span>
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-slate-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Select your portal access level
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="grid grid-cols-1 max-w-sm mx-auto gap-6">
          
          {/* User Login Card */}
          <div className="bg-white py-8 px-6 shadow-sm sm:rounded-lg border border-slate-200 hover:border-teal-400 transition-colors cursor-pointer relative" onClick={() => navigate('/bidder/dashboard')}>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-teal-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-center text-slate-900 mb-2">User Portal</h3>
            <p className="text-sm text-center text-slate-500 mb-6">Upload your Aadhaar card for instant AI verification.</p>
            <button className="w-full justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors">
              Login as User
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
