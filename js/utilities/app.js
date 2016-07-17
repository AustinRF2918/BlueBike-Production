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

//Sanity test.
var switchClass = function(className, elementSelector, r)
{
    if (r === true)
    {
	return function(){
	$("#" + className).addClass(elementSelector);
	};
    }
    else
    {
	return function(){
	$("#" + className).removeClass(elementSelector);
	};
    }
};

//Autogeneration of waypoints.
//Selector is ID of element.
//Function is a lambda that will run when function is scrolled into view.
var generateWaypoint = function(viewSelector, className, elementSelector, r){
    return (new Waypoint.Inview({
	element: document.getElementById(viewSelector),

	enter: switchClass(className, elementSelector, r),

	exit: function()
	{
	    this.destroy();
	}
    }));
};

var generateClassOnView = function(elementName, className){
    return generateWaypoint(elementName, elementName, className);
};

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
//This will only fire once on a page.
//startPoint: Element on the DOM that we will designate as our starting point, or,
//when it is scrolled into view, fire our class toggle.
//stopPoint: Construct a range for the element that startPoint designates to this
//element.
//linkID: Element that we are going to do class toggling on.
//ssCont: the controller that we initialized and are putting our hook into.
//offset: Offset variable for toggling: refer to original scrollspy offset.
//className: Class that we are toggling.
var createPageHookOneShot = function(startPoint, stopPoint, linkID, ssCont, offset, className){
    new ScrollMagic.Scene({
	offset: $(startPoint).offset().top - offset,
	duration: $(stopPoint).offset().top - $(startPoint).offset().top
    })
    .setClassToggle(linkID, className)
    .addTo(ssCont)
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

var controller = new ScrollMagic.Controller();

createPageHookNumericRange(0, 100, '.navbar', controller, 70, "viewing-home");
createPageHook('#about', '#medias', '.navbar', controller, 0, "viewing-other");
createPageHook('#about', '#medias', '.navbar-two', controller, 0, "viewing-other");
createPageHook('#medias', '#portfolio', '.navbar', controller, 0, "viewing-other");
createPageHook('#portfolio', '#contact', '.navbar', controller, 0, "viewing-other");
createPageHook('#contact', '#footer-bottom', '.navbar', controller, 0, "viewing-other");

$(".element-is-loading").removeClass("element-is-loading");

//Program "starting point"
$(document).ready(function(){
    console.log("[DEBUG] Document initialized.");

    generateClassOnView('card-one', 'wait', false);
    generateClassOnView('card-two', 'wait', false);
    generateClassOnView('card-three', 'wait', false);

    generateClassOnView('Cardbuggy', 'wait', false);
    generateClassOnView('Milford', 'wait', false);
    generateClassOnView('Karen', 'wait', false);
    
    generateClassOnView('icon-instagram', 'wait', false);
    generateClassOnView('icon-facebook', 'wait', false);
    generateClassOnView('icon-twitter', 'wait', false);

    window.setTimeout(function(){$('.btn-learn-more').removeClass('bounceInUp')}, 500);
});

