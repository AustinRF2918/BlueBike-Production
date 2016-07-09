var blueBikeApplication = angular.module("BlueBikeLandingPage", ['ngAnimate']);

var Some = function(obj){
    this.enumValue = 0;
    this.internal_object = obj;
};

Some.prototype.unwrap = function()
{
    return this.internal_object;
};

var None = function(){
    this.enumValue = 1;
};

None.prototype.unwrap = function()
{
    console.log("Error: Attempted to unwrap none object.");
    return null;
};

var Result = function(resultType){
    if (resultType.enumValue == 0 || resultType.enumValue == 1)
    {
	self.internal_result = resultType;
    }
    else
    {
	console.log("Error: Attempted to pass nonresult type to Result.");
    }
};

Result.prototype.resultType = function()
{
    if (self.internal_result.enumValue === 0)
    {
	return "Some";
    }
    else
    {
	return "None";
    }
};

Result.prototype.unwrap = function()
{
    return self.internal_result.unwrap();
};

var Lightbox = function(debug){
    this.isDebug = debug;
    this.internalLightboxCore = new LightboxCore(debug);
    this.internalLightboxMapper = new LightboxMapper(debug);
};

Lightbox.prototype.getAttribute = function(str)
{
    internalObjects = [this.internalLightboxCore, this.internalLightboxMapper];

    for (var i = 0; i < internalObjects.length; i++)
    {
	var retVal = internalObjects[i].getAttribute(str);

	if (retVal.resultType() == "Some")
	{
	    return retVal;
	}
    };
    return new Result(new None());
};

Lightbox.prototype.debugDisplay = function()
{
    internalObjects = [this.internalLightboxCore, this.internalLightboxMapper];
    for (var i = 0; i < internalObjects.length; i++)
    {
	internalObjects[i].debugDisplay();
    }
};

Lightbox.prototype.addName = function(str)
{
    this.internalLightboxMapper.addName(str);
};

Lightbox.prototype.pushImage = function(str, src)
{
    this.internalLightboxMapper.pushImage(str, src);
};

Lightbox.prototype.getKey = function(str)
{
    return this.internalLightboxMapper.getKey(str);
};

var LightboxCore = function(debug){
    return (function(){
	var debugEnabled = debug;
	var isActive = false;
	var nameBuffer = "";
	var imageBufferList = "";
	var imageBuffer = "";
	var currentImageBuffer = 0;

	attribute = function(name)
	{
	    try{
		val = eval(name);
		return(new Result(new Some(val)));
	    }
	    catch(e){
		return(new Result(new None()));
	    }
	};

	if (debugEnabled)
	    console.log("Lightbox initialized.");

	return{
	    getAttribute: function(str)
	    {
		if (debugEnabled)
		    console.log("Calling getAttribute method on Lightbox object.");
		    console.log("LIGHTBOX: " + str + " :" +  attribute(str).resultType());

		return new attribute(str);
	    },

	    debugDisplay: function()
	    {
		console.log(debugEnabled);
		console.log(isActive);
		console.log(nameBuffer);
		console.log(imageBufferList);
		console.log(imageBuffer);
		console.log(currentImageBuffer);
	    }
	};
    })();
};

var LightboxMapper = function(debug)
{
    return (function (){
	var internalMap = {};
	var isDebug = debug;

	if (isDebug)
	    console.log("Lightbox mapper initialized.");

	var attribute = function(name)
	{
	    try{
		return(new Result(new Some(eval(name))));
	    }
	    catch(e){
		return(new Result(new None()));
	    }
	};

	var getKey = function(name)
	{
	    if (name in internalMap)
	    {
		return new Result(new Some(internalMap[name]));
	    }
	    else
	    {
		return new Result(new None());
	    }
	};

	var addName = function(name)
	{
	    if (getKey(name).resultType() == "Some")
	    {
		console.log("Attempted to pass existing name into lightboxMapper.");
	    }
	    else if (getKey(name).resultType() == "None")
	    {
		internalMap[name] = [];
	    }
	};

	var pushImage = function(name, key)
	{
	    if (getKey(name).resultType() == "None")
	    {
		console.log("Attempted to push image to name which does not exist.");
	    }
	    else if (getKey(name).resultType() == "Some")
	    {
		internalMap[name].push(key);
	    }
	};

	return{
	    addName: addName,
	    pushImage: pushImage,
	    getKey: getKey,

	    debugDisplay: function()
	    {
		console.log(internalMap);
		console.log(isDebug);
	    },

	    getAttribute: function(str)
	    {

		if (isDebug)
		    console.log("Calling getAttribute method on LightboxMap object.");
		    console.log("LIGHTBOXMAPPER: " + str + " :" +  attribute(str).resultType());

		return new attribute(str);
	    }
	};
    })();
}

