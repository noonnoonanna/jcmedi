const supabaseClient = supabase.createClient(
  'https://lflnsswvlxjpikphdcxz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmbG5zc3d2bHhqcGlrcGhkY3h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5MjQ5NjMsImV4cCI6MjA4MzUwMDk2M30.QqoOA6qfv1fU11OMWl3vBw9EnZjmisSqK1Y0SO7ij0E'
);

async function checkAdmin() {
  const { data } = await supabaseClient.auth.getUser();
  if (data.user) {
    document.querySelectorAll('.admin-only')
      .forEach(el => el.classList.add('show'));
  }
}

function showLogin() {
  const email = prompt('Admin Email');
  const password = prompt('Password');
  supabaseClient.auth.signInWithPassword({ email, password })
    .then(() => location.reload());
}

checkAdmin();

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
	console.log(23);
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
	console.log(1);
  });
});
