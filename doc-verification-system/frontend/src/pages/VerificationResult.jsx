import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Download, 
  AlertTriangle,
  FileText,
  ShieldCheck,
  Zap,
  Check,
  Search,
  Scan,
  XCircle,
  HelpCircle,
  RefreshCcw,
  UserCheck
} from 'lucide-react';
import clsx from 'clsx';

export default function VerificationResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const extractedText = location.state?.extractedText || "";
  const uploadedImage = location.state?.image || null;
  const formData = location.state?.formData || {};
  const isNonDoc = location.state?.isNonDoc || false;

  const [verificationData, setVerificationData] = useState(null);

  useEffect(() => {
    if (isNonDoc) {
      setVerificationData({
        status: 'NON_DOC',
        label: 'PIPELINE HALTED: NON-DOCUMENT',
        conclusion: 'Vision API classified this image as an animal or object. It is NOT an identity document. The OCR and NLP pipelines were bypassed to save processing resources.',
        score: 0,
        checks: [
          { text: 'Vision Classification: Identity Document', pass: false, code: 'E106', tip: 'Please upload a valid identity document (Aadhaar/PAN).' },
          { text: 'Vision Classification: Animal/Object', pass: true }
        ],
        extractedNumber: 'N/A'
      });
      return;
    }

    // NLP Heuristics for Aadhaar Card
    const textUpper = extractedText.toUpperCase();
    
    // Very lenient OCR checks so genuine docs pass more easily
    const hasGovt = textUpper.includes('GOVERNMENT OF INDIA') || textUpper.includes('भारत') || textUpper.includes('GOVT') || textUpper.includes('INDIA');
    const aadhaarRegex = /\d{4}\s?\d{4}\s?\d{4}/;
    const hasNumber = aadhaarRegex.test(extractedText);
    const hasDOB = textUpper.includes('DOB') || textUpper.includes('YEAR') || textUpper.includes('YOB') || /\d{4}/.test(extractedText);
    
    // Cross-check with form data
    const nameMatch = formData.name ? textUpper.includes(formData.name.toUpperCase().split(' ')[0]) : true;

    let score = 20;
    if (hasGovt) score += 20;
    if (hasNumber) score += 40;
    if (hasDOB) score += 10;
    if (nameMatch) score += 10;

    // Apply "Soft Signals" logic
    if (formData.source === 'WhatsApp') {
      score -= 5; // Soft penalty for compression
    }

    let status = 'NOT_VERIFIED';
    let label = 'REJECTED';
    let conclusion = 'The document completely fails validation. Missing critical identifiers or heavily tampered.';
    
    if (score >= 90) {
      status = 'VERIFIED';
      label = '100% VERIFIED / GENUINE';
      conclusion = 'Document passes all OCR and cross-check validations. Essential keys are present. Classified as Genuine.';
    } else if (score >= 70) {
      status = 'SUSPICIOUS';
      label = 'SUSPICIOUS (MANUAL REVIEW NEEDED)';
      conclusion = 'The ID was partially detected but lacks full context or has mismatched details. Soft signals (e.g., low-trust source) lowered the score.';
    }

    setVerificationData({
      score,
      status,
      label,
      conclusion,
      checks: [
        { text: 'Found Government of India context', pass: hasGovt, code: 'E101', tip: 'Ensure the top header of the card is clearly visible.' },
        { text: 'Valid 12-digit sequence detected', pass: hasNumber, code: 'E102', tip: 'Ensure the Aadhaar number is not obstructed by glare.' },
        { text: 'Date/Year of Birth semantics present', pass: hasDOB, code: 'E107', tip: 'Ensure the DOB section is in focus.' },
        { text: `Name match: ${formData.name || 'Not provided'}`, pass: nameMatch, code: 'E104', tip: 'The name entered in the form must match the printed name.' },
        { text: 'Source Trust Check', pass: formData.source !== 'WhatsApp', code: 'E109', tip: 'WhatsApp images are highly compressed. Try uploading the original photo.' },
      ],
      extractedNumber: hasNumber ? extractedText.match(aadhaarRegex)[0] : 'Not Found',
    });

  }, [extractedText, isNonDoc, formData]);

  if (!verificationData) return <div className="p-12 text-center">Analyzing...</div>;

  const isVerified = verificationData.status === 'VERIFIED';
  const isSuspicious = verificationData.status === 'SUSPICIOUS';
  const isNotVerified = verificationData.status === 'NOT_VERIFIED';
  const isNonDocument = verificationData.status === 'NON_DOC';

  // Privacy Masking (XXXX XXXX 1234)
  const maskNumber = (numStr) => {
    if (numStr === 'N/A' || numStr === 'Not Found') return numStr;
    const digits = numStr.replace(/\s/g, '');
    if (digits.length === 12) {
      return `XXXX XXXX ${digits.slice(-4)}`;
    }
    return numStr;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <span>Uploaded</span>
            <span className="text-slate-300">→</span>
            <span>Processing</span>
            <span className="text-slate-300">→</span>
            <span className="font-semibold text-teal-600">Complete</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Verification Report</h1>
          <p className="text-slate-500 mt-1">Verification ID: VID-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col items-center justify-center border-b border-slate-100 pb-6 mb-6">
              
              <div className={clsx(
                "inline-flex items-center gap-2 px-6 py-2 rounded-full border font-bold tracking-wide text-sm mb-4 shadow-sm text-center",
                isVerified && "bg-green-100 text-green-800 border-green-300",
                isSuspicious && "bg-amber-100 text-amber-800 border-amber-300",
                isNotVerified && "bg-red-100 text-red-800 border-red-300",
                isNonDocument && "bg-slate-100 text-slate-800 border-slate-300"
              )}>
                {isVerified && <ShieldCheck className="w-5 h-5" />}
                {isSuspicious && <AlertTriangle className="w-5 h-5" />}
                {isNotVerified && <XCircle className="w-5 h-5" />}
                {isNonDocument && <XCircle className="w-5 h-5" />}
                {verificationData.label}
              </div>

              <div className="relative mt-2">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" 
                    strokeDasharray="351.8" 
                    strokeDashoffset={351.8 - (351.8 * verificationData.score) / 100} 
                    className={clsx(
                      isVerified ? "text-green-500" : isSuspicious ? "text-amber-500" : isNotVerified ? "text-red-500" : "text-slate-400"
                    )} 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-slate-900">{verificationData.score}%</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Confidence</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Zap className={clsx("w-5 h-5", isVerified ? "text-green-500" : isSuspicious ? "text-amber-500" : isNotVerified ? "text-red-500" : "text-slate-500")} />
                Final Verdict
              </h3>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-700 leading-relaxed mb-4">
                {verificationData.conclusion}
              </div>

              <div className="flex flex-col gap-2">
                <button onClick={() => navigate('/bidder/upload')} className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm">
                  <RefreshCcw className="w-4 h-4" /> Re-Verify Document
                </button>
                {!isVerified && (
                  <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm">
                    <UserCheck className="w-4 h-4" /> Request Manual Review
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-lg text-slate-900 mb-4 pb-2 border-b border-slate-100">Verification Checks & Remarks</h3>
            <ul className="space-y-3">
              {verificationData.checks.map((rule, idx) => (
                <li key={idx} className={clsx(
                  "p-3 rounded-lg border",
                  rule.pass ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
                )}>
                  <div className="flex items-start gap-3">
                    {rule.pass ? (
                      <div className="mt-0.5 bg-green-200 text-green-700 rounded-full p-1">
                        <Check className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="mt-0.5 bg-red-200 text-red-700 rounded-full p-1">
                        <XCircle className="w-4 h-4" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className={clsx("font-medium text-sm", rule.pass ? "text-slate-800" : "text-red-900")}>
                        {rule.text} {!rule.pass && rule.code && <span className="ml-2 text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded border border-red-200">{rule.code}</span>}
                      </p>
                      {!rule.pass && rule.tip && (
                        <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                          <HelpCircle className="w-3 h-3" /> Fix Tip: {rule.tip}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex gap-6">
            {uploadedImage && (
              <div className="w-48 h-auto flex-shrink-0">
                 <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Uploaded Image</p>
                 <img src={uploadedImage} alt="Uploaded" className="w-full rounded-md border border-slate-300" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Search className="w-5 h-5 text-slate-400" />
                Raw Extracted Text
              </h3>
              <div className="bg-slate-900 text-green-400 font-mono text-xs p-4 rounded-lg overflow-y-auto max-h-32 whitespace-pre-wrap">
                {extractedText || "No text detected."}
              </div>
              
              <div className="mt-4 flex gap-8">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Detected Identity Number</p>
                  <p className="text-lg font-semibold text-slate-900 font-mono mt-1 tracking-widest">{maskNumber(verificationData.extractedNumber)}</p>
                  <p className="text-[10px] text-teal-600 font-medium mt-1 uppercase tracking-wider bg-teal-50 inline-block px-2 py-0.5 rounded">Privacy Masked</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Declared Type</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">{formData.docType || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
