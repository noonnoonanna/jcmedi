const supabaseClient = supabase.createClient(
  'https://lflnsswvlxjpikphdcxz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmbG5zc3d2bHhqcGlrcGhkY3h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5MjQ5NjMsImV4cCI6MjA4MzUwMDk2M30.QqoOA6qfv1fU11OMWl3vBw9EnZjmisSqK1Y0SO7ij0E'
);

 let valid = false;
  
(function () {
  const LIMIT = 1000 * 60 * 60 * 2; // 2시간
  const loginTime = sessionStorage.getItem('admin_login_time');
  const isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';

  if (isLoggedIn && loginTime) {
    if (Date.now() - Number(loginTime) <= LIMIT) {
      valid = true;
    } else {
      // 2시간 초과 → 조용히 로그아웃
      sessionStorage.removeItem('admin_logged_in');
      sessionStorage.removeItem('admin_login_time');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-admin-only]').forEach(el => {
      el.style.display = valid ? '' : 'none';
    });
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const navItems = document.querySelectorAll('.nav-item');

  // 1. 햄버거 메뉴 토글 (열기/닫기)
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.toggle('active');
    hamburger.textContent = nav.classList.contains('active') ? '✕' : '☰';
  });

  // 2. 메뉴 항목 클릭 시 동작 (모바일 전용 아코디언)
  navItems.forEach(item => {
    const mainLink = item.querySelector('a');
    
    mainLink.addEventListener('click', function(e) {
      if (window.innerWidth <= 900) {
        const hasSubMenu = item.querySelector('.mobile-sub');
        
        if (hasSubMenu) {
          // 서브메뉴가 있으면 링크 이동을 막고 아코디언 토글
          e.preventDefault(); 
          e.stopPropagation();
          
          //다른 열려있는 메뉴는 닫고 싶다면 아래 주석 해제
          /*
          navItems.forEach(otherItem => {
            if (otherItem !== item) otherItem.classList.remove('open');
          });
          */
          
          item.classList.toggle('open');
        } else {
          // 서브메뉴가 없는 일반 메뉴라면 클릭 시 메뉴창 닫기
          nav.classList.remove('active');
          hamburger.textContent = '☰';
        }
      }
    });
  });

  // 3. 서브메뉴 내부의 진짜 링크를 클릭했을 때만 메뉴창 닫기
  const subLinks = document.querySelectorAll('.mobile-sub a');
  subLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      hamburger.textContent = '☰';
    });
  });

  // 4. 메뉴창 바깥 영역 클릭 시 닫기
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove('active');
      hamburger.textContent = '☰';
    }
  });
});
