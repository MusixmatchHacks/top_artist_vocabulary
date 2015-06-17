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
		// plus the url to the image can be grabbed here too base on the name of the artist

		// Points to the DOM element that holds the current artist
		this.$artist = $('#' + this.name);
		this.events.click.call(this);
	}



	// Event handler on artist object
	Artist.prototype.events = {
		click : function() {
			var that = this;
			this.$artist.on('click', function() {
				console.log(that.name);
			});
		}
	};
	
})();