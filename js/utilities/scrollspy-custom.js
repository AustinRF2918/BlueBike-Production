//Reusable code stuff.

var scrollList = 6;
var sectionMap = {};
var elementList = [$(".introduction"), $(".portfolio"), $(".about"), $(".medias"), $(".contact")];

$(document).ready(function(){
    for (var i = 1; i < scrollList; i++)
    {
	sectionMap[createIdentifier(i).attr('id')] = applyRules(i);
    }

    window.addEventListener('scroll', function(event){
    setTimeout(scrollPage, 250);
    });
});


function scrollPage(){

    sy = window.pageYOffset;
    for (var i = 1; i < scrollList; i++)
    {
	var currentIterable = createIdentifier(i);

	var upperBound = elementList[i - 1].position().top + elementList[i - 1].height();

	var portion = $(createIdentifier(i));

	var lowerBound = elementList[i - 1].offset().top;


	if (sy <= upperBound && sy >= lowerBound)
	{
	    $('#navbar-generic').addClass(sectionMap[currentIterable.attr('id')])
	}
	else if (sy > upperBound || sy < lowerBound)
	{
	    $('#navbar-generic').removeClass(sectionMap[currentIterable.attr('id')])
	}
    }

};



//Decompositional functions.
var applyRules = function(numeric)
{
    return makeBEMClass(mapToDOMAttribute(createIdentifier(numeric), 'href'), "-viewing");
}

var createIdentifier = function(numeric)
{
    return $('#nav-' + numeric);
};

var mapToDOMAttribute = function($DOMAttribute, attribute)
{
    return $DOMAttribute.attr(attribute);
};

var isActive = function($identifier)
{
    return $identifier.hasClass('active');
};

var notActive = function($identifier)
{
    return !$identifier.hasClass('active');
};

var removeIdentifier = function(selector)
{

    if (selector[0] == '#')
    {
	return selector.split("#")[1];
    }
    else
    {
	return selector;
    }
};

var makeBEMClass = function(selector, addition)
{
    return classGenerator(selector, removeIdentifier, addition);
};

var classGenerator = function(selector, functor, BEMAddition)
{
    return (functor(selector) + BEMAddition);
};

