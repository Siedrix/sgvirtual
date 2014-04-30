var jsdom = require('jsdom');

jsdom.env('http://techcrunch.com/popular/',
	['http://code.jquery.com/jquery.js'],
	function (errors, window) {
		var jQuery = window.$;

		console.log('Hay ', jQuery('.river-block').length, ' articulos populares');

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
		});
	}
);