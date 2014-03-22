var stickyOpen = false;
var stickyMenuHeight = 50;
var isShop = false;
var scrollDuration = 500;
stickyThreshold = parseInt($('#intro').css('height'), 10);

$(document).ready(function(){
	console.log("Release The Bees!");
	
	setupMainListeners();

	// init the crazy parallax shit if we're not on mobile
	if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
	    skrollr.init({
	        forceHeight: false,
	        smoothScrolling: false
	    });
	}

	// init simplecart
	simpleCart({
		checkout: { 
			type: "PayPal" , 
			email: "you@yours.com" 
		},
		currency: "GBP",
		shippingQuantityRate: 1,
		cartColumns: [
			//{ view: "image" , attr: "thumb", label: false },
			//{ attr: "name" , label: false } ,
			//{ attr: "price" , view: 'currency', label: false},
			//{ attr: "total" , view: 'currency', label: false},
			{ view: function(item, column){
				var html = '<div class="row">';
				html += '<div class="col-sm-2 col-sm-offset-2"><img src="' + item.get('thumb') + '"></div>';
				html += '<div class="col-sm-4">' + item.get('name') + '<br>' + simpleCart.toCurrency(item.price()) + '</div>';
				html += '<div class="item-quantity col-sm-1"><input type="text" value="' +  item.quantity() + '" class="simpleCart_input"></div>';
				html += '<div class="item-total col-sm-1">' + simpleCart.toCurrency(item.total()) + '</div>';
				html += '</div>';
				return html;
			}}
		]
	});

	displayShop();
	displayBasket();

});

function setupMainListeners(){
	$('.navbar li').click(function(){
		var id = $(this).attr('class');
		onMenu(id, (isShop) ? 0 : scrollDuration);
		return false;
	});

	// detect if we need to display the sticky menu
	$(window).scroll(function(){
		if(!isShop)updateSticky();
	});

	// update any variables on window resize
	$(window).resize(function(){
		stickyThreshold = parseInt($('#intro').css('height'), 10);
	});

	$('#sticky-basket').click(function(){
		displayBasket();
	});

	$('#continue-shopping').click(function(){
		hideBasket();
	});
}

function updateSticky(){
	if(isShop && stickyOpen == false){
		stickyOpen = true;
		showSticky();
	} else if($(window).scrollTop() >= stickyThreshold && stickyOpen == false){
		stickyOpen = true;
		showSticky();
	} else if($(window).scrollTop() < stickyThreshold && stickyOpen == true) {
		hideSticky();
		stickyOpen = false;
	}
}

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

function onMenu(section, duration){
	// TODO would be better to jump to scroll pos if shop rather than animate
	switch(section){
		case 'rent':
			if(isShop) hideShop();
			$('html, body').animate({scrollTop: $("#rent").offset().top}, duration);
			break;
		case 'adopt':
			if(isShop) hideShop();
			$('html, body').animate({scrollTop: $("#adopt").offset().top}, duration);
			break;
		case 'about':
			if(isShop) hideShop();
			$('html, body').animate({scrollTop: $("#about-us").offset().top}, duration);
			break;
		case 'shop':
			if(!isShop)displayShop();
			break;
	}
}

function displayShop(){
	// TODO do this via CSS
	$('#shop .container').css({'opacity':0});
	$('#shop .container').animate({'opacity':1}, 250);

	isShop = true;
	updateSticky();
	$('#main').css('display', 'none');
	$('#shop').css('display', 'block');
}

function hideShop(){
	// TODO do this via CSS
	$('#main').css({'opacity':0});
	$('#main').animate({'opacity':1}, 250);

	isShop = false;
	updateSticky();
	$('#main').css('display', 'block');
	$('#shop').css('display', 'none');
}

function displayBasket(){
	$('#basket').css('display', 'block');
	$('#products, #basket-container').css('display', 'none');	
}

function hideBasket(){
	$('#basket').css('display', 'none');
	$('#products, #basket-container').css('display', 'block');
}