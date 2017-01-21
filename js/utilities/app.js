var transitTime = 0;

//Make call by references to make reusable.
var enableMobileNavigation = function(fn)
{
    offset = $(this).offset();
    height = 40;

    $(".bb-navbar-toggle").addClass("bb-navbar-enabled", transitTime, "easeInElastic");
    $(".bb-navbar-toggle").addClass("bb-navbar-toggle-active", transitTime, "easeInElastic");
    $(".bb-navbar-toggle").removeClass("bb-navbar-disabled", transitTime, "easeOutElastic");
    $(".bb-navbar-toggle").removeClass("bb-navbar-toggle-inactive", transitTime, "easeOutElastic");

    if (fn)
    {
	fn();
    }
};

//Make call by references to make reusable.
var disableMobileNavigation = function(fn)
{
    $(".bb-navbar-toggle").addClass("bb-navbar-disabled", transitTime, "easeInElastic");
    $(".bb-navbar-toggle").addClass("bb-navbar-toggle-inactive", transitTime, "easeInElastic");
    $(".bb-navbar-toggle").removeClass("bb-navbar-enabled", transitTime, "easeInElastic");
    $(".bb-navbar-toggle").removeClass("bb-navbar-toggle-active", transitTime, "easeInElastic");

    if (fn)
    {
	fn();
    }
};



var NavbarModule = (function() {
    var state = 0;
    var togglerEvents = [];
    var togglerElement;

    var _functionWrapper = function(event, stateIn, stateOut, functor) {
	$(togglerElement).bind(event, function(){
	    if (stateIn === state){
		functor(function(){window.setTimeout(function(){state = stateOut}, 50)});
	    }
	});
    };

    var _pushEvent = function(event, stateIn, stateOut, functor) {
	if (togglerElement) {
	    togglerEvents.push(_functionWrapper(event, stateIn, stateOut, functor));
	}
	else {
	    throw "Attempted to push event to NavbarModule when togglerElement is undefined";
	}
    };

    var _addHandler = function(handler) {
	if (!togglerElement) {
	    togglerElement = handler;
	}
	else {
	    throw "Attempted to pass handler to NavbarModule when handler is already defined.";
	}
    };

    return {
	pushEvent: _pushEvent,
	addHandler: _addHandler
    };
})();

$(".hover-icon").hide();

NavbarModule.addHandler($("#navbar-mobile-toggler").mousedown());
NavbarModule.pushEvent("click", 0, 1, enableMobileNavigation);
NavbarModule.pushEvent("click", 1, 0, disableMobileNavigation);


var generateClassAdder = function(className, elementSelector) {
    return function(){ $("#" + className).addClass(elementSelector);};
};

var generateClassRemover = function(className, elementSelector) {
    return function(){ $("#" + className).removeClass(elementSelector);};
};

var switchClass = function(className, elementSelector, r)
{
    return r ? classGenerator = generateClassAdder(className, elementSelector) : classGenerator = generateClassRemover(className, elementSelector);
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

    $(".wait").each(function(item) {
	generateClassOnView(this.id, 'wait', false);
    });

    window.setTimeout(function(){$('.btn-learn-more').removeClass('bounceInUp')}, 500);
    window.setTimeout(function(){$('.hide-before-load').removeClass('hide-before-load')}, 5);
});

