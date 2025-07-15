
// document.addEventListener('DOMContentLoaded', function () {
//   // ✅ 스크롤 시 header에 fixed 클래스 토글
//   function scrollCheck() {
//     const scrollTop = window.scrollY;
//     const header = document.querySelector('.header');
//     if (!header) return;

//     if (scrollTop > 0) {
//       header.classList.add('fixed');
//     } else {
//       header.classList.remove('fixed');
//     }
//   }

//   scrollCheck();
//   window.addEventListener('scroll', scrollCheck);

//   // ✅ GNB hover/focus로 menu_over 토글
//   const header = document.querySelector('.header');
//   const gnbArea = document.querySelector('.header .gnb_wrap');
//   const loginBtn = document.querySelector('.btn_login');

//   if (gnbArea && header) {
//     // 마우스 진입 시
//     gnbArea.addEventListener('mouseenter', () => {
//       console.log('mouseenter on .gnb_wrap');
//       header.classList.add('menu_over');
//     });

//     // 포커스 진입 시 (키보드 탐색)
//     gnbArea.addEventListener('focusin', () => {
//       console.log('focusin on .gnb_wrap');
//       header.classList.add('menu_over');
//     });
//   }

//   if (header) {
//     // 마우스가 header 전체에서 빠져나갔을 때
//     header.addEventListener('mouseleave', () => {
//       console.log('mouseleave from .header');
//       header.classList.remove('menu_over');
//     });
//   }

//   if (loginBtn && header) {
//     loginBtn.addEventListener('focusin', () => {
//       console.log('focusin on .btn_login');
//       header.classList.remove('menu_over');
//     });
//   }
// });


$(document).ready(function () {    
	
	var preUrl = document.referrer;
	
	if(preUrl.indexOf('/mbrs/entr/retrieveMbrsModView.do') > -1 || preUrl.indexOf('/mbrs/pswd/retrievePswdChngView.do') > -1 || preUrl.indexOf('/mbrs/sece/retrieveMbrsSeceView.do') > -1) 
	{
		history.pushState(null,null,location.href);
	}
	
	window.onpopstate = function(event) {
		history.go(1);
	};
		    
    $wrap = $("#wrap"),
    $header = $(".header"),
    $depth1 = $(".topmenu .depth1"),
    $schLayer = $(".sch_layer"),
    $goTop = $(".quick_nav"),
    $footer = $(".footer")

    //header fixed
    fix(".header")  
    $("#skipNav a").on("click", function(){        
        $("html,body").stop().animate({
            scrollTop: 0
        }, 800)
    })

    //gnb
    gnb(1)
    
    
    //search
    $(".btn_sch_open").on("click", function () {
        $schLayer.add($header).addClass(AC)  
    })
    $(".btn_sch_close, .btn_allmenu").on("click", function () {
        $schLayer.add($header).removeClass(AC)
    })   
    
    // footer
    $(".relate_site .title").on("click", function () {          
        active(this, "toggle", 1)        
    }) 

    //quick_nav
    $(".quick_nav .title").on("click", function () {  
      active(this, "toggle", 1, ".quick_nav")     
    }) 

    
    // 탭갯수를 구해 클래스 부여(반응형)
    var tabLi = $(".content .depth4 li")
    tabLi.each(function () {
        $(this).parent().addClass("num" + tabLi.length + "")
    })
    var tabDepthLi = $(".content .depth5 li")
    tabDepthLi.each(function () {
        $(this).parent().addClass("num" + tabDepthLi.length + "")
    })
    // web accessibility
    $("[class*='xi-']").attr("aria-hidden", "true")
    $("a[target='_blank']").attr("title", "새창으로 열림")

    //팝업레이어 
    var $popLayer = $(".popup_wrap")
    var $clickPoint //클릭포인트
    $(".popup_open").on("click", function (e) {
        $popLayer.attr("tabindex", 0).fadeIn().focus();
        e.preventDefault();
        //$clickPoint = $(this);
    })
    $popLayer.find(".popup_close").add(".close").on("click", function () {
        $popLayer.fadeOut();
        //$clickPoint.focus();
        //$("html").removeClass("noscroll");        
    })
    
    

    //팝업레이어2 
    var $datePop
    
    var $clickPoint2 //클릭포인트
    $(".popup_open2").on("click", function (e) {
    	$dataPop = $("."+$(this).data('id')+""); 
    	$dataPop.attr("tabindex", 0).fadeIn().focus();
        e.preventDefault();
        $clickPoint2 = $(this);
    })
    $popLayer.find(".popup_close2").on("click", function () {
        $popLayer.fadeOut();
        $clickPoint2.focus();     
    })
    


})





var AC = "active"
  , FX = "fixed";
