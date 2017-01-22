var blueBikeApplication = angular.module("BlueBikeLandingPage", ['ngAnimate']);

blueBikeApplication.controller("lightboxController", function($scope){
    //Focused style
    $scope.focused = "col-lg-2";

    //Nonfocused style
    $scope.unfocused = "col-lg-1";


    //Mapping of selection numbers to
    $scope.selectionMap = {0 : $('#medium-phone'), 1 : $('#medium-desktop'), 2: $('#medium-laptop')}


    //Mapping of  names to link lists, with selection number as the number of possibiities.
    $scope.assetMap = {
	"The Card Buggy" : {
	    "images": ["img/cardbuggy1.png", "img/cardbuggy2.png", "img/cardbuggy3.png"],
	    "url": "http://www.thecardbuggy.com"
	},

	"Milford Accounting" : {
	    "images": ["img/milf1.png", "img/milf2.png", "img/milf3.png"],
	    "url": "http://www.milfordaccounting.com"
	},

	"Juventus" : {
	    "images": ["img/juveskin1.png", "img/juveskin2.png", "img/juveskin3.png"],
	    "url": "http://www.juveskin.com"
	},

	"Stonewater Subdivision" : {
	    "images": ["img/stone1.png", "img/stone2.png", "img/stone3.png"],
	    "url": "http://www.stonewatersub.org"
	},

	"WIWD Foundation" : {
	    "images": ["img/wiwd1.png", "img/wiwd2.png", "img/wiwd3.png"],
	    "url": ""
	},

	"T-Burkes Paing Company" : {
	    "images": ["img/burke1.png", "img/burke2.png", "img/burke3.png"],
	    "url": ""
	}
    }


    $scope.selectionNumber = 3;
    $scope.names = []

    for (var itemNum = 0; itemNum < Object.keys($scope.assetMap).length; itemNum++) {
	keys = Object.keys($scope.assetMap);
	$scope.names.push(keys[itemNum]);
    }

    $scope.toggleLightbox = function(arguments) {
	if (!$scope.lightboxActive && arguments != "close") {
	    $scope.lightboxActive = !$scope.lightboxActive;

	    for (var i = 1; i < $scope.selectionNumber; i++) {
		try {
		    makeSmaller($scope.selectionMap[i], $scope.focused, $scope.unfocused)
		} catch(e) {
		}
	    }

	    makeLarger($scope.selectionMap[0], $scope.unfocused, $scope.focused)

	    
	    $scope.nameBufferNumeric = arguments - 1;
	    $scope.nameBuffer = $scope.names[arguments - 1];
	    $scope.imageBufferList = $scope.assetMap[$scope.nameBuffer].images;
	    $scope.url = $scope.assetMap[$scope.nameBuffer].url;
	    $scope.imageBuffer = $scope.imageBufferList[0];

	    $('.lightbox-image').hide();
	    $('.loader-image').show();

	    $('.lightbox-image').on('load', function(){
		$('.lightbox-image').show();
		$('.loader-image').hide();
	    });

	    window.setTimeout(function(){
		$('.lightbox-image').show();
		$('.loader-image').hide();
	    }, 7000);
	}

	$scope.currentImageBuffer = 0;
	if ($scope.lightboxActive && arguments == "close") {
	    $scope.lightboxActive = !$scope.lightboxActive;
	}
    };

    $scope.setMediaBuffer = function(numeric) {
	if (numeric < $scope.selectionNumber && $scope.selectionNumber > 0 && $scope.currentImageBuffer  != numeric) {
	    rotateImages($scope.selectionMap[$scope.currentImageBuffer], $scope.selectionMap[numeric], $scope.focused, $scope.unfocused);
	} 

	window.setTimeout(function(){
	    $('.lightbox-image').show();
	    $('.loader-image').hide();
	}, 7000);

	$('.lightbox-image').hide();
	$('.loader-image').show();

	$('.lightbox-image').on('load', function(){
	    $('.lightbox-image').show();
	    $('.loader-image').hide();
	});

	$scope.currentImageBuffer = numeric;
	$scope.imageBuffer = $scope.imageBufferList[numeric];
    };

    $scope.setMediaBufferKeyboard = function() {
	if ($scope.currentImageBuffer == $scope.selectionNumber) {
	    $scope.currentImageBuffer = 0;
	} else {
	    $scope.currentImageBuffer += 1;
	}
    };

    $scope.initializeLightbox = function(){
	$('body').keypress(function(e) {
	    $scope.$apply(function(){
		if (e.key === "ArrowLeft" && $scope.currentImageBuffer != 0) {
		    $scope.setMediaBuffer($scope.currentImageBuffer - 1);
		}

		if (e.key === "ArrowRight" && $scope.currentImageBuffer != $scope.selectionNumber - 1) {
		    $scope.setMediaBuffer($scope.currentImageBuffer + 1);
		}
	    });
	});
    };
});

var rotateImages = function($selectorOne, $selectorTwo, focused, nonFocused) {
    makeSmaller($selectorOne, focused, nonFocused, makeLarger, $selectorTwo);
};

//Utility functions.
var makeSmaller = function($selector, focused, nonFocused, optionalCallback, optionalSelector) {
    if ($selector.hasClass(focused)) {
	$selector.switchClass(focused, nonFocused, 250, "easeInOutQuad");
    }

    try{
	if (optionalCallback != null) {
	    $selector.switchClass(focused, nonFocused, 250, "easeInOutQuad");
	    optionalCallback(optionalSelector, nonFocused, focused);
	}
    } catch (e) {
    }
};

var makeLarger = function($selector, nonFocused, focused, optionalCallback) {
    if ($selector.hasClass(nonFocused)) {
	$selector.switchClass(nonFocused, focused, 250, "easeInOutQuad");
    }
};



