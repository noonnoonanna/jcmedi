const supabaseClient = supabase.createClient(
  'https://lflnsswvlxjpikphdcxz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmbG5zc3d2bHhqcGlrcGhkY3h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5MjQ5NjMsImV4cCI6MjA4MzUwMDk2M30.QqoOA6qfv1fU11OMWl3vBw9EnZjmisSqK1Y0SO7ij0E'
);

(function () {
  const LIMIT = 1000 * 60 * 60 * 2; // 2시간
  const loginTime = sessionStorage.getItem('admin_login_time');
  const isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';

  let valid = false;

  if (isLoggedIn && loginTime) {
    if (Date.now() - Number(loginTime) <= LIMIT) {
      valid = true;
    } else {
      // 3시간 초과 → 조용히 로그아웃
      sessionStorage.removeItem('admin_logged_in');
      sessionStorage.removeItem('admin_login_time');
    }
  }

  // 버튼 제어
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-admin-only]').forEach(el => {
      el.style.display = valid ? '' : 'none';
    });
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
	hamburger.textContent = nav.classList.contains('active') ? '✕' : '☰';
  });
  
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      hamburger.textContent = '☰';
    });
  });
  
});