function mobile() {
    return window.innerWidth < 1024 ? 1 : 0
}
function fix(elem) {
    $(window).on("scroll", (function() {
        var scrollT = $(window).scrollTop();
        scrollT > $header.height() ? $goTop.add(elem).addClass(FX) : 0 == scrollT && $goTop.add(elem).removeClass(FX),
        scrollT > $footer.offset().top - $(window).height() ? $goTop.addClass("stick") : $goTop.removeClass("stick")
    }
    )),
    $goTop.add("#skipNav a").on("click", (function(e) {
        $("html,body").stop().animate({
            scrollTop: 0
        }, 800)
    }
    ))
}
function active(elem, toggle, anyClick, acTarget) {
    var $elem = $(elem)
      , $elemTarget = acTarget ? $elem.parents(acTarget) : $elem.parent();
    if ("toggle" == toggle) {
        $elemTarget.toggleClass(AC);
        var txt = $elemTarget.hasClass(AC) ? " 닫기" : " 열기";
        $elem.attr("title", "" + $elem.text() + txt)
    } else if ("accordion" == toggle) {
        anyClick = 0,
        $elemTarget.toggleClass(AC).siblings().removeClass(AC);
        var txt = $elem.parent().hasClass(AC) ? "확장됨" : "축소됨";
        $elem.attr("title", "" + txt).parent().siblings().children("a").attr("title", "축소됨")
    } else
        $elemTarget.addClass(AC).siblings().removeClass(AC),
        $elemTarget.find(".close").on("click", (function() {
            $elemTarget.removeClass(AC),
            $elem.attr("title", $elem.text() + " 열기")
        }
        ));
    anyClick && $("body").on("click", (function(e) {
        $(e.target).hasClass(AC) || ($elemTarget.removeClass(AC),
        $elem.attr("title", $elem.text() + " 열기"))
    }
    )),
    event.stopPropagation(),
    event.preventDefault()
}
function gnb(full) {
    var FLM = "fullmenu"
      , ALL = "allmenu"
      , $topM = $(".topmenu");
    full ? ($topM.addClass(FLM),
    $topM.on("mouseenter focusin", (function() {
        $wrap.hasClass(ALL) || $header.add($depth1).addClass(AC)
    }
    )).on("mouseleave", (function() {
        $wrap.hasClass(ALL) || $header.add($depth1).removeClass(AC)
    }
    )),
    $depth1.on("mouseenter focusin", (function() {
        $(this).addClass("on")
    }
    )).on("mouseleave focusout", (function() {
        $(this).removeClass("on")
    }
    ))) : $depth1.on("mouseenter focusin", (function() {
        $wrap.hasClass(ALL) || ($header.addClass(AC),
        $(this).addClass(AC).siblings().removeClass(AC))
    }
    )).on("mouseleave", (function() {
        $wrap.hasClass(ALL) || ($schLayer.hasClass(AC) || $header.removeClass(AC),
        $(this).removeClass(AC))
    }
    )),
    $topM.find(".depth1>a").on("click keydown", (function(e) {
        mobile() && active(this),
        9 == e.keyCode && e.shiftKey && $header.add($depth1).removeClass(AC)
    }
    )).next().find("a:last").on("keydown", (function(e) {
        9 == e.keyCode && $header.add($depth1).removeClass(AC)
    }
    )),
    $(".depth3").each((function() {
        $(this).parent().addClass("is-depth3")
    }
    )),
    $header.on("click", ".is-depth3>a", (function() {
        mobile() && active(this, "toggle")
    }
    )),
    $(".btn_allmenu").on("click", (function() {
        $wrap.addClass(ALL),
        full && $topM.removeClass(FLM),
        mobile() && $depth1.eq(liNum).addClass(AC)
    }
    )),
    $(".nav .pop_close").click((function() {
        $wrap.removeClass(ALL),
        $depth1.removeClass(AC),
        full && $topM.addClass(FLM)
    }
    ));
    var liNum = "0";
    $depth1.each((function() {
        $(this).children("a").hasClass(AC) && (liNum = $(this).index())
    }
    ))
}
function tabs(elem, cont) {
    $(elem).attr("title", "선택된 탭메뉴").parent().addClass(AC).siblings().removeClass(AC).children().attr("title", "비활성 탭메뉴"),
    cont && ($(elem.hash).show().siblings("div").hide(),
    event.preventDefault())
}
function scrollAC(cont, tab) {
    var $tab = $(tab), tabTop, contTop, headH, tabH, scrollT;
    $(cont).length && (tab && (tabTop = $tab.offset().top),
    $(window).on("load scroll", (function() {
        headH = $header.height(),
        tabH = $tab.outerHeight(!0),
        scrollT = $header.hasClass(FX) ? $(window).scrollTop() + headH : $(window).scrollTop(),
        tabTop < scrollT ? $tab.addClass(FX) : $tab.removeClass(FX),
        $(cont).each((function(i) {
            (contTop = $(this)[0].getBoundingClientRect().top) <= $(window).height() && $(this).addClass(AC),
            $header.hasClass(FX) ? docT = headH + tabH : docT = tabH,
            contTop <= docT + 10 && $tab.find("li").eq(i).children().attr("title", "선택된 탭메뉴").parent().addClass(AC).siblings().children().attr("title", "비활성 탭메뉴").parent().removeClass(AC)
        }
        )),
        $(cont).eq(0).addClass(AC)
    }
    ))),
    $tab.find("li>a").on("click", (function(e) {
        scrollT = $header.hasClass(FX) ? headH + tabH : tabH,
        $("html,body").stop().animate({
            scrollTop: $(this.hash).offset().top - scrollT
        }, 800),
        e.preventDefault()
    }
    ))
}
