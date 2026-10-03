import { CheckCircle2, AlertTriangle, ArrowLeftRight } from 'lucide-react';

export default function CrossDocumentVerification() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Cross-Document Consistency</h1>
        <p className="text-slate-500 mt-1">AI-powered NLP check across vendor compliance documents.</p>
      </div>

      {/* Consistent Example */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-green-50 px-6 py-4 border-b border-green-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <h2 className="text-lg font-semibold text-green-900">Consistent Match (Real)</h2>
          </div>
          <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full border border-green-200">
            98% Confidence
          </span>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-7 gap-6 items-start">
          <div className="md:col-span-3 bg-slate-50 border border-slate-200 rounded-lg p-5">
            <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">Document A: Registration (MCA)</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Entity Name</p>
                <p className="font-medium text-slate-900">Global Energy Tech Ltd.</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Incorporation Date</p>
                <p className="font-medium text-slate-900">14/03/2018</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Registered Address</p>
                <p className="font-medium text-slate-900">Navi Mumbai, Maharashtra</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 flex flex-col items-center justify-center space-y-6 py-4">
            <div className="bg-slate-100 p-2 rounded-full">
              <ArrowLeftRight className="w-5 h-5 text-slate-400" />
            </div>
            <div className="flex flex-col gap-8 w-full px-2">
              <div className="flex justify-center"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
              <div className="flex justify-center"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
              <div className="flex justify-center"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
            </div>
          </div>

          <div className="md:col-span-3 bg-slate-50 border border-slate-200 rounded-lg p-5">
            <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">Document B: GST Certificate</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Trade Name</p>
                <p className="font-medium text-slate-900">Global Energy Tech Ltd.</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Registration Date</p>
                <p className="font-medium text-slate-900">14/03/2018</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Principal Place of Business</p>
                <p className="font-medium text-slate-900">Navi Mumbai, Maharashtra</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inconsistent Example */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h2 className="text-lg font-semibold text-red-900">Potential Bogus / Edited Document</h2>
          </div>
          <span className="bg-red-100 text-red-800 text-sm font-bold px-3 py-1 rounded-full border border-red-200">
            High Risk Flag
          </span>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-7 gap-6 items-start">
          <div className="md:col-span-3 bg-slate-50 border border-slate-200 rounded-lg p-5">
            <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">Document A: PAN Card (Company)</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Entity Name</p>
                <p className="font-medium text-slate-900">Apex Petroleum Pvt Ltd</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">PAN Number</p>
                <p className="font-medium text-slate-900">ABCDE1234F</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 flex flex-col items-center justify-center space-y-6 py-4">
            <div className="bg-slate-100 p-2 rounded-full">
              <ArrowLeftRight className="w-5 h-5 text-slate-400" />
            </div>
            <div className="flex flex-col gap-8 w-full px-2 mt-4">
              <div className="flex flex-col items-center text-center">
                <AlertTriangle className="w-6 h-6 text-red-500 mb-1" />
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider text-center">NLP Mismatch</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 bg-slate-50 border border-red-200 rounded-lg p-5 shadow-[0_0_0_1px_rgba(239,68,68,0.3)]">
            <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">Document B: Financial Audit Report</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Entity Name</p>
                <p className="font-medium text-red-700 bg-red-50 border border-red-100 rounded px-2 py-0.5 inline-block -ml-2">
                  Apex <span className="font-bold underline decoration-red-400">Gas & Oil</span> Pvt Ltd
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">PAN Number</p>
                <p className="font-medium text-slate-900">ABCDE1234F</p>
              </div>
              <div className="text-xs text-red-600 font-semibold mt-4">
                * NLP context analysis suggests this document may have been edited from a different entity's audit report.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
