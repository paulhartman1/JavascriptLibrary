$(document).ready(function(){

	var lib = new Library();

	// hide search bars for finding a book

	$('#title-search').hide();
	$('#author-search').hide();
	$('#page-count-search').hide();
	$('#pub-date-search').hide();
	//populate badges
	$('#book-count').text(lib.books.length);
	$('#author-count').text(lib.getAuthors().length);

	$('#author-input').prop('disabled',true);
	$('#page-count-input').prop('disabled',true);
	$('#date-input').prop('disabled',true);


	//call functions
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
	// disable enter buttons

	$('#author-enter').hide();
	$('#page-count-enter').hide();
	$('#date-enter').hide();
	//disable adding text to boxes until previous box has valid text
	$('#title-enter').on('click',function(){
		if($('#title-input').length > 0){
			$('#title-input').prop('disabled',true);
			$('#author-input').prop('disabled',false);
			$('#author-enter').show();
			$('#title-enter').hide();
		}
	});

	$('#author-enter').on('click',function(){
		if($('#author-input').length > 0){
			$('#author-input').prop('disabled',true);
			$('#page-count-input').prop('disabled',false);
			$('#author-enter').hide();
			$('#page-count-enter').show();
		}
	});

	$('#page-count-enter').on('click',function(){

		var data = $('#page-count-input').val();
		if(Number.isInteger(parseInt(data))){
			$('#page-count-input').prop('disabled',true);
			$('#date-input').prop('disabled',false);
			$('#date-enter').show();
			$('#page-count-enter').hide();
		}

	});
	// cal validator
};





$('#random-book-btn').mouseenter(function(){
	this.innerHTML = "Get a random book";
}).mouseleave(function() {
	this.innerHTML = "I Feel Lucky";
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
