var LibraryUI = function(){};

LibraryUI.prototype.clear = function() {
	$('.data-book-title').text("");
	$('.data-book-author').text("");
	$('.data-book-pages').text("");
	$('.data-book-pubDate').text("");
	displayArray =  [];
	resetInputs();
}

LibraryUI.prototype.resetInputs = function() {
	$('.title-input:last').val("");
	$('.author-input:last').val("");
	$('.page-count-input:last').val("");
	$('.date-input:last').val("");
	displayIndex = 0;
};

LibraryUI.prototype.updateBadges = function() {
	lib.saveState();
	$('#book-count').text(lib.books.length);
	$('#author-count').text(lib.getAuthors().length);
	$('#title-count').text(lib.books.length);
};

LibraryUI.prototype.display = function(dis){
	if(displayArray.length === 1){
		$('.arrows').hide()
	} else {
		$('#data-book-counter-subtotal').text(displayIndex+1 + " ");
		$('#data-book-counter-total').text(" " + displayArray.length);
		$('.arrows').show();
	}

	if(typeof dis === 'string'){
		$('.data-book-author').text(dis);
	} else {
		var date = new Date(dis.publishDate).toDateString();
		var pageString = 'Pages';
		if(dis.numberOfPages === 1) {
			pageString = 'Page';
		}
		$('.data-book-title').text(dis.title);
		$('.data-book-author').text(dis.author);
		$('.data-book-pages').text(dis.numberOfPages + " "+ pageString);
		$('.data-book-pubDate').text(date.substring(4));
	}
};

LibraryUI.prototype.update = function(){
	lib.saveState();
	this.updateBadges();
};

//event handlers
LibraryUI.prototype._bindEvents = function(){
	debugger;
	$('#random-book-btn').on('click',$.proxy(lib.getRandomBook,this));
};

LibraryUI.prototype.checkBoxevents = function() {
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

$('.book-add-multi').on('click',function(){
	$('.book-form:last').clone().appendTo($('.book-form'));
});

// $('#random-book-btn').on('click',function(){
// 	clear();
// 	display(lib.getRandomBook());
// });

$('#random-author-btn').on('click',function(){
	clear();
	display(lib.getRandomAuthorName());
});

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
	update();
	resetInputs();
});

$('#remove-author-enter').on('click',function(){
	lib.removeBookByAuthor($('#remove-author-input').val());
	update();
	$('#remove-author-input').val("");
});

$('#remove-title-enter').on('click',function(){
	lib.removeBookByTitle($('#remove-title-input').val());
	update();
	$('#remove-title-input').val("");
});

$('.btn-authors').on('click',function(){
	clear();
	displayArray = lib.getAuthors();
	display(displayArray[displayIndex]);
});

$('.btn-all-books').on('click',function(){
	clear();
	displayArray = lib.books;
	display(displayArray[displayIndex]);
});

$('.icon-arrow-right').on('click',function() {
	displayIndex++;
	if(displayIndex === displayArray.length) {
		displayIndex = 0;
	}
	display(displayArray[displayIndex]);
});

$('.icon-arrow-left').on('click',function() {
	if(displayIndex === 0) {
		displayIndex = displayArray.length;
	}
	displayIndex--;
	display(displayArray[displayIndex]);
});

$('#btn-search').on('click',function(){

	var title,author = "";
	var pageCnt = Infinity;
	var date = Date.now();
	if($('#check-title').is(':checked')){
		title = $('#title-search-box').val();
	}
	if($('#check-author').is(':checked')){
		author = $('#author-search-box').val();
	}
	if($('#check-page-count').is(':checked')){
		pageCnt = parseInt($('#pageCnt-search-box').val());
	}
	if($('#check-pub-date').is(':checked')){
		date = new Date($('#date-search-box').val());
	}
	displayArray = lib.search(title,author,pageCnt,date);

	if(displayArray.length === 0){
		clear();
		display("No books were found");
	} else {
		display(displayArray[displayIndex]);
	}
});

$('.data-book-author').on('click', function(){
	var author = this.innerHTML;
	clear();
	displayArray = lib.getBooksByAuthor(author);
	console.log(displayArray);
	display(displayArray[displayIndex]);
});

var init = function(){
	window.lib = new Library();
	window.libUI = new LibraryUI();
	window.displayArray = [];
	window.displayIndex = 0;

	// hide search bars for finding a book
	$('.arrows').hide();
	$('#title-search').hide();
	$('#author-search').hide();
	$('#page-count-search').hide();
	$('#pub-date-search').hide();
	libUI.updateBadges();
	libUI.resetInputs();
	libUI.checkBoxevents();
	libUI.update();
};
// document ready
$(function(){
	window.lib = new Library();
	window.libUI = new LibraryUI();
	libUI._bindEvents();
	init();
});
