
//book class
/**
* Book class
*@param title - the title of the book
*@param author - the author of the book
*@param numberOfPages - the number of pages in teh book
*@param publishDate - a Javascript date object representing the date the book was published
*/
var Book = function (title,author,numberOfPages,publishDate){
	var time = Date.now();
	this.id = time*Math.random();
	this.title = title;
	this.author = author;
	this.numberOfPages = numberOfPages;
	this.publishDate = new Date(publishDate);
	this.toString = function(){
		return "Title: " + this.title + "<br/>Author: " + this.author + "<br/>Page Count: " + this.numberOfPages + "<br/>Published: " + this.publishDate.toDateString();
	};
};
