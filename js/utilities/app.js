var transitTime = 0;
var navStatus = false;
$(".hover-icon").hide();


$("#navbar-mobile-toggler").mousedown(function(){
    if (navStatus == false)
    {
	offset = $(this).offset();
	height = 40;

	$(".bb-navbar-toggle").addClass("bb-navbar-enabled", transitTime, "easeInElastic");
	$(".bb-navbar-toggle").addClass("bb-navbar-toggle-active", transitTime, "easeInElastic");
	$(".bb-navbar-toggle").removeClass("bb-navbar-disabled", transitTime, "easeOutElastic");
	$(".bb-navbar-toggle").removeClass("bb-navbar-toggle-inactive", transitTime, "easeOutElastic");
	navStatus = true;
    }
    else
    {
	$(".bb-navbar-toggle").addClass("bb-navbar-disabled", transitTime, "easeInElastic");
	$(".bb-navbar-toggle").addClass("bb-navbar-toggle-inactive", transitTime, "easeInElastic");
	$(".bb-navbar-toggle").removeClass("bb-navbar-enabled", transitTime, "easeInElastic");
	$(".bb-navbar-toggle").removeClass("bb-navbar-toggle-active", transitTime, "easeInElastic");
	navStatus = false;
    }
	
});

