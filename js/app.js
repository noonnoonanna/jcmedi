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

// 1. 공지사항 데이터 로드 및 렌더링
async function fetchMainNotices() {
    const { data, error } = await _supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(2); // 메인에는 최근 2개만 노출

    const listContainer = document.getElementById('noticeList');
    if (data) {
        listContainer.innerHTML = data.map(n => `
            <div class="notice-item">
                <a href="notice_view.html?id=${n.id}" class="item-title">${n.title}</a>
                <p class="item-desc">${n.content}</p>
                <span class="item-date">${n.created_at.split('T')[0]}</span>
            </div>
        `).join('');
    }
}

// 2. 카카오 지도 설정
function initMap() {
    const container = document.getElementById('kakaomap');
    const options = {
        center: new kakao.maps.LatLng(37.467261780026, 127.1370822871), // 회사 위경도 입력
        level: 3
    };
    const map = new kakao.maps.Map(container, options);

    // 마커 추가
    const markerPosition = new kakao.maps.LatLng(37.467261780026, 127.1370822871);
    const marker = new kakao.maps.Marker({ position: markerPosition });
    marker.setMap(map);
}

// 초기화 실행
window.onload = () => {
    fetchMainNotices();
    initMap();
};

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
