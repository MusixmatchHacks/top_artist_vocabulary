(function() {

	// Exporting the module 
	window.Artist = {};
	window.Artist.newArtist = function(artistName) {
			return new Artist(artistName);	
	};
	// This module is supposed to act like an artist object 
	// that will handle clicks on the div and other kinds of things like hover and stuff 
	function Artist(artistName) {
		this.name = artistName;
		console.log("hi I am " + artistName);
	}



	// Event handler on artist object
	Artist.prototype.events = {

	};
	
})();