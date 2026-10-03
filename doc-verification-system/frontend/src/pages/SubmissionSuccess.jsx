import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export default function SubmissionSuccess() {
  return (
    <div className="max-w-2xl mx-auto py-16 text-center">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12">
        <div className="mx-auto w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Bid Submitted Successfully</h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Your documents have passed preliminary AI OCR & NLP checks and have been forwarded to the Procurement Officer for final review.
        </p>
        <Link 
          to="/bidder/dashboard"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
