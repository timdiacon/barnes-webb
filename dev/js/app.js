var stickyOpen = false;
var stickyMenuHeight = 50;
var isShop = false;
var basketVisible = false;
var scrollDuration = 500;
stickyThreshold = parseInt($('#intro').css('height'), 10);

$(document).ready(function(){
	console.log("Release The Bees!");
	
	$('#adopt-accordion').render(adoptionPlans, directives);
	setupMainListeners();

	// init the crazy parallax shit if we're not on mobile
	if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
	    skrollr.init({
	        forceHeight: false,
	        smoothScrolling: false
	    });
	}

	// init OwlCarousel
	$("#quote-carousel").owlCarousel({
      autoPlay: false,
      singleItem : true,
      pagination: true
  });

	// init simplecart
	simpleCart({
		checkout: { 
			type: "PayPal" , 
			email: "paul@barnesandwebb.com" 
		},
		currency: "GBP",
		shippingQuantityRate: 1,
		cartColumns: [
			{ view: function(item, column){
				var html = '<div class="row">';
				html += '<div class="item-thumb col-sm-2 col-sm-offset-1"><img src="' + item.get('thumb') + '"></div>';
				html += '<div class="item-details col-xs-6 col-sm-4 col-md-5">' + item.get('name') + '<br>' + simpleCart.toCurrency(item.price()) + '</div>';
				html += '<div class="item-quantity col-xs-3 col-sm-2"><div class="row"><div class="right item_decrement col-xs-2"><a href="javascript:;" class="simpleCart_decrement">-</a></div><div class="item-quantity col-xs-8"><input type="text" value="' +  item.quantity() + '" class="simpleCart_input"></div><div class="left item_increment col-xs-2"><a href="javascript:;" class="simpleCart_increment">+</a></div></div></div>';
				html += '<div class="item-total col-xs-3 col-sm-2 col-md-1">' + simpleCart.toCurrency(item.total()) + '</div>';
				html += '</div>';
				return html;
			}}
		]
	});


	//displayShop();
	//displayBasket();

});

function setupMainListeners(){
	$('.navbar li').click(function(){
		var id = $(this).attr('class');
		onMenu(id, (isShop) ? 0 : scrollDuration);

		if($('.navbar-header').css('display') != 'none'){
			$(".navbar-header .navbar-toggle").click();
		}

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

	$('.menu-basket').click(function(){
		displayBasket();
		if($('.navbar-header').css('display') != 'none'){
			$(".navbar-header .navbar-toggle").click();
		}
	});

	$('#continue-shopping').click(function(){
		hideBasket();
	});

	$('#empty-basket').click(function(){
		simpleCart.empty();
	});

	$('#find-out-more-btn').click(function(){
		onMenu('rent', scrollDuration);
	});

	$('.intro .stockists').click(function(){
		$('html, body').animate({scrollTop: $("#stockist-list").offset().top}, scrollDuration);
	});

	$('#sticky-menu .logo').click(function(){
		$('html, body').animate({scrollTop: 0}, scrollDuration);
	});

	// adding rollover behaviour via js as goes funny on mobile when using css :hover
	$('#shop .simpleCart_shelfItem .header .over').mouseover(function(){
		$(this).addClass('hover');
	});

	$('#shop .simpleCart_shelfItem .header .over').mouseout(function(){
		$(this).removeClass('hover');
	});

	$('#adopt-accordion .panel-heading').click(function(){
		$('#adopt-accordion .panel').each(function(i, o){
			$(o).removeClass("open");
			$(o).find('.panel-heading .action').html('+');
		});
		// add open class unless was already open
		if(!$(this).parent().find('.panel-collapse').hasClass('in')){
			$(this).parent().addClass('open');
			$(this).find('.action').html('&#8211;');
		}
		scrollToOpenPanel($(this).parent());
	});
	
	simpleCart.bind( 'afterAdd' , function( item ){
		$('.menu-basket').removeClass('flash');
		setTimeout(function () { 
		    $('.menu-basket').addClass('flash');
		}, 100);
	});


}

function updateSticky(){
	if(isShop){
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
	$('#sticky-menu').addClass('visible');
}

function hideSticky(){
	$('#sticky-menu').removeClass('visible');
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
			$('html, body').animate({scrollTop: $("#rent").offset().top - stickyMenuHeight}, duration);
			break;
		case 'adopt':
			if(isShop) hideShop();
			$('html, body').animate({scrollTop: $("#adopt").offset().top - stickyMenuHeight}, duration);
			break;
		case 'about':
			if(isShop) hideShop();
			$('html, body').animate({scrollTop: $("#about-us").offset().top - stickyMenuHeight}, duration);
			break;
		case 'contact':
			if(isShop) hideShop();
			$('html, body').animate({scrollTop: $("#contact").offset().top - stickyMenuHeight}, duration);
			break;
		case 'shop':
			if(!isShop || basketVisible){
				displayShop();
			}
			break;
	}
}

function scrollToOpenPanel(item){
	var row = $('#adopt-accordion .panel').index(item);
	var accordionTop = $("#adopt-accordion").offset().top;
	var pos = accordionTop - stickyMenuHeight + (80 * row);
	$('html, body').animate({scrollTop: pos}, scrollDuration/2);
}

function displayShop(){
	if(basketVisible){
		hideBasket();
	}
	$('#shop').removeClass('hidden');
	$('#shop').addClass('visible');
	$('#main').removeClass('visible');
	$('#main').addClass('hidden');

	isShop = true;
	updateSticky();
	$('html, body').scrollTop(0);
}

function hideShop(){
	$('#shop').addClass('hidden');
	$('#shop').removeClass('visible');
	$('#main').removeClass('hidden');
	$('#main').addClass('visible');

	isShop = false;
	updateSticky();
}

function displayBasket(){
	if(!isShop){
		displayShop();
	}
	$('#basket').css('display', 'block');
	$('#products, #basket-container').css('display', 'none');
	basketVisible = true;	
}

function hideBasket(){
	$('#basket').css('display', 'none');
	$('#products, #basket-container').css('display', 'block');
	basketVisible = false;
}