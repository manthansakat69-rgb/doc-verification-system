import { Download, Shield, FileText, CheckCircle, AlertTriangle, Building2 } from 'lucide-react';

export default function ComplianceReport() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bid Verification Report</h1>
          <p className="text-slate-500 mt-1">Official generated document analysis report.</p>
        </div>
        <button className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm" onClick={() => alert('Downloading PDF Report...')}>
          <Download className="w-4 h-4" />
          Download PDF Report
        </button>
      </div>

      <div className="bg-white rounded-none border border-slate-300 shadow-xl p-12 print:shadow-none print:border-none min-h-[800px] relative overflow-hidden">
        
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <Building2 className="w-96 h-96 text-slate-900" />
        </div>

        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center rounded">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">MINISTRY OF PETROLEUM</h2>
              <p className="text-sm font-semibold text-slate-600 tracking-widest uppercase">Tender Bid Verification Report</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-900">Bid ID: <span className="font-mono">BID-0892</span></p>
            <p className="text-sm text-slate-600">Generated: 09 Sep 2026, 10:15 IST</p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded p-4 flex justify-between items-center mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-green-800 font-semibold uppercase tracking-wider">Document Status</p>
              <p className="text-2xl font-bold text-green-900">AUTHENTIC (REAL)</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-800 font-semibold uppercase tracking-wider">AI Confidence</p>
            <p className="text-3xl font-black text-green-900">96%</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-8 relative z-10">
          
          <div>
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-500" /> Bid Information
            </h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-2 text-slate-500 font-medium">Tender ID</td>
                  <td className="py-2 text-slate-900 font-semibold text-right">TND-PNG-2026-041</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2 text-slate-500 font-medium">Document Type</td>
                  <td className="py-2 text-slate-900 font-semibold text-right">Technical Bid & Compliance</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2 text-slate-500 font-medium">Format</td>
                  <td className="py-2 text-slate-900 font-semibold text-right">PDF (Digital Origin)</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-500 font-medium">Pages</td>
                  <td className="py-2 text-slate-900 font-semibold text-right">45</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-slate-500" /> OCR Extracted Data
            </h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-2 text-slate-500 font-medium">Vendor Name</td>
                  <td className="py-2 text-slate-900 font-semibold text-right">Global Energy Tech Ltd.</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2 text-slate-500 font-medium">Vendor ID</td>
                  <td className="py-2 text-slate-900 font-mono font-semibold text-right">GET-IN-2018-0992</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2 text-slate-500 font-medium">Bid Amount</td>
                  <td className="py-2 text-slate-900 font-semibold text-right">₹ 4,50,00,000</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-500 font-medium">Validity</td>
                  <td className="py-2 text-slate-900 font-semibold text-right">180 Days</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-span-2 mt-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">NLP & Forgery Analysis Results</h3>
            
            <div className="space-y-4 text-sm">
              <p className="text-slate-700 leading-relaxed">
                The uploaded documents were processed through the Ministry's automated OCR extraction and NLP compliance engine. 
                The AI Forgery Detection module has flagged this submission as <strong className="text-green-700">REAL</strong> with 96% confidence.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 p-4 rounded text-slate-700">
                <p className="font-semibold text-slate-900 mb-2">Key Checks Performed:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Pixel Forgery:</strong> No digital splicing, overlay artifacts, or font discrepancies detected.</li>
                  <li><strong>NLP Context:</strong> Extracted semantic meaning perfectly matches the engineering requirements of the "Supply of Pipeline Valves" tender.</li>
                  <li><strong>Entity Consistency:</strong> Cross-checked Vendor ID against GST and MCA databases. No name tampering (Bogus entity check passed).</li>
                  <li><strong>Metadata:</strong> Creation dates and software signatures align with expected timelines. No signs of post-facto editing.</li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-end relative z-10 text-sm">
          <div>
            <p className="text-slate-500 font-medium mb-1">Procurement Officer Signature</p>
            <p className="font-medium text-slate-900 border-b border-slate-900 w-48 pb-1 mb-1">AI Verified (Auto-cleared)</p>
            <p className="text-xs text-slate-400">GeM DocVerify AI Engine v4.0</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 max-w-xs">
              This report is electronically generated. Data processed in accordance with the Ministry of Petroleum and Natural Gas cybersecurity guidelines.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
