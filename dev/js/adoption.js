var adoptionDisclaimer = '&#42; Honey is harvested in August and will be delivered as soon as it&#39;s settled, ripened and bottled';
var adoptionPlans = [
	{
		item_price:'&pound;25',
		item_name:'Thyme',
		item_pic:'http://placehold.it/500x500',
		qty: '1000',
		contents: [
			'A personalised certificate',
			'A pack of &#8216;Save the Bees&#8217; badges &amp; stickers',
			'Quarterly email newsletters with updates on your adopted bees'
		],
		disclaimer: false
	},
	{
		item_price:'&pound;50',
		item_name:'Poppy',
		item_pic:'http://placehold.it/500x500',
		qty: '5000',
		contents: [
			'A personalised certificate',
			'A pack of &#8216;Save the Bees&#8217; badges &amp; stickers',
			'Quarterly email newsletters with updates on your adopted bees',
			'A pack of B&amp;W bee-friendly wildflower seeds',
			'A jar of London postcode honey &#42;'
		],
		disclaimer: true
	},
	{
		item_price:'&pound;85',
		item_name:'Sunflower',
		item_pic:'http://placehold.it/500x500',
		qty: '10,000',
		contents: [
			'A personalised certificate',
			'A pack of &#8216;Save the Bees&#8217; badges &amp; stickers',
			'Quarterly email newsletters with updates on your adopted bees',
			'A pack of B&amp;W bee-friendly wildflower seeds',
			'A &#8216;Save the Bees&#8217; tote bag',
			'2 jars of London postcode honey &#42;'
		],
		disclaimer: true
	},
	{
		item_price:'&pound;250',
		item_name:'Cherry',
		item_pic:'http://placehold.it/500x500',
		qty: '30,000',
		contents: [
			'A personalised certificate',
			'A pack of &#8216;Save the Bees&#8217; badges &amp; stickers',
			'Quarterly email newsletters with updates on your adopted bees',
			'A pack of B&amp;W bee-friendly wildflower seeds',
			'A &#8216;Save the Bees&#8217; tote bag',
			'4 jars of London postcode honey &#42;',
			'Visits to your adopted hive upon arrangement'
		],
		disclaimer: true
	},
	{
		item_price:'&pound;500',
		item_name:'Willow',
		item_pic:'http://placehold.it/500x500',
		qty: '60,000',
		contents: [
			'A personalised certificate',
			'A pack of &#8216;Save the Bees&#8217; badges &amp; stickers',
			'Quarterly email newsletters with updates on your adopted bees',
			'A pack of B&amp;W bee-friendly wildflower seeds',
			'A &#8216;Save the Bees&#8217; tote bag',
			'8 jars of London postcode honey &#42;',
			'Visits to your adopted hive upon arrangement',
			'Your name / company name permanently displayed on the hive on a plaque'
		],
		disclaimer: true
	},
]

var directives = {
	panel: {
		html: function(){
			// indented as per html to make it easier to read
			// header
			var s = '<div class="panel-heading container header">';
					s += '<a data-toggle="collapse" data-parent="#adopt-accordion" href="#'+ this.item_name+'">';
						s += '<div class="price col-xs-2 item_price">'+ this.item_price +'</div>';
						s += '<div class="col-xs-8">';
							s += '<span class="title item_name">'+ this.item_name +'</span>';
							s += '<span class="details">('+ this.qty +') Bees</span>';
						s += '</div>';
						s += '<div class="action col-xs-2">+</div>';
					s += '</a>';
				s += '</div>';
				// body
				s += '<div id="'+ this.item_name +'" class="panel-collapse collapse container">';
					s += '<div class="panel-body">';
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
							s += '<div class="action col-xs-12 col-sm-4 col-sm-offset-4">';
								s += '<a href="javascript:;" class="item_add">';
									s += '<button type="button" class="btn btn-default">Adopt Bees Now</button>';
								s += '</a>';
							s += '</div>';
						s += '</div>';
					s += '</div>';
				s += '</div>';
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