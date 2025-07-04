// 토글 기능 구현
        document.addEventListener('DOMContentLoaded', function() {
            // 토글 가능한 모든 메뉴 항목 선택 (off 클래스가 없는 항목들)
            const toggleLinks = document.querySelectorAll('.link_2th:not(.off)');
            
            toggleLinks.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // 현재 클릭된 링크의 다음 형제 요소 (서브메뉴) 찾기
                    const submenu = this.nextElementSibling;
                    
                    if (submenu && submenu.classList.contains('lm_3th')) {
                        // 토글 상태 확인
                        const isCollapsed = this.classList.contains('collapsed');
                        
                        if (isCollapsed) {
                            // 메뉴 열기
                            this.classList.remove('collapsed');
                            submenu.classList.add('show');
                        } else {
                            // 메뉴 닫기
                            this.classList.add('collapsed');
                            submenu.classList.remove('show');
                        }
                    }
                });
            });

            // 서브메뉴 항목 클릭 이벤트
            const submenuLinks = document.querySelectorAll('.lm_3th a');
            
            submenuLinks.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // 모든 서브메뉴 항목에서 active 클래스 제거
                    submenuLinks.forEach(function(item) {
                        item.classList.remove('active');
                    });
                    
                    // 클릭된 항목에 active 클래스 추가
                    this.classList.add('active');
                    
                    // 여기에 실제 페이지 이동이나 콘텐츠 로드 로직 추가 가능
                    console.log('선택된 메뉴:', this.textContent.trim());
                });
            });

            // 초기 상태 설정 - 모든 서브메뉴를 닫힌 상태로 시작
            const allSubmenus = document.querySelectorAll('.lm_3th');
            const allToggleLinks = document.querySelectorAll('.link_2th:not(.off)');
            
            allSubmenus.forEach(function(submenu) {
                submenu.classList.remove('show');
            });
            
            allToggleLinks.forEach(function(link) {
                link.classList.add('collapsed');
            });

            // 선택적으로 첫 번째 서브메뉴를 열린 상태로 시작하고 싶다면 아래 주석 해제
            // if (allToggleLinks.length > 0 && allSubmenus.length > 0) {
            //     allToggleLinks[0].classList.remove('collapsed');
            //     allSubmenus[0].classList.add('show');
            // }
        });

        // 아코디언 스타일로 만들고 싶다면 (하나만 열리도록)
        function accordionToggle() {
            const toggleLinks = document.querySelectorAll('.link_2th:not(.off)');
            
            toggleLinks.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const submenu = this.nextElementSibling;
                    const isCollapsed = this.classList.contains('collapsed');
                    
                    // 모든 메뉴 닫기
                    toggleLinks.forEach(function(otherLink) {
                        if (otherLink !== link) {
                            otherLink.classList.add('collapsed');
                            const otherSubmenu = otherLink.nextElementSibling;
                            if (otherSubmenu && otherSubmenu.classList.contains('lm_3th')) {
                                otherSubmenu.classList.remove('show');
                            }
                        }
                    });
                    
                    // 현재 메뉴 토글
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
        }



document.addEventListener("DOMContentLoaded", function () {
    const menuButtons = document.querySelectorAll(".menu-btn");

    menuButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation(); // 다른 클릭 무시

            const dropdown = btn.nextElementSibling;
            const isOpen = dropdown.classList.contains("show");

            // 모든 드롭다운 닫고 버튼 active 해제
            document.querySelectorAll(".dropdown-menu").forEach(menu => menu.classList.remove("show"));
            document.querySelectorAll(".menu-btn").forEach(b => b.classList.remove("active"));

            // 현재 메뉴 다시 열기
            if (!isOpen) {
                dropdown.classList.add("show");
                btn.classList.add("active");
            }
        });
    });

    // 바깥쪽 클릭 시 모두 닫기
    document.addEventListener("click", function () {
        document.querySelectorAll(".dropdown-menu").forEach(menu => menu.classList.remove("show"));
        document.querySelectorAll(".menu-btn").forEach(b => b.classList.remove("active"));
    });
});