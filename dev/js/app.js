$(document).ready(function(){
	console.log("Release The Bees!");
	if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
	    skrollr.init({
	        forceHeight: true,
	        smoothScrolling: false
	    });
	}
});