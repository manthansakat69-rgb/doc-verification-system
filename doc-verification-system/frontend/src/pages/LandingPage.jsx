import { Link } from 'react-router-dom';
import { ShieldCheck, FileSearch, CheckCircle, Database, Building2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-teal-600" />
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                GeM<span className="text-teal-600">DocVerify</span>
              </span>
            </div>
            <div className="flex gap-4">
              <Link to="/login" className="bg-teal-600 text-white hover:bg-teal-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Portal Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="relative pt-16 pb-32 overflow-hidden bg-slate-50">
          <div className="relative">
            <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight sm:text-6xl mt-4">
                Instant ID Verification. <br className="hidden sm:block" />
                <span className="text-teal-600">Zero Forgery.</span> 
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
                Upload Aadhaar documents to instantly detect forgeries, verify identities, and ensure compliance using our advanced OCR and NLP engine.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/login" className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-3 rounded-lg text-lg font-medium transition-colors shadow-sm">
                  User Portal Login
                </Link>
                <Link to="/officer/login" className="bg-white text-slate-900 border border-slate-300 hover:bg-slate-50 px-8 py-3 rounded-lg text-lg font-medium transition-colors shadow-sm">
                  Officer Portal Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900">AI-Powered Bid Verification</h2>
              <p className="mt-4 text-lg text-slate-500">Detect tampering and ensure compliance with deep NLP context analysis.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: FileSearch, title: 'Smart OCR Extraction', desc: 'Flawlessly reads technical bids, tax records, and compliance certificates.' },
                { icon: CheckCircle, title: 'Forgery Detection', desc: 'Identifies pixel inconsistencies to flag Edited or Bogus documents.' },
                { icon: Database, title: 'NLP Context Analysis', desc: 'Understands text semantics to ensure document logical consistency.' },
                { icon: ShieldCheck, title: 'Role-based Portals', desc: 'Dedicated views for Vendors submitting bids and Officers verifying them.' },
              ].map((feature, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
