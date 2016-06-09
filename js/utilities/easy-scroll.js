$('.slow-scroll').click(function(){
    $('html, body').animate({
	scrollTop: $($.attr(this, 'href')).offset().top - 70}, 500);
    return false;
});

