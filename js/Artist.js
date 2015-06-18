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
		// Points to the DOM element that holds the current artist
		this.$artist = $('#' + this.selector);

		// We will have to lazy load images for better performace, but lets ignore it for now 
		// Add artist image 
		this.$artist.css('background-image', 'url(img/artist_images_smaller/' + this.selector + '.jpg)');

 		// Initialize events 
		this.events.click.call(this);
		this.events.hover.call(this);
	}



	// Event handler on artist object
	Artist.prototype.events = {
		click : function() {
			var that = this;
			this.$artist.on('click', function() {
				console.log(that.data);
			});
		},

		// Show a tooltip on hover
		hover : function() {
			var that = this;
			this.$artist.tipsy({
				gravity : 'w',
				title : function() { return that.data.name; }
			});
		}
	};
	
})();