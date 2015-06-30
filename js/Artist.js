(function() {

	// Exporting the module 
	window.Artist = {};
	window.Artist.newArtist = function(artistName, artistData) {
		return new Artist(artistName, artistData);
	};

	// This module acts like an artist object 
	// that will handle events on each artist object on the plot
	function Artist(artistName, artistData) {
		this.name = artistName;
		this.data = artistData;

		// Selector is simply name of the artist with whitespace replaced by _ , e.g. 
		// Red Hot Chilli Peppers becomes Red_Hot_Chilli_Peppers
		this.selector = artistName.split(" ").join("_");
		// Points to the DOM element that holds the current artist
		this.$artist = $('#' + this.selector);

		// Template that renders the content inside the tooltip
		this.tooltipTemplate = $.trim($('#tooltipTemplate').html());

		// The total number of artists the data has 
		this.numArtists = 93; // currently hard coded

		// Initialize events 
		this.events.click.call(this);
		this.events.hover.call(this);
	}

	Artist.prototype = {
		// Dims the artist on the plot by decreasing opacity
		dim: function() {
			this.$artist.removeClass('normalArtist');
			this.$artist.addClass('dimArtist');
		},

		// Undims the artist
		undim: function() {
			this.$artist.removeClass('dimArtist');
			this.$artist.addClass('normalArtist');
		},

		// Highlights the artist on the plot by adding a colored border
		// and showing its tooltip
		highlight: function() {
			if (!this.$artist.hasClass('highlightedArtist')) {
				this.$artist.addClass('highlightedArtist');
				this.$artist.tipsy('show');
			}
		},

		//  Removes highlight from the artist
		unhighlight: function() {
			if (this.$artist.hasClass('highlightedArtist')) {
				this.$artist.removeClass('highlightedArtist');
				this.$artist.tipsy('hide');
			}
		}
	};

	// Event handler on artist object
	Artist.prototype.events = {
		click: function() {
			// Do something on click on any of the artist circles
			this.$artist.on('click', function() {
				console.log("the artist was clicked");
			});
		},

		// Show a tooltip on hover
		hover: function() {
			var that = this;
			this.$artist.tipsy({
				gravity: (that.data.rank >= 90) ? 'e' : 's',
				html: true,
				opacity: 1,
				offset: (that.data.rank >= 90) ? 15 : 3,
				title: function() {
					return (that.tooltipTemplate.replace(/{{rank}}/i, that.data.rank)
						.replace(/{{artistName}}/i, that.data.name)
						.replace(/{{vocab}}/i, window.VocabPlot.formatWithCommas(that.data.vocab_len))
						.replace(/{{total}}/i, that.numArtists)
					);
				}
			});
		}
	};

})();