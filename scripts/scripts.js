
$(function(){
	window.lib = new Library();
	// hide search bars for finding a book
	$('#title-search').hide();
	$('#author-search').hide();
	$('#page-count-search').hide();
	$('#pub-date-search').hide();
	updateBadges();
	resetInputs();
	checkBoxevents();
});

var checkBoxevents = function() {
	// event delegator for checkboxes in 'find a book'
	$('#check').on('change','input',function() {
		var el = $(this);
		var elID = '#' + el.val();
		if(el.is(':checked')){
			$(elID).show();
		} else {
			$(elID).hide();
		}
	});
};

var resetInputs = function() {
	$('.title-input:last').val("");
	$('.author-input:last').val("");
	$('.page-count-input:last').val("");
	$('.date-input:last').val("");
};

var updateBadges = function() {
	lib.saveState();
	$('#book-count').text(lib.books.length);
	$('#author-count').text(lib.getAuthors().length);
};

$('#random-book-btn').mouseenter(function(){
	this.innerHTML = "Get a random book";
}).mouseleave(function() {
	this.innerHTML = "I Feel Lucky";
});

$('.book-add-multi').on('click',function(){
	$('.book-form:last').clone().appendTo($('.book-form'));
});

$('#random-book-btn').on('click',function(){
	var b = lib.getRandomBook();
	var date = new Date(b.publishDate).toDateString();
	$('.book-title').text(b.title);
	$('.book-author').text(b.author);
	$('.book-pages').text(b.numberOfPages + " pages");
	$('.book-pubDate').text(date.substring(4));
});
