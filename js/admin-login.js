const supabaseClient = supabase.createClient(
  'https://lflnsswvlxjpikphdcxz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmbG5zc3d2bHhqcGlrcGhkY3h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5MjQ5NjMsImV4cCI6MjA4MzUwMDk2M30.QqoOA6qfv1fU11OMWl3vBw9EnZjmisSqK1Y0SO7ij0E'
);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('userid').value.trim();
    const password = document.getElementById('password').value;

    const { data, error } = await supabaseClient.rpc('admin_login', {
      p_username: username,
      p_password: password
    });

    // ❌ 서버 오류
    if (error) {
      console.error(error);
      alert('서버 오류가 발생했습니다.');
      return;
    }

    // ❌ 로그인 실패
    if (!data || data.length === 0) {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      return;
    }

    // ✅ 로그인 성공
    sessionStorage.setItem('admin_logged_in', 'true');
	sessionStorage.setItem('admin_login_time', Date.now().toString());

    alert('관리자 로그인 성공');
    window.location.href = 'index.html';
  });
});