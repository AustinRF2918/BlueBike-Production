var navStatus = false;
$(".hover-icon").hide();


$("#navbar-mobile-toggler").mousedown(function(){
    if (navStatus == false)
    {
	offset = $(this).offset();
	height = 40;

	$(".bb-navbar-toggle").css({ top: offset.top + height});
	$( ".bb-navbar-toggle" ).slideDown("slow");
	$( ".bb-navbar" ).addClass("button-on");
	navStatus = !navStatus;
    }
    else
    {
	navStatus = !navStatus;
	$( ".bb-navbar-toggle" ).slideUp("slow", function(){
	    $( ".bb-navbar" ).removeClass("button-on");
	});
    }
	
});

$( window ).resize(function(){
    if (navStatus == true)
    {
	navStatus = !navStatus;
	$( ".bb-navbar-toggle" ).slideUp("slow", function(){
	    $( ".bb-navbar" ).removeClass("button-on");
	});
    }
});

$( window ).scroll(function(){
    if (navStatus == true)
    {
	offset = $("#navbar-mobile-toggler").offset();
	height = 40;
	$(".bb-navbar-toggle").css({ top: offset.top + height});
    }
});

$('#navbar-mobile-toggler').focusout(function(){
    if (navStatus == true)
    {
	navStatus = !navStatus;
	$( ".bb-navbar-toggle" ).slideUp("slow", function(){
	    $( ".bb-navbar" ).removeClass("button-on");
	});
    }
});

$('.portfolio-overlay').mouseover(function(){
    offset = $(this).offset();
    height = $(this).height() / 2.3;
    width = $(this).width() / 2.2;
    $(".hover-icon").css({ top: offset.top + height, left: offset.left + width})
    $(".hover-icon").fadeIn("fast");
});

$('.portfolio-overlay').mouseout(function(){
    $(".hover-icon").hide();
});



