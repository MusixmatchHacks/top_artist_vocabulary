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

		// Selector is simply name of the artist with whitespace replaced by _ , e.g. 
		// Red Hot Chilli Peppers becomes Red_Hot_Chilli_Peppers
		this.selector = artistName.split(" ").join("_");
		// Points to the DOM element that holds the current artist
		this.$artist = $('#' + this.selector);


		// We will have to lazy load images for better performace, but lets ignore it for now 
		// Add artist image 
		// this.$artist.css('background-image', 'url(img/artist_images_smaller/' + this.selector + '.jpg)');
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
				that.$artist.css('opacity', '1');
				that.$artist.siblings('.artistContainer').css('opacity', '0.25');
			});
		},

		// Show a tooltip on hover
		hover : function() {
			var that = this;
			this.$artist.tipsy({
				gravity : 's',
				html : true,
				opacity : 1,
				title : function() {
					// Since we need to scale down for Eminem and Jay Z we will do two special cases
					var vocab = that.data.vocab_len;
					if(that.data.name === 'Eminem')	 vocab = 8818;
					else if(that.data.name === 'Jay Z') vocab = 6899;
					return (that.data.name + '<br/>' + '(' + vocab + ' words)');
				}
			});
		}
	};
	
})();