blueBikeApplication.controller("lightboxController", function($scope){
    $scope.localLightbox = new Lightbox(true);

    $scope.lightboxActive = $scope.localLightbox.getAttribute("isActive").unwrap();
    $scope.nameBuffer = $scope.localLightbox.getAttribute("nameBuffer").unwrap();
    $scope.imageBufferList = $scope.localLightbox.getAttribute("imageBufferList").unwrap();
    $scope.imageBuffer = $scope.localLightbox.getAttribute("imageBuffer").unwrap();
    $scope.currentImageBuffer = $scope.localLightbox.getAttribute("currentImageBuffer").unwrap();


    $scope.localLightbox.addName("The Card Buggy");
    $scope.localLightbox.pushImage("The Card Buggy", "img/CardBuggy/CardbuggyMobile.png");
    $scope.localLightbox.pushImage("The Card Buggy", "img/CardBuggy/CardbuggyMobile.png");
    $scope.localLightbox.pushImage("The Card Buggy", "img/CardBuggy/CardbuggyMobile.png");

    $scope.localLightbox.addName("Milford Accounting");
    $scope.localLightbox.pushImage("Milford Accounting", "img/CardBuggy/CardbuggyMobile.png");
    $scope.localLightbox.pushImage("Milford Accounting", "img/CardBuggy/CardbuggyMobile.png");
    $scope.localLightbox.pushImage("Milford Accounting", "img/CardBuggy/CardbuggyMobile.png");

    $scope.localLightbox.addName("Karen Polzin");
    $scope.localLightbox.pushImage("Karen Polzin", "img/CardBuggy/CardbuggyMobile.png");
    $scope.localLightbox.pushImage("Karen Polzin", "img/CardBuggy/CardbuggyMobile.png");
    $scope.localLightbox.pushImage("Karen Polzin", "img/CardBuggy/CardbuggyMobile.png");

    $scope.localLightbox.debugDisplay();

    //CUSTOM VARIABLES
	//Focused style
	$scope.focused = "col-md-2";

	//Nonfocused style
	$scope.unfocused = "col-md-1";

	//Number of photo/types in gallery.
	$scope.selectionNumber = 3;

	//Mapping of selection numbers to
	$scope.selectionMap = {0 : $('#medium-phone'), 1 : $('#medium-desktop'), 2: $('#medium-laptop')}

	//Names of s.
	$scope.names = ["The Card Buggy", "Milford Accounting", "Karen Polzin"]

	//Mapping of  names to link lists, with selection number as the number of possibiities.
	$scope.assetMap = {"The Card Buggy" : ["img/CardBuggy/CardbuggyMobile.png", "img/CardBuggy/cardbuggypurchase.png", "img/CardBuggy/cardbuggycontact.png"],
			    "Milford Accounting" : ["img/MilfordAccounting/milfordmobile.png", "img/MilfordAccounting/milfordabout.png", "img/MilfordAccounting/milfordaccountingcontact.png"],
			    "Karen Polzin" : ["img/KarenPolzin/karenpolzinmobile.png", "img/KarenPolzin/karenpolzinlaptop.png", "img/KarenPolzin/karenpolzinmodeling.png"]}

    //Define another function that sets src values.
    $scope.toggleLightbox = function(arguments)
    {
	if (!$scope.lightboxActive && arguments != "close")
	{
	    $scope.lightboxActive = !$scope.lightboxActive;
	    for (var i = 1; i < $scope.selectionNumber; i++)
	    {
		makeSmaller($scope.selectionMap[i], $scope.focused, $scope.unfocused)
	    }

	    makeLarger($scope.selectionMap[0], $scope.unfocused, $scope.focused)

	    $scope.nameBufferNumeric = arguments - 1;
	    $scope.nameBuffer = $scope.names[arguments - 1];
	    $scope.imageBufferList = $scope.assetMap[$scope.nameBuffer];
	    $scope.imageBuffer = $scope.imageBufferList[0];

	    //console.log("Showing lightbox");
	    //console.log("Toggling Lightbox: ", arguments);
	}

	if ($scope.lightboxActive && arguments == "close")
	{
	    $scope.lightboxActive = !$scope.lightboxActive;
	    $scope.currentImageBuffer = 0;
	    //console.log("Hiding lightbox");
	}
    };

    $scope.setMediaBuffer = function(numeric)
    {
	if (numeric < $scope.selectionNumber && $scope.selectionNumber > 0 && $scope.currentImageBuffer  != numeric)
	{
	    rotateImages($scope.selectionMap[$scope.currentImageBuffer], $scope.selectionMap[numeric], $scope.focused, $scope.unfocused);
	}
	else
	{
	    //console.log("Media buffer at invalid position.")
	}

	//console.log("Seting currentImageBuffer: ", numeric);
	$scope.currentImageBuffer = numeric;
	$scope.imageBuffer = $scope.imageBufferList[numeric];
    };

    $scope.setMediaBufferKeyboard = function()
    {
	console.log("Changing mediaBuffer location.");
	//Right Boundary
	if ($scope.currentImageBuffer == $scope.selectionNumber)
	{
	    $scope.currentImageBuffer = 0;
	}
	else
	{
	    $scope.currentImageBuffer += 1;
	}
    };
    $scope.initializeLightbox = function(){

    $('body').keypress(function(e)
    {
	$scope.$apply(function(){
	    if (e.key === "ArrowLeft" && $scope.currentImageBuffer != 0)
	    {
		$scope.setMediaBuffer($scope.currentImageBuffer - 1);
	    }

	    if (e.key === "ArrowRight" && $scope.currentImageBuffer != $scope.selectionNumber - 1)
	    {
		$scope.setMediaBuffer($scope.currentImageBuffer + 1);
	    }
	});
    });
    };
});

var rotateImages = function($selectorOne, $selectorTwo, focused, nonFocused)
{
    makeSmaller($selectorOne, focused, nonFocused,
		makeLarger, $selectorTwo);
};

//Utility functions.
var makeSmaller = function($selector, focused, nonFocused, optionalCallback, optionalSelector)
{
    if ($selector.hasClass(focused))
    {
	$selector.switchClass(focused, nonFocused, 250, "easeInOutQuad");
    }

    if (optionalCallback != null)
	{
	setTimeout(function(){
	    $selector.switchClass(focused, nonFocused, 250, "easeInOutQuad");
	    optionalCallback(optionalSelector, nonFocused, focused);
	});
    }

};

var makeLarger = function($selector, nonFocused, focused, optionalCallback)
{
    if ($selector.hasClass(nonFocused))
    {
	$selector.switchClass(nonFocused, focused, 250, "easeInOutQuad");
    }
};


