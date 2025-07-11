
document.addEventListener('DOMContentLoaded', function () {
  // ✅ 스크롤 시 header에 fixed 클래스 토글
  function scrollCheck() {
    const scrollTop = window.scrollY;
    const header = document.querySelector('.header');
    if (!header) return;

    if (scrollTop > 0) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  }

  scrollCheck();
  window.addEventListener('scroll', scrollCheck);

  // ✅ GNB hover/focus로 menu_over 토글
  const header = document.querySelector('.header');
  const gnbArea = document.querySelector('.header .gnb_wrap');
  const loginBtn = document.querySelector('.btn_login');

  if (gnbArea && header) {
    // 마우스 진입 시
    gnbArea.addEventListener('mouseenter', () => {
      console.log('mouseenter on .gnb_wrap');
      header.classList.add('menu_over');
    });

    // 포커스 진입 시 (키보드 탐색)
    gnbArea.addEventListener('focusin', () => {
      console.log('focusin on .gnb_wrap');
      header.classList.add('menu_over');
    });
  }

  if (header) {
    // 마우스가 header 전체에서 빠져나갔을 때
    header.addEventListener('mouseleave', () => {
      console.log('mouseleave from .header');
      header.classList.remove('menu_over');
    });
  }

  if (loginBtn && header) {
    loginBtn.addEventListener('focusin', () => {
      console.log('focusin on .btn_login');
      header.classList.remove('menu_over');
    });
  }
});
