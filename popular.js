var jsdom = require('jsdom');

var popular = {};
var cache = {};

popular.getPopularWithCache = function(callback){
	if(!cache.items){
		popular.getPopular(function(err, items){
			if(err){return callback(err);}

			cache.date = Date.now();
			cache.items = items;
			callback(null, items);
		});
	}else{
		callback(null, cache.items);

		if(Date.now() - cache.date > 10 * 1000){
			popular.getPopular(function(err, items){
				if(err){return callback(err);}

				cache.date = Date.now();
				cache.items = items;
			});
		}
	}
};

popular.getPopular = function(callback){
	jsdom.env('http://techcrunch.com/popular/',
		['http://code.jquery.com/jquery.js'],
		function (errors, window) {
			if(errors){return callback(errors);}

			var jQuery = window.$;
			var items = [];

			jQuery('.river-block').each(function(i, item){
				var $item = jQuery(item);
				var obj = {};

				obj.title = $item.find('.post-title a').text();
				obj.href = $item.find('.post-title a').attr('href');

				obj.timestamp = $item.find('.timestamp').attr('datetime');

				var $excerpt = $item.find('.excerpt');
				$excerpt.find('.read-more').remove();

				var $tag = $item.find('.tag');
				obj.tag = $tag.attr('title');

				items.push(obj);
			});

			callback(null, items);
		}
	);
};


module.exports = popular;
