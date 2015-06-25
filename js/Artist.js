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

		// Template that renders the content inside the tooltip
		this.tooltipTemplate = $.trim( $('#tooltipTemplate').html() );

		// The total number of artists the data has 
		this.numArtists = 93; // currently hard coded

 		// Initialize events 
		this.events.click.call(this);
		this.events.hover.call(this);
	}


	// Dims the artist on the plot by decreasing opacity
	Artist.prototype.dim = function() {
		this.$artist.removeClass('normalArtist');
		this.$artist.addClass('dimArtist');
	};

	// Undims the artist
	Artist.prototype.undim = function() {
		this.$artist.removeClass('dimArtist');
		this.$artist.addClass('normalArtist');
	};

	// Highlights the artist on the plot by adding a colored border
	// and showing its tooltip
	Artist.prototype.highlight = function() {
		if(!this.$artist.hasClass('highlightedArtist')) {
			this.$artist.addClass('highlightedArtist');
			this.$artist.tipsy('show');
		}
	};

	//  Removes highlight from the artist
	Artist.prototype.unhighlight = function() {
		if(this.$artist.hasClass('highlightedArtist')) {
			this.$artist.removeClass('highlightedArtist');
			this.$artist.tipsy('hide');
		}
	};


	Artist.prototype.normal = function() {
		this.$artist.addClass('normalArtist');
	};


	// Event handler on artist object
	Artist.prototype.events = {
		click : function() {
			var that = this;
			this.$artist.on('click', function() {
				console.log("the artist was clicked");
			});
		},

		// Show a tooltip on hover
		hover : function() {
			var that = this;
			this.$artist.tipsy({
				gravity : (that.data.rank >= 90) ? 'e' : 's',
				html : true,
				opacity : 1,
				offset : 2,
				title : function() {
					return(that.tooltipTemplate.replace( /{{rank}}/i, that.data.rank)
							 					   .replace( /{{artistName}}/i, that.data.name)
							 					   .replace( /{{vocab}}/i, window.VocabPlot.formatWithCommas(that.data.vocab_len))
							 					   .replace( /{{total}}/i, that.numArtists)
	 					   );
				}
			});
		}
	};
	
})();