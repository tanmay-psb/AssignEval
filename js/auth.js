const AUTH_KEY = 'aaes_student';
const SUBS_KEY  = 'aaes_submissions';

function login(studentId, password) {
  const s = STUDENTS.find(x => x.id === studentId && x.password === password);
  if (!s) return { success: false, error: 'Invalid Student ID or Password.' };
  const { password: _, ...safe } = s;
  localStorage.setItem(AUTH_KEY, JSON.stringify(safe));
  return { success: true, student: safe };
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = 'index.html';
}

function getCurrentStudent() {
  const d = localStorage.getItem(AUTH_KEY);
  return d ? JSON.parse(d) : null;
}

function checkAuth() {
  const s = getCurrentStudent();
  if (!s) { window.location.href = 'index.html'; return null; }
  return s;
}

function getSubmissions() {
  const d = localStorage.getItem(SUBS_KEY);
  return d ? JSON.parse(d) : {};
}

function saveSubmission(assignmentId, data) {
  const subs = getSubmissions();
  subs[assignmentId] = { ...data, submittedAt: new Date().toISOString() };
  localStorage.setItem(SUBS_KEY, JSON.stringify(subs));
}

function getSubmission(assignmentId) {
  return getSubmissions()[assignmentId] || null;
}
