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
