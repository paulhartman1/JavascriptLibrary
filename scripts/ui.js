
/**
* LibraryUI
*@constructor
*/
var LibraryUI = function(){};


/**
*@function init
* initialize the instance of the UI
* the UI is dependent on an instance of the library object (window.lib)
*/
LibraryUI.prototype.init = function() {
	window.lib = new Library();
	//lib.createBooks();
	this.displayArray = [];
	this.displayIndex = 0;
	this.$arrows = $('.arrows');
		// hide arrows and search bars for finding a book
		this.$arrows.hide();
		$('#title-search').hide();
		$('#author-search').hide();
		$('#page-count-search').hide();
		$('#pub-date-search').hide();
		$('#book-display').removeClass('book-cover');
		// instantiate UI data fields
		this.updateBadges();
		this.resetInputs();
		this.checkBoxEvents();

		// the book input form fields HTML definition
		this.inputFormStr = '<div><div class="input-group new-book-input" ><span class="input-group-addon">Title</span><input  type="text" class="form-control title-input" id=""  name="" placeholder="Enter the book title"></div><div class="input-group new-book-input" ><span class="input-group-addon">Author</span><input  type="text" class="form-control author-input" id=""name="" placeholder="Enter the book author"></div><div class="input-group new-book-input" ><span class="input-group-addon">Number of Pages</span><input  type="text" class="form-control page-count-input" id=""name="" placeholder="Enter the number of pages in the book"></div><div class="input-group new-book-input"><span class="input-group-addon">Publish Date</span><input class="form-control date-input"  name="date" id="" type="date"/></div></div>';

		this._bindEvents();
	};
	/**
	*@function checkBoxEvents
	* event delegator for search functionality check boxes in 'find a book'
	*/
	LibraryUI.prototype.checkBoxEvents = function() {
		$('#check').on('change','input',function() {
			var el = $(this),
			elID = '#' + el.val();
			el.is(':checked') ? $(elID).show() : $(elID).hide();
		});
	};
	/**
	*@function _bindEvents
	*/
	LibraryUI.prototype._bindEvents = function() {
		$('.btn-all-books').on('click',$.proxy(this.showAllBooks, this));
		$('.btn-authors').on('click',$.proxy(this.displayAuthors, this));
		$('#random-book-btn').on('click',$.proxy(this.displayRandomBook, this));
		$('#random-author-btn').on('click',$.proxy(this.displayRandomAuthor, this));
		$('.icon-arrow-right').on('click',$.proxy(this.arrowUp, this));
		$('.icon-arrow-left').on('click',$.proxy(this.arrowDown, this));
		$('.data-book-author').on('click', $.proxy(this.displayRelAuthors, this));
		$('#add-book').on('click', $.proxy(this.addBook, this));
		$('#add-more-books').on('click', $.proxy(this.addMoreBooks, this));
		$('.btn-add-a-book').on('click',$.proxy(this.addBookField,this));
		$('#remove-author-enter').on('click',$.proxy(this.removeBookByAuthor,this));
		$('#remove-title-enter').on('click',$.proxy(this.removeBookByTitle,this));
		$('#btn-search').on('click',$.proxy(this.search,this));
	};

	/**********EVENT DRIVEN METHODS**********/
	/**
	*@function addBookField
	* creates and displays one book entry form
	*/
	LibraryUI.prototype.addBookField = function () {
		$('#new-book-form').append(this.inputFormStr);
	};

	LibraryUI.prototype.showAllBooks = function (){
		this.displayArray = lib.books;
		this.display(this.displayArray[this.displayIndex]);
	};

	LibraryUI.prototype.addMoreBooks = function () {
		$('#new-book-form').append(this.inputFormStr);
		$('#add-book').text("Add Books");
	};

	LibraryUI.prototype.displayRandomBook = function (){
		this.displayArray[0] = lib.getRandomBook();
		this.display(this.displayArray[0]);
	};

	LibraryUI.prototype.displayRandomAuthor = function(){
		this.clear();
		var name = lib.getRandomAuthorName();
		//alert(name);
		this.displayArray[0] = name;
		this.display(this.displayArray[0]);
	};

	LibraryUI.prototype.addBook = function(){
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
			lib.addBook(new Book(titles[i],authors[i],parseInt(pages[i]),pubDates[i]));
		}
		this.updateBadges();
		this.resetInputs();
	};

	LibraryUI.prototype.removeBookByAuthor = function () {
		var authorToRemove = $('#remove-author-input').val();
		lib.removeBookByAuthor(authorToRemove);
		this.updateBadges();
		$('#remove-author-input').val("");
		this.showAllBooks();
	};

	LibraryUI.prototype.removeBookByTitle = function () {
		var titleToRemove = $('#remove-title-input').val();
		lib.removeBookByTitle(titleToRemove);
		this.updateBadges();
		$('#remove-title-input').val("");
		this.showAllBooks();
	};

	LibraryUI.prototype.displayAuthors = function(){
		this.displayArray = lib.getAuthors();
		this.display(this.displayArray[this.displayIndex]);
	};

	LibraryUI.prototype.arrowUp = function() {
		this.displayIndex++;
		if(this.displayIndex === this.displayArray.length) {
			this.displayIndex = 0;
		}
		this.display(this.displayArray[this.displayIndex]);
	};

	LibraryUI.prototype.arrowDown = function() {
		if(this.displayIndex === 0) {
			this.displayIndex = this.displayArray.length;
		}
		this.displayIndex--;
		this.display(this.displayArray[this.displayIndex]);this
	}

	LibraryUI.prototype.search = function () {
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
		this.displayArray = lib.search(title,author,pageCnt,date);

		if(this.displayArray.length === 0){
			this.clear();
			display("No books were found");
		} else {
			this.display(this.displayArray[this.displayIndex]);
		}
	};

	LibraryUI.prototype.displayRelAuthors = function() {
		var author = $('.data-book-author').text();
		this.displayArray = lib.getBooksByAuthor(author);
		this.displayIndex = 0;
		this.display(this.displayArray[this.displayIndex]);
	};

	LibraryUI.prototype.updateBadges = function() {
		lib.saveState();
		$('#book-count').text(lib.books.length);
		$('#author-count').text(lib.getAuthors().length);
		$('#title-count').text(lib.books.length);
	};

	LibraryUI.prototype.display = function(dis){
		this.clear();
		if($('#data-book-counter-subtotal').text() > this.displayArray.length){
			this.displayIndex = 0;
		}
		if(this.displayArray.length === 0){
			$('.data-book-title').text("Sorry, there is nothing to display");
			return;
		}
		if(this.displayArray.length === 1){
			this.$arrows.hide()
		} else {
			$('#data-book-counter-subtotal').text(this.displayIndex+1 + " ");
			$('#data-book-counter-total').text(" " + this.displayArray.length);
			this.$arrows.show();
		}

		if(typeof dis === 'string'){
			$('#book-author').removeClass('book-author-position');
			$('.data-book-author').text(dis);
		} else {
			$('#book-author').addClass('book-author-position');
			this.showBookCover();
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

	LibraryUI.prototype.showBookCover = function () {
		var backColor = this._getRandomColor(),
		textColor =  this._getRandomColor();

		if(backColor.length !== 7){
			backColor = this._getRandomColor();
		}
		if(textColor.length !== 7){
			textColor = this._getRandomColor();
		}
		$('#book-display').css({"background-color" : backColor, "color" : textColor} );
		$('#book-display').addClass('book-cover');
	};

	LibraryUI.prototype._getRandomColor = function () {
		var i = parseInt('ffffff',16);
		return '#'+Math.floor(Math.random()*i).toString(16);
	};
	/**
	*@function clear
	*/
	LibraryUI.prototype.clear = function() {
		$('#book-display').removeClass('book-cover');
		$('#book-display').css("background-color","transparent");
		$('.data-book-title').text("");
		$('.data-book-author').text("");
		$('.data-book-pages').text("");
		$('.data-book-pubDate').text("");
		this.$arrows.hide();
	}

	LibraryUI.prototype.resetInputs = function() {
		$('.title-input:last').val("");
		$('.author-input:last').val("");
		$('.page-count-input:last').val("");
		$('.date-input:last').val("");
		this.displayArray =  [];
		this.displayIndex = 0;
		$('#new-book-form').empty();
	};

	$(function(){
		window.ui = new LibraryUI();
		window.ui.init();
	});
