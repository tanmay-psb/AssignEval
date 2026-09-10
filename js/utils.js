function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
}
function formatDateTime(d) {
  return new Date(d).toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
}

function getTimeRemaining(deadlineStr) {
  const diff = new Date(deadlineStr) - new Date();
  if (diff <= 0) return { expired:true, text:'Deadline Passed', cls:'urgent' };
  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);
  let text, cls;
  if (days > 2)       { text = `${days}d ${hours}h remaining`;  cls = 'normal'; }
  else if (days > 0)  { text = `${days}d ${hours}h remaining`;  cls = 'warning'; }
  else if (hours > 0) { text = `${hours}h ${mins}m remaining`;  cls = 'urgent'; }
  else                { text = `${mins}m remaining`;             cls = 'urgent'; }
  return { expired:false, text, cls };
}

function getCountdownParts(deadlineStr) {
  const diff = Math.max(0, new Date(deadlineStr) - new Date());
  return {
    days:  String(Math.floor(diff / 86400000)).padStart(2,'0'),
    hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2,'0'),
    mins:  String(Math.floor((diff % 3600000)  / 60000)).padStart(2,'0'),
    secs:  String(Math.floor((diff % 60000)    / 1000)).padStart(2,'0'),
    expired: diff === 0
  };
}

function isOverdue(d) { return new Date(d) < new Date(); }

function getEffectiveStatus(assignment) {
  const sub = getSubmission(assignment.id);
  if (sub || assignment.status === 'submitted') return 'submitted';
  if (assignment.status === 'overdue' || isOverdue(assignment.deadline)) return 'overdue';
  return 'pending';
}

function statusBadge(status) {
  const map = {
    submitted: { label:'Submitted', cls:'badge-success', icon:'✓' },
    pending:   { label:'Pending',   cls:'badge-warning', icon:'⏳' },
    overdue:   { label:'Overdue',   cls:'badge-danger',  icon:'✗' }
  };
  return map[status] || map.pending;
}

function getCourseById(id)     { return COURSES.find(c => c.id === id); }
function getAssignmentById(id) { return ASSIGNMENTS.find(a => a.id === id); }
function getAssignmentsByCourse(courseId) { return ASSIGNMENTS.filter(a => a.courseId === courseId); }

function getStudentStats() {
  let submitted = 0, overdue = 0, totalScore = 0, scored = 0;
  ASSIGNMENTS.forEach(a => {
    const s = getEffectiveStatus(a);
    if (s === 'submitted') {
      submitted++;
      const sub = getSubmission(a.id);
      const sc  = sub ? sub.score : a.score;
      if (sc != null) { totalScore += sc; scored++; }
    }
    if (s === 'overdue') overdue++;
  });
  return {
    total: ASSIGNMENTS.length, submitted, overdue,
    pending: ASSIGNMENTS.length - submitted - overdue,
    avgScore: scored ? Math.round(totalScore / scored) : 0
  };
}

function getUpcomingDeadlines(n = 5) {
  return ASSIGNMENTS
    .filter(a => getEffectiveStatus(a) === 'pending')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, n);
}

function scoreColor(s) {
  if (s >= 80) return 'high';
  if (s >= 60) return 'mid';
  return 'low';
}

function renderSidebar(activePage) {
  const student = getCurrentStudent();
  const stats   = getStudentStats();
  const navItems = [
    { id:'dashboard',  label:'Dashboard',    icon:'🏠', href:'dashboard.html' },
    { id:'todo',       label:'To-Do List',   icon:'✅', href:'todo.html' },
    { id:'results',    label:'Results',      icon:'📊', href:'results.html' },
    { id:'profile',    label:'My Profile',   icon:'👤', href:'profile.html' }
  ];
  return `
  <aside class="sidebar">
    <div class="sidebar-logo">
      <div class="logo-badge">
        <div class="logo-icon">🎓</div>
        <div class="logo-text">
          <div class="logo-title">AES</div>
          <div class="logo-sub">Assignment Eval System</div>
        </div>
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section-label">Navigation</div>
      ${navItems.map(item => `
        <a href="${item.href}" class="nav-item ${activePage === item.id ? 'active' : ''}">
          <span class="nav-icon">${item.icon}</span>
          <span>${item.label}</span>
          ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
        </a>
      `).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-student">
        <div class="avatar">${student ? student.initials : 'S'}</div>
        <div class="student-info">
          <div class="student-name">${student ? student.name : 'Student'}</div>
          <div class="student-id">${student ? student.id : ''}</div>
        </div>
      </div>
      <button class="logout-btn" onclick="logout()">
        <span>🚪</span><span>Logout</span>
      </button>
    </div>
  </aside>`;
}

function renderTopbar(title, subtitle) {
  const student = getCurrentStudent();
  const pendingCourses = COURSES.filter(c => getAssignmentsByCourse(c.id).some(a => getEffectiveStatus(a) === 'pending'));
  const notificationsHTML = pendingCourses.length > 0 
    ? pendingCourses.map(c => `<div style="padding:12px 16px;border-bottom:1px solid var(--neutral-200);font-size:14px;">You have pending assignments in <b>${c.name}</b>.</div>`).join('')
    : `<div style="padding:12px 16px;font-size:14px;color:var(--neutral-500);">No notifications</div>`;

  return `
  <header class="topbar">
    <div class="topbar-left">
      <div class="page-title">${title}</div>
      ${subtitle ? `<div class="page-subtitle">${subtitle}</div>` : ''}
    </div>
    <div class="topbar-right" style="position:relative;">
      <div class="topbar-notif" title="Notifications" onclick="toggleNotif(event)">
        🔔${pendingCourses.length > 0 ? `<span class="notif-dot"></span>` : ''}
      </div>
      <div id="notifDropdown" style="display:none;position:absolute;top:45px;right:40px;width:320px;background:#ffffff;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.1);z-index:999;border:1px solid var(--neutral-200);overflow:hidden;text-align:left;">
        <div style="padding:12px 16px;background:var(--cream-50);font-weight:700;border-bottom:1px solid var(--neutral-200);color:var(--neutral-900);">Notifications</div>
        <div style="max-height:300px;overflow-y:auto;color:var(--neutral-700);">
           ${notificationsHTML}
        </div>
      </div>
      <div class="topbar-avatar" title="${student ? student.name : ''}">${student ? student.initials : 'S'}</div>
    </div>
  </header>`;
}

function toggleNotif(event) {
  event.stopPropagation();
  const dd = document.getElementById('notifDropdown');
  if (dd) {
    dd.style.display = dd.style.display === 'block' ? 'none' : 'block';
  }
}

document.addEventListener('click', function(e) {
  const dd = document.getElementById('notifDropdown');
  if (dd && !e.target.closest('#notifDropdown')) {
    dd.style.display = 'none';
  }
});
