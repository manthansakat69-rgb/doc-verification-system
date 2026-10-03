import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import OfficerLogin from './pages/OfficerLogin';
import OfficerLayout from './layouts/OfficerLayout';
import BidderLayout from './layouts/BidderLayout';
import OfficerDashboard from './pages/OfficerDashboard';
import VerificationDashboard from './pages/VerificationDashboard';
import DocumentUpload from './pages/DocumentUpload';
import ProcessingScreen from './pages/ProcessingScreen';
import SubmissionSuccess from './pages/SubmissionSuccess';
import VerificationResult from './pages/VerificationResult';
import CrossDocumentVerification from './pages/CrossDocumentVerification';
import ComplianceReport from './pages/ComplianceReport';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/officer/login" element={<OfficerLogin />} />
        
        {/* Bidder Flow */}
        <Route element={<BidderLayout />}>
          <Route path="/bidder/dashboard" element={<VerificationDashboard />} />
          <Route path="/bidder/upload" element={<DocumentUpload />} />
          <Route path="/bidder/processing" element={<ProcessingScreen />} />
          <Route path="/bidder/success" element={<SubmissionSuccess />} />
          <Route path="/bidder/result" element={<VerificationResult />} />
        </Route>

        {/* Officer Flow */}
        <Route element={<OfficerLayout />}>
          <Route path="/officer/dashboard" element={<OfficerDashboard />} />
          <Route path="/officer/result" element={<VerificationResult />} />
          <Route path="/officer/compare" element={<CrossDocumentVerification />} />
          <Route path="/officer/report" element={<ComplianceReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
