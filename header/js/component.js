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