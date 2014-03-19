var stickyThreshold = 700;
var stickyOpen = false;

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
});

function showSticky(){
	$('#sticky-menu').animate({top:0}, 200);
}

function hideSticky(){
	$('#sticky-menu').animate({top:-50}, 200);
}