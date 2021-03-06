//var adoptionDisclaimer = '&#42; Honey is harvested in August and will be delivered as soon as it&#39;s settled, ripened and bottled';
var adoptionDisclaimer = '&#42; All adoption plans run for 1 year\r\n\&#42;&#42; Honey is harvested in August and will be delivered as soon as it&#39;s settled, ripened and bottled.';
var adoptionPlans = [
	{
		item_price:'&pound;25',
		item_name:'Thyme',
		item_pic:'img/adopt/B&W_adopt_images_thyme.jpg',
		qty: '1000',
		shipping: 0,
		contents: [
			'A personalised certificate',
			'A pack of &#8216;Save the Bees&#8217; badges &amp; stickers',
			'Quarterly email newsletters with updates on your adopted bees'
		],
		disclaimer: false,
		instock: true
	},
	{
		item_price:'&pound;50&#42;',
		item_name:'Poppy',
		item_pic:'img/adopt/B&W_adopt_images_poppy.jpg',
		qty: '5000',
		shipping: 0,
		contents: [
			'A personalised certificate',
			'A pack of &#8216;Save the Bees&#8217; badges &amp; stickers',
			'Quarterly email newsletters with updates on your adopted bees',
			'A pack of B&amp;W bee-friendly wildflower seeds',
			'A jar of London postcode honey&#42;&#42;'
		],
		disclaimer: true,
		instock: true
	},
	{
		item_price:'&pound;85&#42;',
		item_name:'Sunflower',
		item_pic:'img/adopt/B&W_adopt_images_sunflower.jpg',
		qty: '10,000',
		shipping: 0,
		contents: [
			'A personalised certificate',
			'A pack of &#8216;Save the Bees&#8217; badges &amp; stickers',
			'Quarterly email newsletters with updates on your adopted bees',
			'A pack of B&amp;W bee-friendly wildflower seeds',
			'A &#8216;Save the Bees&#8217; tote bag',
			'2 jars of London postcode honey&#42;&#42;'
		],
		disclaimer: true,
		instock: true
	},
	{
		item_price:'&pound;250&#42;',
		item_name:'Cherry',
		item_pic:'img/adopt/B&W_adopt_images_cherry.jpg',
		qty: '30,000',
		shipping: 0,
		contents: [
			'A personalised certificate',
			'A pack of &#8216;Save the Bees&#8217; badges &amp; stickers',
			'Quarterly email newsletters with updates on your adopted bees',
			'A pack of B&amp;W bee-friendly wildflower seeds',
			'A &#8216;Save the Bees&#8217; tote bag',
			'4 jars of London postcode honey&#42;&#42;',
			'Visits to your adopted hive upon arrangement'
		],
		disclaimer: true,
		instock: true
	},
	{
		item_price:'&pound;500&#42;',
		item_name:'Willow',
		item_pic:'img/adopt/B&W_adopt_images_willow.jpg',
		qty: '60,000',
		shipping: 0,
		contents: [
			'A personalised certificate',
			'A pack of &#8216;Save the Bees&#8217; badges &amp; stickers',
			'Quarterly email newsletters with updates on your adopted bees',
			'A pack of B&amp;W bee-friendly wildflower seeds',
			'A &#8216;Save the Bees&#8217; tote bag',
			'8 jars of London postcode honey&#42;&#42;',
			'Visits to your adopted hive upon arrangement',
			'Your name / company name displayed on the hive on a plaque'
		],
		disclaimer: true,
		instock: true
	},
]

var directives = {
	panel: {
		html: function(){
			// indented as per html to make it easier to read
			// header
			var s = '';
					s += '<div class="header col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2 col-xs-12 col-xs-offset-0">';
						s+= '<div class="row" data-toggle="collapse" data-parent="#adopt-accordion" href="#'+ this.item_name +'">';
							s += '<div class="price col-xs-2 item_price">'+ this.item_price +'</div>';
							s += '<div class="col-xs-9">';
								s += '<span class="title item_name">'+ this.item_name +'</span>';
								s += '<span class="details">('+ this.qty +' Bees)</span>';
								s += '<span class="item_shipping" style="display: none;">0</span>';
							s += '</div>';
							s += '<div class="action col-xs-1"><div class="cross"></div></div>';
						s += '</div>';
					s += '</div>';
					// body
					s += '<div id="'+ this.item_name +'" class="plan-body panel-collapse collapse col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2 col-xs-12 col-xs-offset-0">';
						s += '<div class="row details">';
							s += '<div class="col-xs-12 col-sm-8">';
								s += '<div class="title">You will receive:</div>';
								s += '<ul class="contents">';
								s += planDetailsGenerator(this.contents);
								s += '</ul>';
								if(this.disclaimer) s += '<div class="footnote">'+ adoptionDisclaimer +'</div>';
							s += '</div>';
							s += '<div class="image col-sm-4">';
								s += '<img class="item_thumb" src="'+ this.item_pic +'">';
							s += '</div>';
						s += '</div>';
						s += '<div class="row">';
							s += '<div class="action col-xs-12 col-sm-8 col-sm-offset-2">';
								if(this.instock){
									s += '<a href="javascript:;" class="item_add btn btn-default">';
										s += 'Add to basket';
									s += '</a>';
								}
								else {
									s += '<a href="#" class="signup">';
										s += '<button type="button" class="btn btn-default">Available soon. Sign up below.</button>';
									s += '</a>';	
								}
							s += '</div>';
						s += '</div>';
					s += '</div>';
				s+= '';
			return s;
		}
	}
}

var planDetailsGenerator = function(c){
	var s = '';
	$(c).each(function(key, val){
		s += '<li>'+ val +'</li>';
	});
	return s;
}