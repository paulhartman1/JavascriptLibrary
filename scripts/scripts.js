


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
	displayBook(lib.getRandomBook());
});

var displayBook = function(book){
	var date = new Date(book.publishDate).toDateString();
	$('.data-book-title').text(book.title);
	$('.data-book-author').text(book.author);
	$('.data-book-pages').text(book.numberOfPages + " pages");
	$('.data-book-pubDate').text(date.substring(4));
};

$('#add-more-books').on('click',function(){
	$('.new-book:last').clone().appendTo($('#book-add'));
	resetInputs();
	$('#add-book').text("Add Books");
});

$('#add-book').on('click',function(){
	var titles = [],authors = [], pages = [], pubDates = [];

$('.title-input').each(function() {
	titles.push($(this).val());
});
$('.author-input').each(function() {
	authors.push($(this).val());
});
$('.page-count-input').each(function() {
	pages.push($(this).val());
});
$('.date-input').each(function() {
	pubDates.push($(this).val().toString());
});

for(var i = 0; i < titles.length; i++){
	var bk = new Book(titles[i],authors[i],parseInt(pages[i]),pubDates[i]);
	lib.addBook(bk);
}
	lib.saveState();
	updateBadges();
});

$('#remove-author-enter').on('click',function(){
	lib.removeBookByAuthor($('#remove-author-input').val());
	lib.saveState();
	updateBadges();
	$('#remove-author-input').val("");
});

$('#remove-title-enter').on('click',function(){
	lib.removeBookByTitle($('#remove-title-input').val());
	lib.saveState();
	updateBadges();
	$('#remove-title-input').val("");
});

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
