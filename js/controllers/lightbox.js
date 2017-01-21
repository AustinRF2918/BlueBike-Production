var blueBikeApplication = angular.module("BlueBikeLandingPage", ['ngAnimate']);

blueBikeApplication.controller("lightboxController", function($scope){
    //Focused style
    $scope.focused = "col-lg-2";

    //Nonfocused style
    $scope.unfocused = "col-lg-1";

    //Number of photo/types in gallery.
    $scope.selectionNumber = 3;

    //Mapping of selection numbers to
    $scope.selectionMap = {0 : $('#medium-phone'), 1 : $('#medium-desktop'), 2: $('#medium-laptop')}

    //Names of s.
    $scope.names = ["The Card Buggy", "Milford Accounting", "Karen Polzin"]

    //Mapping of  names to link lists, with selection number as the number of possibiities.
    $scope.assetMap = {
	"The Card Buggy" : {
	    "images": ["img/CardBuggy/CardbuggyMobile.png", "img/CardBuggy/cardbuggypurchase.png", "img/CardBuggy/cardbuggycontact.png"],
	    "url": "http://www.cardbuggy.com"
	},

	"Milford Accounting" : {
	    "images": ["img/MilfordAccounting/milfordmobile.png", "img/MilfordAccounting/milfordabout.png", "img/MilfordAccounting/milfordaccountingcontact.png"],
	    "url": "http://www.milfordaccounting.com"
	},

	"Karen Polzin" : {
	    "images": ["img/KarenPolzin/karenpolzinmobile.png", "img/KarenPolzin/karenpolzinlaptop.png", "img/KarenPolzin/karenpolzinmodeling.png"],
	    "url": "http://www.karenpolzin.com"
	},

	"The Card Buggy" : {
	    "images": ["img/CardBuggy/CardbuggyMobile.png", "img/CardBuggy/cardbuggypurchase.png", "img/CardBuggy/cardbuggycontact.png"],
	    "url": "http://www.cardbuggy.com"
	},

	"Milford Accounting" : {
	    "images": ["img/MilfordAccounting/milfordmobile.png", "img/MilfordAccounting/milfordabout.png", "img/MilfordAccounting/milfordaccountingcontact.png"],
	    "url": "http://www.milfordaccounting.com"
	},

	"Karen Polzin" : {
	    "images": ["img/KarenPolzin/karenpolzinmobile.png", "img/KarenPolzin/karenpolzinlaptop.png", "img/KarenPolzin/karenpolzinmodeling.png"],
	    "url": "http://www.karenpolzin.com"
	}
    }

    $scope.toggleLightbox = function(arguments) {
	if (!$scope.lightboxActive && arguments != "close") {
	    $scope.lightboxActive = !$scope.lightboxActive;

	    for (var i = 1; i < $scope.selectionNumber; i++) {
		makeSmaller($scope.selectionMap[i], $scope.focused, $scope.unfocused)
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

	if ($scope.lightboxActive && arguments == "close") {
	    $scope.lightboxActive = !$scope.lightboxActive;
	    $scope.currentImageBuffer = 0;
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

    if (optionalCallback != null) {
	setTimeout(function(){
	    $selector.switchClass(focused, nonFocused, 250, "easeInOutQuad");
	    optionalCallback(optionalSelector, nonFocused, focused);
	});
    }
};

var makeLarger = function($selector, nonFocused, focused, optionalCallback) {
    if ($selector.hasClass(nonFocused)) {
	$selector.switchClass(nonFocused, focused, 250, "easeInOutQuad");
    }
};



