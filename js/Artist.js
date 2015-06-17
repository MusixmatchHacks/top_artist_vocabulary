(function() {

	// Exporting the module 
	window.Artist = {};
	window.Artist.newArtist = function(artistName, artistData) {
			return new Artist(artistName, artistData);	
	};
	// This module is supposed to act like an artist object 
	// that will handle clicks on the div and other kinds of things like hover and stuff 
	function Artist(artistName, artistData) {
		this.name = artistName;
		this.data = artistData;
		this.selector = artistName.split(" ").join("_");
		// plus the url to the image can be grabbed here too base on the name of the artist

		// Points to the DOM element that holds the current artist
		console.log(this.selector);
		this.$artist = $('#' + this.selector);

		// We will have to lazy load images for better performace, but lets ignore it for now 
		// Add artist image 
		this.$artist.css('background-image', 'url(img/artist_images_small/' + this.selector + '.jpg)');

		this.events.click.call(this);
	}



	// Event handler on artist object
	Artist.prototype.events = {
		click : function() {
			var that = this;
			this.$artist.on('click', function() {
				console.log(that.data);
			});
		}
	};
	
})();