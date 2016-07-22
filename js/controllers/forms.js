blueBikeApplication.controller("formValidator", function($scope, $http){
    $scope.badFlag = false;
    $scope.goodFlag = false;
    
    $scope.name = "";
    $scope.nameGood = false;

    $scope.email = "";
    $scope.emailGood = false;

    $scope.phone = "";
    $scope.phoneGood = false;

    $scope.message = "";
    $scope.messageGood = false;

    
    $scope.submit = function(){
	$http({
	    method: 'POST',
	    url : 'submission.php',
	    data : {
		clientName: $scope.name,
		clientEmail: $scope.email,
		clientPhone: $scope.phone,
		clientMessage: $scope.message
	    }
	});
    };

    $scope.refreshGUIFlags = function()
    {
	if ($scope.nameGood && $scope.emailGood && $scope.phoneGood && $scope.messageGood)
	{
	    $scope.submit();
	    $scope.goodFlag = true;
	    $scope.name = "";
	    $scope.email = "";
	    $scope.phone = "";
	    $scope.message = "";
	    $scope.nameGood = false;
	    $scope.emailGood = false;
	    $scope.messageGood = false;
	    $scope.phoneGood = false;
	}
	else
	{
	    $scope.badFlag = true;

	    if ($scope.nameGood == false)
	    {
		$scope.name = "";
	    }

	    if ($scope.emailGood == false)
	    {
		$scope.email = "";
	    }
	    
	    if ($scope.phoneGood == false)
	    {
		$scope.phone = "";
	    }

	    if ($scope.messageGood == false)
	    {
		$scope.message = "";
	    }
	}
    };

    $scope.resetGUIFlags = function()
    {
	$scope.badFlag = false;
	$scope.goodFlag = false;
    };
    
    $scope.focusForm = function(numeric){
	if (numeric == 1)
	{
	    focusInput($("#name"), $scope.nameGood, "form-valid");
	    defocusInput($("#input"), $scope.messageGood, "form-valid");
	    defocusInput($("#phone"), $scope.phoneGood, "form-valid");
	    defocusInput($("#email"), $scope.emailGood, "form-valid");
	}

	if (numeric == 2)
	{
	    focusInput($("#input"), $scope.messageGood, "form-valid");
	    defocusInput($("#name"), $scope.nameGood, "form-valid");
	    defocusInput($("#phone"), $scope.phoneGood, "form-valid");
	    defocusInput($("#email"), $scope.emailGood, "form-valid");
	}

	if (numeric == 3)
	{
	    focusInput($("#phone"), $scope.phoneGood, "form-valid");
	    defocusInput($("#name"), $scope.nameGood, "form-valid");
	    defocusInput($("#input"), $scope.messageGood, "form-valid");
	    defocusInput($("#email"), $scope.emailGood, "form-valid");
	}

	if (numeric == 4)
	{
	    focusInput($("#email"), $scope.emailGood, "form-valid");
	    defocusInput($("#name"), $scope.nameGood, "form-valid");
	    defocusInput($("#input"), $scope.inputGood, "form-valid");
	    defocusInput($("#phone"), $scope.phoneGood, "form-valid");
	}
	$scope.stylizeButton([$scope.messageGood, $scope.phoneGood, $scope.emailGood, $scope.messageGood]);
    };

    $scope.checkName = function()
    {
	defocusInput($("#input"), $scope.messageGood, "form-valid");
	defocusInput($("#phone"), $scope.phoneGood, "form-valid");
	defocusInput($("#email"), $scope.emailGood, "form-valid");
	if ($scope.name != "" && $scope.name.length > 5)
	{
	    $scope.nameGood = true;
	    stylizeInput($("#name"), "form-invalid", "form-valid", $scope.nameGood);
	}
	else if ($scope.name.length < 2)
	{
	    $scope.nameGood = false;
	    stylizeInput($("#name"), "form-invalid", "form-valid", $scope.nameGood);
	}
	$scope.stylizeButton([$scope.messageGood, $scope.phoneGood, $scope.emailGood, $scope.messageGood]);
    };

    $scope.checkEmail = function()
    {
	defocusInput($("#input"), $scope.messageGood, "form-valid");
	defocusInput($("#phone"), $scope.phoneGood, "form-valid");
	defocusInput($("#name"), $scope.nameGood, "form-valid");
	if ($scope.email != "" && validateEmail($scope.email))
	{
	    $scope.emailGood = true;
	    stylizeInput($("#email"), "form-invalid", "form-valid", $scope.emailGood);
	}
	else 
	{
	    $scope.emailGood = false;
	    stylizeInput($("#email"), "form-invalid", "form-valid", $scope.emailGood);
	}
	$scope.stylizeButton([$scope.messageGood, $scope.phoneGood, $scope.emailGood, $scope.messageGood]);
    };

    $scope.checkPhone = function()
    {
	defocusInput($("#input"), $scope.messageGood, "form-valid");
	defocusInput($("#email"), $scope.emailGood, "form-valid");
	defocusInput($("#name"), $scope.nameGood, "form-valid");

	if ($scope.phone != "" && validatePhone($scope.phone))
	{
	    $scope.phoneGood = true;
	    stylizeInput($("#phone"), "form-invalid", "form-valid", $scope.phoneGood);
	}
	else 
	{
	    $scope.phoneGood = false;
	    stylizeInput($("#phone"), "form-invalid", "form-valid", $scope.phoneGood);
	}
	$scope.stylizeButton([$scope.messageGood, $scope.phoneGood, $scope.emailGood, $scope.messageGood]);
    };
    
    $scope.checkMessage = function()
    {
	defocusInput($("#phone"), $scope.phoneGood, "form-valid");
	defocusInput($("#email"), $scope.emailGood, "form-valid");
	defocusInput($("#name"), $scope.nameGood, "form-valid");

	if ($scope.message != "" && $scope.message.length > 5)
	{
	    $scope.messageGood = true;
	    stylizeInput($("#input"), "form-invalid", "form-valid", $scope.messageGood);
	}
	else  
	{
	    $scope.messageGood = false;
	    stylizeInput($("#input"), "form-invalid", "form-valid", $scope.messageGood);
	}

	$scope.stylizeButton([$scope.messageGood, $scope.phoneGood, $scope.emailGood, $scope.messageGood]);
    };

    $scope.stylizeButton = function(boolList)
    {
	if (boolList == undefined)
	{
	    boolList = [$scope.messageGood, $scope.phoneGood, $scope.emailGood, $scope.messageGood];
	}

	var flag = true;

	for (var i = 0; i < boolList.length; i++)
	{
	    if (boolList[i] == false)
	    {
		flag = false;
		break;
	    }
	}

	if (flag == true)
	{
	    $('.btn-send').addClass('btn-send-success');
	    $('.btn-send').removeClass('btn-send-failure');
	}
	else
	{
	    $('.btn-send').removeClass('btn-send-success');
	    $('.btn-send').addClass('btn-send-failure');
	}
    };

    $scope.defocusForm = function()
    {
	defocusInput($("#input"), $scope.messageGood, "form-valid");
	defocusInput($("#phone"), $scope.phoneGood, "form-valid");
	defocusInput($("#email"), $scope.emailGood, "form-valid");
	defocusInput($("#name"), $scope.nameGood, "form-valid");
	$scope.stylizeButton([$scope.messageGood, $scope.phoneGood, $scope.emailGood, $scope.messageGood]);
    };
});

var stylizeInput = function($selector, badStyle, goodStyle, currentStatus)
{
    if (currentStatus === true)
    {
	$selector.switchClass(badStyle, goodStyle, 150, "easeInOutQuad");
    }
    else if (currentStatus === false)
    {
	$selector.switchClass(goodStyle, badStyle, 150, "easeInOutQuad");
    }
};

var defocusInput = function($selector, currentStatus, goodStyle)
{
    if ($selector.hasClass(goodStyle))
    {
	$selector.switchClass(goodStyle, "INACTIVESTYLE", "easeInOutQuad");
    }
};

var focusInput = function($selector, currentStatus, goodStyle)
{
    if (currentStatus === true)
    {
	$selector.switchClass("INACTIVESTYLE", goodStyle, 250, "easeInOutQuad");
    }
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhone(phone) {
  var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  var digits = phone.replace(/\D/g, "");
  return (digits.match(phoneRe) !== null);
}

