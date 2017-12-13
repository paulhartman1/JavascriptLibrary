
//var lib = new Library();
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
	addBookEvents();
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

var addBookEvents = function() {
	var title,author,pageCount,pDate;

	//disable adding text to boxes until previous box has valid text
	//refactor using proxy or delegation
	$('#title-enter').on('click',function(){
		title = $('#title-input').val();
		if(title.length > 0 ){
			$('#title-input').prop('disabled',true);
			$('#author-input').prop('disabled',false);
			$('#author-enter').show();
			$('#title-enter').hide();
		} else {
			$('#title-input').addClass('error');
		}
	});

	$('#author-enter').on('click',function(){
		author = $('#author-input').val();
		if(author.length > 0){
			$('#author-input').prop('disabled',true);
			$('#page-count-input').prop('disabled',false);
			$('#author-enter').hide();
			$('#page-count-enter').show();
		} else {
			$('#author-input').addClass('error');
		}
	});

	$('#page-count-enter').on('click',function(){
		var pages = $('#page-count-input').val();
		pageCount = Number.parseInt(pages);
		if(Number.isInteger(pageCount)){
			$('#page-count-input').prop('disabled',true);
			$('#date-input').prop('disabled',false);
			$('#date-enter').show();
			$('#page-count-enter').hide();
		} else {
			$('#page-count-input').addClass('error');
		}

		$('#date-enter').on('click',function() {
			pDate = new Date(Date.parse($('#date-input').val()));
			if(isNaN(pDate)){
				$('#date-input').addClass('error');
			} else {
				lib.addBook(new Book(title,author,pageCount,pDate));
				updateBadges();
				resetInputs();
			}
		})
	});
};

var resetInputs = function() {
	$('#title-input').prop('disabled',false);
	$('#title-enter').show();
	$('#author-input').prop('disabled',true);
	$('#page-count-input').prop('disabled',true);
	$('#date-input').prop('disabled',true);
	$('#title-input').val("");
	$('#author-input').val("");
	$('#page-count-input').val("");
	$('#date-input').val("");
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

$('#random-book-btn').on('click',function(){
	var b = lib.getRandomBook();
	var date = new Date(b.publishDate).toDateString();
	$('.book-title').text(b.title);
	$('.book-author').text(b.author);
	$('.book-pages').text(b.numberOfPages + " pages");
	$('.book-pubDate').text(date.substring(4));
});

var newBook = (function (str) {
	var inst;
	var returnStr = "";
	function createInst() {
		return new Object();
	};

	if(inst){ return inst};
	createInst();
	returnStr += str;
});
