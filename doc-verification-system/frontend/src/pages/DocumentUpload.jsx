import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, Image as ImageIcon, X, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function DocumentUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState({
    docType: 'Aadhaar',
    source: 'Photo',
    name: '',
    dob: '',
    idNumber: ''
  });

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) handleFile(droppedFile);
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) handleFile(selectedFile);
  };

  const handleFile = (selectedFile) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const startVerification = () => {
    if (preview && consent) {
      navigate('/bidder/processing', { 
        state: { 
          image: preview, 
          fileName: file.name,
          formData: formData
        } 
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 pb-20">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900">New Document Verification</h2>
        <p className="text-slate-500 mt-1">Provide document details and upload a clear image for live AI validation.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b pb-2">1. Document Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Document Type</label>
            <select name="docType" value={formData.docType} onChange={handleFormChange} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-teal-500 focus:border-teal-500">
              <option value="Aadhaar">Aadhaar Card</option>
              <option value="PAN">PAN Card</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Image Source</label>
            <select name="source" value={formData.source} onChange={handleFormChange} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-teal-500 focus:border-teal-500">
              <option value="Photo">Phone Camera Photo</option>
              <option value="Scan">Flatbed Scan</option>
              <option value="DigiLocker">DigiLocker PDF / Screenshot</option>
              <option value="WhatsApp">WhatsApp / Compressed Image</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name (As on ID)</label>
            <input type="text" name="name" value={formData.name} onChange={handleFormChange} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-teal-500 focus:border-teal-500" placeholder="e.g. Rahul Sharma" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ID Number</label>
            <input type="text" name="idNumber" value={formData.idNumber} onChange={handleFormChange} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-teal-500 focus:border-teal-500" placeholder="XXXX XXXX 1234" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b pb-2">2. Upload Document</h3>
        {!file ? (
          <div 
            className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:bg-slate-50 transition-colors cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload').click()}
          >
            <input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleChange}
            />
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <UploadCloud className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Upload ID Image</h3>
            <p className="text-sm text-slate-500 mb-4">Supported formats: JPG, PNG (Max 5MB)</p>
            <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-50">
              Select Image
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border border-slate-200 rounded-lg p-4 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-4">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-16 h-16 object-cover rounded-md border border-slate-300" />
                ) : (
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-slate-900">{file.name}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
                    <span className="flex items-center gap-1 text-teal-600">
                      <CheckCircle2 className="w-4 h-4" /> Ready for Live OCR Scanning
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => { setFile(null); setPreview(null); }}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" id="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="w-4 h-4 text-teal-600 bg-slate-100 border-slate-300 rounded focus:ring-teal-500 focus:ring-2" />
              <label htmlFor="consent" className="text-sm text-slate-600 font-medium cursor-pointer">
                I consent to having my ID document scanned and temporarily processed for verification.
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button 
                onClick={() => { setFile(null); setPreview(null); }}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                disabled={!consent}
                onClick={startVerification}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Verification
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
