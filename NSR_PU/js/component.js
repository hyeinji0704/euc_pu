
/**
 * 공통 UI 스크립트
 * - 헤더 고정
 * - GBN 메뉴 인터랙션
 * - 아코디언 메뉴
 * - 드롭다운 버튼
 * - 셀렉트 메뉴
 * - 탭
 * - 날짜 선택기
 * - 숫자 입력 필드
 */

document.addEventListener('DOMContentLoaded', function () {
  // ✅ 아코디언 메뉴 (link_2th + lm_3th)
  const toggleLinks = document.querySelectorAll('.link_2th:not(.off)');
  toggleLinks.forEach(function (link) {
    link.classList.add('collapsed');
    const submenu = link.nextElementSibling;
    if (submenu?.classList.contains('lm_3th')) {
      submenu.classList.remove('show');
    }

    link.addEventListener('click', function (e) {
      e.preventDefault();
      const isCollapsed = this.classList.contains('collapsed');

      // 모든 닫기 (아코디언)
      toggleLinks.forEach(function (other) {
        if (other !== link) {
          other.classList.add('collapsed');
          const otherSub = other.nextElementSibling;
          if (otherSub?.classList.contains('lm_3th')) {
            otherSub.classList.remove('show');
          }
        }
      });

      // 토글
      if (submenu && submenu.classList.contains('lm_3th')) {
        if (isCollapsed) {
          this.classList.remove('collapsed');
          submenu.classList.add('show');
        } else {
          this.classList.add('collapsed');
          submenu.classList.remove('show');
        }
      }
    });
  });

  // ✅ 서브메뉴 클릭 시 active
  const submenuLinks = document.querySelectorAll('.lm_3th a');
  submenuLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      submenuLinks.forEach(el => el.classList.remove('active'));
      this.classList.add('active');
      console.log('선택된 메뉴:', this.textContent.trim());
    });
  });

  // ✅ 드롭다운 버튼
  const menuButtons = document.querySelectorAll('.menu_btn');
  menuButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const dropdown = btn.nextElementSibling;
      const isOpen = dropdown.classList.contains("show");

      document.querySelectorAll(".dropdown_menu").forEach(menu => menu.classList.remove("show"));
      document.querySelectorAll(".menu_btn").forEach(b => b.classList.remove("active"));

      if (!isOpen) {
        dropdown.classList.add("show");
        btn.classList.add("active");
      }
    });
  });

  document.addEventListener("click", function () {
    document.querySelectorAll(".dropdown_menu").forEach(menu => menu.classList.remove("show"));
    document.querySelectorAll(".menu_btn").forEach(b => b.classList.remove("active"));
  });

  // ✅ 모든 .select_search에 대해 각각 처리
document.querySelectorAll('.select_search').forEach(function (selectBox) {
  const label = selectBox.querySelector('.select_search__label');
  const options = selectBox.querySelectorAll('.select_search__item');

  // 옵션 클릭 시: 텍스트 반영하고 닫기
  options.forEach(function (option) {
    option.addEventListener('click', function () {
      label.innerHTML = option.textContent;
      selectBox.classList.remove('active');
    });
  });

  // 라벨 클릭 시: 셀렉트 박스 열기/닫기
  label.addEventListener('click', function () {
    if (selectBox.classList.contains('view_mode')) return;
    selectBox.classList.toggle('active');
  });
});

// ✅ Date Picker
$( "#reign_start, #reign_end").datepicker();

//한글적용을 위해 추가
 $.datepicker.setDefaults({
        dateFormat: 'yymmdd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });

  // ✅ 하위 탭 바인딩 함수
  function initInnerTabs(scope = document) {
    const innerTabWraps = scope.querySelectorAll('.inner_tab_wrap');

    innerTabWraps.forEach(innerTabWrap => {
      const innerTabItems = innerTabWrap.querySelectorAll('.inner_tab_list .inner_tab_item');
      const innerTabContents = innerTabWrap.querySelectorAll('.inner_tab_content');

      innerTabItems.forEach(tab => {
        tab.addEventListener('click', function () {
          innerTabItems.forEach(t => t.classList.remove('active'));
          innerTabContents.forEach(c => c.classList.remove('active'));
          this.classList.add('active');
          const target = innerTabWrap.querySelector('#' + this.dataset.tab);
          if (target) target.classList.add('active');
        });
      });
    });
  }

  // ✅ 상위 탭 기능 + 하위 탭 동시 초기화
  const tabWrap = document.querySelector('.tab_wrap');
  if (tabWrap) {
    const tabItems = tabWrap.querySelectorAll('.tab_list .tab_item');
    const tabContents = tabWrap.querySelectorAll('.tab_content');

    tabItems.forEach(tab => {
      tab.addEventListener('click', function () {
        tabItems.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        this.classList.add('active');

        const target = tabWrap.querySelector('#' + this.dataset.tab);
        if (target) {
          target.classList.add('active');
          initInnerTabs(target); // 해당 상위 탭 콘텐츠에 속한 하위 탭 바인딩
        }
      });
    });

    // 페이지 최초 로드 시 첫 번째 탭의 하위 탭 바인딩
    const firstActive = tabWrap.querySelector('.tab_content.active');
    if (firstActive) initInnerTabs(firstActive);
  }

  // ✅ 숫자 입력 필드
  document.querySelectorAll('.custom_number_wrap').forEach(function (wrap) {
    const input = wrap.querySelector('.custom_number_input');
    const btnMinus = wrap.querySelector('.btn_number.minus');
    const btnPlus = wrap.querySelector('.btn_number.plus');
    const min = parseFloat(input.getAttribute('min')) || 0;
    const max = parseFloat(input.getAttribute('max')) || 9999;
    const step = parseFloat(input.getAttribute('step')) || 1;

    btnMinus.addEventListener('click', function () {
      let val = parseFloat(input.value) || min;
      if (val > min) {
        let next = val - step;
        if (next < min) next = min;
        input.value = Number(next).toFixed(step % 1 === 0 ? 0 : 1);
      }
    });

    btnPlus.addEventListener('click', function () {
      let val = parseFloat(input.value) || min;
      if (val < max) {
        let next = val + step;
        if (next > max) next = max;
        input.value = Number(next).toFixed(step % 1 === 0 ? 0 : 1);
      }
    });

    input.addEventListener('input', function () {
      let val = parseFloat(input.value) || min;
      if (val < min) input.value = min;
      if (val > max) input.value = max;
    });
  });
});
