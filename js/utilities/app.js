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

//Creates a hook to a page that toggles a class if on a certain LinkID.
//startPoint: Element on the DOM that we will designate as our starting point, or,
//when it is scrolled into view, fire our class toggle.
//stopPoint: Construct a range for the element that startPoint designates to this
//element.
//linkID: Element that we are going to do class toggling on.
//ssCont: the controller that we initialized and are putting our hook into.
//offset: Offset variable for toggling: refer to original scrollspy offset.
//className: Class that we are toggling.
var createPageHook = function(startPoint, stopPoint, linkID, ssCont, offset, className){
    new ScrollMagic.Scene({
	offset: $(startPoint).offset().top - offset,
	duration: $(stopPoint).offset().top - $(startPoint).offset().top
    })
    .setClassToggle(linkID, className)
    .addTo(ssCont);
};

//Creates a hook to a page that toggles a class if on a certain LinkID.
//startPoint: Element on the DOM that we will designate as our starting point, or,
//when it is scrolled into view, fire our class toggle.
//stopPoint: Construct a range for the element that startPoint designates to this
//element.
//linkID: Element that we are going to do class toggling on.
//ssCont: the controller that we initialized and are putting our hook into.
//offset: Offset variable for toggling: refer to original scrollspy offset.
//className: Class that we are toggling.
var createPageHookNumericRange = function(startPoint, stopPoint, linkID, ssCont, offset, className){
    new ScrollMagic.Scene({
	offset: startPoint -  offset,
	duration: stopPoint - startPoint
    })
    .setClassToggle(linkID, className)
    .addTo(ssCont);
};
//Hooking of components.
    //Initialization of ScrollMagic
    console.log("[DEBUG] Initializing ScrollMagic plugin...");
    var controller = new ScrollMagic.Controller();
    console.log("[DEBUG] ScrollMagic has been initialized.");
    console.log("[DEBUG] Beginning hook process...");
	console.log("[DEBUG] Hooking test-class-home to navbar on body to about range.");
	createPageHookNumericRange(0, 100, '.navbar', controller, 70, "viewing-home");
	console.log("[DEBUG] Hooked.");

	console.log("[DEBUG] Hooking test-class-about to navbar on about to medias range.");
	createPageHook('#about', '#medias', '.navbar', controller, 0, "viewing-other");
	createPageHook('#about', '#medias', '.navbar-two', controller, 0, "viewing-other");
	console.log("[DEBUG] Hooked.");

	console.log("[DEBUG] Hooking test-class-medias to navbar on medias to portfolio range.");
	createPageHook('#medias', '#portfolio', '.navbar', controller, 0, "viewing-other");
	console.log("[DEBUG] Hooked.");

	console.log("[DEBUG] Hooking test-class-portfolio to navbar on portfolio to contact range.");
	createPageHook('#portfolio', '#contact', '.navbar', controller, 0, "viewing-other");
	console.log("[DEBUG] Hooked.");

	console.log("[DEBUG] Hooking test-class-contact to navbar on contact to footer range.");
	createPageHook('#contact', '#footer-bottom', '.navbar', controller, 0, "viewing-other");
	console.log("[DEBUG] Hooked.");

$(".element-is-loading").removeClass("element-is-loading");

//Program "starting point"
$(document).ready(function(){
    console.log("[DEBUG] Document initialized.");


    

});
