var stickyOpen = false;
stickyThreshold = parseInt($('#intro').css('height'), 10);

$(document).ready(function(){
	console.log("Release The Bees!");
	
	// init the crazy parallax shit if we're not on mobile
	if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
	    skrollr.init({
	        forceHeight: false,
	        smoothScrolling: false
	    });
	}


	// detect if we need to display the sticky menu
	$(window).scroll(function(){
		if($(window).scrollTop() >= stickyThreshold && stickyOpen == false){
			stickyOpen = true;
			showSticky();
		} else if($(window).scrollTop() < stickyThreshold && stickyOpen == true) {
			hideSticky();
			stickyOpen = false;
		}
	});

	// update any variables on window resize
	$(window).resize(function(){
		stickyThreshold = parseInt($('#intro').css('height'), 10);
	});

	$('.navbar li').click(function(){
		var id = $(this).attr('class');
		onMenu(id);
		return false;
	});
});

function showSticky(){
	$('#sticky-menu').animate({top:0}, 200);
}

function hideSticky(){
	$('#sticky-menu').animate({top:-50}, 200);
}

function validate(email){
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function onMenu(section){
	switch(section){
		case 'rent':
			$('html, body').animate({scrollTop: $("#rent").offset().top}, 500);
			break;
		case 'adopt':
			$('html, body').animate({scrollTop: $("#adopt").offset().top}, 500);
			break;
		case 'about':
			$('html, body').animate({scrollTop: $("#about-us").offset().top}, 500);
			break;
	}
}