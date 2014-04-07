var stickyOpen = false;
var stickyMenuHeight = 50;
var isShop = false;
var basketVisible = false;
var scrollDuration = 500;
var mySkrollr;
stickyThreshold = parseInt($('#intro').css('height'), 10);

$(document).ready(function(){
	console.log("Release The Bees!");
	
	$('#adopt-accordion').render(adoptionPlans, directives);
	setupMainListeners();

	// init Slick Slider
	$("#quote-carousel").slick({
		autoplay: false,
		centerMode: true,
		centerPadding: 200,
		arrows: false,
		responsive: [
		    {
		    	breakpoint: 1200,
		    	settings: {
		    		autoplay: false,
		    		centerMode: true,
		    		centerPadding: 200,
		    		arrows: false,
		    	}
		    },
		    {
		    	breakpoint: 992,
		    	settings: {
		    		autoplay: false,
		    		centerMode: true,
		    		centerPadding: 100,
		    		arrows: false,
		    	}
		    },
		    {
		    	breakpoint: 768,
		    	settings: {
		    		autoplay: false,
		    		centerMode: true,
		    		centerPadding: 25,
		    		arrows: false,
		    	}
		    }
		]
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
	updateCartDisplay();
	
	// load the products for the shop
	$.get( "https://docs.google.com/spreadsheet/pub?key=0Ane4qhAooN5zdC02cF9mVnZTOEpFRWVXR0RzNFJSdHc&output=csv", function(data) {
	  	var a = CSVToArray(data, ',');
	  	a.splice(0, 1);
	  	populateShop(a);
	}).fail(function() {
		// something went wrong with Google Spreadsheet display error message
		$('#shop .error-msg').removeClass('hidden');
		$('#shop #products').addClass('hidden');
	})

	// init the crazy parallax shit if we're not on mobile
	if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
	    mySkrollr = skrollr.init({
	        forceHeight: false,
	        smoothScrolling: false
	    });
	}

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
			$(this).find('.action').html('&#10005;');
		}
		scrollToOpenPanel($(this).parent());
	});
	
	simpleCart.bind( 'afterAdd' , function( item ){
		$('.menu-basket').removeClass('flash');
		setTimeout(function () { 
		    $('.menu-basket').addClass('flash');
		}, 100);
	});

	simpleCart.bind('update', function(){
		updateCartDisplay();
	});

	// update the skrollr when accordion opens / closes
	$('#adopt-accordion').on('hidden.bs.collapse shown.bs.collapse', function () {
		mySkrollr.refresh($('#men-at-work'));
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

// check if we need to display "Cart Empty" message
function updateCartDisplay(){
	if( simpleCart.quantity() === 0 ){
		$('#basket .summary, #empty-basket, #checkout').addClass('hidden');
		$('#basket .empty-message').addClass('visible');
	} else {
		$('#basket .summary, #empty-basket, #checkout').removeClass('hidden');
		$('#basket .empty-message').removeClass('visible');
	}
}

function populateShop(p){
	var html = '';
	$(p).each(function(i,k){
		if(k[3] == 'TRUE'){
			html += '<div class="simpleCart_shelfItem col-sm-6 col-sm-offset-0 col-md-4">';
				html += '<a href="javascript:;" class="item_add">';
					html += '<div class="header">';
						html += '<img src="'+ k[2] +'" alt="'+ k[0] +'" class="item_thumb">';
						html += '<div class="over"></div>';
					html += '</div>';
					html += '<div class="details">';
						html += '<span class="item_name">'+ k[0] +'</span>&nbsp;&#45;&nbsp;<span class="item_price">'+ k[1] +'</span>';
						html += '<div class="add-to-basket">Add to Basket</div>';
					html += '</div>';
				html += '</a>';
			html += '</div>';
		}
	});
	$('#product-list').html(html);
}

// Thank you Mr Mulhoony-pants
function CSVToArray( strData, strDelimiter ){
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
                                (
                                 // Delimiters.
                                 "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                                 
                                 // Quoted fields.
                                 "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                                 
                                 // Standard fields.
                                 "([^\"\\" + strDelimiter + "\\r\\n]*))"
                                 ),
                                "gi"
                                );
    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec( strData )){
        var strMatchedDelimiter = arrMatches[ 1 ];
        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
            ){
            arrData.push( [] );
        }
        if (arrMatches[ 2 ]){
            var strMatchedValue = arrMatches[ 2 ].replace(new RegExp( "\"\"", "g" ),"\"");
        } else {
            var strMatchedValue = arrMatches[ 3 ];
            
        }
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    return arrData;
}