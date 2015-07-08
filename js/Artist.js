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

		// Set the background of the artist circle
		this.$artist.css('background-image', 'url(img/artist_images_40px/' + this.selector + '.jpg)');

		// Template that renders the content inside the tooltip
		this.tooltipTemplate = $.trim($('#tooltipTemplate').html());

		// The total number of artists the data has
		this.numArtists = 93; // currently hard coded

		// Enum that holds the state of the tooltip
		this.tooltipStates = {
			COMPACT: 1,
			EXPANDED: 2
		};

		// Variables that hold the configuration of the tooltip that is used
		// when interating with the artist like clicking it
		this.currentTooltipState= this.tooltipStates.COMPACT;

		this.tooltipOriginalContent = $('#tooltipTemplate').html()
			.replace(/{{rank}}/i, this.data.rank_vocab)
			.replace(/{{artistName}}/i, (this.data.name === "The Black Eyed Peas") ? "T.B.E.P" : this.data.name)
			.replace(/{{vocab}}/i, window.VocabPlot.formatWithCommas(this.data.vocab_len))
			.replace(/{{total}}/i, this.numArtists);

		this.tooltipExpandedContent = $('#tooltipTemplateExpanded').html()
			.replace(/{{rank}}/i, this.data.rank_vocab)
			.replace(/{{artistName}}/i, (this.data.name === "The Black Eyed Peas") ? "T.B.E.P" : this.data.name)
			.replace(/{{vocab}}/i, window.VocabPlot.formatWithCommas(this.data.vocab_len))
			.replace(/{{total}}/i, this.numArtists)
			.replace(/{{sales}}/i, this.data.certified_sales)
			.replace(/{{rank_sales}}/i, this.data.rank_sales)
			.replace(/{{learning_rate}}/i, Math.floor(this.data.learning_rate));


		// Initialize events
		this.events.hover.call(this);
		this.events.click.call(this);
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
			// var that = this,
			// 	easingIn= 'easeInOutCubic',
			// 	easingOut = 'easeInOutCubic',
			// 	durationIn = 300,
			// 	durationOut = 150;

			// // Since tipsy tooltips are dynamically created we cannot cache them before hand
			// this.$artist.on('click', function() {
			// 	if (that.currentTooltipState === that.tooltipStates.COMPACT) {
			// 		$('.tipsy-inner').animate({height : '+=67'}, durationIn, easingIn);
			// 		$('.tipsy').animate({top : '-=67'}, durationIn, easingIn, function() {
			// 			$('.tipsy-inner').html(that.tooltipExpandedContent);
			// 		});

			// 		that.currentTooltipState = that.tooltipStates.EXPANDED;

			// 	} else { // Tooltip status is expanded

			// 		$('.tipsy-inner').animate({height : '-=67'}, durationOut, easingOut);
			// 		$('.tipsy-inner').html(that.tooltipOriginalContent);
			// 		$('.tipsy').animate({top : '+=67'}, durationOut, easingOut);

			// 		that.currentTooltipState = that.tooltipStates.COMPACT;
			// 	}
			// });
		},

		// Show a tooltip on hover
		hover: function() {
			var that = this;
			this.$artist.tipsy({
				gravity: (that.data.name === 'Eminem') ? 'n' : 's',
				html: true,
				opacity: 1,
				offset: 3,
				title: function() {
					return that.tooltipExpandedContent;
				}
			});
		}

	};

})();
