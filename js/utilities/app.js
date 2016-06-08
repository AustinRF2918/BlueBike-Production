var transitTime = 0;
var navStatus = false;
$(".hover-icon").hide();


$("#navbar-mobile-toggler").mousedown(function(){
    if (navStatus == false)
    {
	enableMobileNavigation();
	
    }
    else
    {
	disableMobileNavigation();
    }
	
});

//Make call by references to make reusable.
var enableMobileNavigation = function()
{
    offset = $(this).offset();
    height = 40;

    $(".bb-navbar-toggle").addClass("bb-navbar-enabled", transitTime, "easeInElastic");
    $(".bb-navbar-toggle").addClass("bb-navbar-toggle-active", transitTime, "easeInElastic");
    $(".bb-navbar-toggle").removeClass("bb-navbar-disabled", transitTime, "easeOutElastic");
    $(".bb-navbar-toggle").removeClass("bb-navbar-toggle-inactive", transitTime, "easeOutElastic");
    navStatus = true;
};

//Make call by references to make reusable.
var disableMobileNavigation = function()
{
    $(".bb-navbar-toggle").addClass("bb-navbar-disabled", transitTime, "easeInElastic");
    $(".bb-navbar-toggle").addClass("bb-navbar-toggle-inactive", transitTime, "easeInElastic");
    $(".bb-navbar-toggle").removeClass("bb-navbar-enabled", transitTime, "easeInElastic");
    $(".bb-navbar-toggle").removeClass("bb-navbar-toggle-active", transitTime, "easeInElastic");
    navStatus = false;
};

var disableConditionalMobileNavigation = function()
{
    if (navStatus == true)
    {
	disableMobileNavigation();
    }
};

$(window).resize(function(){
    disableConditionalMobileNavigation();
});

$(window).scroll(function(){
    disableConditionalMobileNavigation();
});



