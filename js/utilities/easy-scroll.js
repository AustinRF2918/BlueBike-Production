$('a').click(function(){
	console.log("Hello")
    $('html, body').animate({
	scrollTop: $($.attr(this, 'href')).offset().top - 70}, 500);
    return false;
});

