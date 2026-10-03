// Mock Backend Service (LocalStorage DB) for Hackathon Presentation
// This simulates a real database, JWT Auth, and REST APIs entirely in the browser.

const DB_KEY = 'docverify_submissions';
const AUTH_KEY = 'docverify_officer_token';

// ==========================================
// DB SCHEMA / MIGRATION (Simulated)
// ==========================================
export const initDB = () => {
  // ONE-TIME CLEANUP SCRIPT: Wipe existing demo data from user's browser storage
  if (!localStorage.getItem('docverify_v2_clean')) {
    localStorage.setItem(DB_KEY, JSON.stringify([]));
    localStorage.setItem('docverify_v2_clean', 'true');
  } else if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify([]));
  }
};

// ==========================================
// AUTHENTICATION APIs
// ==========================================
export const loginOfficer = async (email, password) => {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 800));
  
  if ((email === 'officer1@test.com' || email === 'officer2@test.com') && password === 'password123') {
    const token = btoa(JSON.stringify({ email, role: email === 'officer1@test.com' ? 'admin' : 'officer', exp: Date.now() + 86400000 }));
    localStorage.setItem(AUTH_KEY, token);
    return { success: true, token, user: { email, role: email === 'officer1@test.com' ? 'admin' : 'officer' } };
  }
  throw new Error("Invalid credentials");
};

export const logoutOfficer = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const getOfficerSession = () => {
  const token = localStorage.getItem(AUTH_KEY);
  if (!token) return null;
  try {
    const data = JSON.parse(atob(token));
    if (data.exp < Date.now()) {
      logoutOfficer();
      return null;
    }
    return data;
  } catch(e) {
    return null;
  }
};

// ==========================================
// SUBMISSION APIs
// ==========================================
export const saveSubmission = async (submissionData) => {
  const db = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
  const newSubmission = {
    submission_id: `SUB-${Date.now().toString().slice(-6)}`,
    ...submissionData,
    submitted_at: new Date().toISOString(),
    officer_status: 'pending',
    officer_remarks: '',
    assigned_officer: null,
    reviewed_at: null
  };
  db.unshift(newSubmission);
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  return newSubmission;
};

export const getSubmissions = async () => {
  return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
};

export const updateOfficerStatus = async (submissionId, updates) => {
  const session = getOfficerSession();
  if (!session) throw new Error("Unauthorized");

  const db = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
  const index = db.findIndex(s => s.submission_id === submissionId);
  if (index === -1) throw new Error("Not found");

  db[index] = { 
    ...db[index], 
    ...updates, 
    assigned_officer: session.email,
    reviewed_at: new Date().toISOString()
  };
  
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  return db[index];
};

initDB();
